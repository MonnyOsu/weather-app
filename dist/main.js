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

  if (dailyForecast) {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderDailyForecast)(currentCityForecast, metric);
  } else {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderHourlyForecast)(currentCityForecast, metric);
  }
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
  if (dailyForecast) {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderDailyForecast)(currentCityForecast, metric);
  } else {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderHourlyForecast)(currentCityForecast, metric);
  }
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
  if (dailyForecast) {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderDailyForecast)(currentCityForecast, metric);
  } else {
    (0,_domFunctions_js__WEBPACK_IMPORTED_MODULE_2__.renderHourlyForecast)(currentCityForecast, metric);
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG1FQUFnQjtBQUN4QjtBQUNBLCtCQUErQixnRUFBVTtBQUN6QyxJQUFJO0FBQ0osK0JBQStCLDBFQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxpRUFBVztBQUMzQyxJQUFJO0FBQ0osZ0NBQWdDLDJFQUFxQjtBQUNyRDtBQUNBLEVBQUUsK0RBQWE7QUFDZjtBQUNBLEVBQUUsNkRBQVc7QUFDYixFQUFFLG1FQUFpQjtBQUNuQixFQUFFLHNFQUFvQjtBQUN0QjtBQUNBLElBQUkscUVBQW1CO0FBQ3ZCLElBQUk7QUFDSixJQUFJLHNFQUFvQjtBQUN4QjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9iYWNrZ3JvdW5kRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RvbUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJhY2tncm91bmREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tncm91bmQtaW1hZ2VcIik7XG5jb25zdCBpbWFnZUNhcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlLWNhcHRpb25cIik7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUJhY2tncm91bmQoY3VycmVudENpdHkpIHtcbiAgbGV0IGltYWdlUmVxdWVzdCA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS51bnNwbGFzaC5jb20vc2VhcmNoL3Bob3Rvcz9wYWdlPTEmcXVlcnk9JHtjdXJyZW50Q2l0eX0mY2xpZW50X2lkPTlHLWJSOE1JUlBWWGJZWEFhSzF6TDVxQkp1UmI0WDQ5ajU3U01rN0UtSFkmb3JpZW50YXRpb249bGFuZHNjYXBlYFxuICApO1xuICBsZXQgaW1hZ2VSZXNwb25zZSA9IGF3YWl0IGltYWdlUmVxdWVzdC5qc29uKCk7XG4gIGxldCBpbWFnZUluZGV4ID0gcmFuZG9tTnVtKCk7XG4gIGxldCBpbWFnZVVybCA9IGF3YWl0IGltYWdlUmVzcG9uc2UucmVzdWx0c1tpbWFnZUluZGV4XS51cmxzLmZ1bGw7XG4gIGxldCBpbWFnZUNyZWRpdCA9XG4gICAgYXdhaXQgYCR7aW1hZ2VSZXNwb25zZS5yZXN1bHRzW2ltYWdlSW5kZXhdLnVzZXIuZmlyc3RfbmFtZX0gJHtpbWFnZVJlc3BvbnNlLnJlc3VsdHNbMF0udXNlci5sYXN0X25hbWV9YDtcbiAgaW1hZ2VDYXB0aW9uLmhyZWYgPSBpbWFnZVJlc3BvbnNlLnJlc3VsdHNbMF0ubGlua3MuaHRtbDtcbiAgaW1hZ2VDYXB0aW9uLnRleHRDb250ZW50ID0gYCR7aW1hZ2VDcmVkaXR9IC8gVW5zcGxhc2hgO1xuICBiYWNrZ3JvdW5kRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWFnZVVybH0pYDtcbn1cblxuZnVuY3Rpb24gcmFuZG9tTnVtKCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xufVxuIiwiY29uc3QgY2l0eUhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktaGVhZGluZ1wiKTtcbmNvbnN0IGNpdHlUaW1lRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZS1kYXRlXCIpO1xuY29uc3QgY3VycmVudFdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXdlYXRoZXItaWNvblwiKTtcbmNvbnN0IHdlYXRoZXJUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXRleHRcIik7XG5jb25zdCB3ZWF0aGVyVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci10ZW1wXCIpO1xuY29uc3Qgd2VhdGhlckZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC10aWxlc1wiKTtcblxuZnVuY3Rpb24gcmVuZGVySGVhZGluZyhjdXJyZW50Q2l0eVdlYXRoZXIpIHtcbiAgY2l0eUhlYWRpbmcudGV4dENvbnRlbnQgPSBjdXJyZW50Q2l0eVdlYXRoZXIubmFtZTtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZVRpbWUoY3VycmVudENpdHlGb3JlY2FzdCkge1xuICBjaXR5VGltZURhdGUudGV4dENvbnRlbnQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKFwiZW4tR0JcIiwge1xuICAgIHRpbWVab25lOiBjdXJyZW50Q2l0eUZvcmVjYXN0LnRpbWV6b25lLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyV2VhdGhlckljb24oY3VycmVudENpdHlXZWF0aGVyKSB7XG4gIC8vIHNlbGVjdCBpY29uIGJhc2VkIG9uIHdlYXRoZXIgQVBJIGlkXG4gIGlmIChcbiAgICBjdXJyZW50Q2l0eVdlYXRoZXIud2VhdGhlclswXS5pZCA+PSAyMDAgJiZcbiAgICBjdXJyZW50Q2l0eVdlYXRoZXIud2VhdGhlclswXS5pZCA8PSAyMzJcbiAgKSB7XG4gICAgY3VycmVudFdlYXRoZXJJY29uLnNyYyA9IFwiLi4vc3JjL2ljb25zL2hlYXZ5LXJhaW4ucG5nXCI7XG4gIH0gZWxzZSBpZiAoXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPj0gMzAwICYmXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPD0gMzIxXG4gICkge1xuICAgIGN1cnJlbnRXZWF0aGVySWNvbi5zcmMgPSBcIi4uL3NyYy9pY29ucy9saWdodC1yYWluLnBuZ1wiO1xuICB9IGVsc2UgaWYgKFxuICAgIGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkID49IDUwMCAmJlxuICAgIGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkIDw9IDUzMVxuICApIHtcbiAgICBjdXJyZW50V2VhdGhlckljb24uc3JjID0gXCIuLi9zcmMvaWNvbnMvcmFpbi5wbmdcIjtcbiAgfSBlbHNlIGlmIChcbiAgICBjdXJyZW50Q2l0eVdlYXRoZXIud2VhdGhlclswXS5pZCA+PSA2MDAgJiZcbiAgICBjdXJyZW50Q2l0eVdlYXRoZXIud2VhdGhlclswXS5pZCA8PSA2MjJcbiAgKSB7XG4gICAgY3VycmVudFdlYXRoZXJJY29uLnNyYyA9IFwiLi4vc3JjL2ljb25zL3Nub3cucG5nXCI7XG4gIH0gZWxzZSBpZiAoXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPj0gNzAwICYmXG4gICAgY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPD0gNzgxXG4gICkge1xuICAgIGN1cnJlbnRXZWF0aGVySWNvbi5zcmMgPSBcIi4uL3NyYy9pY29ucy9taXN0LnBuZ1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRDaXR5V2VhdGhlci53ZWF0aGVyWzBdLmlkID09PSA4MDApIHtcbiAgICBjdXJyZW50V2VhdGhlckljb24uc3JjID0gXCIuLi9zcmMvaWNvbnMvc3VubnkucG5nXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uaWQgPj0gODAxKSB7XG4gICAgY3VycmVudFdlYXRoZXJJY29uLnNyYyA9IFwiLi4vc3JjL2ljb25zL2Nsb3VkLnBuZ1wiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckN1cnJlbnRXZWF0aGVyKGN1cnJlbnRDaXR5V2VhdGhlciwgbWV0cmljKSB7XG4gIGxldCB3ZWF0aGVyID0gY3VycmVudENpdHlXZWF0aGVyLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gIHdlYXRoZXJUZXh0LnRleHRDb250ZW50ID0gd2VhdGhlci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdlYXRoZXIuc2xpY2UoMSk7XG4gIHdlYXRoZXJUZW1wLnRleHRDb250ZW50ID0gYCR7Y3VycmVudENpdHlXZWF0aGVyLm1haW4udGVtcC50b0ZpeGVkKCl9YDtcbiAgaWYgKG1ldHJpYykge1xuICAgIHdlYXRoZXJUZW1wLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWhyZW5oZWl0XCIpO1xuICAgIHdlYXRoZXJUZW1wLmNsYXNzTGlzdC5hZGQoXCJjZWxzaXVzXCIpO1xuICB9IGVsc2Uge1xuICAgIHdlYXRoZXJUZW1wLmNsYXNzTGlzdC5yZW1vdmUoXCJjZWxzaXVzXCIpO1xuICAgIHdlYXRoZXJUZW1wLmNsYXNzTGlzdC5hZGQoXCJmYWhyZW5oZWl0XCIpO1xuICB9XG4gIHdlYXRoZXJUZW1wLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRGFpbHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpIHtcbiAgY2xlYXJGb3JlY2FzdCgpO1xuXG4gIC8vY3JlYXRlIGFycmF5IG9mIGZvcmVjYXN0IG9iamVjdHMsIGFuZCBsb29wIHRocm91Z2ggZWFjaCB0byBjcmVhdGUgYSBmb3JlY2FzdCB0aWxlXG4gIGxldCBmb3JlY2FzdEFycmF5ID0gY3VycmVudENpdHlGb3JlY2FzdC5kYWlseTtcbiAgY29uc29sZS5sb2coZm9yZWNhc3RBcnJheSk7XG4gIGZvciAobGV0IGZvcmVjYXN0IG9mIGZvcmVjYXN0QXJyYXkuc2xpY2UoMSkpIHtcbiAgICBsZXQgZm9yZWNhc3RUaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsZXQgZm9yZWNhc3REYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbGV0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxldCBmb3JlY2FzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbGV0IGZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cbiAgICBsZXQgd2Vla2RheUluZGV4ID0gbmV3IERhdGUoZm9yZWNhc3QuZHQgKiAxMDAwKS5nZXREYXkoKTtcbiAgICBsZXQgd2Vla2RheSA9IGdldFVUQ1dlZWtkYXkod2Vla2RheUluZGV4KTtcbiAgICBmb3JlY2FzdERheS50ZXh0Q29udGVudCA9IHdlZWtkYXk7XG4gICAgZm9yZWNhc3REYXkuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWRheVwiKTtcbiAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3REYXkpO1xuXG4gICAgZm9yZWNhc3RJY29uLnNyYyA9IGdldEZvcmVjYXN0SWNvbihmb3JlY2FzdC53ZWF0aGVyWzBdLmlkKTtcbiAgICBmb3JlY2FzdEljb24uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWljb25cIik7XG4gICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0SWNvbik7XG5cbiAgICBmb3JlY2FzdFRlbXAudGV4dENvbnRlbnQgPSBmb3JlY2FzdC50ZW1wLmRheS50b0ZpeGVkKCk7XG4gICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC10ZW1wXCIpO1xuICAgIGlmIChtZXRyaWMpIHtcbiAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9yZWNhc3QtZmFocmVuaGVpdFwiKTtcbiAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtY2Vsc2l1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5yZW1vdmUoXCJmb3JlY2FzdC1jZWxzaXVzXCIpO1xuICAgICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1mYWhyZW5oZWl0XCIpO1xuICAgIH1cbiAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKTtcblxuICAgIGxldCBkYXlEZXNjcmlwdGlvbiA9IGZvcmVjYXN0LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgZm9yZWNhc3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9XG4gICAgICBkYXlEZXNjcmlwdGlvbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGRheURlc2NyaXB0aW9uLnNsaWNlKDEpO1xuICAgIGZvcmVjYXN0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWRlc2NyaXB0aW9uXCIpO1xuICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdERlc2NyaXB0aW9uKTtcblxuICAgIGZvcmVjYXN0VGlsZS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtdGlsZVwiKTtcbiAgICB3ZWF0aGVyRm9yZWNhc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJIb3VybHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpIHtcbiAgY2xlYXJGb3JlY2FzdCgpO1xuXG4gIC8vY3JlYXRlIGFycmF5IG9mIGZvcmVjYXN0IG9iamVjdHMsIGFuZCBsb29wIHRocm91Z2ggZWFjaCB0byBjcmVhdGUgYSBmb3JlY2FzdCB0aWxlXG4gIGxldCBmb3JlY2FzdEFycmF5ID0gY3VycmVudENpdHlGb3JlY2FzdC5ob3VybHk7XG4gIGNvbnNvbGUubG9nKGZvcmVjYXN0QXJyYXkpO1xuICBmb3IgKGxldCBmb3JlY2FzdCBvZiBmb3JlY2FzdEFycmF5LnNsaWNlKDEpKSB7XG4gICAgbGV0IGZvcmVjYXN0VGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGV0IGZvcmVjYXN0SG91ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBsZXQgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbGV0IGZvcmVjYXN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsZXQgZm9yZWNhc3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblxuICAgIGxldCB0aW1lID0gbmV3IERhdGUoZm9yZWNhc3QuZHQgKiAxMDAwKS5nZXRIb3VycygpO1xuICAgIGxldCB0aW1lQ29udmVydGVkID0gY29udmVydFRpbWUodGltZSk7XG4gICAgbGV0IHRpbWVTdHJpbmcgPSB0aW1lQ29udmVydGVkICsgZm9ybWF0SG91cnModGltZSk7XG4gICAgZm9yZWNhc3RIb3VyLnRleHRDb250ZW50ID0gdGltZVN0cmluZztcbiAgICBmb3JlY2FzdEhvdXIuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWhvdXJcIik7XG4gICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0SG91cik7XG5cbiAgICBmb3JlY2FzdEljb24uc3JjID0gZ2V0Rm9yZWNhc3RJY29uKGZvcmVjYXN0LndlYXRoZXJbMF0uaWQpO1xuICAgIGZvcmVjYXN0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtaWNvblwiKTtcbiAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJY29uKTtcblxuICAgIGZvcmVjYXN0VGVtcC50ZXh0Q29udGVudCA9IGZvcmVjYXN0LnRlbXAudG9GaXhlZCgpO1xuICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtdGVtcFwiKTtcbiAgICBpZiAobWV0cmljKSB7XG4gICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LnJlbW92ZShcImZvcmVjYXN0LWZhaHJlbmhlaXRcIik7XG4gICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWNlbHNpdXNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9yZWNhc3QtY2Vsc2l1c1wiKTtcbiAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtZmFocmVuaGVpdFwiKTtcbiAgICB9XG4gICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XG5cbiAgICBsZXQgaG91ckRlc2NyaXB0aW9uID0gZm9yZWNhc3Qud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICBmb3JlY2FzdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID1cbiAgICAgIGhvdXJEZXNjcmlwdGlvbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGhvdXJEZXNjcmlwdGlvbi5zbGljZSgxKTtcbiAgICBmb3JlY2FzdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1kZXNjcmlwdGlvblwiKTtcbiAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3REZXNjcmlwdGlvbik7XG5cbiAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LXRpbGVcIik7XG4gICAgd2VhdGhlckZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VVRDV2Vla2RheShudW0pIHtcbiAgc3dpdGNoIChudW0pIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gXCJTdW5kYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBcIk1vbmRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIFwiVHVlc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFwiV2VkbmVzZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCJUaHVyc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIFwiRnJpZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gXCJTYXR1cmRheVwiO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SG91cnMobnVtKSB7XG4gIGlmIChudW0gPj0gMCAmJiBudW0gPD0gMTEpIHtcbiAgICByZXR1cm4gXCI6MDBhbVwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIjowMHBtXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29udmVydFRpbWUodGltZSkge1xuICBpZiAodGltZSA+IDEyKSB7XG4gICAgdGltZSAtPSAxMjtcbiAgfSBlbHNlIGlmICh0aW1lID09PSAwKSB7XG4gICAgdGltZSA9IDA7XG4gIH1cbiAgcmV0dXJuIHRpbWU7XG59XG5cbmZ1bmN0aW9uIGdldEZvcmVjYXN0SWNvbihudW0pIHtcbiAgaWYgKG51bSA+PSAyMDAgJiYgbnVtIDw9IDIzMikge1xuICAgIHJldHVybiBcIi4uL3NyYy9pY29ucy9oZWF2eS1yYWluLnBuZ1wiO1xuICB9IGVsc2UgaWYgKG51bSA+PSAzMDAgJiYgbnVtIDw9IDMyMSkge1xuICAgIHJldHVybiBcIi4uL3NyYy9pY29ucy9saWdodC1yYWluLnBuZ1wiO1xuICB9IGVsc2UgaWYgKG51bSA+PSA1MDAgJiYgbnVtIDw9IDUzMSkge1xuICAgIHJldHVybiBcIi4uL3NyYy9pY29ucy9yYWluLnBuZ1wiO1xuICB9IGVsc2UgaWYgKG51bSA+PSA2MDAgJiYgbnVtIDw9IDYyMikge1xuICAgIHJldHVybiBcIi4uL3NyYy9pY29ucy9zbm93LnBuZ1wiO1xuICB9IGVsc2UgaWYgKG51bSA+PSA3MDAgJiYgbnVtIDw9IDc4MSkge1xuICAgIHJldHVybiBcIi4uL3NyYy9pY29ucy9taXN0LnBuZ1wiO1xuICB9IGVsc2UgaWYgKG51bSA9PT0gODAwKSB7XG4gICAgcmV0dXJuIFwiLi4vc3JjL2ljb25zL3N1bm55LnBuZ1wiO1xuICB9IGVsc2UgaWYgKG51bSA+PSA4MDEpIHtcbiAgICByZXR1cm4gXCIuLi9zcmMvaWNvbnMvY2xvdWQucG5nXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJGb3JlY2FzdCgpIHtcbiAgd2VhdGhlckZvcmVjYXN0LmlubmVySFRNTCA9IFwiXCI7XG59XG5cbmV4cG9ydCB7XG4gIHJlbmRlckhlYWRpbmcsXG4gIGdldERhdGVUaW1lLFxuICByZW5kZXJXZWF0aGVySWNvbixcbiAgcmVuZGVyQ3VycmVudFdlYXRoZXIsXG4gIHJlbmRlckRhaWx5Rm9yZWNhc3QsXG4gIHJlbmRlckhvdXJseUZvcmVjYXN0LFxufTtcbiIsIi8vIGJhc2ljIGFwaSBjYWxsIHRvIHNlYXJjaCB2aWEgY2l0eSBuYW1lLCB0aGVuIGZvcmNhc3QgYXBpIGNhbGwgdXNpbmcgY29vcmRpbmF0ZXMgZnJvbSBpbml0aWFsIGZldGNoLlxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGN1cnJlbnRDaXR5KSB7XG4gIGxldCB3ZWF0aGVyUmVxdWVzdCA9XG4gICAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjdXJyZW50Q2l0eX0mdW5pdHM9bWV0cmljJmFwcGlkPTcyY2Q2M2NkNGJmNmMyZGUxNmFiZThiYzY0M2E0ZTQyXG4gICAgYCk7XG4gIGxldCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCB3ZWF0aGVyUmVxdWVzdC5qc29uKCk7XG4gIGxldCBsb24gPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuY29vcmQubG9uO1xuICBsZXQgbGF0ID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmNvb3JkLmxhdDtcbiAgcmV0dXJuIGF3YWl0IHdlYXRoZXJSZXNwb25zZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobGF0LCBsb24pIHtcbiAgbGV0IGZvcmVjYXN0UmVxdWVzdCA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sb249JHtsb259JmxhdD0ke2xhdH0mdW5pdHM9bWV0cmljJmV4Y2x1ZGU9bWludXRlbHkmYXBwaWQ9NzJjZDYzY2Q0YmY2YzJkZTE2YWJlOGJjNjQzYTRlNDJgXG4gICk7XG4gIGxldCBmb3JlY2FzdFJlc3BvbnNlID0gYXdhaXQgZm9yZWNhc3RSZXF1ZXN0Lmpzb24oKTtcbiAgcmV0dXJuIGF3YWl0IGZvcmVjYXN0UmVzcG9uc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJGYWhyZW5oZWl0KGN1cnJlbnRDaXR5KSB7XG4gIGxldCB3ZWF0aGVyUmVxdWVzdCA9XG4gICAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjdXJyZW50Q2l0eX0mdW5pdHM9aW1wZXJpYWwmYXBwaWQ9NzJjZDYzY2Q0YmY2YzJkZTE2YWJlOGJjNjQzYTRlNDJcbiAgICAgIGApO1xuICBsZXQgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgd2VhdGhlclJlcXVlc3QuanNvbigpO1xuICBsZXQgbG9uID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmNvb3JkLmxvbjtcbiAgbGV0IGxhdCA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5jb29yZC5sYXQ7XG4gIHJldHVybiBhd2FpdCB3ZWF0aGVyUmVzcG9uc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0RmFocmVuaGVpdChsYXQsIGxvbikge1xuICBsZXQgZm9yZWNhc3RSZXF1ZXN0ID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xvbj0ke2xvbn0mbGF0PSR7bGF0fSZleGNsdWRlPW1pbnV0ZWx5JnVuaXRzPWltcGVyaWFsJmFwcGlkPTcyY2Q2M2NkNGJmNmMyZGUxNmFiZThiYzY0M2E0ZTQyYFxuICApO1xuICBsZXQgZm9yZWNhc3RSZXNwb25zZSA9IGF3YWl0IGZvcmVjYXN0UmVxdWVzdC5qc29uKCk7XG4gIHJldHVybiBhd2FpdCBmb3JlY2FzdFJlc3BvbnNlO1xufVxuIFxuZXhwb3J0IHsgZ2V0V2VhdGhlciwgZ2V0Rm9yZWNhc3QsIGdldFdlYXRoZXJGYWhyZW5oZWl0LCBnZXRGb3JlY2FzdEZhaHJlbmhlaXQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHVwZGF0ZUJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZEZ1bmN0aW9ucy5qc1wiO1xuaW1wb3J0IHtcbiAgZ2V0V2VhdGhlcixcbiAgZ2V0Rm9yZWNhc3QsXG4gIGdldFdlYXRoZXJGYWhyZW5oZWl0LFxuICBnZXRGb3JlY2FzdEZhaHJlbmhlaXQsXG59IGZyb20gXCIuL3dlYXRoZXJGdW5jdGlvbnMuanNcIjtcbmltcG9ydCB7XG4gIHJlbmRlckhlYWRpbmcsXG4gIGdldERhdGVUaW1lLFxuICByZW5kZXJXZWF0aGVySWNvbixcbiAgcmVuZGVyQ3VycmVudFdlYXRoZXIsXG4gIHJlbmRlckRhaWx5Rm9yZWNhc3QsXG4gIHJlbmRlckhvdXJseUZvcmVjYXN0LFxufSBmcm9tIFwiLi9kb21GdW5jdGlvbnMuanNcIjtcblxuY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jaXR5LWZvcm1dXCIpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2VhcmNoLWlucHV0XVwiKTtcbmNvbnN0IGZvcmVjYXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1idG5cIik7XG5jb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51bml0c1wiKTtcblxubGV0IGN1cnJlbnRDaXR5ID0gXCJXZWxsaW5ndG9uXCI7XG5sZXQgY3VycmVudENpdHlXZWF0aGVyO1xubGV0IGN1cnJlbnRDaXR5Rm9yZWNhc3Q7XG5sZXQgZGFpbHlGb3JlY2FzdCA9IHRydWU7XG5sZXQgbWV0cmljID0gdHJ1ZTtcblxuc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY3VycmVudENpdHkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xuICBhd2FpdCB1cGRhdGVCYWNrZ3JvdW5kKGN1cnJlbnRDaXR5KTtcblxuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihjdXJyZW50Q2l0eSk7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlckZhaHJlbmhlaXQoY3VycmVudENpdHkpO1xuICB9XG4gIGF3YWl0IGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGxldCBsYXQgPSBhd2FpdCBjdXJyZW50Q2l0eVdlYXRoZXIuY29vcmQubGF0O1xuICBsZXQgbG9uID0gYXdhaXQgY3VycmVudENpdHlXZWF0aGVyLmNvb3JkLmxvbjtcblxuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlGb3JlY2FzdCA9IGF3YWl0IGdldEZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50Q2l0eUZvcmVjYXN0ID0gYXdhaXQgZ2V0Rm9yZWNhc3RGYWhyZW5oZWl0KGxhdCwgbG9uKTtcbiAgfVxuICByZW5kZXJIZWFkaW5nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5Rm9yZWNhc3QpO1xuICBnZXREYXRlVGltZShjdXJyZW50Q2l0eUZvcmVjYXN0KTtcbiAgcmVuZGVyV2VhdGhlckljb24oY3VycmVudENpdHlXZWF0aGVyKTtcbiAgcmVuZGVyQ3VycmVudFdlYXRoZXIoY3VycmVudENpdHlXZWF0aGVyLCBtZXRyaWMpO1xuXG4gIGlmIChkYWlseUZvcmVjYXN0KSB7XG4gICAgcmVuZGVyRGFpbHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpO1xuICB9IGVsc2Uge1xuICAgIHJlbmRlckhvdXJseUZvcmVjYXN0KGN1cnJlbnRDaXR5Rm9yZWNhc3QsIG1ldHJpYyk7XG4gIH1cbn0pO1xuXG51bml0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gIC8vIGNoYW5nZSB1bml0XG4gIGlmIChtZXRyaWMpIHtcbiAgICBtZXRyaWMgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBtZXRyaWMgPSB0cnVlO1xuICB9XG4gIC8vIGNhbGwgYmFzZWQgb24gdW5pdFxuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihjdXJyZW50Q2l0eSk7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlckZhaHJlbmhlaXQoY3VycmVudENpdHkpO1xuICB9XG4gIGF3YWl0IGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGxldCBsYXQgPSBhd2FpdCBjdXJyZW50Q2l0eVdlYXRoZXIuY29vcmQubGF0O1xuICBsZXQgbG9uID0gYXdhaXQgY3VycmVudENpdHlXZWF0aGVyLmNvb3JkLmxvbjtcbiAgLy8gY2FsbCBmb3JlY2FzdCBiYXNlZCBvbiB1bml0XG4gIGlmIChtZXRyaWMpIHtcbiAgICBjdXJyZW50Q2l0eUZvcmVjYXN0ID0gYXdhaXQgZ2V0Rm9yZWNhc3QobGF0LCBsb24pO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRDaXR5Rm9yZWNhc3QgPSBhd2FpdCBnZXRGb3JlY2FzdEZhaHJlbmhlaXQobGF0LCBsb24pO1xuICB9XG4gIHJlbmRlckhlYWRpbmcoY3VycmVudENpdHlXZWF0aGVyKTtcbiAgY29uc29sZS5sb2coY3VycmVudENpdHlGb3JlY2FzdCk7XG4gIGdldERhdGVUaW1lKGN1cnJlbnRDaXR5Rm9yZWNhc3QpO1xuICByZW5kZXJXZWF0aGVySWNvbihjdXJyZW50Q2l0eVdlYXRoZXIpO1xuICByZW5kZXJDdXJyZW50V2VhdGhlcihjdXJyZW50Q2l0eVdlYXRoZXIsIG1ldHJpYyk7XG4gIGlmIChkYWlseUZvcmVjYXN0KSB7XG4gICAgcmVuZGVyRGFpbHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpO1xuICB9IGVsc2Uge1xuICAgIHJlbmRlckhvdXJseUZvcmVjYXN0KGN1cnJlbnRDaXR5Rm9yZWNhc3QsIG1ldHJpYyk7XG4gIH1cbn0pO1xuXG5mb3JlY2FzdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAvLyB0b2dnbGUgZGFpbHkgLyBob3VybHkgZm9yZWNhc3RcbiAgaWYgKGRhaWx5Rm9yZWNhc3QpIHtcbiAgICByZW5kZXJIb3VybHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpO1xuICAgIGZvcmVjYXN0QnRuLnRleHRDb250ZW50ID0gXCJEYWlseVwiO1xuICAgIGRhaWx5Rm9yZWNhc3QgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZW5kZXJEYWlseUZvcmVjYXN0KGN1cnJlbnRDaXR5Rm9yZWNhc3QsIG1ldHJpYyk7XG4gICAgZm9yZWNhc3RCdG4udGV4dENvbnRlbnQgPSBcIkhvdXJseVwiO1xuICAgIGRhaWx5Rm9yZWNhc3QgPSB0cnVlO1xuICB9XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgLy8gbG9hZCBkZWZhdWx0IGNpdHksIG5lZWQgdG8gdXBkYXRlIHRvIGdldEdlb0xvY2F0aW9uKCkgdG8gdXRpbGlzZSB1c2VyIGxvY2F0aW9uXG4gIGF3YWl0IHVwZGF0ZUJhY2tncm91bmQoY3VycmVudENpdHkpO1xuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihjdXJyZW50Q2l0eSk7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudENpdHlXZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlckZhaHJlbmhlaXQoY3VycmVudENpdHkpO1xuICB9XG4gIGF3YWl0IGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGxldCBsYXQgPSBhd2FpdCBjdXJyZW50Q2l0eVdlYXRoZXIuY29vcmQubGF0O1xuICBsZXQgbG9uID0gYXdhaXQgY3VycmVudENpdHlXZWF0aGVyLmNvb3JkLmxvbjtcblxuICBpZiAobWV0cmljKSB7XG4gICAgY3VycmVudENpdHlGb3JlY2FzdCA9IGF3YWl0IGdldEZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50Q2l0eUZvcmVjYXN0ID0gYXdhaXQgZ2V0Rm9yZWNhc3RGYWhyZW5oZWl0KGxhdCwgbG9uKTtcbiAgfVxuICByZW5kZXJIZWFkaW5nKGN1cnJlbnRDaXR5V2VhdGhlcik7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRDaXR5Rm9yZWNhc3QpO1xuICBnZXREYXRlVGltZShjdXJyZW50Q2l0eUZvcmVjYXN0KTtcbiAgcmVuZGVyV2VhdGhlckljb24oY3VycmVudENpdHlXZWF0aGVyKTtcbiAgcmVuZGVyQ3VycmVudFdlYXRoZXIoY3VycmVudENpdHlXZWF0aGVyLCBtZXRyaWMpO1xuICBpZiAoZGFpbHlGb3JlY2FzdCkge1xuICAgIHJlbmRlckRhaWx5Rm9yZWNhc3QoY3VycmVudENpdHlGb3JlY2FzdCwgbWV0cmljKTtcbiAgfSBlbHNlIHtcbiAgICByZW5kZXJIb3VybHlGb3JlY2FzdChjdXJyZW50Q2l0eUZvcmVjYXN0LCBtZXRyaWMpO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==