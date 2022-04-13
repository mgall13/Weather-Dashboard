
var searchButton = $(".searchButton");

var apiKey = "b8ecb570e32c2e5042581abd004b71bb";

// Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}
// Key count for local storage 
var keyCount = 0;
// Search button click event
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    // Variable for current weather working 
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    // Variable for 5 day forecast working
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            // list-group append an li to it with just set text
            // console.log(response.name);
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Start Current Weather append 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);

            // Adjust Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add Temp 
            var currentTemp = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Add Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // // Add Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
                // currentUV.append("UV Index: " + response.value);
            });

        });

        // Start call for 5-day forecast 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});

//

// function pageInit() {
//     const inputEl = document.getElementById("city-input");
//     const searchEl = document.getElementById("search-button");
//     const clearEl = document.getElementById("clear-history");
//     const nameEl = document.getElementById("city-name");
//     const currentPicEl = document.getElementById("current-pic");
//     const currentTempEl = document.getElementById("temperature");
//     const currentHumidityEl = document.getElementById("humidity");4
//     const currentWindEl = document.getElementById("wind-speed");
//     const currentUVEl = document.getElementById("UV-index");
//     const historyEl = document.getElementById("history");
//     let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

//     const APIKey = "5099d8d692ae44c13e96573330db8ca4";

//     function getWeather(cityName) {
// //  Using saved city name, execute a current condition get request from open weather map api
//         let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
//         axios.get(queryURL)
//         .then(function(response){
//             console.log(response);
// //  Parse response to display current conditions
//         //  Method for using "date" objects obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
//             const currentDate = new Date(response.data.dt*1000);
//             console.log(currentDate);
//             const day = currentDate.getDate();
//             const month = currentDate.getMonth() + 1;
//             const year = currentDate.getFullYear();
//             nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
//             let weatherPic = response.data.weather[0].icon;
//             currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
//             currentPicEl.setAttribute("alt",response.data.weather[0].description);
//             currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
//             currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
//             currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
//         let lat = response.data.coord.lat;
//         let lon = response.data.coord.lon;
//         let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
//         axios.get(UVQueryURL)
//         .then(function(response){
//             let UVIndex = document.createElement("span");
//             UVIndex.setAttribute("class","badge badge-danger");
//             UVIndex.innerHTML = response.data[0].value;
//             currentUVEl.innerHTML = "UV Index: ";
//             currentUVEl.append(UVIndex);
//         });
// //  Using saved city name, execute a 5-day forecast get request from open weather map api
//         let cityID = response.data.id;
//         let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
//         axios.get(forecastQueryURL)
//         .then(function(response){
// //  Parse response to display forecast for next 5 days underneath current conditions
//             console.log(response);
//             const forecastEls = document.querySelectorAll(".forecast");
//             for (i=0; i<forecastEls.length; i++) {
//                 forecastEls[i].innerHTML = "";
//                 const forecastIndex = i*8 + 4;
//                 const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
//                 const forecastDay = forecastDate.getDate();
//                 const forecastMonth = forecastDate.getMonth() + 1;
//                 const forecastYear = forecastDate.getFullYear();
//                 const forecastDateEl = document.createElement("p");
//                 forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
//                 forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
//                 forecastEls[i].append(forecastDateEl);
//                 const forecastWeatherEl = document.createElement("img");
//                 forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
//                 forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
//                 forecastEls[i].append(forecastWeatherEl);
//                 const forecastTempEl = document.createElement("p");
//                 forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
//                 forecastEls[i].append(forecastTempEl);
//                 const forecastHumidityEl = document.createElement("p");
//                 forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
//                 forecastEls[i].append(forecastHumidityEl);
//                 }
//             })
//         });  
//     }

//     searchEl.addEventListener("click",function() {
//         const searchTerm = inputEl.value;
//         getWeather(searchTerm);
//         searchHistory.push(searchTerm);
//         localStorage.setItem("search",JSON.stringify(searchHistory));
//         findHistory();
//     })

//     clearEl.addEventListener("click",function() {
//         searchHistory = [];
//         findHistory();
//     })

//     function k2f(K) {
//         return Math.floor((K - 273.15) *1.8 +32);
//     }

//     function findHistory() {
//         historyEl.innerHTML = "";
//         for (let i=0; i<searchHistory.length; i++) {
//             const historyItem = document.createElement("input");
//             // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
//             historyItem.setAttribute("type","text");
//             historyItem.setAttribute("readonly",true);
//             historyItem.setAttribute("class", "form-control d-block bg-white");
//             historyItem.setAttribute("value", searchHistory[i]);
//             historyItem.addEventListener("click",function() {
//                 getWeather(historyItem.value);
//             })
//             historyEl.append(historyItem);
//         }
//     }

//     findHistory();
//     if (searchHistory.length > 0) {
//         getWeather(searchHistory[searchHistory.length - 1]);
//     }
// }
// pageInit();