const apiKey = "babf0095636044c3a0675714262705";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");

const lat = document.getElementById("lat");
const lon = document.getElementById("lon");

const weather = document.getElementById("weather");

const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");

const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");

const clouds = document.getElementById("clouds");
const wind = document.getElementById("wind");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();

  if (cityName === "") {
    alert("Please enter a city name");
    return;
  }

  getWeather(cityName);
});

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const cityName = cityInput.value.trim();

    if (cityName === "") {
      alert("Please enter a city name");
      return;
    }

    getWeather(cityName);
  }
});

async function getWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=yes`,
    );

    const data = await response.json();

    console.log(data);

    if (data.error) {
      alert(data.error.message);
      return;
    }

    city.innerText = `${data.location.name}, ${data.location.country}`;

    lat.innerText = data.location.lat;

    lon.innerText = data.location.lon;

    weather.innerText = data.current.condition.text;

    temp.innerText = data.current.temp_c;

    feelsLike.innerText = data.current.feelslike_c;

    humidity.innerText = data.current.humidity;

    pressure.innerText = data.current.pressure_mb;

    clouds.innerText = data.current.cloud;

    wind.innerText = data.current.wind_kph;

    sunrise.innerText = "N/A";

    sunset.innerText = "N/A";

    changeBackground(data.current.condition.text);
  } catch (error) {
    console.log(error);

    alert("Something went wrong");
  }
}

function changeBackground(weatherType) {
  if (weatherType.includes("Sunny") || weatherType.includes("Clear")) {
    document.body.style.background =
      "linear-gradient(135deg, #0f172a, #1e3a8a, #0f172a)";
  } else if (weatherType.includes("Cloud")) {
    document.body.style.background =
      "linear-gradient(135deg, #374151, #6b7280, #111827)";
  } else if (weatherType.includes("Rain")) {
    document.body.style.background =
      "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #111827, #1f2937, #111827)";
  }
}
