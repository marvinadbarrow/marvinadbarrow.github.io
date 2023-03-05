
// create two arrays, one for number top and the other for number bottom

var numberTopArr = ['0-top.png', '1-top.png', '2-top.png', '3-top.png', '4-top.png', '5-top.png', '6-top.png', '7-top.png', '8-top.png', '9-top.png']
var numberBottomArr = ['0-bottom.png', '1-bottom.png', '2-bottom.png', '3-bottom.png', '4-bottom.png', '5-bottom.png', '6-bottom.png', '7-bottom.png', '8-bottom.png', '9-bottom.png']

let currentNumberArr = []
let currentSecondArr = []
// unit seconds elements
let frontTopSecs = document.getElementById('front-outer-secs')
let frontBottomSecs = document.getElementById('front-inner-secs')
let backTopSecs = document.getElementById('back-inner-secs')
let backBottomSecs = document.getElementById('back-outer-secs')


// tens of seconds elements
let frontTopTens = document.getElementById('front-outer-tens')
let frontBottomTens = document.getElementById('front-inner-tens')
let backTopTens = document.getElementById('back-inner-tens')
let backBottomTens = document.getElementById('back-outer-tens')

// unit minutes elements
let frontTopMins = document.getElementById('front-outer-mins')
let frontBottomMins = document.getElementById('front-inner-mins')
let backTopMins = document.getElementById('back-outer-mins')
let backBottomMins = document.getElementById('back-inner-mins')

// tens of  minutes elements
let frontTopMinsTens = document.getElementById('front-outer-mins-tens')
let frontBottomMinsTens = document.getElementById('front-inner-mins-tens')
let backTopMinsTens = document.getElementById('back-outer-mins-tens')
let backBottomMinsTens = document.getElementById('back-inner-mins-tens')

// unit hours elements
let frontTopHours = document.getElementById('front-outer-hrs')
let frontBottomHours = document.getElementById('front-inner-hrs')
let backTopHours = document.getElementById('back-outer-hrs')
let backBottomHours = document.getElementById('back-inner-hrs')

// tens of  hours elements
let frontTopHoursTens = document.getElementById('front-outer-hrs-tens')
let frontBottomHoursTens = document.getElementById('front-inner-hrs-tens')
let backTopHoursTens = document.getElementById('back-outer-hrs-tens')
let backBottomHoursTens = document.getElementById('back-inner-hrs-tens')





// wanted to use the following array values in order to make generic function taking the same arguments, but his causes problems with the timing and final animation of the flip cards.  Will sideline this method for the moment, build out the ful clock and then research later on to see if this problem can be overcome and the code can be refactored: MAYBE WE CAN STILL USE THIS - WILL START BY TRYING TO MERGE TWO SETS OF FUNCTIONS THAT DEAL WITH THE FLIPPING OF EACH TIME MEASURE
const secondsElArr = [frontTopSecs, frontBottomSecs, backTopSecs, backBottomSecs] //  seconds flaps
const secondsTensElArr = [frontTopTens, frontBottomTens, backTopTens, backBottomTens] // tens of seconds flaps
const minutesElArr = [frontTopMins, frontBottomMins, backTopMins, backBottomMins] // mins flaps
const minutesTensElArr = [frontTopMinsTens, frontBottomMinsTens, backTopMinsTens, backBottomMinsTens] // tens of mins flaps
const hoursElArr = [frontTopHours, frontBottomHours, backTopHours, backBottomHours] // hours flaps
const hoursTensElArr = [frontTopHoursTens, frontBottomHoursTens, backTopHoursTens, backBottomHoursTens] // tens of hours flaps



const flipAudio = new Audio('flip clock sound.mp3') // sound of flip - will not work automatically so button is needed

// array to hold times
let  acDateArr = []
let  startArray = [] // this will be used to determine if the initial clock face has been set up.  It it has, then 'startClock()' function, which sets the numbers will not run; instead display default will run because the numbers will already have been set up



// CHANGING SECONDS ----------------------------------------------------------------------------------------------


const updateBackTop = () =>{
  //  console.log(currentNumberArr)
    backTopSecs.style.cssText = `background-image:url(${numberTopArr[(currentNumberArr[0])%10]})`
   // setTimeout(displayDefault, 100); // flip for new number
}


const updateOpacity = () =>{ // return the front divs which are now in their original positions, and with updated numbers, to visible, ready for turning again
    frontBottomSecs.style.opacity = '1'
    frontTopSecs.style.opacity = '1'
setTimeout(updateBackTop,50);
}


// now it's time to reverse the rotation of the div which displayed the first number top hald, and the div which displayed the bottom half of the second number. 

const reverseRotations = () =>{

// reverse outer front div and change top current number top; and update the rear top number to the next number top
frontTopSecs.style.animation = 'reverseTop'
frontTopSecs.style.animationDuration = '0.05s'
frontTopSecs.style.animationFillMode = 'forwards'
frontTopSecs.style.backgroundImage = backTopSecs.style.backgroundImage


// reverse inner front div and change bottom to next number bottom
frontBottomSecs.style.animation = 'reverseBottom'
frontBottomSecs.style.animationDuration = '0.05s'
frontBottomSecs.style.animationFillMode = 'forwards'
frontBottomSecs.style.cssText = `background-image:url(${numberBottomArr[(currentNumberArr[0])%10]})`
setTimeout(updateOpacity, 100);
}


// prior to clearing flaps the subsequent bottom number needs to be transfered from the front bottom flap to the back bottom flap whose number (the bottom half of the previously displayed number) is no longer needed
const transferNumbers = () =>{
// console.log('numbers transferring...')
backBottomSecs.style.cssText = ` background-image:url(${numberBottomArr[(currentSecondArr[0]  + 1)%10]})`
frontBottomSecs.style.opacity = '0'
frontTopSecs.style.opacity = '0'
setTimeout( reverseRotations, 200);
}


const bottomHalf = () =>{
    
    frontBottomSecs.style.animationDuration = '0.3s'
    frontBottomSecs.style.animationFillMode = 'forwards'
    frontBottomSecs.style.animationTimingFunction = 'ease-out'
    frontBottomSecs.style.animationName = 'rotateBottom'
  setTimeout( transferNumbers, 200); // this will cause the transfer function to run after 2 seconds - 
}


const topHalf = () =>{
    currentNumberArr[0] += 1;
console.log(currentNumberArr)
console.log(acDateArr[2])

    frontTopSecs.style.animationDuration = '0.2s'
    frontTopSecs.style.animationFillMode = 'forwards'
    frontTopSecs.style.animationTimingFunction = 'ease-out'
    frontTopSecs.style.animationName = 'rotateTop'



    setTimeout( bottomHalf, 150); // slight delay so that bottom flap drops just as top flap is terminating giving the illusion of smooth continuity 
}


const displayDefault = () =>{

setTimeout(topHalf, 100);}



const startCount = (initial) =>{


 if(startArray.length > 0){
  setTimeout(displayDefault, 100);
 }else{


  // initial values for seconds
  startArray.push('started')
  let number = initial;
  let nextNumber = number + 1;
  frontTopSecs.style.cssText = ` background-image:url(${numberTopArr[number%10]})`
frontBottomSecs.style.cssText = ` background-image:url(${numberBottomArr[(number + 1)%10]})`
backTopSecs.style.cssText = ` background-image:url(${numberTopArr[(number + 1)%10]})`
backBottomSecs.style.cssText = ` background-image:url(${numberBottomArr[number%10]})`
currentNumberArr[0] = nextNumber;

// initial values for tens of seconds
let currentTens = Math.floor(acDateArr[2]/10) // takes the floor of seconds/10 - should give 10, 20... 50 so we can display the higher degree of seconds, tens. 


frontTopTens.style.cssText = ` background-image:url(${numberTopArr[currentTens]})`
frontBottomTens.style.cssText = ` background-image:url(${numberBottomArr[(currentTens+1)%6]})`
backTopTens.style.cssText = ` background-image:url(${numberTopArr[(currentTens+1)%6]})`
backBottomTens.style.cssText = ` background-image:url(${numberBottomArr[currentTens]})`



// setting initial values for minute units
let mins = acDateArr[1]
let currentMinuteTens = Math.floor(mins/10) 
console.log(currentMinuteTens, mins)

frontTopMins.style.cssText = ` background-image:url(${numberTopArr[mins%10]})`
frontBottomMins.style.cssText = ` background-image:url(${numberBottomArr[(mins%10+1)%10]})`
backTopMins.style.cssText = ` background-image:url(${numberTopArr[(mins%10+1)%10]})`
backBottomMins.style.cssText = ` background-image:url(${numberBottomArr[mins%10]})`

// setting initial values for tens of minutes
frontTopMinsTens.style.cssText = ` background-image:url(${numberTopArr[currentMinuteTens]})`
frontBottomMinsTens.style.cssText = ` background-image:url(${numberBottomArr[(Math.floor(mins/10) + 1)%6]})`
backTopMinsTens.style.cssText = ` background-image:url(${numberTopArr[(Math.floor(mins/10) + 1)%6]})`
backBottomMinsTens.style.cssText = ` background-image:url(${numberBottomArr[currentMinuteTens]})`


// setting initial values for hours
// unit hours elements
let hours = acDateArr[0]%10;
let currentTenHours = Math.floor(acDateArr[0]/10) // gives 1, 2 or '0'
console.log(acDateArr[0])
console.log(`${hours} ${currentTenHours}`)

frontTopHours.style.cssText = ` background-image:url(${numberTopArr[hours]})`
frontBottomHours.style.cssText = ` background-image:url(${(numberBottomArr[(hours +  1)%10])})`
backTopHours.style.cssText = ` background-image:url(${(numberTopArr[(hours +  1)%10])})`
backBottomHours.style.cssText = ` background-image:url(${numberBottomArr[hours]})`


// setting initial values for tens of hours
// tens of  hours elements
frontTopHoursTens.style.cssText = ` background-image:url(${numberTopArr[currentTenHours]})`
frontBottomHoursTens.style.cssText = ` background-image:url(${numberBottomArr[(currentTenHours + 1)%3]})`
backTopHoursTens.style.cssText = ` background-image:url(${numberTopArr[(currentTenHours + 1)%3]})`
backBottomHoursTens.style.cssText = ` background-image:url(${numberBottomArr[currentTenHours]})`

displayDefault()
}}
 

// CHANGING TENS OF HOURS --------------------------------------------------------------------------------------------------


const updateBackTopHoursTens = () =>{
  //  console.log(currentNumberArr)
  console.log('top back updating.... ')
    backTopHoursTens.style.cssText = `background-image:url(${numberTopArr[((Math.ceil(acDateArr[0]/10)%3) + 1)%3]})`


}


const updateOpacityHoursTens = () =>{ // return the front divs which are now in their original positions, and with updated numbers, to visible, ready for turning again
  frontBottomHoursTens.style.opacity = '1'
  frontTopHoursTens.style.opacity = '1'
setTimeout(updateBackTopHoursTens,50);
}



const reverseRotationsHoursTens = () =>{
  console.log('reversing...')
    // reverse outer front div and change top current number top; and update the rear top number to the next number top
    frontTopHoursTens.style.animation = 'reverseTop'
    frontTopHoursTens.style.animationDuration = '0.05s'
    frontTopHoursTens.style.animationFillMode = 'forwards'
    frontTopHoursTens.style.backgroundImage = backTopHoursTens.style.backgroundImage
    
    
    // reverse inner front div and change bottom to next number bottom
    frontBottomHoursTens.style.animation = 'reverseBottom'
    frontBottomHoursTens.style.animationDuration = '0.05s'
    frontBottomHoursTens.style.animationFillMode = 'forwards'
    frontBottomHoursTens.style.cssText = ` background-image:url(${numberBottomArr[((Math.ceil(acDateArr[0]/10)%3) + 1)%3]})`
    setTimeout(updateOpacityHoursTens, 200);
    }



// BELOW ARE ALL OF THE OTHER TIME MEASURES WHICH ARE BASED OFF OF THE SECONDS COUNT - But we'll still be taking values directly from calculations made on the standard time pulled from the internet. 
const transferNumbersHoursTens = () =>{
  console.log('transferring front bottom to back bottom...')
  // console.log('numbers transferring...')
  console.log((Math.ceil(acDateArr[1]/10)))
  backBottomHoursTens.style.cssText = ` background-image:url(${numberBottomArr[(Math.ceil(acDateArr[0]/10)%3)]})`
    frontBottomHoursTens.style.opacity = '0'
  frontTopHoursTens.style.opacity = '0'
  setTimeout( reverseRotationsHoursTens, 250);
  }



const bottomHalfHoursTens = () =>{
  console.log('rotate bottom...')
  frontBottomHoursTens.style.animationDuration = '0.3s'
  frontBottomHoursTens.style.animationFillMode = 'forwards'
  frontBottomHoursTens.style.animationTimingFunction = 'ease-out'
  frontBottomHoursTens.style.animationName = 'rotateBottom'
  setTimeout( transferNumbersHoursTens, 200); // this will cause the transfer function to run after 0.2 seconds - 
}


const topHalfHoursTens = () =>{
  console.log('rotate top...')
  frontTopHoursTens.style.animationDuration = '0.2s'
  frontTopHoursTens.style.animationFillMode = 'forwards'
  frontTopHoursTens.style.animationTimingFunction = 'ease-out'
  frontTopHoursTens.style.animationName = 'rotateTop';
  setTimeout( bottomHalfHoursTens, 150)
}



// CHANGING HOURS --------------------------------------------------------------------------------------------------------

const updateBackTopHours = () =>{
  //  console.log(currentNumberArr)
// NOTE* I'm hoping that by using acDateArr[0]%24 it will be possible to prevent the hour unit going to 4 when the clock hits the hour 24. Actually, the correct way is to do the sum of acDateArr[0]%24 and any other number you're adding, e.g. (acDateArr[0] + 1)%24.  So if the hour is 23, ie: acDateArr[0] = 23, then acDateArr[0] + 1) = 24, and (acDateArr[0] + 1)%24 = 0; which is the next hour after 23, which is what we want displayed in the hour unit.  Because in the clock it has been specified that the change happens when the hour units = 3 and acDateArr[0] = 23, this operation will not wait for hour units = 9, and will execute when the unit hour is 3, and minutes and seconds = 59. Since the tens of hours have the rule acDateArr[0]%3, the largest number that tens of hours can have is '2', so after 23 hours, where tens of hours = 2, its next value will be '0', as desired. Also,  (acDateArr[0] + 1)%24 will give exactly the same outputs as acDateArr[0]%10 as long as you remember to use put the %10 at the end of the rule, therefore say acDateArr[0] = 22, the next hour unit is  given by (acDateArr[0] + 1)%10, which is (22 + 1)%10 = 23%10 = 3; refactoring with the new rules to accomodate for hour 23 results in -:

// ((acDateArr[0] + 1)%24)%10 = ((22+1)%24)%10 = ((23)%24)%10 = 23%10 = 3; the same result as above.  The only hour unit  affected is 23 + 1, which will be switched to zero as we require.  All other hour units are unaffected by this change, since they all are less than 24 so %24 will return those numbers as themselves. 

  console.log('top back updating.... ')
    backTopHours.style.cssText = `background-image:url(${numberTopArr[((acDateArr[0] + 2)%24)%10]})`
console.log(backTopHours.style.backgroundImage)

}


const updateOpacityHours = () =>{ // return the front divs which are now in their original positions, and with updated numbers, to visible, ready for turning again
    frontBottomHours.style.opacity = '1'
    frontTopHours.style.opacity = '1'
setTimeout(updateBackTopHours,50);
}



const reverseRotationsHours = () =>{
console.log('reversing...')
  // reverse outer front div and change top current number top; and update the rear top number to the next number top
  frontTopHours.style.animation = 'reverseTop'
  frontTopHours.style.animationDuration = '0.05s'
  frontTopHours.style.animationFillMode = 'forwards'
  frontTopHours.style.backgroundImage =  backTopHours.style.backgroundImage // found the 24 hour mistake... the number on the back top would have been '4' because it is the next number due to be displayed after the '3' of 23 hours... So, that needs fixing... oh well, TOMORROW.  will put an IF condition on backTopHours for when the hour = 23. 
  
  
  // reverse inner front div and change bottom to next number bottom
  frontBottomHours.style.animation = 'reverseBottom'
  frontBottomHours.style.animationDuration = '0.05s'
  frontBottomHours.style.animationFillMode = 'forwards'
  frontBottomHours.style.cssText = ` background-image:url(${numberBottomArr[((acDateArr[0] + 1)%24)%10]})`
  setTimeout(updateOpacityHours, 200);
  }


// BELOW ARE ALL OF THE OTHER TIME MEASURES WHICH ARE BASED OFF OF THE SECONDS COUNT - But we'll still be taking values directly from calculations made on the standard time pulled from the internet. 
const transferNumbersHours = () =>{
  console.log('transferring front bottom to back bottom...')
  // console.log('numbers transferring...')
  console.log((Math.ceil(acDateArr[1]/10)))
  backBottomHours.style.cssText = ` background-image:url(${numberBottomArr[((acDateArr[0] + 1)%24)%10]})`// if the units hour, since the real clock is one hour forward we want to take away an hour; but, when the hours is zero, subtracting 1 gives us an hour of -1 which is not an hour. We want the unit that comes just before zero, which is 9.  This can be handled by adding 9, instead of subracting 1.  Adding 9 has the same effect as subtracting 1 once we use the %10 method.  for example 8 -1 = 7, but (8 + 9)%10 = 17%10 = 7; so we arrive at the same unit number... so the above value of (acDateArr[0] + 9)%10 is equivalent to subtracting one hour from the hour units. 
    frontBottomHours.style.opacity = '0'
  frontTopHours.style.opacity = '0'
  setTimeout( reverseRotationsHours, 250);
  }
  


const bottomHalfHours = () =>{
  console.log('rotate bottom...')
  frontBottomHours.style.animationDuration = '0.3s'
  frontBottomHours.style.animationFillMode = 'forwards'
  frontBottomHours.style.animationTimingFunction = 'ease-out'
  frontBottomHours.style.animationName = 'rotateBottom'
  setTimeout( transferNumbersHours, 200); // this will cause the transfer function to run after 0.2 seconds - 
}



const topHalfHours = () =>{
  console.log('rotate top...')
  frontTopHours.style.animationDuration = '0.2s'
  frontTopHours.style.animationFillMode = 'forwards'
  frontTopHours.style.animationTimingFunction = 'ease-out'
  frontTopHours.style.animationName = 'rotateTop';
  setTimeout( bottomHalfHours, 150)
}


// CHANGING TENS OF MINUTES ------------------------------------------------------------------------------------------------

const updateBackTopMinsTens = () =>{
  //  console.log(currentNumberArr)
  console.log('top back updating.... ')
    backTopMinsTens.style.cssText = `background-image:url(${numberTopArr[((Math.ceil(acDateArr[1]/10)%6) + 1)%6]})`


}


const updateOpacityMinsTens = () =>{ // return the front divs which are now in their original positions, and with updated numbers, to visible, ready for turning again
    frontBottomMinsTens.style.opacity = '1'
    frontTopMinsTens.style.opacity = '1'
setTimeout(updateBackTopMinsTens,50);
}


const reverseRotationsMinsTens = () =>{
console.log('reversing...')
  // reverse outer front div and change top current number top; and update the rear top number to the next number top
  frontTopMinsTens.style.animation = 'reverseTop'
  frontTopMinsTens.style.animationDuration = '0.05s'
  frontTopMinsTens.style.animationFillMode = 'forwards'
  frontTopMinsTens.style.backgroundImage = backTopMinsTens.style.backgroundImage
  
  
  // reverse inner front div and change bottom to next number bottom
  frontBottomMinsTens.style.animation = 'reverseBottom'
  frontBottomMinsTens.style.animationDuration = '0.05s'
  frontBottomMinsTens.style.animationFillMode = 'forwards'
  frontBottomMinsTens.style.cssText = ` background-image:url(${numberBottomArr[((Math.ceil(acDateArr[1]/10)%6) + 1)%6]})`
  setTimeout(updateOpacityMinsTens, 200);
  }


// BELOW ARE ALL OF THE OTHER TIME MEASURES WHICH ARE BASED OFF OF THE SECONDS COUNT - But we'll still be taking values directly from calculations made on the standard time pulled from the internet. 
const transferNumbersMinsTens = () =>{
  console.log('transferring...')
  // console.log('numbers transferring...')
  console.log((Math.ceil(acDateArr[1]/10)))
  backBottomMinsTens.style.cssText = ` background-image:url(${numberBottomArr[(Math.ceil(acDateArr[1]/10)%6)]})`
  frontBottomMinsTens.style.opacity = '0'
  frontTopMinsTens.style.opacity = '0'
setTimeout( reverseRotationsMinsTens, 250);
  }
  


const bottomHalfMinsTens = () =>{
  console.log('rotate bottom...')
  frontBottomMinsTens.style.animationDuration = '0.4s'
  frontBottomMinsTens.style.animationFillMode = 'forwards'
  frontBottomMinsTens.style.animationTimingFunction = 'ease-out'
  frontBottomMinsTens.style.animationName = 'rotateBottom'
  setTimeout( transferNumbersMinsTens, 200); // this will cause the transfer function to run after 0.2 seconds - 
}



const topHalfMinsTens = () =>{
  frontTopMinsTens.style.animationDuration = '0.2s'
  frontTopMinsTens.style.animationFillMode = 'forwards'
  frontTopMinsTens.style.animationTimingFunction = 'ease-out'
  frontTopMinsTens.style.animationName = 'rotateTop';
  setTimeout( bottomHalfMinsTens, 200)
}


// CHANGING MINUTES -------------------------------------------------------------------------------------------------------

const updateBackTopMins = () =>{
  //  console.log(currentNumberArr)
  console.log('top back updating.... ')
  console.log(acDateArr[0]%10)
  console.log(backTopHours.style.backgroundImage)
  console.log(frontBottomHours.style.backgroundImage)

    backTopMins.style.cssText = `background-image:url(${numberTopArr[(acDateArr[1]%10 + 2)%10]})`

}


const updateOpacityMins = () =>{ // return the front divs which are now in their original positions, and with updated numbers, to visible, ready for turning again
    frontBottomMins.style.opacity = '1'
    frontTopMins.style.opacity = '1'
setTimeout(updateBackTopMins,50);
}




const reverseRotationsMins = () =>{
console.log('reversing...')
  // reverse outer front div and change top current number top; and update the rear top number to the next number top

  frontTopMins.style.animation = 'reverseTop'
  frontTopMins.style.animationDuration = '0.05s'
  frontTopMins.style.animationFillMode = 'forwards'
  frontTopMins.style.backgroundImage = backTopMins.style.backgroundImage

  // reverse inner front div and change bottom to next number bottom
  frontBottomMins.style.animation = 'reverseBottom'
  frontBottomMins.style.animationDuration = '0.05s'
  frontBottomMins.style.animationFillMode = 'forwards'
  frontBottomMins.style.cssText = ` background-image:url(${numberBottomArr[(acDateArr[1]%10 + 1)%10]})`

  console.log(frontBottomMins.style.backgroundImage)
  setTimeout(updateOpacityMins, 200);
  }


// BELOW ARE ALL OF THE OTHER TIME MEASURES WHICH ARE BASED OFF OF THE SECONDS COUNT - But we'll still be taking values directly from calculations made on the standard time pulled from the internet. 
const transferNumbersMins = () =>{
  // console.log('numbers transferring...')
 

  console.log((Math.ceil(acDateArr[1]/10)))
  backBottomMins.style.cssText = ` background-image:url(${numberBottomArr[(acDateArr[1]%10 + 1)%10]})`
  frontBottomMins.style.opacity = '0'
  frontTopMins.style.opacity = '0'

   console.log(backBottomMins.style.backgroundImage)
setTimeout( reverseRotationsMins, 250);
  }
  


const bottomHalfMins = () =>{
  console.log('rotate bottom...')
  frontBottomMins.style.animationDuration = '0.25s'
  frontBottomMins.style.animationFillMode = 'forwards'
  frontBottomMins.style.animationTimingFunction = 'ease-out'
  frontBottomMins.style.animationName = 'rotateBottom'
  setTimeout( transferNumbersMins, 200); // this will cause the transfer function to run after 2 seconds - 
}



const topHalfMins = () =>{
  frontTopMins.style.animationDuration = '0.2s'
  frontTopMins.style.animationFillMode = 'forwards'
  frontTopMins.style.animationTimingFunction = 'ease-out'
  frontTopMins.style.animationName = 'rotateTop';
  setTimeout( bottomHalfMins, 200)
}



// CHANGING TENS OF SECONDS -------------------------------------------------------------------------------------------------

const updateBackTopTens = () =>{

  //  console.log(currentNumberArr)
    backTopTens.style.cssText = `background-image:url(${numberTopArr[Math.ceil((acDateArr[2]+2)/10)%6]})`
   // setTimeout(displayDefault, 100); // flip for new number
   console.log(acDateArr)
}


const updateOpacityTens = () =>{ // return the front divs which are now in their original positions, and with updated numbers, to visible, ready for turning again
    frontBottomTens.style.opacity = '1'
    frontTopTens.style.opacity = '1'
setTimeout(updateBackTopTens,50);
}



const reverseRotationsTens = () =>{

  // reverse outer front div and change top current number top; and update the rear top number to the next number top
  frontTopTens.style.animation = 'reverseTop'
  frontTopTens.style.animationDuration = '0.05s'
  frontTopTens.style.animationFillMode = 'forwards'
  frontTopTens.style.backgroundImage = backTopTens.style.backgroundImage
  
  
  // reverse inner front div and change bottom to next number bottom
  frontBottomTens.style.animation = 'reverseBottom'
  frontBottomTens.style.animationDuration = '0.05s'
  frontBottomTens.style.animationFillMode = 'forwards'
  frontBottomTens.style.cssText = ` background-image:url(${numberBottomArr[((Math.ceil(acDateArr[2]/10)) +1)%6]})`
  setTimeout(updateOpacityTens, 200);
  }


// BELOW ARE ALL OF THE OTHER TIME MEASURES WHICH ARE BASED OFF OF THE SECONDS COUNT - But we'll still be taking values directly from calculations made on the standard time pulled from the internet. 
const transferNumbersTens = () =>{
   console.log('numbers transferring...')
   console.log(acDateArr[0])
  console.log((Math.ceil(acDateArr[2]/10)))
  backBottomTens.style.cssText = ` background-image:url(${numberBottomArr[(Math.ceil(acDateArr[2]/10)%6)]})`
  frontBottomTens.style.opacity = '0'
  frontTopTens.style.opacity = '0'
setTimeout( reverseRotationsTens, 150);
  }
  


const bottomHalfTens = () =>{

 

  console.log('rotate bottom...')
  frontBottomTens.style.animationDuration = '0.25s'
  frontBottomTens.style.animationFillMode = 'forwards'
  frontBottomTens.style.animationTimingFunction = 'ease-out'
  frontBottomTens.style.animationName = 'rotateBottom'
  setTimeout( transferNumbersTens, 200); // this will cause the transfer function to run after 2 seconds - 
}



const topHalfTens = () =>{
  frontTopTens.style.animationDuration = '0.2s'
  frontTopTens.style.animationFillMode = 'forwards'
  frontTopTens.style.animationTimingFunction = 'ease-out'
  frontTopTens.style.animationName = 'rotateTop';
  setTimeout( bottomHalfTens, 200)
}


// BELOW ARE ALL OF THE OTHER TIME MEASURES WHICH ARE BASED OFF OF THE SECONDS COUNT - But we'll still be taking values directly from calculations made on the standard time pulled from the internet. 
const changeMeasure = (element) =>{
  console.log(element)
switch(element){
case 'seconds-tens':
topHalfTens()
break;
case 'minutes':
  topHalfMins()
  break;

  case 'minutes-tens':
    topHalfMinsTens()
    break;

    case 'hours':
      topHalfHours()
break;

case 'hours-tens':
topHalfHoursTens()
}

}


// CODING FOR 24 HOUR CLOCK - 
let flipClock
var timer = 0;
 var secondNow;  
var leapYears = 12
const hourSpring = 1
const hourFall = 0// hour for clocks back
let measure;


const clockFunction = () =>{


    acDateArr = []
    let secondNow = Math.floor(Date.now() / 1000)// seconds since 1,1,1970
    let minuteNow = Math.floor(secondNow / 60)// minutes since 1,1,1970
    let hourNow = Math.floor(minuteNow / 60)// hours since 1,1,1970
    let dayNow = Math.floor(hourNow / 24)// days since 1,1,1970
   let yearNow = Math.floor(dayNow / 365)// years since 1,1,1970
     
   let ctyear = yearNow - 30 // year
   let ctDay = dayNow - yearNow*365 - leapYears // calc for current day 
    let cd = ctDay // abbrev for current day
    let ctHour = hourNow - dayNow*24 + hourFall // calc for current hour
    let ctMinute = minuteNow - hourNow*60// calc for current minute
    let ctSecond = secondNow - minuteNow*60// calc for current second
  
    acDateArr.push(ctHour,ctMinute, ctSecond)


    currentSecondArr[0] = ctSecond%10; // keeps track of current seconds from 0-9
    startCount(currentSecondArr[0])
 
    if(acDateArr[2]%10 === 9){
       measure = 'seconds-tens'
  
changeMeasure(measure)}

if(acDateArr[2] === 59){
  measure = 'minutes'
  changeMeasure(measure)}

if(acDateArr[2] === 59 && acDateArr[1]%10 === 9){
    measure = 'minutes-tens';
    changeMeasure(measure)  
}

if(acDateArr[2] === 59 && acDateArr[1] === 59){
  measure = 'hours';
  changeMeasure(measure)
}


// conditions for hour 23, otherwise all other hours. 
if(!acDateArr[0] === 23){ // for all hours except 23, when min and sec = 59 and when hour unit = 9 do below
if(acDateArr[0]%10 === 9 && acDateArr[2] === 59 && acDateArr[1] === 59){
  measure = 'hours-tens';
  changeMeasure(measure)

}}else{ // when hour = 23; if min and sec = 59 and hour unit = 3 do below
  if(acDateArr[0]%10 === 3 && acDateArr[2] === 59 && acDateArr[1] === 59){
    measure = 'hours-tens';
    changeMeasure(measure)
  
  }

}

}

 flipClock = setInterval(clockFunction, 1000);

