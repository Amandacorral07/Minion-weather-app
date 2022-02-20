function formatDate(timestamp){
let date=new Date(timestamp);
let hours= date.getHours();
if (hours<10){
  hours=`0${hours}`;
}
let minutes=date.getMinutes();
if (minutes<10){
  minutes=`0${minutes}`;
}
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day= days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}


function displayTemperature(response) {
  let temperatureElement=document.querySelector("#temperature");
  let cityElement=document.querySelector("#city");
  let descriptionElement=document.querySelector("#weather-description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let feelsLikeElement=document.querySelector("#feels-like");
  let dateElement=document.querySelector("#date");
  let iconElement=document.querySelector("#main-weather-icon");
  

  celsiusTemperature=response.data.main.temp;

  temperatureElement.innerHTML=Math.round(response.data.main.temp);
  cityElement.innerHTML=response.data.name; 
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML=Math.round(response.data.main.feels_like);
  dateElement.innerHTML=formatDate(response.data.dt*1000);
  iconElement.setAttribute("src",`weather-icons/${response.data.weather[0].icon}.svg` );
  iconElement.setAttribute("alt", response.data.weather[0].description );
  document.querySelector("#maxTemp").innerHTML=Math.round(response.data.main.temp_max);
  document.querySelector("#minTemp").innerHTML=Math.round(response.data.main.temp_min);

}
function search(city){
  let apiKey="04516b03d862a33f9817076057aa38aa";
  let units="metric";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement= document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelisusTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature=null;


let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelisusTemperature);

search("Los Angeles")