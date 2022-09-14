


// these are the variable for pulling the time measure values out of the hour,minute,second and hundredths of a second elements - just console log the variable with .textContent and it will display the current alue of each variable
let hourLap = document.getElementById('hour')
let minLap = document.getElementById('min')
let secLap = document.getElementById('sec')
let splitSecLap = document.getElementById('split-sec')

var startArray = []// start function only runs if this is empty
var pauseArray = []
var lapRecords = []
var lapRecordsAdjust = []
var actualLap = []

    
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
let timeEl = document.getElementsByClassName("time-el")
let splitEl = document.getElementById("split-sec")
let sepElOne = document.getElementById("sep-1")
let sepElTwo = document.getElementById("sep-2") 

// elements for lap clock
let smallHourEl = document.getElementById('small-hour')
let smallMinEl = document.getElementById('small-min')
let smallSecEl = document.getElementById('small-sec')
let smallSplitSecEl = document.getElementById('small-split-sec')


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
  lapClock()
    // delete flashing digit animation and restore original color
splitEl.style.color = 'black';
secEl.style.color = 'black';
minEl.style.color = 'black';
hourEl.style.color = 'black';
sepElOne.style.color = 'black';
sepElTwo.style.color = 'black';


splitEl.style.animation = ""; 
hourEl.style.animation = ""; 
minEl.style.animation = "";
secEl.style.animation = "";
sepElOne.style.animation = "";
sepElTwo.style.animation = "";


    splitEl.style.color = 'black';
splitEl.style.animation = ""; 
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
 

}
, 10)}}
// END OF TIME FUNCTION 







// function for flashing digits on pause
const pauseFlash = () => {
// new keyframe instance with target (DOM element to be animated, in this case it's the time elements)
if(pauseArray.length > 0){

splitEl.style.color = 'rgb(227, 16, 55)';
secEl.style.color = 'rgb(227, 16, 55)';
minEl.style.color = 'rgb(227, 16, 55)';
hourEl.style.color = 'rgb(227, 16, 55)';
sepElOne.style.color = 'rgb(227, 16, 55)';
sepElTwo.style.color = 'rgb(227, 16, 55)';

splitEl.style.animation = "pause 0.6s infinite"; 
hourEl.style.animation = "pause 0.6s infinite"; 
minEl.style.animation = "pause 0.6s infinite";
secEl.style.animation = "pause 0.6s infinite";
sepElOne.style.animation = "pause 0.6s infinite";
sepElTwo.style.animation = "pause 0.6s infinite";

// so this was taken from the CSS keyframes code
}}






function pause(){
    // pauses counter
    if (startArray.length > 0){
       clearInterval(clock); // stops clock
       clearInterval(clock2) // stops small clock
        pauseArray.push("pause")
        startArray.pop()
pauseFlash()
    } }



    // function for small clock lap time
    const lapClock = () =>{
      if (startArray.length > 0){time2 = 0} // if pressed while time main clock is running, i.e. when startArray contains an element this will return the small clock to zero so it can start counting the next lap. 


     clearInterval(clock2) // lap counter halts if pause button is pressed, because the lapClock() command is inside pause. Then when unpaused, i.e. when play is run again, the lap counter will begin where it left off because at the end of pause, startArray is emptied and therefore the lengths is not > 0 so the time will not return to zero as above

     
    clock2 = setInterval(function() {
      
      time2++; // increment by one second each time
      hundredthSecs = time2;
      seconds = Math.floor(hundredthSecs/100)
         minutes = Math.floor(seconds/ 60) // converts seconds to minutes
       hours = Math.floor(minutes / 60)  // converts minutes to hours
    
    
    // inputting vaulues into time measure. Note, when time goes over 60 seconds it will continue to increase so you'll end up with 61, 62, 63 etc; ;so we need to adjust for that. 
    trueHundredthSecs = hundredthSecs - seconds*100
    trueSecs = seconds - minutes*60
    trueMins = minutes - hours*60
    trueHours = hours// since timer is stopping at 2 hours we don't need to use trueHours. 
    
    
    smallSplitSecEl.textContent = trueHundredthSecs;
    smallSecEl.textContent = trueSecs;
    smallMinEl.textContent = trueMins;
    smallHourEl.textContent = "0" + hours; // since hours are less than 10, the added zero is to keep the display as a double digit
    
    
    // below we adjust for minutes < 10 and secons < 10 where the display would normally display only 'one' digit. We put a zero 'as a string' before the time value; 
    if (trueSecs < 10){smallSecEl.textContent = "0" + trueSecs}
    if (trueMins < 10){smallMinEl.textContent = "0" + trueMins}
    if(trueHundredthSecs < 10){smallSplitSecEl.textContent = "0" + trueHundredthSecs;}
    
    
    },10)}

function lapTime(){
   if(startArray.length > 0){

// this below function (lapClock) is for running the smaller stopwatch every time the lap button is activated

lapClock()

    // below are variables created for values taken from current time vaulues of hr, min, sec, split-sec (always in double digits)
   let hrL = hourLap.textContent; 
    let mnL = minLap.textContent;
   let sL = secLap.textContent;
   let ssL = splitSecLap.textContent;

   // this object holds the current time (how much time has elapsed, since the beginning, when lap button is pressed), as strings, from  each measure, hr min sec split.  These will be displayed alongside the respective lap intervals
let lapObj = {hour:hrL, 
    minute:mnL, 
    second:sL, 
    splitsecond:ssL,}

// object with lapObj values but as integers (NOT strings)
let lapObjAdjust = {
    hr: Number(hourLap.textContent), 
    mn: Number(minLap.textContent), 
    sec: Number(secLap.textContent), 
    split:Number(splitSecLap.textContent) }

    lapRecords.push(lapObj) // pushes current time as string to display later
    console.log(lapObj)
lapRecordsAdjust.push(lapObjAdjust) // pushes current time as integers for later use in calculating lap intervals
lapRecordsLog()
}}

function lapRecordsLog(){
    console.log(lapRecords)
    console.log(lapRecordsAdjust)
let truelap = {
hr:"",
mn:"",
sc:"",
spl:""

}

    for(i=1; i < lapRecordsAdjust.length; i++){

    
         let laphr =    lapRecordsAdjust[i]["hr"] - lapRecordsAdjust[i-1]["hr"]
        let lapmn  = lapRecordsAdjust[i]["mn"] - lapRecordsAdjust[i-1]["mn"]
        let lapsec =   lapRecordsAdjust[i]["sec"] - lapRecordsAdjust[i-1]["sec"]
         let lapsplit =    lapRecordsAdjust[i]["split"] - lapRecordsAdjust[i-1]["split"]
         

         if (lapmn < 0){lapmn += 60; laphr -= 1}
         if (lapsec < 0){lapsec += 60; lapmn -= 1}
         if (lapsplit < 0){lapsplit += 100, lapsec -= 1}
         console.log(laphr, lapmn, lapsec, lapsplit)
         
truelap.hr = laphr
truelap.mn = lapmn
truelap.sc = lapsec
truelap.spl = lapsplit





       
    }
    
 // note, for lap 1 we just need to use the first element of lapRecords, and then the subsequent laps will be made up of the values we get from the 'For Loop' in this function. 
 

actualLap.push(truelap) // lap intervals get pushed to this array
let lapObjString = actualLap.length; // creates variable which specifices the length of the lap interal array
logLaps((lapObjString - 1)) // then subtract '1', this will give the last index of the array; we push this to logLaps and use it to pull out the object from that last index, and we'll push that object with its entries to the div on the page, so each time a lap is pressed, the entry added to the lap interval array will be pushed to logLaps and rendered in the page div. 
}

// perhaps we can create a function that takes the takes the parameter i and creates a text node out of it and appends it to the paragraph which then will display in the div element. the 'i' parameter represents the last element of the actual lap array, which will change every time you run the lap function, so there cannot be repeats. CORRECT
var containerEl = document.getElementById("lap-container")// container for paragraph container
var lapEl = document.getElementById("laps-split-div");// container for paras
var paraNumEl = document.createElement("p");  // lap number para
var paraSplitEl = document.createElement("p"); // split duration para
var paraCurrentEl = document.createElement("p");// current num para





// let's style the lap div all in one go, instead of using the multiple entries- WORKS FINE

containerEl.style.cssText = 'margin:auto; width:510px; height:auto; padding-top:50px;'

lapEl.style.cssText = 'margin:auto; width: 450px; min-height:40px; max-height: 100px; overflow: clip; background-color:white; border-style:solid; border-radius: 5px; border-color: black; border-width: 2px; margin-top: -50px; position:relative; display:flex; flex-direction:row;' // note* we've set the height to 'auto', which will increase until it reaches 'max-height', and then we have overflow clipped so no scroll bars appear, but we'll try to introduce auto-scrolling. 

// styling for lap number para
paraNumEl.style.cssText = 'color: black; font-size: 30px; height:40px; max-width:2ch; text-decoration: underline; display:inline; margin-left:5px;'

// styling for split duration para
paraSplitEl.style.cssText = ' color: black; font-size: 30px;  height:40px; max-width:11ch; text-decoration: underline; display:inline; margin-left: 50px;'


// styling for current number para
paraCurrentEl.style.cssText = ' color: rgb(138, 144, 150); font-size: 30px;  height:40px; max-width:11ch; text-decoration: underline;display:inline; margin-left: 50px;'




// so clipped content scrolls - we'll activate this for > 3 lap records - we'll use x and y parameters, where x is zero as default and we can test y position with different values. 
const scrollLapEl = (x=0,y) => {
    lapEl.scrollTo(x, y);
    
  }



let hrString;
let mnString; 
let scString; 
let splString; 



let currentHour;
let currentMinute;
let currentSecond;
let currentSplitSecond;


function logLaps(y){
  // IMPORTANT! remember, every time this function runs, the 'y' parameter refers to the index of the last element in an array; actually the last element of actualLap; now that element might not correspond to the 'last' element of lapRecords so you'll have to check for that and adjust if needed. 

  

  currentHour = lapRecords[y].hour;
  currentMinute = lapRecords[y].minute;
  currentSecond = lapRecords[y].second;
  currentSplitSecond = lapRecords[y].splitsecond;

 

    if (y > 0){
        
        if (actualLap[y]["hr"] < 10){hrString = "0" + (actualLap[y]["hr"]).toString(10) + ":"}else{hrString = (actualLap[y]["hr"]).toString(10) + ":"}
        if(actualLap[y]["mn"] < 10){mnString = "0" + (actualLap[y]["mn"]).toString(10) + ":"}else{mnString = (actualLap[y]["mn"]).toString(10) + ":"}
        if(actualLap[y]["sc"] < 10){scString = "0" + (actualLap[y]["sc"]).toString(10) + ":"}else{scString =  (actualLap[y]["sc"]).toString(10) + ":"}
       if(actualLap[y]["spl"] < 10){splString = "0" + (actualLap[y]["spl"]).toString(10)}else{splString =  (actualLap[y]["spl"]).toString(10)}
       
        console.log(hrString,mnString,scString,splString)

        // Now we'll log to the console the key values of lapObj from lapRecords[1] onward. Variables set below. 

const lapNumNode = document.createTextNode((y+1) + "\r")


    const currentTimeNode = document.createTextNode(" " + currentHour + ":" + currentMinute + ":" + currentSecond +":" +  currentSplitSecond   + "\r")




    const splitTimeNode = document.createTextNode(hrString + mnString + scString + splString   + "\r")// takes the last entry of the lap inverval array and turns it into a text node; adding a space on the end
   
    console.log(lapNumNode, currentTimeNode, splitTimeNode) // for testing output
    
  

 
  paraNumEl.appendChild(lapNumNode); 
  paraSplitEl.appendChild(splitTimeNode);
  paraCurrentEl.appendChild(currentTimeNode);

  lapEl.appendChild(paraNumEl)
  lapEl.appendChild(paraSplitEl)
  lapEl.appendChild(paraCurrentEl)
  
  containerEl.appendChild(lapEl)

  
  console.log(lapEl)
  console.log(containerEl)
  

  

   // PROBLEM SOLVED - converted the nodes back to nodeValues, stitched together in spread operator function and then re-noded them into one line and appended 'that' so only one element needed. 

var spreadNodeText;
   // let's create a function with the text nodes are arguments and see if we can use spread operator and log them to the console. 




   function spreadNodes(...args){

// recreate a combined node from arguments 
spreadNodeText = document.createTextNode(args) 
// append notes to paragraph
lapEl.appendChild(spreadNodeText)
// hopefully this will provide a line break
//para.appendChild(br)
// append paragraph to div element


const lapNumNode = document.createTextNode((y+1) + "\r") // lap number taken from 'y'

   }  
   
  


// push the nodevalues of the created nodes to the function for spreading
  

   // if statement to determine scrollTo position, and overflow start for number element and lap element
  if(y > 0){scrollLapEl(0,40*y); lapEl.style.overflowY = "auto";

} // intries scroll by y*paragraph height; overflow immediately
 
}else{  const splitTimeNode2 = document.createTextNode(lapRecords[0]["hour"] + ":" +  lapRecords[0]["minute"] + ":" +  lapRecords[0]["second"] + ":" +  lapRecords[0]["splitsecond"]  + "\r")

const currentTimeNode2 =  document.createTextNode(" " +  lapRecords[0]["hour"] + ":" +  lapRecords[0]["minute"] + ":" +  lapRecords[0]["second"] + ":" +  lapRecords[0]["splitsecond"]  + "\r")

const lapNumNode = document.createTextNode((y+1) + "\r")



function spreadNodes(...args){

    //console.log(args)
    spreadNodeText = document.createTextNode(args)
    console.log(spreadNodeText)
  // paraCurrentEl.appendChild(spreadNodeText)
    //lapEl.appendChild(paraCurrentEl)

}

paraNumEl.appendChild(lapNumNode); 
paraSplitEl.appendChild(splitTimeNode2);
paraCurrentEl.appendChild(currentTimeNode2);

lapEl.appendChild(paraNumEl)
lapEl.appendChild(paraSplitEl)
lapEl.appendChild(paraCurrentEl)

containerEl.appendChild(lapEl)


console.log(lapEl)
console.log(containerEl)





//spreadNodes(paraNumEl.textContent,paraSplitEl.textContent, paraCurrentEl.textContent)
// NOTE*, the above values extracted from lapRecords[i] are the key values of the object (called lapObj) that have been pushed to lapRecords.  Each time 'lap' is pressed any duplicate key values are left alone, but new key values overwrite the previous ones; the updated object displays the current time - 
//if(y>0){lapEl.style.overflow = "auto"} // overflow kicks in from fourth entry onward
  }}










function reset(){
if (pauseArray.length > 0){
  // clear main clock
      clearInterval(clock);
    time = 0;

    // clear small clock
    clearInterval(clock2);
    time2 = 0;

    // all time measures returned to value of zero
    secEl.textContent = "00";
    minEl.textContent = "00";
     hourEl.textContent = "00";
 hundredthEl.textContent = "00";

 // small clock time measures cleared
 smallSecEl.textContent = "00";
 smallMinEl.textContent = "00";
 smallHourEl.textContent = "00";
smallSplitSecEl.textContent = "00";


 // start array and lap arrays cleared
 startArray.pop()
 lapRecords = []
lapRecordsAdjust = []


// delete flashing digit animation and restore original color
splitEl.style.color = 'black';
secEl.style.color = 'black';
minEl.style.color = 'black';
hourEl.style.color = 'black';
sepElOne.style.color = 'black';
sepElTwo.style.color = 'black';

splitEl.style.animation = ""; 
hourEl.style.animation = ""; 
minEl.style.animation = "";
secEl.style.animation = "";
sepElOne.style.animation = "";
sepElTwo.style.animation = "";

// clear all lap arrays
 lapRecords = []
 lapRecordsAdjust = []
 actualLap = []
 pauseArray = []

 // clear display of node information
 var node = document.getElementById('laps-div');
 lapEl.innerHTML = "";
 // this clears all paragraphs of text so our element returns to no-size
paraNumEl.textContent = ""
paraSplitEl.textContent = ""
paraCurrentEl.textContent = ""
} }
    


 









