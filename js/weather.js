const latitude = 31.2304;
const longitude = 121.4737;
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&lang=en`;

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Weather data:", data);

    const weatherinformation = document.getElementById("weather-information");
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
      data.current_weather.weathercode;
  })

  .catch((error) => {
    console.error("Failed to fetch weather data:", error);
  });
