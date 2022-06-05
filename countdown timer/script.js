

// conversions for values pulled from hour, min, and second paragraphs for setting the time

var inputSeconds;// for setting seconds on timer
var inputMins;// for setting minutes on timer
var inputHours;// for setting hours on timer
let oneSecond = 1000 // conversion of milliseconds
inputSeconds = oneSecond
inputMins = 60*inputSeconds
inputHours = 60*inputMins


    
let audio1 = new Audio("alarm.mp3")
let hourEl = document.getElementById('hour')
let minEl = document.getElementById('min')
let secEl = document.getElementById('sec')
let startName = document.getElementById('start')
const leapYears = 12 // leap years since 1970
const hourSpring = 1// hour  for clocks forward
const hourFall = -1// hour for clocks back


var clock;
let seconds = 600;
var minutes; 
var hours; 

// BEGINNING OF TIME FUNCTION 
function start(){
    startName.textContent = "STOP" // start button changes to stop
startName.style.backgroundColor = "red"; // start button becomes red



clock = setInterval(function() {
    clockElements = [] // cleared to prevent duplication

  seconds--; // decrement by one second each time
minutes = Math.floor((seconds)/ 60) // converts seconds to minutes
hours = Math.floor(minutes / 60)  // converts minutes to hours
  secReformat = seconds - Math.floor(seconds/60)*60
  
  // when timer reaches zero
if(seconds === 0){ audio1.play();clearInterval(clock);
    secEl.textContent = "00";
    clearTimer()}

    // digits below 9 become double digits
    if (minutes < 10){minEl.textContent = "0" + minutes;}
else{minEl.textContent = minutes;}
if (secReformat < 10){secEl.textContent = "0" + secReformat;}
else{secEl.textContent = secReformat;}
}
, oneSecond)

}
// END OF TIME FUNCTION 


function stop(){
    seconds = 600; // resets counter
    clearInterval(clock); // stops clock
     clearTimer() // see function below
    }

// clears reset all fields
function clearTimer(){
    minEl.textContent ="00"// resets to zeros
        secEl.textContent = "00" // resets text to zeros 
    startName.textContent = "START" // start btn to original state
    startName.style.backgroundColor = " rgb(132, 210, 247)";
    // start button to original colour
}



/*

EXAMPLES OF CODES TO USE FOR TIMING



yearEl.textContent = acDateArr[0]
monthEl.textContent = acDateArr[1]
hourEl.textContent = acDateArr[2]
minEl.textContent = acDateArr[3]
secEl.textContent = acDateArr[4]




Date.prototype.setDate()
Sets the day of the month for a specified date according to local time.

Date.prototype.setFullYear()
Sets the full year (e.g. 4 digits for 4-digit years) for a specified date according to local time.

Date.prototype.setHours()
Sets the hours for a specified date according to local time.

Date.prototype.setMilliseconds()
Sets the milliseconds for a specified date according to local time.

Date.prototype.setMinutes()
Sets the minutes for a specified date according to local time.

Date.prototype.setMonth()
Sets the month for a specified date according to local time.

Date.prototype.setSeconds()
Sets the seconds for a specified date according to local time.


*/