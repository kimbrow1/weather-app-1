'use strict';

const apiKey = "3fa03a84bcbee6ee40906d4f6d74b43b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
   const weatherIcon = document.querySelector(".weather-icon");

async function weatherData(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
        } if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else { 
              let data = await response.json();


        document.querySelector(".city").innerHTML = data.name ?? "Not available";
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        
        if (data.weather[0].main === "Clouds") {
         weatherIcon.src = "Images /clouds.png";
        } else if(data.weather[0].main === "Drizzle") { 
            weatherIcon.src = "Images /drizzle.png"
        
        } else if (data.weather[0].main === "Rain") { 
            weatherIcon.src = "Images/rain.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "Images/mist.png";
        }

        document.querySelector(".weather").style.display ="block";
        document.querySelector(".error").style.display = "none";

        }
      
        
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        // Handle error case - maybe update the UI to show an error message
    }
};

searchBtn.addEventListener("click", () => {
    weatherData(searchBox.value);
});

