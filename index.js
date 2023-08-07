function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let monthIndex = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[monthIndex];
  let year = now.getFullYear();

  return `Updated on ${day}, ${date} ${month} ${year} at ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemp = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFahTemp(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelTemp(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class= "row"> `;

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
            <div class="col-2">
              <div class="weatherForecastDate"> ${day}</div>
                <div class="weatherForecastTemp">
                 <span class="weatherForecastTempMax"> 18° </span>
                 <span class="weatherForecastTempMin"> 13° </span>
                 <img 
                 src ="http://openweathermap.org/img/wn/@2x.png" 
                            alt = "" 
                            width = "40"/> 
              </div>
            </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link ");
fahrenheitLink.addEventListener("click", displayFahTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelTemp);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemp = null;

searchCity("Durban");
displayForecast();
