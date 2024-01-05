let currentLocationName = "La Plata";

async function getData(userLocation) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ad7fa77616244e869a1110828231412&q=${userLocation}&aqi=no`,
    { mode: "cors" }
  );
  const locationData = await response.json();
  const processedData = processData(locationData);
  displayData(processedData);
}

function processData(locationData) {
  locationData = {
    name: locationData.location.name,
    region: locationData.location.region,
    tempC: locationData.current.temp_c,
    feelsLikeC: locationData.current.feelslike_c,
    feelsLikeF: locationData.current.feelslike_f,
    tempF: locationData.current.temp_f,
    chanceOfRain: locationData.current.precip_mm,
    condition: locationData.current.condition.text,
  };
  return locationData;
}

function newLocation() {
  let userLocation = "La Plata";
  getData(userLocation);
}

function displayData(data) {
  console.log(data);
}

newLocation();
