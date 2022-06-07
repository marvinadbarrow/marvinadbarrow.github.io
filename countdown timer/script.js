var secondsInput;
var secondsInputArray = []
var startArray = []
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
let pauseName = document.getElementById('reset')
const leapYears = 12 // leap years since 1970
const hourSpring = 1// hour  for clocks forward
const hourFall = -1// hour for clocks back


var secString; // collects seconds as string from array
var minString; // collects minutes as string from array
var hourString; // collects hours as string from array

let setElOne = document.getElementById("set-one")
let setElTwo = document.getElementById("set-two")
let setElThree = document.getElementById("set-three")
let setElFour = document.getElementById("set-four")
let setElFive = document.getElementById("set-five")
let setElSix = document.getElementById("set-six")

var secStringSec; // variable for parsed seconds string given in seconds
var minStringSec // variable for parsed minutes string given in seconds
var hourStringSec // variable for parsed hours string given in seconds

var clock;


var minutes; 
var hours; 




function inputSet(){ 
   
    // below are used to create a string from unit and tens paragraphs of second, minute and hour positions in timeArr
secString = setElTwo.textContent + setElOne.textContent
minString = setElFour.textContent + setElThree.textContent
hourString = setElSix.textContent + setElFive.textContent
secStringSec = parseInt(secString)
minStringSec = parseInt(minString)*60
hourStringSec = parseInt(hourString)*60*60
// these are the results for hours, minutes and seconds rendered as secons
    console.log(secStringSec + "s")
    console.log(minStringSec + "s")
    console.log(hourStringSec + "s")
// so now when we enter these values, our minutes and hours entries will show as seconds. Now all we have to do is add all of these three values together and use that as our 'seconds' variable inside our timer. We are adding all of these three variables,  secStringSec, minStringSec and hourStringSec, because they represent seperate time values; the value of hours given in seconds, the value of minutes given in seconds and the seconds value. EXAMPLE. 2 hours, 10 minutes and 15 seconds should return 3600*2 + 10*60 + 15 seconds, that is 7815 seconds .. we'll give this sum a new variable called secondsInput

secondsInput = secStringSec + minStringSec + hourStringSec;
console.log(secondsInput)
secondsInputArray.push(secondsInput)
console.log(secondsInputArray[0] + 1)
// we can now use this as our time variable and it 'should' display correctly but we'll test it first by manually putting in that time 
// it came out as 130 mins and 15 seconds. so try 130*60 + 15. that is correct. So we need to adjust the minutes values to reflect hours.  Probably hours = hours - mathfloor(minute/60)*60 --
document.getElementById("timerset").style.display = "none";
}

function inputCncel(){

document.getElementById("timerset").style.display = "none";
}

function timeset(){
    document.getElementById("timerset").style.display = "block"; 
    pauseName.style.backgroundColor = " rgb(132, 210, 247)";
}


function deleteTimer(){
    secondsInputArray = []
    timeArr = []
    console.log(timeArr);
    console.log(secondsInputArray);

setElOne.textContent = "0";
setElTwo.textContent = "0";
setElThree.textContent = "0";
setElFour.textContent = "0";
setElFive.textContent = "0";
setElSix.textContent = "0";

 hourEl.textContent = "00"// resets hour display to zero
minEl.textContent ="00"// resets minute display to zero
 secEl.textContent = "00" // resets seonds display to zero

    
}





// BEGINNING OF TIME FUNCTION will only work if time is set, or timer is paused after initial start; preventing duplicate activation
function start(){ if(startArray.length < 1 && secondsInputArray.length > 0){
    pauseName.style.backgroundColor = " rgb(132, 210, 247)";
startName.style.backgroundColor = "red"; // start button becomes red
startArray.push("started")


clock = setInterval(function() {
    clockElements = [] // cleared to prevent duplication

  secondsInputArray[0]--; // decrement by one second each time
minutes = Math.floor((secondsInputArray[0])/ 60) // converts seconds to minutes
hours = Math.floor(minutes / 60)  // converts minutes to hours
  secReformat = secondsInputArray[0] - Math.floor(secondsInputArray[0]/60)*60
  minReformat = minutes - Math.floor(minutes/60)*60
  hourReformat = hours - Math.floor(hours/60)*60
  // when timer reaches zero
if(secondsInputArray[0] === 0){ audio1.play();clearInterval(clock);
    secEl.textContent = "00";
    clearTimer()}

    // digits below 9 become double digits
    if (secReformat < 10){secEl.textContent = "0" + secReformat;}
else{secEl.textContent = secReformat;}
    if (minReformat < 10){minEl.textContent = "0" + minReformat;}
else{minEl.textContent = minReformat;}
if (hourReformat < 10){hourEl.textContent = "0" + hourReformat;}
else{hourEl.textContent = hourReformat;}

}
, oneSecond)

}}
// END OF TIME FUNCTION 



function inputDel(){
    timeArr.shift();
    console.log(timeArr)
    log()
}






function stop(){
     // resets counter
     startArray = []
    clearInterval(clock); // stops clock
     clearTimer() // see function below
     pauseName.style.backgroundColor = "red";
    }

// clears reset all fields
function clearTimer(){
    //hourEl.textContent = "00"// resets hour display to zero
    //minEl.textContent ="00"// resets minute display to zero
      //  secEl.textContent = "00" // resets seonds display to zero
    startName.textContent = "START" // start btn to original state
    startName.style.backgroundColor = " rgb(132, 210, 247)";
    // start button to original colour
}






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