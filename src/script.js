// Date:
let now = new Date();
let time = document.querySelector("#time");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
time.innerHTML = `${day} ${hour}:${minutes}`;

// Search Engine:

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;

  let apiKey = "e24e54d68284c2e1184f3ffa6ec106f2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);

  function showWeather(response) {
    console.log(response.data);
    let mainTemp = document.querySelector("#maintemp");
    let cityLine = document.querySelector("#city");
    let description = document.querySelector("#description");
    let icon = document.querySelector("#icon");
    mainTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    cityLine.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", search);

// GPS Current Location
function getCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e24e54d68284c2e1184f3ffa6ec106f2";
  let gpsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(gpsUrl).then(showCurrentWeather);

  function showCurrentWeather(response) {
    console.log(response);
    let mainTemp = document.querySelector("#maintemp");
    let cityLine = document.querySelector("#city");

    mainTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    cityLine.innerHTML = response.data.name;
  }
}

function getGPS() {
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

let gpsButton = document.querySelector("#currentLocation");
gpsButton.addEventListener("click", getGPS);

// Celsius -> Fahrenheit
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");

function ChangeToCelsius() {
  let mainTemp = document.querySelector("#maintemp");
  mainTemp.innerHTML = "19°C";
}

function ChangeToFahrenheit() {
  let mainTempF = document.querySelector("#maintemp");
  mainTempF.innerHTML = "66°F";
}
celsius.addEventListener("click", ChangeToCelsius);
fahrenheit.addEventListener("click", ChangeToFahrenheit);
