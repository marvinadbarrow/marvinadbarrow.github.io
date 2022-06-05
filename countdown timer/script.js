

// conversions for values pulled from hour, min, and second paragraphs for setting the time

var inputSeconds;// for setting seconds on timer
var inputMins;// for setting minutes on timer
var inputHours;// for setting hours on timer
let oneSecond = 1000 // conversion of milliseconds
inputSeconds = oneSecond
inputMins = 60*inputSeconds
inputHours = 60*inputMins
let timesetEl = document.getElementById("timeset")

    
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

let setElOne = document.getElementById("set-one")
let setElTwo = document.getElementById("set-two")
let setElThree = document.getElementById("set-three")
let setElFour = document.getElementById("set-four")
let setElFive = document.getElementById("set-five")
let setElSix = document.getElementById("set-six")


var timeArr = []; // for entries into time set fields

function input1(){
    numbEl = 1; 
    timeArr.unshift(numbEl);
    log();}

    
    
    function input2(){
    numbEl = 2;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input3(){
    numbEl = 3;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input4(){
    numbEl = 4;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input5(){
    numbEl = 5;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input6(){
    numbEl = 6;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input7(){
    numbEl = 7;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input8(){
    numbEl = 8;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input9(){
    numbEl = 9;
    timeArr.unshift(numbEl);
    log()}

    
    
    function input0(){
    numbEl = 0;
    timeArr.unshift(numbEl);
    log()}




function log(){
    if(timeArr.length < 7){
        if(timeArr.length<1){setElOne.textContent = "0"}
    else{setElOne.textContent = timeArr[0]}
    if(timeArr.length<2){setElTwo.textContent = "0"}
    else{setElTwo.textContent = timeArr[1]}
    if(timeArr.length<3){setElThree.textContent = "0"}
    else{setElThree.textContent = timeArr[2]}
    if(timeArr.length<4){setElFour.textContent = "0"}
    else{setElFour.textContent = timeArr[3]}
    if(timeArr.length<5){setElFive.textContent = "0"}
    else{setElFive.textContent = timeArr[4]}
    if(timeArr.length<6){setElSix.textContent = "0"}
    else{setElSix.textContent = timeArr[5]}}
    else{timeArr.shift()}

           
console.log(timeArr)

}    

function inputDel(){
    timeArr.shift();
    console.log(timeArr)
    log()
}


function inputSet(){ 
console.log(timeArr)
document.getElementById("timerset").style.display = "none";
}

function inputCncel(){
timeArr = []
console.log(timeArr);
setElOne.textContent = "0";
setElTwo.textContent = "0";
setElThree.textContent = "0";
setElFour.textContent = "0";
setElFive.textContent = "0";
setElSix.textContent = "0";
}

function timeset(){


    document.getElementById("timerset").style.display = "block";
}
/*

let setElOne = document.getElementById("set-one")
let setElTwo = document.getElementById("set-two")
let setElThree = document.getElementById("set-three")
let setElFour = document.getElementById("set-four")
let setElFive = document.getElementById("set-five")
let setElSix = document.getElementById("set-six")


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