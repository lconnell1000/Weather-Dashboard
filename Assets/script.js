
var APIkey = "9ccbb866deb7e9cf8b778f79224c0dbe";
var latitude = "";
var longitude = "";
var city;
var temperature;
var humidity;
var windSpeed;
var UV;
var todaysWeather = document.querySelector("#todays-weather");
var cityToSearch;
var citiesStorage;
var submitForm = document.querySelector("#submit-form");
var savedCity;
var weatherHistoryEl = document.querySelector("#weather-history")

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

function getWeatherinfo(event) {
    event.preventDefault ();

    cityToSearch = document.querySelector("#city-to-search").ariaValueMax

    var cityLongLatURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&appid=' + APIKey

    localStorage.setItem('city', cityToSearch)
    citiesStorage = localStorage.getItem('city')

    submitForm.reset();

    const citiesToStore = {
        city: citiesStorage,
    }
    savedCity.push(citiesToStore)
    localStorage.setItem("savedCity", JSON.stringify(savedCity));

    btn = document.createElement("a");
    btn.textcontent = citiesStorage
    btn.classList.add('btn', 'btn-dark', 'm-2', 'w-100')

    weatherHistoryEl.appendChild(btn)

    //need to make a weather fetch function to get the data now we have the lat and long of the city stored
    weatherFetch(cityLongLatURL)
}
