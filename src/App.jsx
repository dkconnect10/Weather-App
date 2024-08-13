import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'e5d879c6f4cf1b8f19d3c7ad70725d53';

  const fetchWeatherData = async () => {
    setIsLoading(true); // Set isLoading to true before fetching data
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false); // Set isLoading to false after fetching data, whether successful or not
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    // ... your icon logic
  };

  return (
    <div className="App">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p> // Display a loading indicator while fetching data
        ) : error ? (
          <p>{error}</p>
        ) : weatherData ? (
          <>
            {/* ... your weather data display */}
          </>
        ) : null}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit">Get</button>
        </form>
      </div>
    </div>
  );
}

export default App;
