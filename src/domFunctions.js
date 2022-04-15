const cityHeading = document.querySelector(".city-heading");
const cityTimeDate = document.querySelector(".time-date");
const currentWeatherIcon = document.querySelector(".current-weather-icon");
const weatherText = document.querySelector(".weather-text");
const weatherTemp = document.querySelector(".weather-temp");
const weatherForecast = document.querySelector(".forecast-tiles");

function renderHeading(currentCityWeather) {
  cityHeading.textContent = currentCityWeather.name;
}

function getDateTime(currentCityForecast) {
  cityTimeDate.textContent = new Date().toLocaleString("en-GB", {
    timeZone: currentCityForecast.timezone,
  });
}

function renderWeatherIcon(currentCityWeather) {
  // select icon based on weather API id
  if (
    currentCityWeather.weather[0].id >= 200 &&
    currentCityWeather.weather[0].id <= 232
  ) {
    currentWeatherIcon.src = "../src/icons/heavy-rain.png";
  } else if (
    currentCityWeather.weather[0].id >= 300 &&
    currentCityWeather.weather[0].id <= 321
  ) {
    currentWeatherIcon.src = "../src/icons/light-rain.png";
  } else if (
    currentCityWeather.weather[0].id >= 500 &&
    currentCityWeather.weather[0].id <= 531
  ) {
    currentWeatherIcon.src = "../src/icons/rain.png";
  } else if (
    currentCityWeather.weather[0].id >= 600 &&
    currentCityWeather.weather[0].id <= 622
  ) {
    currentWeatherIcon.src = "../src/icons/snow.png";
  } else if (
    currentCityWeather.weather[0].id >= 700 &&
    currentCityWeather.weather[0].id <= 781
  ) {
    currentWeatherIcon.src = "../src/icons/mist.png";
  } else if (currentCityWeather.weather[0].id === 800) {
    currentWeatherIcon.src = "../src/icons/sunny.png";
  } else if (currentCityWeather.weather[0].id >= 801) {
    currentWeatherIcon.src = "../src/icons/cloud.png";
  }
}

function renderCurrentWeather(currentCityWeather, metric) {
  let weather = currentCityWeather.weather[0].description;
  weatherText.textContent = weather.charAt(0).toUpperCase() + weather.slice(1);
  weatherTemp.textContent = `${currentCityWeather.main.temp.toFixed()}`;
  if (metric) {
    weatherTemp.classList.remove("fahrenheit");
    weatherTemp.classList.add("celsius");
  } else {
    weatherTemp.classList.remove("celsius");
    weatherTemp.classList.add("fahrenheit");
  }
  weatherTemp.style.visibility = "visible";
}

function renderDailyForecast(currentCityForecast, metric) {
  clearForecast();

  //create array of forecast objects, and loop through each to create a forecast tile
  let forecastArray = currentCityForecast.daily;
  console.log(forecastArray);
  for (let forecast of forecastArray.slice(1)) {
    let forecastTile = document.createElement("div");
    let forecastDay = document.createElement("h2");
    let forecastTemp = document.createElement("p");
    let forecastDescription = document.createElement("p");
    let forecastIcon = document.createElement("img");

    let weekdayIndex = new Date(forecast.dt * 1000).getDay();
    let weekday = getUTCWeekday(weekdayIndex);
    forecastDay.textContent = weekday;
    forecastDay.classList.add("forecast-day");
    forecastTile.appendChild(forecastDay);

    forecastIcon.src = getForecastIcon(forecast.weather[0].id);
    forecastIcon.classList.add("forecast-icon");
    forecastTile.appendChild(forecastIcon);

    forecastTemp.textContent = forecast.temp.day.toFixed();
    forecastTemp.classList.add("forecast-temp");
    if (metric) {
      forecastTemp.classList.remove("forecast-fahrenheit");
      forecastTemp.classList.add("forecast-celsius");
    } else {
      forecastTemp.classList.remove("forecast-celsius");
      forecastTemp.classList.add("forecast-fahrenheit");
    }
    forecastTile.appendChild(forecastTemp);

    let dayDescription = forecast.weather[0].description;
    forecastDescription.textContent =
      dayDescription.charAt(0).toUpperCase() + dayDescription.slice(1);
    forecastDescription.classList.add("forecast-description");
    forecastTile.appendChild(forecastDescription);

    forecastTile.classList.add("forecast-tile");
    weatherForecast.appendChild(forecastTile);
  }
}

function renderHourlyForecast(currentCityForecast, metric) {
  clearForecast();

  //create array of forecast objects, and loop through each to create a forecast tile
  let forecastArray = currentCityForecast.hourly;
  console.log(forecastArray);
  for (let forecast of forecastArray.slice(1)) {
    let forecastTile = document.createElement("div");
    let forecastHour = document.createElement("h2");
    let forecastTemp = document.createElement("p");
    let forecastDescription = document.createElement("p");
    let forecastIcon = document.createElement("img");

    let time = new Date(forecast.dt * 1000).getHours();
    let timeConverted = convertTime(time);
    let timeString = timeConverted + formatHours(time);
    forecastHour.textContent = timeString;
    forecastHour.classList.add("forecast-hour");
    forecastTile.appendChild(forecastHour);

    forecastIcon.src = getForecastIcon(forecast.weather[0].id);
    forecastIcon.classList.add("forecast-icon");
    forecastTile.appendChild(forecastIcon);

    forecastTemp.textContent = forecast.temp.toFixed();
    forecastTemp.classList.add("forecast-temp");
    if (metric) {
      forecastTemp.classList.remove("forecast-fahrenheit");
      forecastTemp.classList.add("forecast-celsius");
    } else {
      forecastTemp.classList.remove("forecast-celsius");
      forecastTemp.classList.add("forecast-fahrenheit");
    }
    forecastTile.appendChild(forecastTemp);

    let hourDescription = forecast.weather[0].description;
    forecastDescription.textContent =
      hourDescription.charAt(0).toUpperCase() + hourDescription.slice(1);
    forecastDescription.classList.add("forecast-description");
    forecastTile.appendChild(forecastDescription);

    forecastTile.classList.add("forecast-tile");
    weatherForecast.appendChild(forecastTile);
  }
}

function getUTCWeekday(num) {
  switch (num) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
  }
}

function formatHours(num) {
  if (num >= 0 && num <= 11) {
    return ":00am";
  } else {
    return ":00pm";
  }
}

function convertTime(time) {
  if (time > 12) {
    time -= 12;
  } else if (time === 0) {
    time = 0;
  }
  return time;
}

function getForecastIcon(num) {
  if (num >= 200 && num <= 232) {
    return "../src/icons/heavy-rain.png";
  } else if (num >= 300 && num <= 321) {
    return "../src/icons/light-rain.png";
  } else if (num >= 500 && num <= 531) {
    return "../src/icons/rain.png";
  } else if (num >= 600 && num <= 622) {
    return "../src/icons/snow.png";
  } else if (num >= 700 && num <= 781) {
    return "../src/icons/mist.png";
  } else if (num === 800) {
    return "../src/icons/sunny.png";
  } else if (num >= 801) {
    return "../src/icons/cloud.png";
  }
}

function clearForecast() {
  weatherForecast.innerHTML = "";
}

export {
  renderHeading,
  getDateTime,
  renderWeatherIcon,
  renderCurrentWeather,
  renderDailyForecast,
  renderHourlyForecast,
};
