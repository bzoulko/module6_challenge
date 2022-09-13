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

const cAPI_KEY = "0e232b663aad0248b5890600d1dacf38";
const cGEOCODE_URL = "http://api.openweathermap.org/geo/1.0/direct?appid=" + cAPI_KEY;
const cWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + cAPI_KEY;
const cFORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" + cAPI_KEY;
