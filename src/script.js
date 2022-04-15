import updateBackground from "./backgroundFunctions.js";
import {
  getWeather,
  getForecast,
  getWeatherFahrenheit,
  getForecastFahrenheit,
} from "./weatherFunctions.js";
import {
  renderHeading,
  getDateTime,
  renderWeatherIcon,
  renderCurrentWeather,
  renderDailyForecast,
  renderHourlyForecast,
} from "./domFunctions.js";

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
  await updateBackground(currentCity);

  if (metric) {
    currentCityWeather = await getWeather(currentCity);
  } else {
    currentCityWeather = await getWeatherFahrenheit(currentCity);
  }
  await console.log(currentCityWeather);
  let lat = await currentCityWeather.coord.lat;
  let lon = await currentCityWeather.coord.lon;

  if (metric) {
    currentCityForecast = await getForecast(lat, lon);
  } else {
    currentCityForecast = await getForecastFahrenheit(lat, lon);
  }
  renderHeading(currentCityWeather);
  console.log(currentCityForecast);
  getDateTime(currentCityForecast);
  renderWeatherIcon(currentCityWeather);
  renderCurrentWeather(currentCityWeather, metric);

  if (dailyForecast) {
    renderDailyForecast(currentCityForecast, metric);
  } else {
    renderHourlyForecast(currentCityForecast, metric);
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
    currentCityWeather = await getWeather(currentCity);
  } else {
    currentCityWeather = await getWeatherFahrenheit(currentCity);
  }
  await console.log(currentCityWeather);
  let lat = await currentCityWeather.coord.lat;
  let lon = await currentCityWeather.coord.lon;
  // call forecast based on unit
  if (metric) {
    currentCityForecast = await getForecast(lat, lon);
  } else {
    currentCityForecast = await getForecastFahrenheit(lat, lon);
  }
  renderHeading(currentCityWeather);
  console.log(currentCityForecast);
  getDateTime(currentCityForecast);
  renderWeatherIcon(currentCityWeather);
  renderCurrentWeather(currentCityWeather, metric);
  if (dailyForecast) {
    renderDailyForecast(currentCityForecast, metric);
  } else {
    renderHourlyForecast(currentCityForecast, metric);
  }
});

forecastBtn.addEventListener("click", async () => {
  // toggle daily / hourly forecast
  if (dailyForecast) {
    renderHourlyForecast(currentCityForecast, metric);
    forecastBtn.textContent = "Daily";
    dailyForecast = false;
  } else {
    renderDailyForecast(currentCityForecast, metric);
    forecastBtn.textContent = "Hourly";
    dailyForecast = true;
  }
});

window.addEventListener("load", async () => {
  // load default city, need to update to getGeoLocation() to utilise user location
  await updateBackground(currentCity);
  if (metric) {
    currentCityWeather = await getWeather(currentCity);
  } else {
    currentCityWeather = await getWeatherFahrenheit(currentCity);
  }
  await console.log(currentCityWeather);
  let lat = await currentCityWeather.coord.lat;
  let lon = await currentCityWeather.coord.lon;

  if (metric) {
    currentCityForecast = await getForecast(lat, lon);
  } else {
    currentCityForecast = await getForecastFahrenheit(lat, lon);
  }
  renderHeading(currentCityWeather);
  console.log(currentCityForecast);
  getDateTime(currentCityForecast);
  renderWeatherIcon(currentCityWeather);
  renderCurrentWeather(currentCityWeather, metric);
  if (dailyForecast) {
    renderDailyForecast(currentCityForecast, metric);
  } else {
    renderHourlyForecast(currentCityForecast, metric);
  }
});
