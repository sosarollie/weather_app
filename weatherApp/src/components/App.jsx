import { useState } from "react";

export const App = () => {
  const API_KEY = "ad7fa77616244e869a1110828231412";

  const [city, setCity] = useState("La Plata");
  const [cityData, setCityData] = useState(null);
  const [temp, setTemp] = useState("");

  const handleChangeToF = () => {
    setTemp(parseInt(cityData.current.temp_f));
  };

  const handleChangeToC = () => {
    setTemp(parseInt(cityData.current.temp_c));
  };

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
      setTemp(data.current.temp_c);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleNewCity}></input>
        <button type="submit">search</button>
      </form>
      {cityData && (
        <div>
          <h1>{cityData.location.name}</h1>
          <h1>{temp}</h1>
          <button type="button" onClick={handleChangeToC}>
            °C
          </button>
          <button type="button" onClick={handleChangeToF}>
            °F
          </button>
        </div>
      )}
    </div>
  );
};
