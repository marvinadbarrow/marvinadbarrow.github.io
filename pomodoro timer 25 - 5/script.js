// below are  the clock elements - you should be able to use the decreasing time value inside the workTime function to push the time values to the elements.  Alternatively you could have a separate function for the time elements to countdown, and from within that function run workTime with the decreasing time as a  parameter. 



let circleOneEl = document.getElementById('circle-1')
let circleTwoEl = document.getElementById('circle-2')

let studyEl = document.getElementById('lab-study')
let restEl = document.getElementById('lab-rest')


let minEl = document.getElementById('work-min')
let secEl = document.getElementById('work-sec')
let seperatorEl = document.getElementById('seperator')

// we're going to need a second timer - for the rest period
let restMinEl = document.getElementById('rest-min')
let restSecEl = document.getElementById('rest-sec')
let restSeperatorEl = document.getElementById('rest-seperator')

let startBtEl = document.getElementById('start-btn') // for styling button in js
let headingEl = document.getElementById('headpara')// for styling heading

let btnEl = document.getElementById('button-container')
// audios for start and stop
let startAudio = new Audio("boopstart.mp3")
let endAudio = new Audio("rules-sound.mp3")
let tenSecondAudio = new Audio("10 seconds.mp3")
let shortBoopAudio = new Audio("boops short b.mp3")
let longBoopAudio = new Audio("boops long b.mp3")

// work circle
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

// rest circle
const circle2 = document.querySelector('.progress-ring__circle2')
// we take the circumference and radius values from the work time circle because it's te same size
circle2.style.strokeDasharray = `${circumference} ${circumference}`;
circle2.style.strokeDashoffset = circumference;

let oneSecond = 1000 // conversion of milliseconds
let totalWorkTime = 1500;
let time = 0;
let totalRestTime = 300
let time2 = 0
let actualWorkTime; //adjusts start time to 1500 instead of 0
let actualRestTime; // adjusts rest time to 1500 instead of 0
var actualMinute; // renders current seconds above remaining minutes
var actualSecond; // renders remaining time in minutes
// function for working time 
var actualRestMinute;
var actualRestSecond;
studyEl.style.color = 'white'
restEl.style.color = 'white'


// function for work timer and progress circle
function workTimer (){
  btnEl.style.zIndex = -1;
  btnEl.style.opacity = 0;
startAudio.play();
 
clock = setInterval(function() {
time --;

if (time > -1501){

  // color of digits during non-zero countdown - CHECK HERE!
headingEl.style.color = 'rgb(29, 245, 62)'
  minEl.style.color = 'rgb(29, 245, 62)'
  secEl.style.color = 'rgb(29, 245, 62)'
  seperatorEl.style.color = 'rgb(29, 245, 62)'


  // circle stroke of progress circle
  circleOneEl.style.stroke = 'rgb(29, 245, 62)';

  // give the digits a bit of a glow
  minEl.style.textShadow = '1px 3px 4px white';
  secEl.style.textShadow = '1px 3px 4px white';
  seperatorEl.style.textShadow = '1px 3px 4px white';

  // color for 'study' instruction
  studyEl.style.color = 'rgb(29, 245, 62)'
  studyEl.style.textShadow = '1px 2px 2px white';



  actualWorkTime = time + 1501
    actualMinute = Math.floor(actualWorkTime/60)
     actualSecond = actualWorkTime - actualMinute*60

switch(actualWorkTime){// creates warning beeps on 5,4,3,2,1 and 0 seconds to warn of upcoming rest time

case 5:
case 4:
case 3:
case 2:
case 1:
case 0:
startAudio.play();}


  // digital display, minute and seconds texts
  minEl.textContent = actualMinute;
  secEl.textContent = actualSecond;
  if (actualSecond <  10){secEl.textContent = "0" + actualSecond} // adds a zero if seconds digits is less than 10
      if (actualMinute < 10){minEl.textContent = "0" + actualMinute} // adds a zero if minites digits is less than 10
 
const offset = time/totalWorkTime*circumference;
circle.style.strokeDashoffset = -offset;
}else{clearInterval(clock); restTimer(); time = 0; 
  minEl.textContent = "00";
  secEl.textContent = "00";
  minEl.style.color = 'white';
  secEl.style.color = 'white';
  seperatorEl.style.color = 'white';
  
  studyEl.style.color = 'white'
  studyEl.style.textShadow = 'none'
  minEl.style.textShadow = 'none';
  secEl.style.textShadow = 'none';
  seperatorEl.style.textShadow = 'none';
  circle.style.strokeDashoffset = circumference;
}
},1000)

}

 

// function for rest timer and progress circle
function restTimer(){
  startAudio.play();
  clock2 = setInterval(function() {
    time2--;
    if (time2 > -301){



      headingEl.style.color =  'rgb(247, 156, 45)'
      // color of digits during non zero countdown - CHECK HERE!
      restMinEl.style.color = 'rgb(247, 156, 45)'
      restSecEl.style.color = 'rgb(247, 156, 45)'
      restSeperatorEl.style.color = 'rgb(247, 156, 45)'
// circle stroke color
circleTwoEl.style.stroke = 'rgb(247, 156, 45)'
      // for the digit glow
restMinEl.style.textShadow = '1px 3px 4px white';
restSecEl.style.textShadow = '1px 3px 4px white';
restSeperatorEl.style.textShadow = '1px 3px 4px white';
// label color
restEl.style.color = 'rgb(247, 156, 45)'
restEl.style.textShadow = '1px 3px 4px white';

      actualRestTime = time2 + 301

     switch(actualRestTime ){ // creates warning beeps on 5,4,3,2,1 and 0 seconds to warn of upcoming work time
case 5:
case 4:
case 3:
case 2:
case 1:
shortBoopAudio.play();
break;
case 0: longBoopAudio.play(); 
}

            actualRestMinute = Math.floor(actualRestTime/60)
           actualRestSecond = actualRestTime - actualRestMinute*60
            console.log("")
            console.log(actualRestSecond)
    restMinEl.textContent = actualRestMinute;
  restSecEl.textContent = actualRestSecond;
  if (actualRestSecond < 10){restSecEl.textContent = "0" + actualRestSecond} // adds a zero if seconds digits is less than 10
  if (actualRestMinute < 10){restMinEl.textContent = "0" + actualRestMinute} // adds a zero if minites digits is less than 10


      const offset2 = time2/totalRestTime*circumference;
      circle2.style.strokeDashoffset = -offset2;

    }else{clearInterval(clock2); time2 = 0; workTimer(); time = 0;
      restMinEl.textContent = "00";
      restSecEl.textContent = "00";
      restMinEl.style.color = 'white';
      restSecEl.style.color = 'white';
      restSeperatorEl.style.color = 'white';
      restEl.style.color = 'white'
      
      restMinEl.style.color = 'white)'
      restSecEl.style.color = 'white)'
      restSeperatorEl.style.color = 'white)'

      // for the digit glow
restMinEl.style.textShadow = 'none';
restSecEl.style.textShadow = 'none';
restSeperatorEl.style.textShadow = 'none';
restEl.style.textShadow = 'none'
circle2.style.strokeDashoffset = circumference;
    }
  }, oneSecond);



}





/*
I've put the below funcion inside the setInterval --
function setProgress(percent) {
    //const offset = circumference - percent / 100 * circumference;
    const offset2 = circumference - percent*circumference;
    // for the offset we're using a decimal of the whole, 0-1, to give the offset.  so, for example where the input value is 35, then the offset will be 35/100 which is 0.35 multiplied by the circumfrerence or 0.35 of the circumference, or just over one third. 
    circle.style.strokeDashoffset = offset2;
  }


  const input = document.querySelector('input');
setProgress(input.value);

input.addEventListener('change', function(e) {
  if (input.value < 101 && input.value > -1) {
    setProgress(input.value);
  }  
})

*/
// you could create a timer which will change the percentage (you woul have to calculate the percentage of the time) Then perhaps with the offset of every 5 seconds, you can run the function  wwith the offset parameter every 5 seconds and see what happens. 