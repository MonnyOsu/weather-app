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
 
export { getWeather, getForecast, getWeatherFahrenheit, getForecastFahrenheit };
