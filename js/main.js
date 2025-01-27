
document.addEventListener("DOMContentLoaded", () => {
const apiKey = '8d59e44650c1bf22a077766b67381e3e'
const searchBtn = document.getElementById("searchBtn");
const cityInp = document.getElementById("cityInp");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");


  // Ensure all elements exist before proceeding
  if (!searchBtn || !cityInp || !cityName || !temp || !humidity || !wind || !weatherIcon) {
    alert("Some elements are missing in the DOM. Check your HTML structure.");
    return;
  }

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = cityInp.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  getWeatherByCity(city);
  cityInp.value = ''

});

// Get weather by city name
function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetchWeather(url);
}

getWeatherByCity('Bangladesh')

// Get weather by user's location
function getWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetchWeather(url);
}

// Fetch weather data and update the UI
function fetchWeather(url) {

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        cityInp.value = ''
        throw new Error("Weather data not found.");

      }
      return response.json();
    })
    .then((data) => {
      cityName.innerText = `${data.name}`;
      temp.innerText = Math.round(data.main.temp) + '°c';
      humidity.innerText = `${data.main.humidity}%`;
      wind.innerText = `${data.wind.speed}km/h`;

      if(data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'img/clounds.png'
      }
      else if(data.weather[0].main == 'Clear') {
        weatherIcon.src = 'img/clear.png'
      }
      else if(data.weather[0].main == 'Rain') {
        weatherIcon.src = 'img/rain.png'
      }
      else if(data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'img/drizzle.png'
      }
      else if(data.weather[0].main == 'Mist') {
        weatherIcon.src = 'img/mist.png'
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Get user's location using Geolocation API
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      },
      (error) => {
        alert("Unable to retrieve location. Please try searching manually.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

  // Fetch weather based on user's location when the page loads
  getUserLocation();
});



