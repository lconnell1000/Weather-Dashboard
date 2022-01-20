
   
const APIkey = '9ccbb866deb7e9cf8b778f79224c0dbe';
var submitBtn = document.querySelector('#submit-btn');
var current = document.querySelector('#today');
var forecast = document.querySelector('#fiveDay-forecast');
var historyList = document.querySelector('#search-history')
var citySearch = document.querySelector('#search-city');
var displayDate= moment();
var searchHistory = [];

// Initiate search
function search(a) {
  forecast.innerHTML='';
  current.innerHTML='';
  if (a === "") {
    return;
  }
  if (!searchHistory.includes(a)) {
    searchHistory.push(a);
    localStorage.setItem("weatherSearch", JSON.stringify(searchHistory));
  }
  render();
  fetchLangLot(a)
} 
// fetch city's lat and lon
 function fetchLangLot(a) {
   var link5day = 'https://api.openweathermap.org/data/2.5/forecast?q='+a+'&cnt=6&appid='+APIkey+'&units=imperial';
   fetch(link5day)
   .then(function (response) {
     return response.json();
   })
   .then(function (data) {   
     var lat = data.city.coord.lat;
     var lon = data.city.coord.lon; 
     searchedCity= data.city.name;
     fetchWeather(lat,lon) ;
     });
 }

// fetch current weather data
function fetchWeather(lat,lon) {
    var weatherCall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely,alerts&appid='+APIkey+ '&units=imperial';
    fetch(weatherCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var APIweatherCall = data;
      currentWeather(APIweatherCall);
      fiveDayWeather(APIweatherCall);
      });  
}
// display current weather
function currentWeather(data) {
    var cityName = document.createElement('h3');
    cityName.classList.add('row')
    var img = document.createElement('img');
    icon = 'http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'@2x.png'
    img.setAttribute("src", icon);
    var conditions = document.createElement('ul');
    conditions.classList.add('column')
    var temp = document.createElement('li');
    var wind = document.createElement('li');
    var humidity = document.createElement('li');
    var UV = document.createElement('li');
    cityName.textContent= searchedCity+'('+ displayDate.format("DD/MM/YYYY") + ')';
    temp.textContent= "Temp: "+ data.current.temp+ " \xB0F";
    wind.textContent= "Wind: "+ data.current.wind_speed+ " MPH";
    humidity.textContent= "Humidity: "+ data.current.humidity+ " %";
    UV.textContent= "UV Index: "+ data.current.uvi;
    // UV color
    UVcolor(data.current.uvi,UV);
    current.appendChild(cityName);
    current.appendChild(img);
    current.appendChild(conditions);
    conditions.appendChild(temp);
    conditions.appendChild(wind);
    conditions.appendChild(humidity);
    conditions.appendChild(UV);
    // temp wind humidity UV index
}
// display 5-day forecast
function fiveDayWeather(data) {
    var dateDisplay= moment();
    for (var i=0; i<5;i++){
        card = document.createElement('div');
        card.className ='col text-light mr-2 bg-custom';
        date = document.createElement('h4')
        date.classList.add('row')
        var img = document.createElement('img');
        img.setAttribute("src", 'http://openweathermap.org/img/wn/'+data.daily[i].weather[0].icon+'@2x.png');
        img.classList.add('row')
        futureConditions = document.createElement('ul');
        futureConditions.classList.add('row')
        futureTemp= document.createElement('li');
        futureWind= document.createElement('li');
        futureHumidity= document.createElement('li');
        nextdate=dateDisplay.add(1,"day");
        date.textContent= nextdate.format("DD/MM/YYYY");
        futureTemp.textContent= "Temp: "+ data.daily[i].temp.day+ " \xB0F";
        futureWind.textContent= "Wind: "+ data.daily[i].wind_speed+ " MPH";
        futureHumidity.textContent= "Humidity: "+ data.daily[i].humidity+ " %";
        forecast.appendChild(card);
        card.appendChild(date);
        card.appendChild(img);
        card.appendChild(futureConditions);
        futureConditions.appendChild(futureTemp);
        futureConditions.appendChild(futureWind);
        futureConditions.appendChild(futureHumidity);

    }
}

//Render search history
function render() {
   // Get search history from localStorage
   var weatherHistory = JSON.parse(localStorage.getItem("weatherSearch"));
   // If search history were retrieved from localStorage, update 
   if (weatherHistory !== null) {
    searchHistory = weatherHistory;
   }
   historyList.innerHTML="";
   addBtn(searchHistory)
}


// Add buttons
function addBtn(a) {
  for (var j=0; j<a.length;j++) {
    var button= document.createElement('button');
    button.innerHTML=a[j];
    button.className = 'btn btn-secondary btn-block historyBtn'
    historyList.appendChild(button);
   };
}
// display UV color
function UVcolor(index,UV) {
  if (index<5) {
    UV.className='favourable';
  }
  else if (5<=index<8) {
    UV.className='moderate';
  }
  else if (8<=index) {
    UV.className='servere';
  }
  return UV
}

// init

render()

submitBtn.addEventListener('click', function() {
    var city = citySearch.value.trim();
    search(city)
  }  
)

historyList.addEventListener("click", function(event) {
  var element = event.target;
  // Checks if element is a button
  if (element.matches("button") === true) {
    city =element.innerText;
    search(city);
  };
})

