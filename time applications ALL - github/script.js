
let timeAppOneEl = document.getElementById('time-app-1-thumbnail')
let timeAppTwoEl = document.getElementById('time-app-2-thumbnail')
let timeAppThreeEl = document.getElementById('time-app-3-thumbnail')
let timeAppFourEl = document.getElementById('time-app-4-thumbnail')
let timeAppFiveEl = document.getElementById('time-app-5-thumbnail')
let timeAppSixEl = document.getElementById('time-app-6-thumbnail')



let timeElementArr = [timeAppOneEl, timeAppTwoEl, timeAppThreeEl, timeAppFourEl, timeAppFiveEl, timeAppSixEl]

let gifAddressArr = [
    './time piece thumbnails/vids for GIF conversion/time and date.gif',
    './time piece thumbnails/vids for GIF conversion/countdown.gif',
    './time piece thumbnails/vids for GIF conversion/pomodoro.gif',
    './time piece thumbnails/vids for GIF conversion/basic digital.gif',
    './time piece thumbnails/vids for GIF conversion/analogue clock.gif',
    './time piece thumbnails/vids for GIF conversion/flip clock full.gif'
]


let imageAddressArr = [
    './time piece thumbnails/thumbnail time and date.png',
    './time piece thumbnails/thumbnail countdown timer.png',
    './time piece thumbnails/thumbnail pomodoro automatic.png',
    './time piece thumbnails/thumbnail basic digital clock.png',
    './time piece thumbnails/thumbnail analogue clock.png',
    './time piece thumbnails/thumnail flip clock.png'
    
    
    
    
]

timeElementArr.forEach(element =>{
    let imageIndex = timeElementArr.indexOf(element)
 console.log(gifAddressArr[imageIndex])
    // on mouseover gif image of gample play replaces still image
    element.addEventListener('mouseover', function(){
        element.src = gifAddressArr[imageIndex]
    })

// on mouseout still image of game replaces gif
    element.addEventListener('mouseout', function(){
        element.src = imageAddressArr[imageIndex]
    })

})

