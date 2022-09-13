


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


var clock;

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
 
    // delete flashing digit animation and restore original color
splitEl.style.color = 'white';
secEl.style.color = 'white';
minEl.style.color = 'white';
hourEl.style.color = 'white';
sepElOne.style.color = 'white';
sepElTwo.style.color = 'white';


splitEl.style.animation = ""; 
hourEl.style.animation = ""; 
minEl.style.animation = "";
secEl.style.animation = "";
sepElOne.style.animation = "";
sepElTwo.style.animation = "";


    splitEl.style.color = 'white';
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

splitEl.style.color = 'yellow';
secEl.style.color = 'yellow';
minEl.style.color = 'yellow';
hourEl.style.color = 'yellow';
sepElOne.style.color = 'yellow';
sepElTwo.style.color = 'yellow';

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
        pauseArray.push("pause")
        startArray.pop()
pauseFlash()
    } }


function lapTime(){
   
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
}

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
var para = document.createElement("p");
var paraNumEl = document.createElement("p"); // para for lap number
var lapEl = document.getElementById("laps-div");
var br = document.createElement("br")
var lapNumEl = document.getElementById('lap-number') // lap number element


// let's style the lap div all in one go, instead of using the multiple entries- WORKS FINE
lapEl.style.cssText = 'margin:auto; width: 400px; height:auto; max-height: 100px; overflow: clip; background-color:white; border-radius: 3px; border-color: black; border-width: 2px; margin-top: -100px; position:relative;' // note* we've set the height to 'auto', which will increase until it reaches 'max-height', and then we have overflow clipped so no scroll bars appear, but we'll try to introduce auto-scrolling. 

// we'll do the same with paragraph
para.style.cssText = 'color: black; font-size: 30px; margin-bottom: 5px;  height:40px;'

// styling of the lap number iv
lapNumEl.style.cssText = 'width:60px; height: auto;  background-color:white; border-radius: 2px; width: fit-content;max-height: 100px;'

// styling for lap number para
paraNumEl.style.cssText = 'color: black; font-size: 30px; margin-bottom: 5px; height:40px; max-width:2ch;'

// so clipped content scrolls - we'll activate this for > 3 lap records - we'll use x and y parameters, where x is zero as default and we can test y position with different values. 
const scrollLapEl = (x=0,y) => {
    lapEl.scrollTo(x, y);
    lapNumEl.scrollTo(x,y);
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

  console.log(currentHour, currentMinute, currentSecond, currentSplitSecond)


    if (y > 0){
        let stringY = (y+1).toString(10) // converts the index number to a string so we can use it as an indicator of which lap we are dealing with
        console.log(stringY)

    


        if (actualLap[y]["hr"] < 10){hrString = "0" + (actualLap[y]["hr"]).toString(10) + ":"}else{hrString = (actualLap[y]["hr"]).toString(10) + ":"}
        if(actualLap[y]["mn"] < 10){mnString = "0" + (actualLap[y]["mn"]).toString(10) + ":"}else{mnString = (actualLap[y]["mn"]).toString(10) + ":"}
        if(actualLap[y]["sc"] < 10){scString = "0" + (actualLap[y]["sc"]).toString(10) + ":"}else{scString =  (actualLap[y]["sc"]).toString(10) + ":"}
       if(actualLap[y]["spl"] < 10){splString = "0" + (actualLap[y]["spl"]).toString(10)}else{splString =  (actualLap[y]["spl"]).toString(10)}
       
        console.log(hrString,mnString,scString,splString)

        // Now we'll log to the console the key values of lapObj from lapRecords[1] onward. Variables set below. 




    const currentTimeNode = document.createTextNode(" " + currentHour + ":" + currentMinute + ":" + currentSecond +":" +  currentSplitSecond   + "\r")




    const node = document.createTextNode(hrString + mnString + scString + splString   + "\r")// takes the last entry of the lap inverval array and turns it into a text node; adding a space on the end
   
    console.log(node) // for testing output
    
  

 
  // para.appendChild(node) - we'll append spreadNodeText here instead
   // lapEl.appendChild(para) - temporarily suspending this
    // para2.appendChild(currentTimeNode) - use spreadNodeText
   // lapEl2.appendChild(para2) - as above 

   // PROBLEM SOLVED - converted the nodes back to nodeValues, stitched together in spread operator function and then re-noded them into one line and appended 'that' so only one element needed. 

var spreadNodeText;
   // let's create a function with the text nodes are arguments and see if we can use spread operator and log them to the console. 

   function spreadNodes(...args){

// recreate a combined node from arguments 
spreadNodeText = document.createTextNode(args) 
// append notes to paragraph
para.appendChild(spreadNodeText)
// hopefully this will provide a line break
//para.appendChild(br)
// append paragraph to div element
lapEl.appendChild(para)

const lapNumNode = document.createTextNode((y+1) + "\r") // lap number taken from 'y'
paraNumEl.appendChild(lapNumNode) // lap number append to num para
lapNumEl.appendChild(paraNumEl) // num para append to num element

   }
// push the nodevalues of the created nodes to the function for spreading
   spreadNodes(node.nodeValue,currentTimeNode.nodeValue)

   // if statement to determine scrollTo position, and overflow start for number element and lap element
  if(y > 0){scrollLapEl(0,40*y); lapEl.style.overflowY = "auto";
lapNumEl.style.overflowY = "auto";

} // intries scroll by y*paragraph height; overflow immediately
 
}else{  const node2 = document.createTextNode(lapRecords[0]["hour"] + ":" +  lapRecords[0]["minute"] + ":" +  lapRecords[0]["second"] + ":" +  lapRecords[0]["splitsecond"]  + "\r")

const currentTimeNode2 =  document.createTextNode(" " +  lapRecords[0]["hour"] + ":" +  lapRecords[0]["minute"] + ":" +  lapRecords[0]["second"] + ":" +  lapRecords[0]["splitsecond"]  + "\r")




function spreadNodes(...args){

    //console.log(args)
    spreadNodeText = document.createTextNode(args)
    console.log(spreadNodeText)
    para.appendChild(spreadNodeText)
    para.appendChild(br)
    lapEl.appendChild(para)

}
const lapNumNode = document.createTextNode((y+1) + "\r") // lap number taken from 'y'
paraNumEl.appendChild(lapNumNode) // lap number append to num para
lapNumEl.appendChild(paraNumEl) // num para append to num element

spreadNodes(node2.nodeValue,currentTimeNode2.nodeValue)
// NOTE*, the above values extracted from lapRecords[i] are the key values of the object (called lapObj) that have been pushed to lapRecords.  Each time 'lap' is pressed any duplicate key values are left alone, but new key values overwrite the previous ones; the updated object displays the current time - 
//if(y>0){lapEl.style.overflow = "auto"} // overflow kicks in from fourth entry onward
  }}


console.log(br)







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
 lapRecords = []
lapRecordsAdjust = []


// delete flashing digit animation and restore original color
splitEl.style.color = 'white';
secEl.style.color = 'white';
minEl.style.color = 'white';
hourEl.style.color = 'white';
sepElOne.style.color = 'white';
sepElTwo.style.color = 'white';

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
 node.innerHTML = "";
 // this clears all paragraphs of text so our element returns to no-size
para.textContent = ""
} }
    


 









