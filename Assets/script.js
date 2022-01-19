
var APIkey = "9ccbb866deb7e9cf8b778f79224c0dbe";
var latitude = "";
var longitude = "";
var city;
var temperature;
var humidity;
var windSpeed
var UV;
var todaysWeather = document.querySelector("#todays-weather")

function displayWeather() {
    var weatherInfo = document.createElement('div');
    weatherInfo.classList.add('card', 'bg-dark', 'text-light', 'mb-2', 'p-2')

    var bodyInfo = document.createElement('div');
    bodyInfo.classList.add('card-body')
    weatherInfo.append(bodyInfo);

    var searchCityEl = document.createElement('h3')
    searchCityEl.textcontent = city;

    var contentEl = document.createElement('p');

    contentEl.innerHTML += '<strong>Temperature:</strong' + temperature +'<br/>';
    contentEl.innerHTML += '<strong>Wind Speed:</strong' + windSpeed +'<br/>';
    contentEl.innerHTML += '<strong>Humidity:</strong' + humidity +'<br/>';
    contentEl.innerHTML += '<strong>UV Index:</strong' + UV +'<br/>';
    bodyInfo.append(searchCityEl, contentEl);

    todaysWeather.append(weatherInfo);

}

