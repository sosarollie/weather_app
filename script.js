let currentLocation = "Pehuajo";

async function getWeather() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ad7fa77616244e869a1110828231412&q=${currentLocation}&aqi=no`,
    { mode: "cors" }
  );
  const locationData = await response.json();
  console.log(locationData.current.temp_c);
  console.log(locationData.location.name);
}
getWeather();
