// variables for button colours
var lapBtn = document.getElementById('lap')
var pauseBtn = document.getElementById('pause')
var startBtn = document.getElementById('start')
var clockHideEl = document.getElementById('clock-hide')
// normal watch hands
var secHandNormalEl = document.getElementById('sec-hand-normal');
var minHandNormalEl = document.getElementById('min-hand-large');
var hourHandNormalEl = document.getElementById('hour-hand-large');

// make sure hand positions are set to zero for correctly aligned hands

secHandNormalEl.style.rotate = "0deg";
minHandNormalEl.style.rotate = "0deg";
hourHandNormalEl.style.rotate = "0deg";


var fall = -1; // when clocks go back
var spring = 1; // when clocks go forward

var clockInitiate = []; // prevents duplicate initiation
var tickInitialte = []; // helps for controlling tick on/off

// to start and stop ticking 'we'll add the buttons later' 
var tickStartEl = document.getElementById('tick-sound');
var tickOffEl = document.getElementById('tick-off');
// VARIABLES FOR CALCULATION OF TIME VALUES

// below are the variables for adjusting the time to show current hours, minutes and seconds..
var  secondNow; // seconds since 1,1,1970
var  minuteNow;// minutes since 1,1,1970
var  hourNow;// hours since 1,1,1970
var  dayNow;// days since 1,1,1970
var  yearNow;// years since 1,1,1970

// the variables for the actual year, day, hour, min, sec
var ctyear; // current year
var ctWeek; // current week
var ctDay; // current day
var ctHour; // current hour
var ctMinute; // current minute
var ctSecond; // current second
var totalHourDeg // gives the sum of current hours and minutes in degrees so that the hour hand shifts by half a degree every minute to give an accurate visual representation of the distrance from previous hour and distance to next hour. 



var t = 6 // NOTE; I MADE A BIG MISTAKE, I declared the variable 'i' outside of the functions, but then used 'i' inside of both and that caused a huge conflict with the dials moving in degrees I could not figure out.  Stumbled across the mistake because when I tried to console log the variable for current seconds, multiplied by i, i.e. ctSecond*i, it just read as 'zero' even though I checked that ctSecond by itself was increasing.... that's when it occurred to me that something was wrong with the 'i' variable and maybe it was because it was being used else where. So I decided to change it to 't' and it solved the problem; what a headache, that took over an hour to figure oiut. 

var j = 1/60 // this is a special calculation. We will change the hour hand but this amount value of degrees every second. After 10 seconds we will have traveled 1 degree, after 60, 6 degree, and therefore after 60 minutes (one hour), 6*60 degrees which is 360 degrees; and therefore, after one hour the hour hand will have travelled 60 degrees.  Since we're not interested in a 24 hour clock (we might add am and PM later) we need not worry about what happens at midnight.  If we add am/pm functionality, all we need to do is register read the hour from the ctHour variable and when it passes midnight indicate am, and then pm for when we pass midday.  

var k = 30; // just realized the mistake DOH! it's supposed to take 12 hours, not 1 hour, so we need to divide the original variable by 12, therefore j= 1/120. We might even have to add the current hour to the degrees because although it takes one hour for your . This means that your hour hand cannot begin any further than at 60/120 degrees, i.e. at a 1/2 degree. I think that only equates to one minute of time around the 12 hour scale; so you'll always start betweene 12:00 and 12:01.. So we have to add the hours in degrees. since there are 12 hours each hour must equate to 360/12 in degrees. That is 30 degrees for each hour, so we'll add each hour times 30 degrees, so let k = 30. // because the circle repeats, when we go over 12, hours, for example 13 hours, that will just be 12*30 degrees + 1*30 degrees which is 360 degrees, + 30 degrees, which works out to be the same spot as 1*30 degrees. it's just basically a revolution. 

var l = 1/2 // multiplied by minute measure this give half a degree per minute, which we can use to slowly move the hour hand, because 60 minutes times 1/2 degrees gives 30 degrees which is the exact angle of one hour's distance around the clock.  

var m = 1/10 // this is used as a multiple of seconds and is added to the minute distance.. 60 seconds of 1/10 gives six degrees so the minute hand will move sixty times at 1/10 degrees and complete the exact angle of one minute's distance around the clock.



// CLOCK FUNCTION
function clockStart (){
  
  // below condition prevents duplicate initiations of clock
  
 
clock = setInterval(function() {


 
if(tickInitialte.length > 0){

  tickAudio.play()
}
  
  // re-written the variable names for the current measures since 1971
  secondNow = Math.floor(Date.now() / 1000)
minuteNow  = Math.floor(secondNow / 60)
hourNow  = Math.floor(minuteNow / 60)
dayNow = Math.floor(hourNow / 24)
 yearNow = Math.floor(dayNow / 365)

// now for the current details. 
ctyear = yearNow - 30;
ctWeek = Math.floor(ctDay/7)
ctDay = dayNow - yearNow*365;
ctHour = (hourNow - dayNow*24) + spring;
ctMinute = minuteNow - hourNow*60;
ctSecond = secondNow - minuteNow*60;
var totalHourDeg = ctHour*k + ctMinute*l
var totalMinuteDeg = ctMinute*t + ctSecond*m
// now we have all of our measures to use with our clock hands; 

secHandNormalEl.style.cssText = `transform: rotate(${ctSecond*t}deg)`
//console.log(secHandNormalEl.style.cssText,i)
minHandNormalEl.style.cssText = `transform: rotate(${totalMinuteDeg}deg)`
hourHandNormalEl.style.cssText = `transform: rotate(${totalHourDeg}deg)`




},1000)   

}

 clockStart()










var startArray = []
var pauseArray = []
// conversions for values pulled from hour, min, and second paragraphs for setting the time

// audios for stopwatch start beep and ticking sound
var tickAudio = new Audio('clock tick 2.mp3');
var finishAudio = new Audio("boops long b.mp3")

// button elements
var startName = document.getElementById('start')
var pauseName = document.getElementById('pause')
var playEl = document.getElementById("play-btn")
var pauseEl = document.getElementById("pause-btn")

// stopwatch hands
var hourHandEl = document.getElementById('hour-hand')
var minHandEl = document.getElementById('min-hand')
var chronoSecEl = document.getElementById('chrono-sec-hand-large')
var splitHandEl = document.getElementById('split-hand')

// just making sure we can manipulate the hands, putting them back to zero degrees
hourHandEl.style.rotate = "0deg"
minHandEl.style.rotate = "0deg"
chronoSecEl.style.rotate = "0deg"
splitHandEl.style.rotate = "0deg"




var time = 0;
var tenthSeconds;
var seconds;
var minutes; 
var hours; 
var truetenthSeconds;
var trueSecs;
var trueMins;
var trueHours;
var i = 0;
var hourAdjust;
var minAdjust;
var secAdjust;



// STOPWATCH FUNCTION
function start(){ 
if(startArray.length < 1 && lapArr.length < 1){
   startArray.push("start");
   pauseBtn.style.backgroundColor = 'rgb(132, 210, 247)';
   startBtn.style.backgroundColor = 'red';
   console.log(startArray)
pauseArray.pop()
clock = setInterval(function() {
   // cleared to prevent duplication

   if(hideClockArr.length > 0){
    hourHandNormalEl.style.opacity = "0.25";
    minHandNormalEl.style.opacity = "0.25";
       }else{

    hourHandNormalEl.style.opacity = "1";
    minHandNormalEl.style.opacity = "1";
   }



   time++; // increment by one time 
   i+=1; // we'll multiply the increasing 'i' variable by a specific number of degrees and use the resulting

   // HIDING THE MAIN CLOCK - if the hideClockArr is empty then clock will display normally, otherwise hands will show at 0.25 opacity

  


  
   tenthSeconds = time;
   seconds = Math.floor(tenthSeconds/10)
      minutes = Math.floor(seconds/ 60) // converts seconds to minutes
    hours = Math.floor(minutes / 60)  // converts minutes to hours

    console.log()

// inputting vaulues into time measure. Note, when time goes over 60 seconds it will continue to increase so you'll end up with 61, 62, 63 etc; ;so we need to adjust for that. 
truetenthSeconds = tenthSeconds - seconds*10
trueSecs = seconds - minutes*60
trueMins = minutes - hours*60
trueHours = hours// since timer is stopping at 2 hours we don't need to use trueHours. 
hourAdjust = trueHours*30 + trueMins*0.5;
minAdjust = trueMins*12 + trueSecs*0.2;
secAdjust = trueSecs*6 + truetenthSeconds*0.6
console.log()



// now we have to match the revolutions of each hand with the correct measure but we'll put the condition in there that if our lap array has values in it, then use the values of the first three strings as the values for our second, minute and hour, degree values, otherwise use the above calculated values.. 
if(lapArr.length > 0){
  hourHandEl.style.rotate = lapArr[0];
  minHandEl.style.rotate = lapArr[1];
  chronoSecEl.style.rotate = lapArr[2];
  splitHandEl.style.rotate = lapArr[3]
}else{
hourHandEl.style.rotate = `${hourAdjust}deg`
minHandEl.style.rotate = `${minAdjust}deg`;
console.log() 
chronoSecEl.style.rotate = `${secAdjust}deg`
splitHandEl.style.rotate = `${truetenthSeconds*36}deg`
}
// all working fine the clock stops at the correct position


}, 100)}}
// END OF TIME FUNCTION 



const  pause = () =>{
    // pauses counter
    if (startArray.length > 0 && lapArr.length < 1){
       clearInterval(clock); // stops clock
       pauseBtn.style.backgroundColor = 'red'
       startBtn.style.backgroundColor = 'rgb(132, 210, 247)'
        pauseArray.push("pause")
        startArray.pop()
    } }






const  reset = () =>{
if (pauseArray.length > 0 && lapArr.length < 1){
    clearInterval(clock);
    time = 0;
    // all stopwatch hands returned to zero degree position
  startArray.pop()
  hourHandEl.style.rotate = "0deg"
minHandEl.style.rotate = "0deg"
chronoSecEl.style.rotate = "0deg"
splitHandEl.style.rotate = "0deg"
startBtn.style.backgroundColor = 'rgb(132, 210, 247)'
pauseBtn.style.backgroundColor = 'rgb(132, 210, 247)'

} }
    



// array for lap values and 'lap' function - 

const lapArr = []

const  lap = () =>{
// first condition ensures that lap timer can't be activated if stopwatch isn't running or is in paus
  if(startArray.length > 0){
if(lapArr.length < 1){
lapArr.push(hourHandEl.style.rotate, minHandEl.style.rotate, chronoSecEl.style.rotate, splitHandEl.style.rotate)
lapBtn.style.backgroundColor = 'red'
console.log(lapArr)

}else{ lapArr.splice(0,4); console.log(lapArr); lapBtn.style.backgroundColor = 'rgb(132, 210, 247)'
}
}

}


var hideClockArr = [] // array provides toggle for main hands 100% opacity or partial opacity




const hideClock = () => { // if play or pause is activated, then the button press will highlight the button yellow and push the string value 'hide clock' to the hideClockArr. Otherwise
if(startArray.length > 0 || pauseArray.length > 0){
if(hideClockArr.length < 1){
  hideClockArr.push('hide clock');
  clockHideEl.style.backgroundColor = "yellow";
  }else{hideClockArr.splice(0,1);
    clockHideEl.style.backgroundColor = "rgb(132, 210, 247)";
  }

}
hideFunction() // this will rund the function 
}




// function to actually hide or reveal the watch minute and hour hand to facilitate viewing of the stopwatch subdials
const hideFunction = () =>{
  if(hideClockArr.length > 0){
    hourHandNormalEl.style.opacity = "0.25";
    minHandNormalEl.style.opacity = "0.25";
       }else{

    hourHandNormalEl.style.opacity = "1";
    minHandNormalEl.style.opacity = "1";
   }


}