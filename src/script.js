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

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="card daycard" style="width: 7rem">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    class="card-img-top"
                    alt="icon"
                  />
                  <div class="card-body smallcard">
                    <h5 class="card-title tempsmall">
                      <span id="forecast-max">${Math.round(
                        forecastDay.temp.max
                      )}°C |</span
                      ><span id="forecast-min"> ${Math.round(
                        forecastDay.temp.min
                      )}°C</span>
                    </h5>
                    <p class="card-text day">${formatDay(forecastDay.dt)}</p>
                  </div>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e24e54d68284c2e1184f3ffa6ec106f2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
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
    let windspeed = document.querySelector("#windspeed");
    mainTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    cityLine.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    windspeed.innerHTML = `windspeed: ${response.data.wind.speed}m/h`;
    celsiusTemperature = Math.round(response.data.main.temp);

    getForecast(response.data.coord);
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
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#maintemp");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#maintemp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusTemperature = null;

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheit);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);
