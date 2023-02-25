var secHandEl = document.getElementById('sec-hand');
var minHandEl = document.getElementById('min-hand');
var hourHandEl = document.getElementById('hour-hand');
var clockInitiate = []; // prevents duplicate initiation
var tickInitialte = []; // helps for controlling tick on/off
var slideArr = [];
var applicationEl = document.getElementById('wall-mount');

var tickStartEl = document.getElementById('tick-sound');
var tickOffEl = document.getElementById('tick-off');
var headingEl = document.getElementById('headpara');
var btnEl = document.getElementById('button-container');
var sliderContainerEl = document.getElementById('slider-container');
var volumeSlideEl = document.getElementById('volume-slider');
var footerEl = document.getElementById('main-footer')
// above used to highlight buttons to activate/deactivate ticking

var volumeCntContainer = document.getElementById('volume-control-container')
var tickAudio = new Audio('clock tick 2.mp3'); // tick sound given variable for volume control purposes
tickAudio.volume = 0.5; // the default volume set to halfway

volumeSlideEl.addEventListener("change", function(e) {
  tickAudio.volume = e.currentTarget.value / 100;
}); // moving the slider will change the volume of the ticking up or down since 0 <= volume <= 100, which was set in the html element markup






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

// TICK SOUND function - if tickInitiate array is empty, push string to array - then setInterval will detect the entry on the next iteration and start ticking on every iteration from then on
tickStartEl.addEventListener('click', (e) => {
    if (!tickInitialte[0]){
  tickInitialte.push('tick');
  tickStartEl.style.zIndex = "0";
  tickOffEl.style.zIndex = "1";
  volumeSlideEl.style.opacity = "1"
 }
  
})

// function to DEACTIVATE ticks - this empties the tickInitiate array if it contains a value and so the setInter
tickOffEl.addEventListener('click', (e) => {
  if (tickInitialte[0]){
tickInitialte.pop();
volumeCntContainer.style.opacity = "0";
tickStartEl.style.zIndex = "1";
tickOffEl.style.zIndex = "0";
volumeSlideEl.style.opacity = "0"

}
})

applicationEl.addEventListener('mouseover', (e) =>{
  if(volumeCntContainer.style.opacity = "0"){
    volumeCntContainer.style.opacity = "1";
    }})


  footerEl.addEventListener('mouseover', (e) =>{
  if (volumeCntContainer.style.opacity = "1"){
    volumeCntContainer.style.opacity = "0";
    
  }})




var fall = -1; // when clocks go back
var spring = 1; // when clocks go forward

var i = 6
var j = 1/60 // this is a special calculation. We will change the hour hand but this amount value of degrees every second. After 10 seconds we will have traveled 1 degree, after 60, 6 degree, and therefore after 60 minutes (one hour), 6*60 degrees which is 360 degrees; and therefore, after one hour the hour hand will have travelled 60 degrees.  Since we're not interested in a 24 hour clock (we might add am and PM later) we need not worry about what happens at midnight.  If we add am/pm functionality, all we need to do is register read the hour from the ctHour variable and when it passes midnight indicate am, and then pm for when we pass midday.  

var k = 30; // just realized the mistake DOH! it's supposed to take 12 hours, not 1 hour, so we need to divide the original variable by 12, therefore j= 1/120. We might even have to add the current hour to the degrees because although it takes one hour for your . This means that your hour hand cannot begin any further than at 60/120 degrees, i.e. at a 1/2 degree. I think that only equates to one minute of time around the 12 hour scale; so you'll always start betweene 12:00 and 12:01.. So we have to add the hours in degrees. since there are 12 hours each hour must equate to 360/12 in degrees. That is 30 degrees for each hour, so we'll add each hour times 30 degrees, so let k = 30. // because the circle repeats, when we go over 12, hours, for example 13 hours, that will just be 12*30 degrees + 1*30 degrees which is 360 degrees, + 30 degrees, which works out to be the same spot as 1*30 degrees. it's just basically a revolution. 

var l = 1/2

// function for clock start
function clockStart (){
  clockInitiate.push('start')
  // below condition prevents duplicate initiations of clock
  if(clockInitiate.length < 2){
 
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

// now we have all of our measures to use with our clock hands

secHandEl.style.cssText = `transform: rotate(${ctSecond*i}deg)`
minHandEl.style.cssText = `transform: rotate(${ctMinute*i}deg)`
hourHandEl.style.cssText = `transform: rotate(${totalHourDeg}deg)`
console.log(totalHourDeg)


},1000)   }

}

 clockStart()
// in order to get the clock hands to match the currennt time you'll need to use the variables i, j and k to match with the seconds, minutes and hours digits.  For example, as the minute seconds are counting, you would perhaps need to make the angle for the seconds hand times ias rotate actualseconds*i.  So we won't need to change 'i' anymore because i=6 will be multiplied by the seconds so at seconds = 0, we'll get 0*i = 0 so zero degrees, but at seconds = 1 we'll have 1*i, = 1*6, so 6 degrees which is correct... AND, then there's no need for the convoluted time changes.  The function here might be good for a stopwatch but we night not even need to do that either.. we can probably just use hour, minute and seconds multiplied by i, j and k respectively.. 



  



