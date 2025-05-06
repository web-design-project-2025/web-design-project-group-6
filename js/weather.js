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
      "<strong>Location:</strong> Shanghai<br>" +
      "<strong>Temperature:</strong> " +
      data.current_weather.temperature +
      "°C<br>" +
      "<strong>Wind Speed: </strong>" +
      data.current_weather.windspeed +
      " km/h<br>" +
      "<strong>Wind Direction:</strong> " +
      data.current_weather.winddirection +
      "°";
  })

  .catch((error) => {
    console.error("Failed to fetch weather data:", error);
  });
