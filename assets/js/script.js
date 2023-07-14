var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-search');

var searchBtn = document.querySelector('.search-btn');

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    getGeocode(city)
}

var getGeocode = function(city) {
    var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=8ab147a2ce61d167a2957cd01bcc016b'

    fetch(geocodeUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var latitude = data[0].lat
        var longitude = data[0].lon
        getWeather(latitude, longitude)
        getCurrentWeather(latitude, longitude)
    })
}

var getWeather = function(latitude, longitude) {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=8ab147a2ce61d167a2957cd01bcc016b&units=imperial'

        console.log(weatherUrl)

        fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var selectedData = [
                data.list[0],
                data.list[8],
                data.list[16],
                data.list[24],
                data.list[32],
            ]
            renderForecastData(selectedData);
        })
}

var renderForecastData = function(selectedData) {
    var card1Div = document.querySelector("#card1")
    card1Div.textContent = selectedData[0].main.temp
    // card1Div.textContent = selectedData[0].wind.speed
    // card1Div.textContent = selectedData[0].main.humidity
    var card2Div = document.querySelector("#card2")
    card2Div.textContent = selectedData[1].main.temp
    // card2Div.textContent = selectedData[1].wind.speed
    // card2Div.textContent = selectedData[1].main.humidity
    var card3Div = document.querySelector("#card3")
    card3Div.textContent = selectedData[2].main.temp
    // card3Div.textContent = selectedData[2].wind.speed
    // card3Div.textContent = selectedData[2].main.humidity
    var card4Div = document.querySelector("#card4")
    card4Div.textContent = selectedData[3].main.temp
    // card4Div.textContent = selectedData[3].wind.speed
    // card4Div.textContent = selectedData[3].main.humidity
    var card5Div = document.querySelector("#card5")
    card5Div.textContent = selectedData[4].main.temp
    // card5Div.textContent = selectedData[4].wind.speed
    // card5Div.textContent = selectedData[4].main.humidity

}

var getCurrentWeather = function(latitude, longitude) {
    var getCurrentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=8ab147a2ce61d167a2957cd01bcc016b&units=imperial'
    
    fetch(getCurrentWeatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        renderCurrentData(data)
    })
}

var renderCurrentData = function(data) {
    var cityName = document.querySelector('#city')
    cityName.textContent = data.name
    var todaysDate = document.querySelector('#date')
    var currentTemp = document.querySelector('#temp')
    currentTemp.textContent = data.main.temp
    var currentWind = document.querySelector('#wind')
    currentWind.textContent = data.wind.speed
    var currentHum = document.querySelector('#humidity')
    currentHum.textContent = data.main.humidity
}

// searchBtn.addEventListener('click', getWeather);
cityFormEl.addEventListener("submit", formSubmitHandler)