import { useState } from "react";

let scale = "°C";
export const App = () => {
  const API_KEY = "ad7fa77616244e869a1110828231412";

  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState(null);
  const [temp, setTemp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeToF = () => {
    setTemp(parseInt(cityData.current.temp_f));
    scale = "°F";
  };

  const handleChangeToC = () => {
    setTemp(parseInt(cityData.current.temp_c));
    scale = "°C";
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
      setLoading(true);
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
      console.log(data);
      if (data.location.name) {
        setCityData(data);
        if (scale == "°C") {
          setTemp(data.current.temp_c);
        } else {
          setTemp(data.current.temp_f);
        }
      }
    } catch (error) {
      alert("City not found.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleNewCity}
          placeholder="Enter a city"
        ></input>
        <button type="submit">search</button>
        {loading ? (
          <svg
            height="50px"
            width="50px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#296161"
          >
            <circle cx="4" cy="12" r="3">
              <animate
                id="spinner_jObz"
                begin="0;spinner_vwSQ.end-0.25s"
                attributeName="r"
                dur="0.75s"
                values="3;.2;3"
              />
            </circle>
            <circle cx="12" cy="12" r="3">
              <animate
                begin="spinner_jObz.end-0.6s"
                attributeName="r"
                dur="0.75s"
                values="3;.2;3"
              />
            </circle>
            <circle cx="20" cy="12" r="3">
              <animate
                id="spinner_vwSQ"
                begin="spinner_jObz.end-0.45s"
                attributeName="r"
                dur="0.75s"
                values="3;.2;3"
              />
            </circle>
          </svg>
        ) : (
          ""
        )}
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
          <h3>{cityData.current.condition.text}</h3>
          <img src={"https:" + cityData.current.condition.icon}></img>{" "}
        </div>
      )}
    </div>
  );
};
