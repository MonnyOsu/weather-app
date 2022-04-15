/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backgroundFunctions.js":
/*!************************************!*\
  !*** ./src/backgroundFunctions.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateBackground)
/* harmony export */ });
const backgroundDiv = document.getElementById("background-image");
const imageCaption = document.getElementById("image-caption");

async function updateBackground(currentCity) {
  let imageRequest = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${currentCity}&client_id=9G-bR8MIRPVXbYXAaK1zL5qBJuRb4X49j57SMk7E-HY&orientation=landscape`
  );
  let imageResponse = await imageRequest.json();
  let imageIndex = randomNum();
  let imageUrl = await imageResponse.results[imageIndex].urls.full;
  let imageCredit =
    await `${imageResponse.results[imageIndex].user.first_name} ${imageResponse.results[0].user.last_name}`;
  imageCaption.href = imageResponse.results[0].links.html;
  imageCaption.textContent = `${imageCredit} / Unsplash`;
  backgroundDiv.style.backgroundImage = `url(${imageUrl})`;
}

function randomNum() {
  return Math.floor(Math.random() * 10);
}


/***/ }),

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDateTime": () => (/* binding */ getDateTime),
/* harmony export */   "renderCurrentWeather": () => (/* binding */ renderCurrentWeather),
/* harmony export */   "renderDailyForecast": () => (/* binding */ renderDailyForecast),
/* harmony export */   "renderHeading": () => (/* binding */ renderHeading),
/* harmony export */   "renderHourlyForecast": () => (/* binding */ renderHourlyForecast),
/* harmony export */   "renderWeatherIcon": () => (/* binding */ renderWeatherIcon)
/* harmony export */ });
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




/***/ }),

/***/ "./src/weatherFunctions.js":
/*!*********************************!*\
  !*** ./src/weatherFunctions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getForecast": () => (/* binding */ getForecast),
/* harmony export */   "getForecastFahrenheit": () => (/* binding */ getForecastFahrenheit),
/* harmony export */   "getWeather": () => (/* binding */ getWeather),
/* harmony export */   "getWeatherFahrenheit": () => (/* binding */ getWeatherFahrenheit)
/* harmony export */ });
// basic api call to search via city name, then forcast api call using coordinates from initial fetch.

async function getWeather(currentCity) {
  let weatherRequest =
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=72cd63cd4bf6c2de16abe8bc643a4e42
    `);
  let weatherResponse = await weatherRequest.json();
  let lon = await weatherResponse.coord.lon;
  let lat = await weatherResponse.coord.lat;
  return await weatherResponse;
}

async function getForecast(lat, lon) {
  let forecastRequest = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&units=metric&exclude=minutely&appid=72cd63cd4bf6c2de16abe8bc643a4e42`
  );
  let forecastResponse = await forecastRequest.json();
  return await forecastResponse;
}

async function getWeatherFahrenheit(currentCity) {
  let weatherRequest =
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=72cd63cd4bf6c2de16abe8bc643a4e42
      `);
  let weatherResponse = await weatherRequest.json();
  let lon = await weatherResponse.coord.lon;
  let lat = await weatherResponse.coord.lat;
  return await weatherResponse;
}

async function getForecastFahrenheit(lat, lon) {
  let forecastRequest = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&exclude=minutely&units=imperial&appid=72cd63cd4bf6c2de16abe8bc643a4e42`
  );
  let forecastResponse = await forecastRequest.json();
  return await forecastResponse;
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _backgroundFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backgroundFunctions.js */ "./src/backgroundFunctions.js");
/* harmony import */ var _weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherFunctions.js */ "./src/weatherFunctions.js");
/* harmony import */ var _domFunctions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domFunctions.js */ "./src/domFunctions.js");




const searchForm = document.querySelector("[data-city-form]");
const searchInput = document.querySelector("[data-search-input]");
const forecastBtn = document.querySelector(".forecast-btn");
const unitBtn = document.querySelector(".units");

let currentCity = "Wellington";
let currentCityWeather;
let currentCityForecast;
let dailyForecast = true;
let metric = true;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  currentCity = searchInput.value;
  searchInput.value = "";
  await (0,_backgroundFunctions_js__WEBPACK_IMPORTED_MODULE_0__["default"])(currentCity);

  if (metric) {
    currentCityWeather = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getWeather)(currentCity);
  } else {
    currentCityWeather = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getWeatherFahrenheit)(currentCity);
  }
  await console.log(currentCityWeather);
  let lat = await currentCityWeather.coord.lat;
  let lon = await currentCityWeather.coord.lon;

  if (metric) {
    currentCityForecast = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getForecast)(lat, lon);
  } else {
    currentCityForecast = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getForecastFahrenheit)(lat, lon);
  }
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderHeading)(currentCityWeather);
  console.log(currentCityForecast);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getDateTime)(currentCityForecast);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderWeatherIcon)(currentCityWeather);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderCurrentWeather)(currentCityWeather, metric);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderDailyForecast)(currentCityForecast, metric);
});

unitBtn.addEventListener("click", async () => {
  // change unit
  if (metric) {
    metric = false;
  } else {
    metric = true;
  }
  // call based on unit
  if (metric) {
    currentCityWeather = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getWeather)(currentCity);
  } else {
    currentCityWeather = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getWeatherFahrenheit)(currentCity);
  }
  await console.log(currentCityWeather);
  let lat = await currentCityWeather.coord.lat;
  let lon = await currentCityWeather.coord.lon;
  // call forecast based on unit
  if (metric) {
    currentCityForecast = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getForecast)(lat, lon);
  } else {
    currentCityForecast = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getForecastFahrenheit)(lat, lon);
  }
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderHeading)(currentCityWeather);
  console.log(currentCityForecast);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getDateTime)(currentCityForecast);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderWeatherIcon)(currentCityWeather);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderCurrentWeather)(currentCityWeather, metric);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderDailyForecast)(currentCityForecast, metric);
});

forecastBtn.addEventListener("click", async () => {
  // toggle daily / hourly forecast
  if (dailyForecast) {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderHourlyForecast)(currentCityForecast, metric);
    forecastBtn.textContent = "Daily";
    dailyForecast = false;
  } else {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderDailyForecast)(currentCityForecast, metric);
    forecastBtn.textContent = "Hourly";
    dailyForecast = true;
  }
});

window.addEventListener("load", async () => {
  // load default city, need to update to getGeoLocation() to utilise user location
  await (0,_backgroundFunctions_js__WEBPACK_IMPORTED_MODULE_0__["default"])(currentCity);
  if (metric) {
    currentCityWeather = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getWeather)(currentCity);
  } else {
    currentCityWeather = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getWeatherFahrenheit)(currentCity);
  }
  await console.log(currentCityWeather);
  let lat = await currentCityWeather.coord.lat;
  let lon = await currentCityWeather.coord.lon;

  if (metric) {
    currentCityForecast = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getForecast)(lat, lon);
  } else {
    currentCityForecast = await (0,_weatherFunctions_js__WEBPACK_IMPORTED_MODULE_1__.getForecastFahrenheit)(lat, lon);
  }
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderHeading)(currentCityWeather);
  console.log(currentCityForecast);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getDateTime)(currentCityForecast);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderWeatherIcon)(currentCityWeather);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderCurrentWeather)(currentCityWeather, metric);
  (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderDailyForecast)(currentCityForecast, metric);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBLGdDQUFnQyxpRUFBVztBQUMzQyxJQUFJO0FBQ0osZ0NBQWdDLDJFQUFxQjtBQUNyRDtBQUNBLEVBQUUsK0RBQWE7QUFDZjtBQUNBLEVBQUUsNkRBQVc7QUFDYixFQUFFLG1FQUFpQjtBQUNuQixFQUFFLHNFQUFvQjtBQUN0QixFQUFFLHFFQUFtQjtBQUNyQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYmFja2dyb3VuZEZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kb21GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBiYWNrZ3JvdW5kRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuY29uc3QgaW1hZ2VDYXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWFnZS1jYXB0aW9uXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCYWNrZ3JvdW5kKGN1cnJlbnRDaXR5KSB7XG4gIGxldCBpbWFnZVJlcXVlc3QgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3NlYXJjaC9waG90b3M/cGFnZT0xJnF1ZXJ5PSR7Y3VycmVudENpdHl9JmNsaWVudF9pZD05Ry1iUjhNSVJQVlhiWVhBYUsxekw1cUJKdVJiNFg0OWo1N1NNazdFLUhZJm9yaWVudGF0aW9uPWxhbmRzY2FwZWBcbiAgKTtcbiAgbGV0IGltYWdlUmVzcG9uc2UgPSBhd2FpdCBpbWFnZVJlcXVlc3QuanNvbigpO1xuICBsZXQgaW1hZ2VJbmRleCA9IHJhbmRvbU51bSgpO1xuICBsZXQgaW1hZ2VVcmwgPSBhd2FpdCBpbWFnZVJlc3BvbnNlLnJlc3VsdHNbaW1hZ2VJbmRleF0udXJscy5mdWxsO1xuICBsZXQgaW1hZ2VDcmVkaXQgPVxuICAgIGF3YWl0IGAke2ltYWdlUmVzcG9uc2UucmVzdWx0c1tpbWFnZUluZGV4XS51c2VyLmZpcnN0X25hbWV9ICR7aW1hZ2VSZXNwb25zZS5yZXN1bHRzWzBdLnVzZXIubGFzdF9uYW1lfWA7XG4gIGltYWdlQ2FwdGlvbi5ocmVmID0gaW1hZ2VSZXNwb25zZS5yZXN1bHRzWzBdLmxpbmtzLmh0bWw7XG4gIGltYWdlQ2FwdGlvbi50ZXh0Q29udGVudCA9IGAke2ltYWdlQ3JlZGl0fSAvIFVuc3BsYXNoYDtcbiAgYmFja2dyb3VuZERpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aW1hZ2VVcmx9KWA7XG59XG5cbmZ1bmN0aW9uIHJhbmRvbU51bSgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbn1cbiIsImNvbnN0IGNpdHlIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LWhlYWRpbmdcIik7XG5jb25zdCBjaXR5VGltZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWUtZGF0ZVwiKTtcbmNvbnN0IGN1cnJlbnRXZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC13ZWF0aGVyLWljb25cIik7XG5jb25zdCB3ZWF0aGVyVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci10ZXh0XCIpO1xuY29uc3Qgd2VhdGhlclRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItdGVtcFwiKTtcbmNvbnN0IHdlYXRoZXJGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtdGlsZXNcIik7XG5cbmZ1bmN0aW9uIHJlbmRlckhlYWRpbmcoY3VycmVudENpdHlXZWF0aGVyKSB7XG4gIGNpdHlIZWFkaW5nLnRleHRDb250ZW50ID0gY3VycmVudENpdHlXZWF0aGVyLm5hbWU7XG59XG5cbmZ1bmN0aW9uIGdldERhdGVUaW1lKGN1cnJlbnRDaXR5Rm9yZWNhc3QpIHtcbiAgY2l0eVRpbWVEYXRlLnRleHRDb250ZW50ID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLUdCXCIsIHtcbiAgICB0aW1lWm9uZTogY3VycmVudENpdHlGb3JlY2FzdC50aW1lem9uZSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcldlYXRoZXJJY29uKGN1cnJlbnRDaXR5V2VhdGhlcikge1xuICAvLyBzZWxlY3QgaWNvbiBiYXNlZCBvbiB3ZWF0aGVyIEFQSSBpZFxuICBpZiAoXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPj0gMjAwICYmXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPD0gMjMyXG4gICkge1xuICAgIGN1cnJlbnRXZWF0aGVySWNvbi5zcmMgPSBcIi4uL3NyYy9pY29ucy9oZWF2eS1yYWluLnBuZ1wiO1xuICB9IGVsc2UgaWYgKFxuICAgIGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkID49IDMwMCAmJlxuICAgIGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkIDw9IDMyMVxuICApIHtcbiAgICBjdXJyZW50V2VhdGhlckljb24uc3JjID0gXCIuLi9zcmMvaWNvbnMvbGlnaHQtcmFpbi5wbmdcIjtcbiAgfSBlbHNlIGlmIChcbiAgICBjdXJyZW50Q2l0eVdlYXRoZXIud2VhdGhlclswXS5pZCA+PSA1MDAgJiZcbiAgICBjdXJyZW50Q2l0eVdlYXRoZXIud2VhdGhlclswXS5pZCA8PSA1MzFcbiAgKSB7XG4gICAgY3VycmVudFdlYXRoZXJJY29uLnNyYyA9IFwiLi4vc3JjL2ljb25zL3JhaW4ucG5nXCI7XG4gIH0gZWxzZSBpZiAoXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPj0gNjAwICYmXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPD0gNjIyXG4gICkge1xuICAgIGN1cnJlbnRXZWF0aGVySWNvbi5zcmMgPSBcIi4uL3NyYy9pY29ucy9zbm93LnBuZ1wiO1xuICB9IGVsc2UgaWYgKFxuICAgIGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkID49IDcwMCAmJlxuICAgIGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkIDw9IDc4MVxuICApIHtcbiAgICBjdXJyZW50V2VhdGhlckljb24uc3JjID0gXCIuLi9zcmMvaWNvbnMvbWlzdC5wbmdcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50Q2l0eVdlYXRoZXIud2VhdGhlclswXS5pZCA9PT0gODAwKSB7XG4gICAgY3VycmVudFdlYXRoZXJJY29uLnNyYyA9IFwiLi4vc3JjL2ljb25zL3N1bm55LnBuZ1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkID49IDgwMSkge1xuICAgIGN1cnJlbnRXZWF0aGVySWNvbi5zcmMgPSBcIi4uL3NyYy9pY29ucy9jbG91ZC5wbmdcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDdXJyZW50V2VhdGhlcihjdXJyZW50Q2l0eVdlYXRoZXIsIG1ldHJpYykge1xuICBsZXQgd2VhdGhlciA9IGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICB3ZWF0aGVyVGV4dC50ZXh0Q29udGVudCA9IHdlYXRoZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3ZWF0aGVyLnNsaWNlKDEpO1xuICB3ZWF0aGVyVGVtcC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRDaXR5V2VhdGhlci5tYWluLnRlbXAudG9GaXhlZCgpfWA7XG4gIGlmIChtZXRyaWMpIHtcbiAgICB3ZWF0aGVyVGVtcC5jbGFzc0xpc3QucmVtb3ZlKFwiZmFocmVuaGVpdFwiKTtcbiAgICB3ZWF0aGVyVGVtcC5jbGFzc0xpc3QuYWRkKFwiY2Vsc2l1c1wiKTtcbiAgfSBlbHNlIHtcbiAgICB3ZWF0aGVyVGVtcC5jbGFzc0xpc3QucmVtb3ZlKFwiY2Vsc2l1c1wiKTtcbiAgICB3ZWF0aGVyVGVtcC5jbGFzc0xpc3QuYWRkKFwiZmFocmVuaGVpdFwiKTtcbiAgfVxuICB3ZWF0aGVyVGVtcC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckRhaWx5Rm9yZWNhc3QoY3VycmVudENpdHlGb3JlY2FzdCwgbWV0cmljKSB7XG4gIGNsZWFyRm9yZWNhc3QoKTtcblxuICAvL2NyZWF0ZSBhcnJheSBvZiBmb3JlY2FzdCBvYmplY3RzLCBhbmQgbG9vcCB0aHJvdWdoIGVhY2ggdG8gY3JlYXRlIGEgZm9yZWNhc3QgdGlsZVxuICBsZXQgZm9yZWNhc3RBcnJheSA9IGN1cnJlbnRDaXR5Rm9yZWNhc3QuZGFpbHk7XG4gIGNvbnNvbGUubG9nKGZvcmVjYXN0QXJyYXkpO1xuICBmb3IgKGxldCBmb3JlY2FzdCBvZiBmb3JlY2FzdEFycmF5LnNsaWNlKDEpKSB7XG4gICAgbGV0IGZvcmVjYXN0VGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGV0IGZvcmVjYXN0RGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGxldCBmb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsZXQgZm9yZWNhc3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxldCBmb3JlY2FzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXG4gICAgbGV0IHdlZWtkYXlJbmRleCA9IG5ldyBEYXRlKGZvcmVjYXN0LmR0ICogMTAwMCkuZ2V0RGF5KCk7XG4gICAgbGV0IHdlZWtkYXkgPSBnZXRVVENXZWVrZGF5KHdlZWtkYXlJbmRleCk7XG4gICAgZm9yZWNhc3REYXkudGV4dENvbnRlbnQgPSB3ZWVrZGF5O1xuICAgIGZvcmVjYXN0RGF5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1kYXlcIik7XG4gICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0RGF5KTtcblxuICAgIGZvcmVjYXN0SWNvbi5zcmMgPSBnZXRGb3JlY2FzdEljb24oZm9yZWNhc3Qud2VhdGhlclswXS5pZCk7XG4gICAgZm9yZWNhc3RJY29uLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1pY29uXCIpO1xuICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdEljb24pO1xuXG4gICAgZm9yZWNhc3RUZW1wLnRleHRDb250ZW50ID0gZm9yZWNhc3QudGVtcC5kYXkudG9GaXhlZCgpO1xuICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtdGVtcFwiKTtcbiAgICBpZiAobWV0cmljKSB7XG4gICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LnJlbW92ZShcImZvcmVjYXN0LWZhaHJlbmhlaXRcIik7XG4gICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWNlbHNpdXNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9yZWNhc3QtY2Vsc2l1c1wiKTtcbiAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtZmFocmVuaGVpdFwiKTtcbiAgICB9XG4gICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XG5cbiAgICBsZXQgZGF5RGVzY3JpcHRpb24gPSBmb3JlY2FzdC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGZvcmVjYXN0RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPVxuICAgICAgZGF5RGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkYXlEZXNjcmlwdGlvbi5zbGljZSgxKTtcbiAgICBmb3JlY2FzdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1kZXNjcmlwdGlvblwiKTtcbiAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3REZXNjcmlwdGlvbik7XG5cbiAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LXRpbGVcIik7XG4gICAgd2VhdGhlckZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVySG91cmx5Rm9yZWNhc3QoY3VycmVudENpdHlGb3JlY2FzdCwgbWV0cmljKSB7XG4gIGNsZWFyRm9yZWNhc3QoKTtcblxuICAvL2NyZWF0ZSBhcnJheSBvZiBmb3JlY2FzdCBvYmplY3RzLCBhbmQgbG9vcCB0aHJvdWdoIGVhY2ggdG8gY3JlYXRlIGEgZm9yZWNhc3QgdGlsZVxuICBsZXQgZm9yZWNhc3RBcnJheSA9IGN1cnJlbnRDaXR5Rm9yZWNhc3QuaG91cmx5O1xuICBjb25zb2xlLmxvZyhmb3JlY2FzdEFycmF5KTtcbiAgZm9yIChsZXQgZm9yZWNhc3Qgb2YgZm9yZWNhc3RBcnJheS5zbGljZSgxKSkge1xuICAgIGxldCBmb3JlY2FzdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGxldCBmb3JlY2FzdEhvdXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbGV0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxldCBmb3JlY2FzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbGV0IGZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKGZvcmVjYXN0LmR0ICogMTAwMCkuZ2V0SG91cnMoKTtcbiAgICBsZXQgdGltZUNvbnZlcnRlZCA9IGNvbnZlcnRUaW1lKHRpbWUpO1xuICAgIGxldCB0aW1lU3RyaW5nID0gdGltZUNvbnZlcnRlZCArIGZvcm1hdEhvdXJzKHRpbWUpO1xuICAgIGZvcmVjYXN0SG91ci50ZXh0Q29udGVudCA9IHRpbWVTdHJpbmc7XG4gICAgZm9yZWNhc3RIb3VyLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1ob3VyXCIpO1xuICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdEhvdXIpO1xuXG4gICAgZm9yZWNhc3RJY29uLnNyYyA9IGdldEZvcmVjYXN0SWNvbihmb3JlY2FzdC53ZWF0aGVyWzBdLmlkKTtcbiAgICBmb3JlY2FzdEljb24uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWljb25cIik7XG4gICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0SWNvbik7XG5cbiAgICBmb3JlY2FzdFRlbXAudGV4dENvbnRlbnQgPSBmb3JlY2FzdC50ZW1wLnRvRml4ZWQoKTtcbiAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LXRlbXBcIik7XG4gICAgaWYgKG1ldHJpYykge1xuICAgICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5yZW1vdmUoXCJmb3JlY2FzdC1mYWhyZW5oZWl0XCIpO1xuICAgICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1jZWxzaXVzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LnJlbW92ZShcImZvcmVjYXN0LWNlbHNpdXNcIik7XG4gICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWZhaHJlbmhlaXRcIik7XG4gICAgfVxuICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRlbXApO1xuXG4gICAgbGV0IGhvdXJEZXNjcmlwdGlvbiA9IGZvcmVjYXN0LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgZm9yZWNhc3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9XG4gICAgICBob3VyRGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBob3VyRGVzY3JpcHRpb24uc2xpY2UoMSk7XG4gICAgZm9yZWNhc3REZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtZGVzY3JpcHRpb25cIik7XG4gICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0RGVzY3JpcHRpb24pO1xuXG4gICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC10aWxlXCIpO1xuICAgIHdlYXRoZXJGb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFVUQ1dlZWtkYXkobnVtKSB7XG4gIHN3aXRjaCAobnVtKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIFwiU3VuZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gXCJNb25kYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBcIlR1ZXNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBcIldlZG5lc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwiVGh1cnNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcIkZyaWRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIFwiU2F0dXJkYXlcIjtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhvdXJzKG51bSkge1xuICBpZiAobnVtID49IDAgJiYgbnVtIDw9IDExKSB7XG4gICAgcmV0dXJuIFwiOjAwYW1cIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCI6MDBwbVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUaW1lKHRpbWUpIHtcbiAgaWYgKHRpbWUgPiAxMikge1xuICAgIHRpbWUgLT0gMTI7XG4gIH0gZWxzZSBpZiAodGltZSA9PT0gMCkge1xuICAgIHRpbWUgPSAwO1xuICB9XG4gIHJldHVybiB0aW1lO1xufVxuXG5mdW5jdGlvbiBnZXRGb3JlY2FzdEljb24obnVtKSB7XG4gIGlmIChudW0gPj0gMjAwICYmIG51bSA8PSAyMzIpIHtcbiAgICByZXR1cm4gXCIuLi9zcmMvaWNvbnMvaGVhdnktcmFpbi5wbmdcIjtcbiAgfSBlbHNlIGlmIChudW0gPj0gMzAwICYmIG51bSA8PSAzMjEpIHtcbiAgICByZXR1cm4gXCIuLi9zcmMvaWNvbnMvbGlnaHQtcmFpbi5wbmdcIjtcbiAgfSBlbHNlIGlmIChudW0gPj0gNTAwICYmIG51bSA8PSA1MzEpIHtcbiAgICByZXR1cm4gXCIuLi9zcmMvaWNvbnMvcmFpbi5wbmdcIjtcbiAgfSBlbHNlIGlmIChudW0gPj0gNjAwICYmIG51bSA8PSA2MjIpIHtcbiAgICByZXR1cm4gXCIuLi9zcmMvaWNvbnMvc25vdy5wbmdcIjtcbiAgfSBlbHNlIGlmIChudW0gPj0gNzAwICYmIG51bSA8PSA3ODEpIHtcbiAgICByZXR1cm4gXCIuLi9zcmMvaWNvbnMvbWlzdC5wbmdcIjtcbiAgfSBlbHNlIGlmIChudW0gPT09IDgwMCkge1xuICAgIHJldHVybiBcIi4uL3NyYy9pY29ucy9zdW5ueS5wbmdcIjtcbiAgfSBlbHNlIGlmIChudW0gPj0gODAxKSB7XG4gICAgcmV0dXJuIFwiLi4vc3JjL2ljb25zL2Nsb3VkLnBuZ1wiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyRm9yZWNhc3QoKSB7XG4gIHdlYXRoZXJGb3JlY2FzdC5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5leHBvcnQge1xuICByZW5kZXJIZWFkaW5nLFxuICBnZXREYXRlVGltZSxcbiAgcmVuZGVyV2VhdGhlckljb24sXG4gIHJlbmRlckN1cnJlbnRXZWF0aGVyLFxuICByZW5kZXJEYWlseUZvcmVjYXN0LFxuICByZW5kZXJIb3VybHlGb3JlY2FzdCxcbn07XG4iLCIvLyBiYXNpYyBhcGkgY2FsbCB0byBzZWFyY2ggdmlhIGNpdHkgbmFtZSwgdGhlbiBmb3JjYXN0IGFwaSBjYWxsIHVzaW5nIGNvb3JkaW5hdGVzIGZyb20gaW5pdGlhbCBmZXRjaC5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihjdXJyZW50Q2l0eSkge1xuICBsZXQgd2VhdGhlclJlcXVlc3QgPVxuICAgIGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y3VycmVudENpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD03MmNkNjNjZDRiZjZjMmRlMTZhYmU4YmM2NDNhNGU0MlxuICAgIGApO1xuICBsZXQgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgd2VhdGhlclJlcXVlc3QuanNvbigpO1xuICBsZXQgbG9uID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmNvb3JkLmxvbjtcbiAgbGV0IGxhdCA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5jb29yZC5sYXQ7XG4gIHJldHVybiBhd2FpdCB3ZWF0aGVyUmVzcG9uc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxhdCwgbG9uKSB7XG4gIGxldCBmb3JlY2FzdFJlcXVlc3QgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bG9uPSR7bG9ufSZsYXQ9JHtsYXR9JnVuaXRzPW1ldHJpYyZleGNsdWRlPW1pbnV0ZWx5JmFwcGlkPTcyY2Q2M2NkNGJmNmMyZGUxNmFiZThiYzY0M2E0ZTQyYFxuICApO1xuICBsZXQgZm9yZWNhc3RSZXNwb25zZSA9IGF3YWl0IGZvcmVjYXN0UmVxdWVzdC5qc29uKCk7XG4gIHJldHVybiBhd2FpdCBmb3JlY2FzdFJlc3BvbnNlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRmFocmVuaGVpdChjdXJyZW50Q2l0eSkge1xuICBsZXQgd2VhdGhlclJlcXVlc3QgPVxuICAgIGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y3VycmVudENpdHl9JnVuaXRzPWltcGVyaWFsJmFwcGlkPTcyY2Q2M2NkNGJmNmMyZGUxNmFiZThiYzY0M2E0ZTQyXG4gICAgICBgKTtcbiAgbGV0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IHdlYXRoZXJSZXF1ZXN0Lmpzb24oKTtcbiAgbGV0IGxvbiA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5jb29yZC5sb247XG4gIGxldCBsYXQgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuY29vcmQubGF0O1xuICByZXR1cm4gYXdhaXQgd2VhdGhlclJlc3BvbnNlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdEZhaHJlbmhlaXQobGF0LCBsb24pIHtcbiAgbGV0IGZvcmVjYXN0UmVxdWVzdCA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sb249JHtsb259JmxhdD0ke2xhdH0mZXhjbHVkZT1taW51dGVseSZ1bml0cz1pbXBlcmlhbCZhcHBpZD03MmNkNjNjZDRiZjZjMmRlMTZhYmU4YmM2NDNhNGU0MmBcbiAgKTtcbiAgbGV0IGZvcmVjYXN0UmVzcG9uc2UgPSBhd2FpdCBmb3JlY2FzdFJlcXVlc3QuanNvbigpO1xuICByZXR1cm4gYXdhaXQgZm9yZWNhc3RSZXNwb25zZTtcbn1cblxuZXhwb3J0IHsgZ2V0V2VhdGhlciwgZ2V0Rm9yZWNhc3QsIGdldFdlYXRoZXJGYWhyZW5oZWl0LCBnZXRGb3JlY2FzdEZhaHJlbmhlaXQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHVwZGF0ZUJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZEZ1bmN0aW9ucy5qc1wiO1xuaW1wb3J0IHtcbiAgZ2V0V2VhdGhlcixcbiAgZ2V0Rm9yZWNhc3QsXG4gIGdldFdlYXRoZXJGYWhyZW5oZWl0LFxuICBnZXRGb3JlY2FzdEZhaHJlbmhlaXQsXG59IGZyb20gXCIuL3dlYXRoZXJGdW5jdGlvbnMuanNcIjtcbmltcG9ydCB7XG4gIHJlbmRlckhlYWRpbmcsXG4gIGdldERhdGVUaW1lLFxuICByZW5kZXJXZWF0aGVySWNvbixcbiAgcmVuZGVyQ3VycmVudFdlYXRoZXIsXG4gIHJlbmRlckRhaWx5Rm9yZWNhc3QsXG4gIHJlbmRlckhvdXJseUZvcmVjYXN0LFxufSBmcm9tIFwiLi9kb21GdW5jdGlvbnMuanNcIjtcblxuY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jaXR5LWZvcm1dXCIpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2VhcmNoLWlucHV0XVwiKTtcbmNvbnN0IGZvcmVjYXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1idG5cIik7XG5jb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51bml0c1wiKTtcblxubGV0IGN1cnJlbnRDaXR5ID0gXCJXZWxsaW5ndG9uXCI7XG5sZXQgY3VycmVudENpdHlXZWF0aGVyO1xubGV0IGN1cnJlbnRDaXR5Rm9yZWNhc3Q7XG5sZXQgZGFpbHlGb3JlY2FzdCA9IHRydWU7XG5sZXQgbWV0cmljID0gdHJ1ZTtcblxuc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY3VycmVudENpdHkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xuICBhd2FpdCB1cGRhdGVCYWNrZ3JvdW5kKGN1cnJlbnRDaXR5KTtcblxuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihjdXJyZW50Q2l0eSk7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlckZhaHJlbmhlaXQoY3VycmVudENpdHkpO1xuICB9XG4gIGF3YWl0IGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGxldCBsYXQgPSBhd2FpdCBjdXJyZW50Q2l0eVdlYXRoZXIuY29vcmQubGF0O1xuICBsZXQgbG9uID0gYXdhaXQgY3VycmVudENpdHlXZWF0aGVyLmNvb3JkLmxvbjtcblxuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlGb3JlY2FzdCA9IGF3YWl0IGdldEZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50Q2l0eUZvcmVjYXN0ID0gYXdhaXQgZ2V0Rm9yZWNhc3RGYWhyZW5oZWl0KGxhdCwgbG9uKTtcbiAgfVxuICByZW5kZXJIZWFkaW5nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5Rm9yZWNhc3QpO1xuICBnZXREYXRlVGltZShjdXJyZW50Q2l0eUZvcmVjYXN0KTtcbiAgcmVuZGVyV2VhdGhlckljb24oY3VycmVudENpdHlXZWF0aGVyKTtcbiAgcmVuZGVyQ3VycmVudFdlYXRoZXIoY3VycmVudENpdHlXZWF0aGVyLCBtZXRyaWMpO1xuICByZW5kZXJEYWlseUZvcmVjYXN0KGN1cnJlbnRDaXR5Rm9yZWNhc3QsIG1ldHJpYyk7XG59KTtcblxudW5pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAvLyBjaGFuZ2UgdW5pdFxuICBpZiAobWV0cmljKSB7XG4gICAgbWV0cmljID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgbWV0cmljID0gdHJ1ZTtcbiAgfVxuICAvLyBjYWxsIGJhc2VkIG9uIHVuaXRcbiAgaWYgKG1ldHJpYykge1xuICAgIGN1cnJlbnRDaXR5V2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoY3VycmVudENpdHkpO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRDaXR5V2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXJGYWhyZW5oZWl0KGN1cnJlbnRDaXR5KTtcbiAgfVxuICBhd2FpdCBjb25zb2xlLmxvZyhjdXJyZW50Q2l0eVdlYXRoZXIpO1xuICBsZXQgbGF0ID0gYXdhaXQgY3VycmVudENpdHlXZWF0aGVyLmNvb3JkLmxhdDtcbiAgbGV0IGxvbiA9IGF3YWl0IGN1cnJlbnRDaXR5V2VhdGhlci5jb29yZC5sb247XG4gIC8vIGNhbGwgZm9yZWNhc3QgYmFzZWQgb24gdW5pdFxuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlGb3JlY2FzdCA9IGF3YWl0IGdldEZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50Q2l0eUZvcmVjYXN0ID0gYXdhaXQgZ2V0Rm9yZWNhc3RGYWhyZW5oZWl0KGxhdCwgbG9uKTtcbiAgfVxuICByZW5kZXJIZWFkaW5nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5Rm9yZWNhc3QpO1xuICBnZXREYXRlVGltZShjdXJyZW50Q2l0eUZvcmVjYXN0KTtcbiAgcmVuZGVyV2VhdGhlckljb24oY3VycmVudENpdHlXZWF0aGVyKTtcbiAgcmVuZGVyQ3VycmVudFdlYXRoZXIoY3VycmVudENpdHlXZWF0aGVyLCBtZXRyaWMpO1xuICByZW5kZXJEYWlseUZvcmVjYXN0KGN1cnJlbnRDaXR5Rm9yZWNhc3QsIG1ldHJpYyk7XG59KTtcblxuZm9yZWNhc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgLy8gdG9nZ2xlIGRhaWx5IC8gaG91cmx5IGZvcmVjYXN0XG4gIGlmIChkYWlseUZvcmVjYXN0KSB7XG4gICAgcmVuZGVySG91cmx5Rm9yZWNhc3QoY3VycmVudENpdHlGb3JlY2FzdCwgbWV0cmljKTtcbiAgICBmb3JlY2FzdEJ0bi50ZXh0Q29udGVudCA9IFwiRGFpbHlcIjtcbiAgICBkYWlseUZvcmVjYXN0ID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmVuZGVyRGFpbHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpO1xuICAgIGZvcmVjYXN0QnRuLnRleHRDb250ZW50ID0gXCJIb3VybHlcIjtcbiAgICBkYWlseUZvcmVjYXN0ID0gdHJ1ZTtcbiAgfVxufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gIC8vIGxvYWQgZGVmYXVsdCBjaXR5LCBuZWVkIHRvIHVwZGF0ZSB0byBnZXRHZW9Mb2NhdGlvbigpIHRvIHV0aWxpc2UgdXNlciBsb2NhdGlvblxuICBhd2FpdCB1cGRhdGVCYWNrZ3JvdW5kKGN1cnJlbnRDaXR5KTtcbiAgaWYgKG1ldHJpYykge1xuICAgIGN1cnJlbnRDaXR5V2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoY3VycmVudENpdHkpO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRDaXR5V2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXJGYWhyZW5oZWl0KGN1cnJlbnRDaXR5KTtcbiAgfVxuICBhd2FpdCBjb25zb2xlLmxvZyhjdXJyZW50Q2l0eVdlYXRoZXIpO1xuICBsZXQgbGF0ID0gYXdhaXQgY3VycmVudENpdHlXZWF0aGVyLmNvb3JkLmxhdDtcbiAgbGV0IGxvbiA9IGF3YWl0IGN1cnJlbnRDaXR5V2VhdGhlci5jb29yZC5sb247XG5cbiAgaWYgKG1ldHJpYykge1xuICAgIGN1cnJlbnRDaXR5Rm9yZWNhc3QgPSBhd2FpdCBnZXRGb3JlY2FzdChsYXQsIGxvbik7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudENpdHlGb3JlY2FzdCA9IGF3YWl0IGdldEZvcmVjYXN0RmFocmVuaGVpdChsYXQsIGxvbik7XG4gIH1cbiAgcmVuZGVySGVhZGluZyhjdXJyZW50Q2l0eVdlYXRoZXIpO1xuICBjb25zb2xlLmxvZyhjdXJyZW50Q2l0eUZvcmVjYXN0KTtcbiAgZ2V0RGF0ZVRpbWUoY3VycmVudENpdHlGb3JlY2FzdCk7XG4gIHJlbmRlcldlYXRoZXJJY29uKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIHJlbmRlckN1cnJlbnRXZWF0aGVyKGN1cnJlbnRDaXR5V2VhdGhlciwgbWV0cmljKTtcbiAgcmVuZGVyRGFpbHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=