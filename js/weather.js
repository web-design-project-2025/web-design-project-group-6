/* Define the geographical coordinates (latitude and longitude) of Shanghai to request data from the weather API */
const latitude = 31.2304;
const longitude = 121.4737;
/* Construct the API request URL to call Open-Meteo API for real-time weather data */
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&lang=en`;

/* This 'weathercodemap' is an integer representing current weather conditions,following WMO weather phenomena standards */
const weatherCodeMap = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Freezing Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Light Rain Shower",
  81: "Rain Shower",
  82: "Heavy Rain Shower",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Heavy Hailstorm",
};

/* Use Fetch API to send an HTTP request  */
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Weather data:", data);

    /* Get the HTML element that will display the weather information */
    const weatherinformation = document.getElementById("weather-information");
    const weatherDetails =
      weatherCodeMap[data.current_weather.weathercode] || "Unknown";

    /*Dynamically generate the weather information HTML string (temperature, wind speed, wind direction, etc.) and insert it into the page */
    weatherinformation.innerHTML =
      "<strong>📍 Shanghai</strong> &nbsp;|&nbsp; " +
      "<strong>🌡 Temperature:</strong> " +
      data.current_weather.temperature +
      "°C &nbsp;|&nbsp; " +
      "<strong>💨 Wind:</strong> " +
      data.current_weather.windspeed +
      " km/h &nbsp;|&nbsp; " +
      "<strong>🧭 Direction:</strong> " +
      data.current_weather.winddirection +
      "° &nbsp;|&nbsp; " +
      "<strong>☁️ Code:</strong> " +
      data.current_weather.weathercode +
      " (" +
      weatherDetails +
      ")";
  })

  /* If the request fails (e.g., network error or API unavailable), log the error in the console */
  .catch((error) => {
    console.error("Failed to fetch weather data:", error);
  });
