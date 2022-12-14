# Module 06 Challenge Project - Server-Side APIs - Weather Dashboard
This program is a weather dashboard showing the current weather for a given city
and the next 5 days forecast. Also maintaining a city history for easy click and
re-load.


## Key elements in the dashboard.
* Upon entering the website, you can see color coding and icons representing the 
  weather for the current day and the next 5 days forecast. All of which is pulled
  from "https://openweathermap.org/api/one-call-api) to retrieve weather detail.

* To start, enter a city in the "Search for a City" input box that shows "San Diego"
  as a placeholder for user convienance.

* After entering a city, click the "Search" button to, not only select the current
  weather, but also gets the next 5 days forecast along with saving the city as a
  quick click button for future re-loads (AKA: History City List).
  
* Errors will display when issues arise from calling the above api. But, 99.9 percent
  of issues seem to be spelling. After an error message is alerted, the history list
  will remove the city in question. Ergo, I would double check you're spelling and
  re-search for the city again.
  
* One nice touch was creating a function to reformat the City entered into "Title
  Case", giving it just that right touch of professionalism.


### Spoecial Notes:
* Little code resides in the HTML, most of the code resides in javascript and jQuery.
  This helped with aligning the form items acrossed the page. All special icons, color
  coding, and card features were created from the following:
  * https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css
  * https://use.fontawesome.com/releases/v5.8.1/css/all.css
  * https://fonts.googleapis.com/css?family=Open+Sans&display=swap
  
* Included "reset.css" to this project to make sure all elements start fresh.

* Link to Deployed App:  https://bzoulko.github.io/module6_challenge/

![image](https://user-images.githubusercontent.com/108200823/189926548-df5f5a37-bb9d-4159-9b27-6bcf5c68757a.png)
