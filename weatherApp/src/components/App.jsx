import { useState } from "react";

export const App = () => {
  const API_KEY = "ad7fa77616244e869a1110828231412";

  const [city, setCity] = useState("La Plata");
  const [cityData, setCityData] = useState(null);

  const handleNewCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.length > 0) {
      handleFetch();
    }
  };

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
      console.log(data);
      setCityData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleNewCity}></input>
        <button type="submit"></button>
      </form>
      {cityData && (
        <div>
          <h1>{cityData.location.name}</h1>
          <h1>{parseInt(cityData.current.temp_c)}</h1>
        </div>
      )}
    </div>
  );
};
