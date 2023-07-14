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
    card1Div.textContent = "Temp: " + selectedData[0].main.temp + "°F\n"
    card1Div.textContent += "Wind: " + selectedData[0].wind.speed + "mph\n"
    card1Div.textContent += "Humidity: " + selectedData[0].main.humidity + "%\n"
    var card2Div = document.querySelector("#card2")
    card2Div.textContent = "Temp: " + selectedData[1].main.temp + "°F\n"
    card2Div.textContent += "Wind: " + selectedData[1].wind.speed + "mph\n"
    card2Div.textContent += "Humidity: " + selectedData[1].main.humidity + "%\n"
    var card3Div = document.querySelector("#card3")
    card3Div.textContent = "Temp: " + selectedData[2].main.temp + "°F\n"
    card3Div.textContent += "Wind: " + selectedData[2].wind.speed + "mph\n"
    card3Div.textContent += "Humidity: " + selectedData[2].main.humidity + "%\n"
    var card4Div = document.querySelector("#card4")
    card4Div.textContent = "Temp: " + selectedData[3].main.temp + "°F\n"
    card4Div.textContent += "Wind: " + selectedData[3].wind.speed + "mph\n"
    card4Div.textContent += "Humidity: " + selectedData[3].main.humidity + "%\n"
    var card5Div = document.querySelector("#card5")
    card5Div.textContent = "Temp: " + selectedData[4].main.temp + "°F\n"
    card5Div.textContent += "Wind: " + selectedData[4].wind.speed + "mph\n"
    card5Div.textContent += "Humidity: " + selectedData[4].main.humidity + "%\n"
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
    // var todaysDate = document.querySelector('#date')
    // todaysDate.textContent = dayjs()
    var currentTemp = document.querySelector('#temp')
    currentTemp.textContent = "Temp: " + data.main.temp + "°F"
    var currentWind = document.querySelector('#wind')
    currentWind.textContent = "Wind: " + data.wind.speed + "mph"
    var currentHum = document.querySelector('#humidity')
    currentHum.textContent = "Humidity: " + data.main.humidity + "%"
}

cityFormEl.addEventListener("submit", formSubmitHandler)