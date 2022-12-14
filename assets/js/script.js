/*
    Created:    09/10/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled a weather dashboard using server side API's.

      Single space:     &nbsp;
      Two spaces gap:   &ensp;
      Four spaces gap:  &emsp; 

    Modification
    ============
    09/10/2022 Brian Zoulko    Designed web-page and built weather dashboard.    
*/

var cityName = $(".city-name");
var cityTemp = $(".city-temp");
var cityWind = $(".city-wind");
var cityHumidity = $(".city-humidity");
var cityUVIndex = $(".city-uvindex");

var searchButtons = $("#search-buttons");
var searchforCity = $("#searchfor-city");
var primaryBtn = $("#primary-button");
var secondaryBtn = $("secondary-buttons");

var imgSun = "";
var imgSun


/* *********************
    Add new city button.
************************ */
function addCityButton() {
    addButton(searchButtons, convertToTitle(searchforCity.val()), true);    
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
                addButton(container, keyValue[x], false);
            }
        }
    }

    // Update the dashboard with the first city in the list.
    if (keyValue.length > 1) loadDashBoard(keyValue[1]);

}


/* ***********************************************************
    Update button container and local storage with new button.
************************************************************** */
function addButton(container, city, bAdd) {    
    
    // Search critera must have a value.
    if (city === '') return;    

    // Declare new button variables.
    const key = "button";
    var keyValue = [""];
    var buttonToAdd = $(`<${key}/>`, { type: key, class: "btn-block btn-secondary my-2", text: city});

    // Create/Append new button into container.
    container.append(buttonToAdd);

    // Create on click event for each button added.
    buttonToAdd.on("click", addCity);
    function addCity(){        
        // Add City and Date to main weather dashboard.
        loadDashBoard(buttonToAdd);
    }

    // Pull button list from local storage.
    var data = getData(key);

    // Add City to main weather dashboard and local storage.
    if (bAdd) {

        if (data !== null && data !== '') keyValue = data.split(",");                
        keyValue.push(city);
        putData(key, keyValue);        
        loadDashBoard(buttonToAdd);
        
    }

}

/* ***************************************************************
    Update dashboard with the current days weather for a specific
    city and then load the next 5 days.
****************************************************************** */
function loadDashBoard(btn) {
    const cMaxDays = 5;
    var rtnCode = 0;


    // --------------------------------------------------------------------------
    // F E T C H  Geocoding URL detail for a city to get lattitude and longitude.
    // --------------------------------------------------------------------------
    var city = ((typeof btn == "string") ? btn : btn.text());
    var geocodeURL = cGEOCODE_URL + "&q=" + city.replace(" ","%20") + ",,&limit=3";

    fetch(geocodeURL).then(function(response){

        return response.json();

    }).then(function(data) {

        rtnCode = parseInt(data.cod);
        if (rtnCode < 200 || rtnCode > 299 || data.length == 0) {
            alert("Error with (Geocode) city URL: /n/n" + geocodeURL);
            removeCity(btn.text());
            btn.remove();
        } else {


            // -----------------------------------------------------
            // F E T C H  Weather URL to obtain current city detail.
            // -----------------------------------------------------
            var lattitude = data[0].lat;
            var longitude = data[0].lon;
            var weatherURL = cWEATHER_URL + "&q=" + city.replace(" ","%20") + "&lat=" + lattitude + "&lon=" + longitude;

            fetch(weatherURL).then(function(response){

                return response.json();

            }).then(function(data) {
                
                rtnCode = parseInt(data.cod);
                if (rtnCode < 200 || rtnCode > 299 || data.length == 0) {
                    alert("Error with (Weather) URL: /n/n" + weatherURL);
                    removeCity(btn.text());
                    btn.remove();
                } else {

                    // load Current City Weather.                    
                    var cityIcon = $(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Current weather image.">`);
                    cityName.text(city + " (" + getDate() + ")");
                    cityName.append(cityIcon);
                    cityTemp.text("Temp: " + data.main.temp + " \xB0F");
                    cityWind.text("Wind: " + data.wind.speed + " MPH");
                    cityHumidity.text("Humidity: " + data.main.humidity + " %");
                    cityUVIndex.text("UV Index: ");                    


                    // ---------------------------------------------------
                    // F E T C H  5-Day Forecast URL for the current city.
                    // ---------------------------------------------------
                    var forecastURL = cFORECAST_URL + "&lat=" + lattitude + "&lon=" + longitude + "&cnt=" + cMaxDays ;

                    fetch(forecastURL).then(function(response){

                        return response.json();

                    }).then(function(data) {
                        
                        rtnCode = parseInt(data.cod);
                        if (rtnCode < 200 || rtnCode > 299 || data.length == 0) {
                            alert("Error with (Forecast) URL: /n/n" + forecastURL);
                            removeCity(btn.text());
                            btn.remove();
                        } else {
                    
                            // Load 5-Day forecast detail.
                            for (var d = 0; d < cMaxDays; d++) {
                                var i = d+1;
                                var forecastIcon = $(`<img src="https://openweathermap.org/img/wn/${data.list[d].weather[0].icon}.png" alt="Forecast weather icon.">`);
                                $(`.day${i}-date`).text(getDate(i));                                
                                $(`.day${i}-date`).append(forecastIcon);
                                $(`.day${i}-weather-icon`).attr("src", );
                                $(`.day${i}-city-temp`).text("Temp: " + data.list[d].main.temp + " \xB0F");
                                $(`.day${i}-city-wind`).text("Wind: " + data.list[d].wind.speed + " MPH");
                                $(`.day${i}-city-humidity`).text("Humidity: " + data.list[d].main.humidity + " %");
                            }

                        }

                    })

                }

            })

            

        }
    })
    
}


/* ********************************
    Remove city from local storage.
*********************************** */
function removeCity(city) {
    // Remove city from local storage.
    const key = "button";
    var data = getData(key).replace("," + city,"");
    putData(key, data); 
}


/* **************************************************
    Obtain formatted date for weather dashboard city.
***************************************************** */
function getDate(incByDay){
    var numberOfDays = parseInt(incByDay);
    var useDate = moment().add(numberOfDays, 'days');
    return(useDate.format('MM/DD/YYYY'));
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


/* *************************************
    Convert string to Title Case Format.
**************************************** */
function convertToTitle(stringIn){
    var stringOut = stringIn.toLowerCase().split(' ');
    for (var i = 0; i < stringOut.length; i++) {
        stringOut[i] = stringOut[i].charAt(0).toUpperCase() + stringOut[i].slice(1);
    }
    return stringOut.join(' ');
}


// Search for button ( OnClick ) event for adding cities.
primaryBtn.on("click", addCityButton);

// Refresh button(s) from local storage.
refreshButtons(searchButtons);
