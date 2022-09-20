/*
    Created:    09/12/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled a weather dashboard using server side API's.

      Single space:     &nbsp;
      Two spaces gap:   &ensp;
      Four spaces gap:  &emsp; 

    Modification
    ============
    09/12/2022 Brian Zoulko    Created constant variables for special URL and 
                               API keys.    
*/

var cAPI_KEY = ["0e23","2b66","3aad","0248","b589","0600","d1da","cf38"];
const cGEOCODE_URL = "http://api.openweathermap.org/geo/1.0/direct?appid=" + cAPI_KEY.join('');
const cWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + cAPI_KEY.join('');
const cFORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" + cAPI_KEY.join('');
