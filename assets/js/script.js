var cityTemp = $("city-temp");
var cityWind = $("city-wind");
var cityHumidity = $("city-humidity");
var cityUVIndex = $("city-uvindex");

var day1Date = $("day1-date");
var day2Date = $("day2-date");
var day3Date = $("day3-date");
var day4Date = $("day4-date");
var day5Date = $("day5-date");

var day1Icon = $("day1-weather-icon");
var day2Icon = $("day2-weather-icon");
var day3Icon = $("day3-weather-icon");
var day4Icon = $("day4-weather-icon");
var day5Icon = $("day5-weather-icon");

var day1Temp = $("day1-city-temp");
var day2Temp = $("day2-city-temp");
var day3Temp = $("day3-city-temp");
var day4Temp = $("day4-city-temp");
var day5Temp = $("day5-city-temp");

var day1Wind = $("day1-city-wind");
var day2Wind = $("day2-city-wind");
var day3Wind = $("day3-city-wind");
var day4Wind = $("day4-city-wind");
var day5Wind = $("day5-city-wind");

var day1Humidity = $("day1-city-humidity");
var day2Humidity = $("day2-city-humidity");
var day3Humidity = $("day3-city-humidity");
var day4Humidity = $("day4-city-humidity");
var day5Humidity = $("day5-city-humidity");

var searchButtons = $("#search-buttons");
var searchforCity = $("#searchfor-city");
var primaryBtn = $("#primary-button");
var secondaryBtn = $("secondary-buttons");


// Search for button on click event for adding new cities.
primaryBtn.on("click", addCityButton);

// Refresh buttons saved in local storage.
refreshButtons(searchButtons);


/* *********************
    Add new city button.
************************ */
function addCityButton() {    
    addButton(searchButtons, searchforCity.val());    
    searchforCity.val("");
}


/* **********************************************************
    Refreash button container with local storage button list.
************************************************************* */
function refreshButtons(container){

    // Pull button list from local storage.
    const key = "button";
    var keyValue = [""];
    var data = getData(key);
    if (data !== null && data !== '') {
        keyValue = data.split(",");
        for (var x = 0; x < keyValue.length; x++) {
            if (keyValue[x] !== null && keyValue[x] !== '') {
                addButton(container, keyValue[x]);
            }
        }
    }
}


/* ***********************************************************
    Update button container and local storage with new button.
************************************************************** */
function addButton(container, caption) {    
    
    // Declare new button variables.
    const key = "button";
    var keyValue = [""];
    var buttonToAdd = $(`<${key}/>`, { type: key, class: "btn-block btn-secondary my-2", text: caption});

    // Create/Append new button into container.
    container.append(buttonToAdd);

    // Create on click event for each button added.
    buttonToAdd.on("click", addCity);
    function addCity(){
        console.log("city clicked: " + buttonToAdd.text());
    }

    // Pull button list from local storage.
    var data = getData(key);
    if (data !== null && data !== '') keyValue = data.split(",");

    // Store new button list in local storage.
    keyValue.push(caption);
    putData(key, keyValue);

}


/* ****************************************************************************
    Store data in localStorage based on a key and the value or data being passed.
******************************************************************************* */
function putData(key, value){
localStorage.setItem(key, value);
}


/* ****************************************************
    Return the value for a specific key in local storage.
******************************************************* */
function getData(key) {
return(localStorage.getItem(key));
}


