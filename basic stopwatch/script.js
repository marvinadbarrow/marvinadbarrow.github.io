





var startArray = []
var pauseArray = []
// conversions for values pulled from hour, min, and second paragraphs for setting the time


    
let endAudio = new Audio("boops short b.mp3")
let finishAudio = new Audio("boops long b.mp3")
let hourEl = document.getElementById('hour')
let minEl = document.getElementById('min')
let secEl = document.getElementById('sec')
let hundredthEl = document.getElementById('split-sec')
let startName = document.getElementById('start')
let pauseName = document.getElementById('pause')
let playEl = document.getElementById("play-btn")
let pauseEl = document.getElementById("pause-btn")



var secString; // collects seconds as string from array
var minString; // collects minutes as string from array
var hourString; // collects hours as string from array


// to display saved hour/min/sec saved time element
let saveHourEl = document.getElementById("save-hour")
let saveMinEl = document.getElementById("save-min")
let saveSecEl = document.getElementById("save-sec")
let timeSaveEl = document.getElementById("timesave-el-outer")
var saveTimeArr = [] // stores localStorage values in zero'th position
var clock;









var saveSeconds; // sum of hours, seconds and minutes given in seconds

// variables containing location saved data; each saveSeconds item - we can use this for laps

var save1  = parseInt(localStorage.getItem('save1'));
var save2  = parseInt(localStorage.getItem('save2')) ;
var save3  = parseInt(localStorage.getItem('save3')) ;
var save4  = parseInt(localStorage.getItem('save4')) ;
var save5  = parseInt(localStorage.getItem('save5')) ;


// shows which times are saved, in the console. You now need to actually be able to push those times to the save-el fields
var time = 0;
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
    endAudio.play();
startArray.push("start")
pauseArray.pop()
clock = setInterval(function() {
   // cleared to prevent duplication

   time++; // decrement by one second each time
   
    
   hundredthSecs = time;
   seconds = Math.floor(hundredthSecs/100)
      minutes = Math.floor(seconds/ 60) // converts seconds to minutes
    hours = Math.floor(minutes / 60)  // converts minutes to hours
 

// inputting vaulues into time measure. Note, when time goes over 60 seconds it will continue to increase so you'll end up with 61, 62, 63 etc; ;so we need to adjust for that. 
trueHundredthSecs = hundredthSecs - seconds*100
trueSecs = seconds - minutes*60
trueMins = minutes - hours*60
trueHours = hours// since timer is stopping at 2 hours we don't need to use trueHours. 


hundredthEl.textContent = trueHundredthSecs;
secEl.textContent = trueSecs;
minEl.textContent = trueMins;
 hourEl.textContent = "0" + hours; // since hours are less than 10, the added zero is to keep the display as a double digit


// below we adjust for minutes < 10 and secons < 10 where the display would normally display only 'one' digit. We put a zero 'as a string' before the time value; 
if (trueSecs < 10){secEl.textContent = "0" + trueSecs}
if (trueMins < 10){minEl.textContent = "0" + trueMins}
if(trueHundredthSecs < 10){hundredthEl.textContent = "0" + trueHundredthSecs;}


/* below is for if you wish to have the stopwatch run to a specific time. 
switch(time/100){
case 7196:
case 7197:
case 7198:
case 7199:
    endAudio.play();
    break;
case 7200: 
finishAudio.play();
break;
case 7201:
clearInterval(clock);
time = 0
    // all time measures returned to value of zero
    secEl.textContent = "00";
    minEl.textContent = "00";
     hourEl.textContent = "00";
 hundredthEl.textContent = "00";
 startArray.pop()
    }
*/
    // digits below 9 become double digits for all time measures, we simply add a zero to the LHS of the display, next to the single number already displayed. 


  

}
, 10)}}
// END OF TIME FUNCTION 



function pause(){
    // pauses counter
    if (startArray.length > 0){
       clearInterval(clock); // stops clock
        pauseArray.push("pause")
        startArray.pop()
    } }






function reset(){
if (pauseArray.length > 0){
    clearInterval(clock);
    time = 0;
    // all time measures returned to value of zero
    secEl.textContent = "00";
    minEl.textContent = "00";
     hourEl.textContent = "00";
 hundredthEl.textContent = "00";
 startArray.pop()

} }
    












