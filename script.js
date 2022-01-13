
// Display current date and time
let currentDay = new Date();
let days = ["Sun.", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"];
let day= days[currentDay.getDay()];
let date= currentDay.getDate();
let months=["01","02", "03", "04", "05", "06","07","08","09","10","11","12"];
let month= months[currentDay.getMonth()];
let year= currentDay.getFullYear();
let hours=currentDay.getHours();
let minutes=currentDay.getMinutes();
let currentDate= document.querySelector("#current-date");
currentDate.innerHTML= `${day}, ${date}/${month}/${year}, ${hours}:${minutes} `;



// Search engine for city
function updateLocation(event){
  event.preventDefault();
  let searchedLocation= document.querySelector("#location-input");
    let location= document.querySelector("#city");
if (searchedLocation.value){
  location.innerHTML = searchedLocation.value;
    }
    else{
      alert("Please enter a city")
    }

    let apiKey = "a435b674eb1340ec80ef66e82aeb341b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation.value}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

let cityForm=document.querySelector("#location-form");
cityForm.addEventListener("submit", updateLocation);

// Display current weather at location entered

function displayWeather(response) {
  //console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let currentTemp = document.querySelector("#current_temp");
  currentTemp.innerHTML = `${temperature} °C`;
  let wIcon = response.data.weather[0].icon;
  
  let weatherIcon= document.querySelector("#current-icon");
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${wIcon}@2x.png">`;

  let wDescription = response.data.weather[0].main;
  let weatherDescription= document.querySelector("#weather-desc");
  weatherDescription.innerHTML = `${wDescription}`;
}

//Display weather at current location
function currentCityName(reverse){
//console.log(reverse);
let cLocation= document.querySelector("#city");
cLocation.innerHTML= `${reverse.data[0].name}, ${reverse.data[0].country}`;

}

function myPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  console.log(position);
  
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a435b674eb1340ec80ef66e82aeb341b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  let reverseLocationApi=`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
  axios.get(`${reverseLocationApi}&appid=${apiKey}`).then(currentCityName);
}



function getCurrentPosition() {
navigator.geolocation.getCurrentPosition(myPosition);
}
let button = document.querySelector("#current-button"); 
button.addEventListener("click", getCurrentPosition);

// Toggle between Celsius and Farenheit


