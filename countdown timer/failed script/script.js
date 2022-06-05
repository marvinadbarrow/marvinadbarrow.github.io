



    
let audio1 = new Audio("alarm.mp3")
let hourEl = document.getElementById('hour')
let minEl = document.getElementById('min')
let secEl = document.getElementById('sec')
let startName = document.getElementById('start')
const leapYears = 12 // leap years since 1970
const hourSpring = 1// hour  for clocks forward
const hourFall = -1// hour for clocks back
    
let acDateArr = [] // actual date array with year, month, day, min, sec




var clock;
var InputTime; 
var minutes; 
var hours; 
var inputSeconds;// for setting seconds on timer
var inputMins;// for setting minutes on timer
var inputHours;// for setting hours on timer
var mS;

// CONVERSIONS
mS = 1000 // conversion of milliseconds
inputSeconds = mS// 30 secs = 30*inputSeconds ie 30*mS
inputMins = 60*mS //e.g 3 mins = 3*inputMins ie 180*mS
inputHours = 60*60*mS //e.g 3 hours = 3*inputHours ie 3*3600*mS

// actual time input, could be in minutes, hours, or seconds or ALL
InputTime= 30*inputSeconds; // ie. 5*60*mS, 

// BEGINNING OF TIME FUNCTION 
function start(){
    startName.textContent = "STOP" // start button changes to stop
startName.style.backgroundColor = "red"; // start button becomes red



clock = setInterval(function() {
   
  InputTime--; // decrement by one second each time
minutes = Math.floor((inputSeconds)/ 60) // converts seconds to minutes
hours = Math.floor(minutes / 60)  // converts minutes to hours
  secReformat = InputTime - Math.floor(InputTime/60)*60
  console.log(secReformat)
  // when timer reaches zero
if(InputTime === 0){ audio1.play();clearInterval(clock);
    secEl.textContent = "00";
    clearTimer()}

    // digits below 9 become double digits
    if (minutes < 10){minEl.textContent = "0" + minutes;}
else{minEl.textContent = minutes;}
if (secReformat < 10){secEl.textContent = "0" + secReformat;}
else{secEl.textContent = secReformat;}
}
, mS)

}
// END OF TIME FUNCTION 


function stop(){
    InputTime = 90; // resets counter
    clearInterval(clock); // stops clock
     clearTimer() // see function below
    }

// clears reset all fields
function clearTimer(){
        secEl.textContent = "00" // resets text to zeros 
    startName.textContent = "START" // start btn to original state
    startName.style.backgroundColor = " rgb(132, 210, 247)";
    // start button to original colour
}



// use this go get seconds. Maybe have different time measures in each box and use the setTime functions to refresh once ever 1000 milliseconds to display seconds, 60k milliseconds to display minutes, 3600 milliseconds to display hours etc. 


/*



var clock;
let time = 0;
clock = setInterval(function() {
time++; log();

}, 1000)





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