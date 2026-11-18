// js/api.js

// Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual free key from OpenWeatherMap
const OPENWEATHER_API_KEY = "45d131d07871269b62624984aae9705a";

/**
 * Fetches dependent data across two chained APIs using pure Promises (.then / .catch).
 * @param {string} cityName - The location to search for (defaults to "Orlando")
 * @returns {Promise<Object>} Combined dataset from both API responses
 */
export function fetchChainedData(cityName = "Orlando") {
  // ------------------------------------------------------------------
  // API #1: Open-Meteo Geocoding API (NO AUTH REQUIRED)
  // Converts city name into dynamic latitude & longitude coordinates.
  // ------------------------------------------------------------------
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

  return fetch(geoUrl)
    .then((response) => {
      // Check for network or HTTP errors from API #1
      if (!response.ok) {
        throw new Error(`Geocoding API failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((geoData) => {
      // Validate that API #1 actually returned matching results
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Location "${cityName}" could not be found.`);
      }

      // Extract dependent variables from API #1 response
      const { latitude, longitude, name, admin1, country } = geoData.results[0];

      // ------------------------------------------------------------------
      // API #2: OpenWeatherMap Current Weather API (REQUIRES AUTH / API KEY)
      // Uses the dependent lat/lon from API #1 along with your authentication key.
      // ------------------------------------------------------------------
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=imperial`;

      return fetch(weatherUrl)
        .then((response) => {
          // Check for network or HTTP errors from API #2 (e.g. invalid API key)
          if (!response.ok) {
            throw new Error(`Weather API failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((weatherData) => {
          // ------------------------------------------------------------------
          // COMBINE DATA & RETURN
          // Packages outputs from both APIs into one object for main.js to render
          // ------------------------------------------------------------------
          return {
            location: {
              city: name,
              region: admin1,
              country: country,
              lat: latitude,
              lon: longitude
            },
            weather: {
              temp: Math.round(weatherData.main.temp),
              feelsLike: Math.round(weatherData.main.feels_like),
              humidity: weatherData.main.humidity,
              description: weatherData.weather[0].description,
              icon: weatherData.weather[0].icon
            }
          };
        });
    })
    .catch((error) => {
      // Log for debugging and re-throw so main.js triggers the UI empty/error state
      console.error("Error inside API promise chain:", error);
      throw error;
    });
}