import { fetchChainedData } from './API.js';

(function () {
  // Complex selectors / Querying DOM elements
  const weatherContainer = document.querySelector("#weather-section #weather-content");
  const nasaContainer = document.querySelector("#nasa-section #nasa-content");
  const refreshBtn = document.querySelector("#nasa-section #refresh-btn");

  // Reusable function to fetch and display data
  function loadData(forceRefresh = false) {
    // Empty state reset
    weatherContainer.textContent = "Loading weather data...";
    nasaContainer.textContent = "Loading NASA picture...";

    const cachedData = localStorage.getItem("app_api_data");

    // Check localStorage to limit API requests if not forcing refresh
    if (cachedData && !forceRefresh) {
      const parsedData = JSON.parse(cachedData);
      renderUI(parsedData);
      return;
    }

    // Access chained API module
    fetchChainedData()
      .then((data) => {
        // Save response to localStorage
        localStorage.setItem("app_api_data", JSON.stringify(data));
        renderUI(data);
      })
      .catch((err) => {
        // UI Error Handling for rejected promises
        weatherContainer.textContent = "Failed to load weather data.";
        nasaContainer.textContent = "Failed to load NASA picture.";
      });
  }

  // Helper function to create HTML elements dynamically
  function renderUI(data) {
    // Clear initial/empty state text
    weatherContainer.textContent = "";
    nasaContainer.textContent = "";

    // 1. Build Weather DOM Elements
    const tempP = document.createElement("p");
    tempP.textContent = `Temperature: ${data.weather.temperature}°C`;

    const windP = document.createElement("p");
    windP.textContent = `Wind Speed: ${data.weather.windspeed} km/h`;

    weatherContainer.appendChild(tempP);
    weatherContainer.appendChild(windP);

    // 2. Build NASA DOM Elements
    const title = document.createElement("h3");
    title.textContent = data.nasa.title;

    const img = document.createElement("img");
    img.src = data.nasa.url;
    img.alt = data.nasa.title;

    const explanation = document.createElement("p");
    explanation.textContent = data.nasa.explanation;

    nasaContainer.appendChild(title);
    nasaContainer.appendChild(img);
    nasaContainer.appendChild(explanation);
  }

  // Button Click Event listener
  refreshBtn.addEventListener("click", () => {
    loadData(true);
  });

  // Initial Load when page finishes loading
  loadData();
})();