const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Shanghai&appid=0cc690bc2da2c8ac85cf8d4141253531&units=metric&lang=en";

fetch(url);

/*
  .then((response) => response.json())
  .then((data) => {
    console.log("Weather data:", data);
    document.getElementById(
      "weather-information"
    ).textContent = `Location: ${data.name}, ${data.sys.country}
     Temp: ${data.main.temp}°C
     Weather: ${data.weather[0].description}`;
  })
  .catch((error) => {
    console.error("Failed to fetch weather data:", error);
  });
*/
