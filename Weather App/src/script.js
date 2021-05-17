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

//Interchanging temperature units
function farenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#current-temp");
  tempDisplay.innerHTML = `54`;
  let toFarenheit = document.querySelector("#small-celsius");
  toFarenheit.innerHTML = `°F`;
}
let farenheitUnit = document.querySelector("#farenheit-link");

farenheitUnit.addEventListener("click", farenheit);

function celsius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#current-temp");
  tempDisplay.innerHTML = `12`;
  let toCelsius = document.querySelector("#small-celsius");
  toCelsius.innerHTML = `°C`;
}
let celsiusUnit = document.querySelector("#celsius-link");

celsiusUnit.addEventListener("click", celsius);

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

  let temp = document.querySelector("#current-temp");
  let currentTemp = Math.floor(response.data.main.temp);

  let description = document.querySelector("#description");
  let weatherdescription = response.data.weather[0].main;

  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeTemp = Math.floor(response.data.main.feels_like);

  let high = Math.floor(response.data.main.temp_max);
  let low = Math.floor(response.data.main.temp_min);
  let max = document.querySelector("#high");
  let min = document.querySelector("#low");

  temp.innerHTML = `${currentTemp}`;
  description.innerHTML = `${weatherdescription}`;
  feelsLike.innerHTML = `Feels like ${feelsLikeTemp}`;
  max.innerHTML = `${high}`;
  min.innerHTML = ` ${low}`;

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
