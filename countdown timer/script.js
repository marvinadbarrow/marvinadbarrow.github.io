




var secondsInput;
var secondsInputArray = []
var startArray = []
var outsideTime = []
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
let pauseName = document.getElementById('pause')
let playEl = document.getElementById("play-btn")
let pauseEl = document.getElementById("pause-btn")
const leapYears = 12 // leap years since 1970
const hourSpring = 1// hour  for clocks forward
const hourFall = -1// hour for clocks back


var secString; // collects seconds as string from array
var minString; // collects minutes as string from array
var hourString; // collects hours as string from array

let setElOne = document.getElementById("set-one") //settime input 
let setElTwo = document.getElementById("set-two") //settime input 
let setElThree = document.getElementById("set-three")//settime input 
let setElFour = document.getElementById("set-four")//settime input 
let setElFive = document.getElementById("set-five")//settime input 
let setElSix = document.getElementById("set-six")//settime input 

var secStringSec; // variable for parsed seconds string given in seconds
var minStringSec // variable for parsed minutes string given in seconds
var hourStringSec // variable for parsed hours string given in seconds
var savedTimes = []
var savesArrArr = [] // this stores saved hr/min/sec times, taken from our localStorage each time the page is refreshed. We'll only hold five for the moment. 

// to display saved hour/min/sec saved time element
let saveHourEl = document.getElementById("save-hour")
let saveMinEl = document.getElementById("save-min")
let saveSecEl = document.getElementById("save-sec")


var clock;


var minutes; 
var hours; 




function inputSet(){ 
   
    secondsInputArray = []
    timeArr = []   
    outsideTime = []
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
outsideTime.push(secondsInput)
// we can now use this as our time variable and it 'should' display correctly but we'll test it first by manually putting in that time 
// it came out as 130 mins and 15 seconds. so try 130*60 + 15. that is correct. So we need to adjust the minutes values to reflect hours.  Probably hours = hours - mathfloor(minute/60)*60 --
document.getElementById("timerset").style.display = "none";

// below code takes the individual entries in the settime paragraphs and sets them as the text content in the hour, minute and second displays. so the the displays will get a combination of tens and units for each measure; tens and units of minutes, hours, and seconds. The zeros appear because I have set the text content as zero for the fields if the corresponding position in 'timeArr' has no entry. 
secEl.textContent = setElTwo.textContent + setElOne.textContent 
minEl.textContent  = setElFour.textContent + setElThree.textContent 
hourEl.textContent  = setElSix.textContent + setElFive.textContent 


}

var saveSeconds; // sum of hours, seconds and minutes given in seconds

// variables containing location saved data; each saveSeconds item
var save1  = localStorage.getItem('save1');
var save2  = localStorage.getItem('save2');
var save3  = localStorage.getItem('save3');
var save4  = localStorage.getItem('save4');
var save5  = localStorage.getItem('save5');
var save6  = localStorage.getItem('save6');
var save7  = localStorage.getItem('save7');
var save8  = localStorage.getItem('save8');
var save9  = localStorage.getItem('save9');
var save10  = localStorage.getItem('save10');

function saveTime(){
    saveSeconds = secStringSec + minStringSec + hourStringSec
   savedTimes.push(saveSeconds)
    console.log(saveSeconds)
//if (savedTimes.length>2){savedTimes.shift()}
    //console.log(savedTimes)
// we can give conditions to each local storage item. So for the first, we can set the first local storage if savedTimes.length > 0 and then we can set the second local storage if savedTimes.length > 1 etc... this is like the order thing we learned recently (maybe we could even use the switching method)
if (savedTimes.length>0 && !save1){localStorage.setItem('save1', saveSeconds)}

 else if (savedTimes.length>0 && !save2){!localStorage.setItem('save2', saveSeconds)}

 else if (savedTimes.length>0 && !save3){!localStorage.setItem('save3', saveSeconds)}

 else if (savedTimes.length>0 && !save4){!localStorage.setItem('save4', saveSeconds)}

 else if (savedTimes.length>0 && !save5){!localStorage.setItem('save5', saveSeconds)}
    
}


// shows which times are saved, in the console. You now need to actually be able to push those times to the save-el fields



console.log(save1) //these appear in black on console so are strings
console.log(save2)
console.log(save3)
console.log(save4)
console.log(save5)



// might not need this let time1 = parseInt(savedTimes[0])

if (savedTimes.length > 0){
// this code loops teh savedTimes array and returns hours, mins and seconds for each 'i'
for (i=0; i<savedTimes.length; i++){
    let hours = Math.floor(parseInt(savedTimes[i])/3600)
    let subtractHours = parseInt(savedTimes[i])  - hours*3600
    let remainingMinutes =  Math.floor(subtractHours/60)
    let remainingSeconds = subtractHours - remainingMinutes*60
    console.log(hours, remainingMinutes, remainingSeconds)
    // now we can push these to an array
    savesArrArr.push([hours,remainingMinutes,remainingSeconds])
    if (savesArrArr.length>4){
    console.log(savesArrArr)}
    if(savesArrArr.length>5){savesArrArr.length === 5}
    }}

// we now need to find a way to recall them, i'd like to loop through them each time we press a button. 
function showSaves(){
    console.log(savesArrArr)
saveHourEl.textContent = savesArrArr[0][0]
saveMinEl.textContent = savesArrArr[0][1]
saveSecEl.textContent = savesArrArr[0][2]
}




// these five functions push the saved times to the secondsinput array so we can dictate which of them is used for the timer
function timerOne(){
secondsInputArray.unshift(savedTimes[0])
}

function timerTwo(){
secondsInputArray.unshift(savedTimes[1])
}
    
function timerThree(){
secondsInputArray.unshift(savedTimes[2])
}
        
function timerFour(){
secondsInputArray.unshift(savedTimes[3])
}
        
function timerifve(){
secondsInputArray.unshift(savedTimes[4])
}
        
// below we are going to try to use query selector to separate all of the save time containers (five of them), so that we can allocate each saved time in the secondsInputArray to oone container and distribute seconds, minutes and hours appropriately, only to that specific container. Didn't work because you have multiple identical id's for different elements. Perhaps we can just have one time element and flip through the saved times with one button? 


















function inputCncel(){

document.getElementById("timerset").style.display = "none";
}

function timeset(){ if (startArray.length < 1){
    document.getElementById("timerset").style.display = "block"; 
    pauseName.style.backgroundColor = " rgb(132, 210, 247)";

}}


function deleteTimer(){ if (startArray.length < 1){
    pauseName.style.backgroundColor = " rgb(132, 210, 247)";
    secondsInputArray = []
    timeArr = []
    console.log(timeArr);
    console.log(secondsInputArray);
    outsideTime = []
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

// reformats mins and secs, if secs > 60 or mins > 60
  secReformat = secondsInputArray[0] - Math.floor(secondsInputArray[0]/60)*60
  minReformat = minutes - Math.floor(minutes/60)*60
  hourReformat = hours - Math.floor(hours/60)*60
  // when timer reaches zero
if(secondsInputArray[0] === 0){ audio1.play();clearInterval(clock);
    secEl.textContent = "00";
    clearTimer()}

    // digits below 9 become double digits for all time measures, we simply add a zero to the LHS of the display, next to the single number already displayed. 
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


function reset(){
startArray = []
    clearInterval(clock);
    console.log(outsideTime)
    trueSeconds = outsideTime[0]
    secondsInputArray.unshift(trueSeconds)
    console.log(secondsInputArray[0])
 

    // test
    secEl.textContent = setElTwo.textContent + setElOne.textContent 
    minEl.textContent  = setElFour.textContent + setElThree.textContent 
    hourEl.textContent  = setElSix.textContent + setElFive.textContent
    pauseName.style.backgroundColor = " rgb(132, 210, 247)";
    startName.style.backgroundColor = " rgb(132, 210, 247)";
}



function inputDel(){
    timeArr.shift();
    console.log(timeArr)
    log()
}






function pause(){
     // pauses counter
     if (startArray.length > 0){
     startArray = []
    clearInterval(clock); // stops clock
     clearTimer() // see function below
     pauseName.style.backgroundColor = "red";
     
    }}

// clears reset all fields
function clearTimer(){
    //hourEl.textContent = "00"// resets hour display to zero
    //minEl.textContent ="00"// resets minute display to zero
      //  secEl.textContent = "00" // resets seonds display to zero
    
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