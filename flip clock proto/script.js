
// create two arrays, one for number top and the other for number bottom

var numberTopArr = ['0-top.png', '1-top.png', '2-top.png', '3-top.png', '4-top.png', '5-top.png', '6-top.png', '7-top.png', '8-top.png', '9-top.png']
var numberBottomArr = ['0-bottom.png', '1-bottom.png', '2-bottom.png', '3-bottom.png', '4-bottom.png', '5-bottom.png', '6-bottom.png', '7-bottom.png', '8-bottom.png', '9-bottom.png']

let currentNumberArr = []
 let countBtn = document.getElementById('count-btn')
let frontTopEl = document.getElementById('front-front-el')
let frontBottomEl = document.getElementById('front-back-el')
let backTopEl = document.getElementById('back-front-el')
let backBottomEl = document.getElementById('back-back-el')
let flipAudio = new Audio('cardflip.mp3')

// array to hold times
let acDateArr = []
let startArray = [] // this will be used to determine if the initial clock face has been set up.  It it has, then 'startClock()' function, which sets the numbers will not run; instead display default will run because the numbers will already have been set up



const updateBackTop = () =>{
  //  console.log(currentNumberArr)
    backTopEl.style.cssText = `background-image:url(${numberTopArr[(currentNumberArr[0])%10]})`
   // setTimeout(displayDefault, 100); // flip for new number
}


const updateOpacity = () =>{ // return the front divs which are now in their original positions, and with updated numbers, to visible, ready for turning again
    frontBottomEl.style.opacity = '1'
    frontTopEl.style.opacity = '1'
setTimeout(updateBackTop,50);
}


// now it's time to reverse the rotation of the div which displayed the first number top hald, and the div which displayed the bottom half of the second number. 

const reverseRotations = () =>{

// reverse outer front div and change top current number top; and update the rear top number to the next number top
frontTopEl.style.animation = 'reverseTop'
frontTopEl.style.animationDuration = '0.05s'
frontTopEl.style.animationFillMode = 'forwards'
frontTopEl.style.backgroundImage = backTopEl.style.backgroundImage


// reverse inner front div and change bottom to next number bottom
frontBottomEl.style.animation = 'reverseBottom'
frontBottomEl.style.animationDuration = '0.05s'
frontBottomEl.style.animationFillMode = 'forwards'
frontBottomEl.style.cssText = `background-image:url(${numberBottomArr[(currentNumberArr[0])%10]})`
setTimeout(updateOpacity, 200);
}


// prior to clearing flaps the subsequent bottom number needs to be transfered from the front bottom flap to the back bottom flap whose number (the bottom half of the previously displayed number) is no longer needed
const transferNumbers = () =>{
// console.log('numbers transferring...')
backBottomEl.style.cssText = ` background-image:url(${numberBottomArr[(currentNumberArr[0] -1)%10]})`
frontBottomEl.style.opacity = '0'
frontTopEl.style.opacity = '0'
setTimeout( reverseRotations, 100);
}


const bottomHalf = () =>{
    
    frontBottomEl.style.animationDuration = '0.3s'
    frontBottomEl.style.animationFillMode = 'forwards'
    frontBottomEl.style.animationTimingFunction = 'ease-out'
    frontBottomEl.style.animationName = 'rotateBottom'
  setTimeout( transferNumbers, 200); // this will cause the transfer function to run after 2 seconds - 
}


const topHalf = () =>{
    currentNumberArr[0] += 1;
    frontTopEl.style.animationDuration = '0.2s'
    frontTopEl.style.animationFillMode = 'forwards'
    frontTopEl.style.animationTimingFunction = 'ease-out'
    frontTopEl.style.animationName = 'rotateTop'

    setTimeout( bottomHalf, 150); // slight delay so that bottom flap drops just as top flap is terminating giving the illusion of smooth continuity 
}

//  add event listesrn to HTML button to activate this function; this causes an X rotation of the top half of number of -90 degrees, giving the appearance of the top flap dropping down towards viewer, hiding the flap's number at 90 degrees and leaving the top half of the second number, which sits directly behind the first number's top half, exposed completely 


const displayDefault = () =>{
setTimeout(topHalf, 100);
}



const startCount = () =>{

  switch(startArray.length){
    case 1: 
    setTimeout(displayDefault, 100);
    break;
    default:
      startArray.push('started')
      let number = 0;
      let nextNumber = number + 1;
      frontTopEl.style.cssText = ` background-image:url(${numberTopArr[number%10]})`
  frontBottomEl.style.cssText = ` background-image:url(${numberBottomArr[(number + 1)%10]})`
  backTopEl.style.cssText = ` background-image:url(${numberTopArr[(number + 1)%10]})`
  backBottomEl.style.cssText = ` background-image:url(${numberBottomArr[number%10]})`
  currentNumberArr[0] = nextNumber;
    displayDefault(number)
  }
 

}











// CODING FOR 24 HOUR CLOCK - 

let flipClock
var timer = 0;
 var secondNow;  
var leapYears = 12
const hourSpring = 1
const hourFall = -1// hour for clocks back



const clockFunction = () =>{
 startCount()

    acDateArr = []
    let secondNow = Math.floor(Date.now() / 1000)// seconds since 1,1,1970
    let minuteNow = Math.floor(secondNow / 60)// minutes since 1,1,1970
    let hourNow = Math.floor(minuteNow / 60)// hours since 1,1,1970
    let dayNow = Math.floor(hourNow / 24)// days since 1,1,1970
   let yearNow = Math.floor(dayNow / 365)// years since 1,1,1970
     
   let ctyear = yearNow - 30 // year
   let ctDay = dayNow - yearNow*365 - leapYears // calc for current day 
    let cd = ctDay // abbrev for current day
    let ctHour = hourNow - dayNow*24 + hourSpring // calc for current hour
    let ctMinute = minuteNow - hourNow*60// calc for current minute
    let ctSecond = secondNow - minuteNow*60// calc for current second
  
    acDateArr.push(ctHour,ctMinute, ctSecond)
    console.log(ctHour,ctMinute, ctSecond)
    
 
}



 flipClock = setInterval(clockFunction, 1000);

