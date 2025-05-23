const apiKey = "eda5ba3f6201dc6f898e8eae7a88b205";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather-image i");

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

const weather = document.querySelector(".weather");
const error = document.querySelector(".error");






async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        error.style.display = "block";
        weather.style.display = "none";
    }

    const data = await response.json();
    console.log(data,"data");
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clear"){
    weatherIcon.className = "fa-solid fa-sun";
}else if(data.weather[0].main == "Rain"){
    weatherIcon.className = "fa-solid fa-cloud-rain";
}else if(data.weather[0].main == "Mist"){
    weatherIcon.className = "fa-solid fa-cloud-mist";
}else if(data.weather[0].main == "Drizzle"){
    weatherIcon.className = "fa-solid fa-cloud-drizzle";
}

weather.style.display = "block";
error.style.display = "none";

}



searchButton.addEventListener("click", () =>{
    checkWeather(searchInput.value);
    searchInput.value = "";
});


searchInput.addEventListener("keydown", (e) =>{
    if (e.keyCode === 13) {
       checkWeather(searchInput.value);
       searchInput.value = ""; 
    }
    
});
