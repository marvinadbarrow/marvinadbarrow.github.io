let hourEnd = document.getElementById('small-hour')
let minEnd = document.getElementById('small-min')
let secEnd = document.getElementById('small-sec')
let splitEnd = document.getElementById('small-split-end')


// button elements
var  startBtn = document.getElementById('start')
var  pauseBtn = document.getElementById('pause')
var  resetBtn = document.getElementById('reset')
var  lapBtn = document.getElementById('lap')
var  recallBtn = document.getElementById('recall')
var  lapResetBtn = document.getElementById('lap-clear')

// to prevent recall button activation when no lap record exists
recallBtn.style.cssText = "z-index: -1; opacity:0.4;";

// to prevent lap reset button activation prior to lap button activation
lapResetBtn.style.cssText = "z-index: -1; opacity:0.4;";

var splitLargeEl = document.getElementById('split-large')
console.log(splitLargeEl)
// these are the variable for pulling the time measure values out of the hour,minute,second and hundredths of a second elements - just console log the variable with .textContent and it will display the current alue of each variable
let hourLap = document.getElementById('hour')
let minLap = document.getElementById('min')
let secLap = document.getElementById('sec')
let splitSecLap = document.getElementById('split-sec')

var startArray = []// start function only runs if this is empty
var pauseArray = []
var lapRecords = []
var lapRecordsAdjust = []
var actualLap = [] // tells the timer to push time to below array if actualLap length > 0
var lapTimes = [0]
var lapSaveArray = [] // we'll save the lap times as objects in this array so we can retrieve them later, maybe we can load them onto a modal, or maybe even better, find a way to navigate the array with right and left clicks maybe?

lapDisplayArr = [] // each time we hit the recall button we'll send a value to this array, it will be the value of one less than the current lap number, and then we will display related entry of  lapSaveArray, and then pop from this array, so it's empty, ready for the next value. 

let hourEl = document.getElementById('hour')
let minEl = document.getElementById('min')
let secEl = document.getElementById('sec')
let hundredthEl = document.getElementById('split-sec')
let startName = document.getElementById('start')
let pauseName = document.getElementById('pause')
let playEl = document.getElementById("play-btn")
let pauseEl = document.getElementById("pause-btn")
let timeEl = document.getElementsByClassName("time-el")
let splitEl = document.getElementById("split-sec")
let sepElOne = document.getElementById("sep-1")
let sepElTwo = document.getElementById("sep-2") 

// elements for lap clock
let smallHourEl = document.getElementById('small-hour-b')
let smallMinEl = document.getElementById('small-min-b')
let smallSecEl = document.getElementById('small-sec-b')
var splitSmallEl = document.getElementById('split-small')
let smallSplitSecEl = document.getElementById('small-split-sec')
let clockEl = document.getElementById('clock-el')

var lapCounter = document.getElementById('lap-count')

// clocks for settimeinterval functions - 
var clock;
var clock2;
// shows which times are saved, in the console. You now need to actually be able to push those times to the save-el fields
var time = 0; // for main clock
var time2 = 0; // for small clock
var hundredthSecs;
var seconds;
var minutes; 
var hours; 
var trueHundredthSecs;
var trueSecs;
var trueMins;
var trueHours;



// BEGINNING OF TIME FUNCTION will only work if time is set, or timer is paused after initial start; preventing duplicate activation
function start(){ 
    
if(startArray.length < 1){

  // moving start-activated stylings to a separate function
startStyles();

    
startArray.push("start")
pauseArray.pop()

clock = setInterval(function() {
   // cleared to prevent duplication
   

   // if actualLap contains a value, this will push time to lapTimes array and send array's length to lapTimeCalculate function, and then remove the value from actualLap array so the operation happens only once, each time the lap button is activated. 
   if(actualLap.length > 0){lapTimes.push(time); console.log(lapTimes) ; let y = lapTimes.length;lapTimeCalculate(y);
     actualLap.pop()}
    time++; // increment by one second each time


   hundredthSecs = time;
   seconds = Math.floor(hundredthSecs/100)// convert hundredths to seconds
      minutes = Math.floor(seconds/ 60) // converts seconds to minutes
    hours = Math.floor(minutes / 60)  // converts minutes to hours
 

// inputting vaulues into time measure. Note, when time goes over 60 seconds it will continue to increase so you'll end up with 61, 62, 63 etc; ;so we need to adjust for that. 
trueHundredthSecs = hundredthSecs - seconds*100
trueSecs = seconds - minutes*60
trueMins = minutes - hours*60
trueHours = hours// since timer is stopping at 2 hours we don't need to use trueHours. 


splitLargeEl.textContent = trueHundredthSecs;
secEl.textContent = trueSecs;
minEl.textContent = trueMins;
 hourEl.textContent = "0" + hours; // since hours are less than 10, the added zero is to keep the display as a double digit


// below we adjust for minutes < 10 and secons < 10 where the display would normally display only 'one' digit. We put a zero 'as a string' before the time value; 
if (trueSecs < 10){secEl.textContent = "0" + trueSecs}
if (trueMins < 10){minEl.textContent = "0" + trueMins}
if(trueHundredthSecs < 10){splitLargeEl.textContent = "0" + trueHundredthSecs;}
 

}
, 10)}
else{alert(' Lap record must be cleared before re-running stopwatch!')}



}
// END OF TIME FUNCTION 


const startStyles = () =>{

   // make sure we change opacity back to '1' for main clock because pause changes its opacity
clockEl.style.opacity = "1";
startBtn.style.backgroundColor = "red"// start button turns red
pauseBtn.style.cssText = "background-color: rgb(170, 176, 179);"; // if red, pause button goes back to default grey


    // delete flashing digit animation and restore original color
    splitLargeEl.style.color = 'black';
secEl.style.color = 'black';
minEl.style.color = 'black';
hourEl.style.color = 'black';
sepElOne.style.color = 'black';
sepElTwo.style.color = 'black';


splitLargeEl.style.animation = ""; 
hourEl.style.animation = ""; 
minEl.style.animation = "";
secEl.style.animation = "";
sepElOne.style.animation = "";
sepElTwo.style.animation = "";
}


function lapTime(){
   if(startArray.length > 0){
actualLap.push('lap request')

// allow recall button activation
recallBtn.style.cssText = "z-index: 0; opacity:1;";

    // below are variables created for values taken from current time vaulues of hr, min, sec, split-sec (always in double digits)
   let hrL = hourLap.textContent; 
    let mnL = minLap.textContent;
   let sL = secLap.textContent;
 let ssL = splitLargeEl.textContent;

   // this object holds the current time (how much time has elapsed, since the beginning, when lap button is pressed), as strings, from  each measure, hr min sec split.  These will be displayed alongside the respective lap intervals
let lapObj = {hour:hrL, 
    minute:mnL, 
    second:sL, 
    splitsecond:ssL,
  }

// object with lapObj values but as integers (NOT strings)
let lapObjAdjust = {
    hr: Number(hourLap.textContent), 
    mn: Number(minLap.textContent), 
    sec: Number(secLap.textContent), 
    split:Number(splitSmallEl.textContent) 
  }

    lapRecords.push(lapObj) // pushes current time as an object to display later
    console.log(lapObj)
    hourEnd.textContent = lapObj["hour"]
minEnd.textContent = lapObj["minute"]
secEnd.textContent = lapObj["second"]
splitEnd.textContent = lapObj["splitsecond"]



lapRecordsAdjust.push(lapObjAdjust) // pushes current time as integers for later use in calculating lap intervals
}}


function reset(){
if (pauseArray.length > 0){


  // clear main clock
      clearInterval(clock);
    time = 0;

    // clear small clock
    clearInterval(clock2);
    time2 = 0;

    // start array and lap arrays cleared
// startArray.pop()
 lapRecords = []
 lapRecordsAdjust = []
 console.log(startArray)
 

    // clear all lap arrays
 lapRecords = []
 lapRecordsAdjust = []
 actualLap = []
 pauseArray = []

    // clear all styles
 clearStylesReset()

if(lapSaveArray.length > 0){startArray.push('start');}

} }
    


const clearStylesReset = () =>{
// back to original colour
  pauseBtn.style.cssText = "background-color: rgb(170, 176, 179);"


  // change color and intermittently flash after changing the button opacity to '1' - but only if there are actual lap records - otherwise just keep the opacity the same and don't flash or change color - use switch statement below: 
  switch(lapSaveArray.length){
case 0: lapResetBtn.style.cssText = "opacity:0.4";
break;
default: lapResetBtn.style.cssText = "opacity:1;";
lapResetBtn.style.cssText = "background-color: rgb(99, 212, 235);";
lapResetBtn.style.animation = "flash 0.3s infinite";

  }


  // make sure we change opacity back to '1' for main clock because pause changes its opacity
clockEl.style.opacity = "1"
lapCounter.textContent = "00"
    // main time measures returned to value of zero
    secEl.textContent = "00";
    minEl.textContent = "00";
     hourEl.textContent = "00";
 splitLargeEl.textContent = "00";

 // clear lap clock
 smallSecEl.textContent = "00";
 smallMinEl.textContent = "00";
 smallHourEl.textContent = "00";
splitSmallEl.textContent = "00";

 // clear split clock
hourEnd.textContent= "00";
minEnd.textContent = "00";
secEnd.textContent = "00";
splitEnd.textContent = "00";
 
// delete flashing digit animation and restore original color
splitLargeEl.style.color = 'black';
secEl.style.color = 'black';
minEl.style.color = 'black';
hourEl.style.color = 'black';
sepElOne.style.color = 'black';
sepElTwo.style.color = 'black';

// clears the pause flashing animation
splitLargeEl.style.animation = ""; 
hourEl.style.animation = ""; 
minEl.style.animation = "";
secEl.style.animation = "";
sepElOne.style.animation = "";
sepElTwo.style.animation = "";

}



const pause = () =>{
  // pauses counter
  if (startArray.length > 0){
     clearInterval(clock); // stops clock
      pauseArray.push("pause")
      startArray.pop()
  
pauseStyle() // change sylings function    
  } }


// function for flashing digits on pause and colour change
const pauseStyle = () => {
  // new keyframe instance with target (DOM element to be animated, in this case it's the time elements)
  if(pauseArray.length > 0){

    startBtn.style.cssText = "background-color: rgb(170, 176, 179);";
    pauseBtn.style.cssText = "background-color: red;";


  clockEl.style.opacity = "0.5"
  splitLargeEl.style.color = 'rgba(204, 204, 204, 0.6)';
  secEl.style.color = 'rgba(204, 204, 204, 0.6)';
  minEl.style.color = 'rgba(204, 204, 204, 0.6)';
  hourEl.style.color = 'rgba(204, 204, 204, 0.6)';
  sepElOne.style.color = 'rgba(204, 204, 204, 0.6)';
  sepElTwo.style.color = 'rgba(204, 204, 204, 0.6)';
  
  splitLargeEl.style.animation = "pause 0.6s infinite"; 
  hourEl.style.animation = "pause 0.6s infinite"; 
  minEl.style.animation = "pause 0.6s infinite";
  secEl.style.animation = "pause 0.6s infinite";
  sepElOne.style.animation = "pause 0.6s infinite";
  sepElTwo.style.animation = "pause 0.6s infinite";
  
  // so this was taken from the CSS keyframes code
  }}
  
  
  
  
  
  

  

 
const lapTimeCalculate = (y) =>{

let lapCount = y-1; // this variable keeps track of lap number
if(lapCount < 10){lapCounter.textContent = "0" + lapCount}else{lapCounter.textContent = lapCount}
const lapDuration = lapTimes[y-1] - lapTimes[y-2]
lapTimeConvert(lapDuration) //use this array to recall lap times
}


const lapTimeConvert = (lapDuration) =>{

hundredthSecs = lapDuration; // the difference of most recent lap end time and lap end time prior to that - given in hudredths of a second
seconds = Math.floor(hundredthSecs/100)
   minutes = Math.floor(seconds/ 60) // converts seconds to minutes
 hours = Math.floor(minutes / 60)  // converts minutes to hours

// conversions for hundredths of a second > 99, seconds > 59, and minutes > 59
trueHundredthSecs = hundredthSecs - seconds*100
trueSecs = seconds - minutes*60
trueMins = minutes - hours*60
trueHours = hours// hours can run up to 99 since we're not using days as a measure - 
renderLapTime(trueHours, trueMins, trueSecs, trueHundredthSecs)
}




const renderLapTime = (hr, mn, sc, splsc) =>{
// now we render our worked out true times into the paragraph elements for the time measures, hours, minutes, seconds and split seconds
if(hr>9){smallHourEl.textContent = hr}else{smallHourEl.textContent = "0" + hr}

if(mn>9){smallMinEl.textContent = mn}else{smallMinEl.textContent = "0" + mn}

if(sc>9){smallSecEl.textContent = sc}else{smallSecEl.textContent = "0" + sc}

if(splsc>9){splitSmallEl.textContent = splsc}else{splitSmallEl.textContent = "0" + splsc}

saveLapTime(smallHourEl.textContent, smallMinEl.textContent, smallSecEl.textContent, splitSmallEl.textContent)
}

// pushing lap times to an array
const saveLapTime = (hr,mn,sc,splsc) =>{
// we'll get the lap number from the text content of the counter
 var lapNumber = parseInt(lapCounter.textContent)  + 1;



 // and now we'll add it to the object that has the relevant lap times
  let lapSaveObj = {
lap: lapNumber,
hour: hr,
min: mn,
sec: sc,
splitsec: splsc
  }

  console.log(lapSaveObj)
lapSaveArray.push(lapSaveObj)
console.log(lapSaveArray)
}

// lap recall function - quite complex so try to refactor later

const lapRecall = () =>{
  if(lapDisplayArr.length < 1 ){
    let lap = lapSaveArray.length;
    lapDisplayArr.push(lap -1)
    let lapLog = lapSaveArray[lapDisplayArr[0]]
  console.log(lapLog)
    smallHourEl.textContent = lapLog["hour"]
    smallMinEl.textContent = lapLog["min"]
    smallSecEl.textContent = lapLog["sec"]
    splitSmallEl.textContent = lapLog["splitsec"]

    let lapDigit = lapDisplayArr[0] + 1
    if(lapDigit < 10){
      lapCounter.textContent = "0" + lapDigit;
    }else{lapCounter.textContent = lapDigit}

    console.log(lapLog["hour"], lapLog["min"], lapLog["sec"], lapLog["splitsec"])
  }
  
  else{  if(lapDisplayArr[0] > 0){let newLap = lapDisplayArr[0] -1; lapDisplayArr.pop(); lapDisplayArr.push(newLap);
    console.log(lapDisplayArr);
  let lapChange = lapSaveArray[lapDisplayArr[0]]
    smallHourEl.textContent = lapChange["hour"]
    smallMinEl.textContent = lapChange["min"]
    smallSecEl.textContent = lapChange["sec"]
    splitSmallEl.textContent = lapChange["splitsec"]


let lapDigit = lapDisplayArr[0] + 1;
    if(lapDigit < 10){
      lapCounter.textContent = "0" + lapDigit;
    }else{lapCounter.textContent = lapDigit}
  
  
  
  }else{ // what should happen if the lap display array value = 0 - we should go back to rendering the first value. 
    lapDisplayArr.pop()
lapRecall()
// we just run the whole function again and because we used the lapsavearray's length as the parameter to get the specific array object, and the lapdisplay array is empty... the initial condition will apply, and it will use the length value all over again so we have it revolving. 

  }}

}


const lapClear = () =>{
if(lapSaveArray.length > 0){
  lapResetBtn.style.cssText = "background-color: rgb(170, 176, 179); opacity:0.4;";

  let lapsCount = lapSaveArray.length  // variable number of lap entries
  lapSaveArray.splice(0,lapsCount) // remove all lap entries starting at index 'zero' 
  console.log(lapSaveArray); // check array is empty
  startArray.pop() // clear start array so start button can be activated
  console.log(startArray) // check start array is empty
  
  // to prevent recall button activation when no lap record exists - because that scenario occurs when we use lap reset button
recallBtn.style.cssText = "z-index: -1; opacity:0.4;"

// lap dsplay needs clearing too, as well as lap counter
smallSecEl.textContent = "00";
smallMinEl.textContent = "00";
smallHourEl.textContent = "00";
splitSmallEl.textContent = "00";
lapCounter.textContent = "00";
lapTimes.splice(1, lapTimes.length);// leave just the first entry which is 'zero', so we can use it to subtract from first lap finish time, i.e. 'firstlap time' - 0; which will be the time of our first lap, otherwise if you clear the array, then you'll get the sum, 'first lap' - 'undefined' which will return NaN for the first lap time; which is not what we want.  
console.log(lapTimes)
}}