
   
const APIkey = '9ccbb866deb7e9cf8b778f79224c0dbe';
var submitBtn = document.querySelector('#submit-btn');
var current = document.querySelector('#today');
var forecast = document.querySelector('#fiveDay-forecast');
var historyList = document.querySelector('#search-history')
var citySearch = document.querySelector('#search-city');
var displayDate= moment();
var searchHistory = [];

// start weather search
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
  fetchlongLat(a)
} 

// fetch city's latitude and longitude
 function fetchlongLat(a) {
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
// display current weather in a box on the upper right hand sade of page
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
    // neeed to pass the uv to a function to change its color
    UvColorCoder(data.current.uvi,UV);
    current.appendChild(cityName);
    current.appendChild(img);
    current.appendChild(conditions);
    conditions.appendChild(temp);
    conditions.appendChild(wind);
    conditions.appendChild(humidity);
    conditions.appendChild(UV);
   
}
// displays our 5-day forecast in another box underneath the current weather in a row
function fiveDayWeather(data) {
  //need to make a new displayDate with the moment in here so we dont keep adding
  //5 days on each time we do a new weather search, was a bug i had to fix
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

//function to display our search history
function render() {
   // go to local storage to get our weather history
   var weatherHistory = JSON.parse(localStorage.getItem("weatherSearch"));
   // If new search history then update it
   if (weatherHistory !== null) {
    searchHistory = weatherHistory;
   }
   historyList.innerHTML="";
   addBtn(searchHistory)
}


// Add button for each of the cities in the search history
function addBtn(a) {
  for (var j=0; j<a.length;j++) {
    var button= document.createElement('button');
    button.innerHTML=a[j];
    button.className = 'btn btn-secondary btn-block historyBtn'
    historyList.appendChild(button);
   };
}
// display the uv color coded, green for favourable, orange for moderate, red for severe
function UvColorCoder(index,UV) {
  if (index<3) {
    UV.className='favourable';
  }
  else if (3<=index<5) {
    UV.className='moderate';
  }
  else if (5<=index) {
    UV.className='servere';
  }
  return UV
}


render()

submitBtn.addEventListener('click', function() {
    var city = citySearch.value.trim();
    search(city)
  }  
)

historyList.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button") === true) {
    city =element.innerText;
    search(city);
  };
})

