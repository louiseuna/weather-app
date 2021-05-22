//Format Date

let now = new Date();

let dateTime = document.querySelector("#current-date-time");

function formatDate(now) {
  let date = now.getDate();
  if (date == 1 || date == 21 || date == 31) {
    date = `${date}st`;
  } else if (date == 2 || date == 22) {
    date = `${date}nd`;
  } else if (date == 3 || date == 23) {
    date = `${date}rd`;
  } else {
    date = `${date}th`;
  }

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[now.getDay()];

  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  let month = months[now.getMonth()];

  return `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
}

dateTime.innerHTML = formatDate(now);

//Display city entered
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  if (city == "") {
    alert(`Please search for a City 🔍🌆`);
  }
  searchCity(city);
}

//Show City and Weather
function showWeather(response) {
  document.querySelector(
    "#city-display"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  celsiusTemperature = response.data.main.temp;

  let temp = document.querySelector("#current-temp");
  let currentTemp = Math.floor(celsiusTemperature);

  let description = document.querySelector("#description");
  let weatherDescription = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeTemp = Math.floor(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  let showHumidity = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  let showWindSpeed = Math.floor(response.data.wind.speed);

  let max = document.querySelector("#high");
  let min = document.querySelector("#low");
  let high = Math.floor(response.data.main.temp_max);
  let low = Math.floor(response.data.main.temp_min);

  temp.innerHTML = `${currentTemp}`;
  description.innerHTML = `${weatherDescription}`;
  feelsLike.innerHTML = `Feels like ${feelsLikeTemp}`;
  humidity.innerHTML = `Humidity: ${showHumidity}`;
  windSpeed.innerHTML = `Windspeed: ${showWindSpeed}`;
  max.innerHTML = `${high}`;
  min.innerHTML = ` ${low}`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response);
}

//Display city on load
function searchCity(city) {
  //API stored in function
  let apiKey = `a9f6c0e1b1497b25ded5be0fd029e8ec`;
  let units = `metric`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

//Find and display current city and temp
function showCurrentLocation(response) {
  let city = `${response.data.name}`;
  let country = `${response.data.sys.country}`;
  let currentLocation = `${city}, ${country}`;
  document.querySelector("#city-display").innerHTML = `${currentLocation}`;
}

function findCurrentPosition(position) {
  let units = `metric`;
  let apiKey = "a9f6c0e1b1497b25ded5be0fd029e8ec";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrlCurrentLocation = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCurrentLocation).then(showWeather);
  axios.get(apiUrlCurrentLocation).then(showCurrentLocation);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

searchCity("London");

function getForecast(response) {
  console.log(response);
}

//Interchanging temperature units
function farenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#current-temp");
  let farenheitTemp = Math.floor((celsiusTemperature * 9) / 5 + 32);
  celsiusUnit.classList.remove("active");
  farenheitUnit.classList.add("active");
  tempDisplay.innerHTML = `${farenheitTemp}`;
}

function celsius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#current-temp");
  farenheitUnit.classList.remove("active");
  celsiusUnit.classList.add("active");
  tempDisplay.innerHTML = Math.floor(celsiusTemperature);
}
celsiusTemperature = null;

let farenheitUnit = document.querySelector("#farenheit-link");
farenheitUnit.addEventListener("click", farenheit);

let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", celsius);
