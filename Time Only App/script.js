
let hourEl = document.getElementById("hour")
minEl = document.getElementById("min")
let closeEl = document.getElementById("close-btn")
var acDateArr;
 var secondNow;  
var leapYears = 12
const hourSpring = 1
const hourFall = -1// hour for clocks back
let dstArr = [0]
var clock;
let time = 0;
clock = setInterval(function() {
time++; 
secondNow = Math.floor(Date.now() / 1000);
log()
hourEl.textContent = acDateArr[0]
minEl.textContent = acDateArr[1]
// below two give double digits if min/sec < 10
 // this changes the mindnight hour which reads as '24' to '00'
if (acDateArr[0] < 10){hourEl.textContent =  "0" + acDateArr[0]}
else if (acDateArr[0] > 23){hourEl.textContent =  "00" }
else{hourEl.textContent = acDateArr[0]}


if (acDateArr[1] < 10){minEl.textContent =  "0" + acDateArr[1]}
else{minEl.textContent = acDateArr[1]}

}, 1000)



function log(){
    acDateArr = []
    let secondNow = Math.floor(Date.now() / 1000)// seconds since 1,1,1970
    let minuteNow = Math.floor(secondNow / 60)// minutes since 1,1,1970
    let hourNow = Math.floor(minuteNow / 60)// hours since 1,1,1970
    let dayNow = Math.floor(hourNow / 24)// days since 1,1,1970
   let yearNow = Math.floor(dayNow / 365)// years since 1,1,1970
     
   let ctyear = yearNow - 30 // year
   let ctDay = dayNow - yearNow*365 - leapYears // calc for current day 
    let cd = ctDay // abbrev for current day
    let ctHour
    if((cd < 91 && (cd + 5) % 7 < 1
    ) && cd > 83){
         dstArr.unshift(hourSpring)}
         if((cd < 305 && (cd + 5) % 7 < 1) && cd > 297){
            dstArr.unshift(hourFall)
         }
        ctHour = hourNow - dayNow*24 + dstArr[0]
    let ctMinute = minuteNow - hourNow*60// calc for current minute
    let ctSecond = secondNow - minuteNow*60// calc for current second
 
    acDateArr.push(ctHour,ctMinute)
    
    
}


// script for modal
let modal = document.getElementById('simple-modal')


function closeModal(){

    modal.style.display = 'none';

}


// this function uses the hamburger icon to activate the modal
var hamburgerEl = document.getElementById("hamburger-div")

hamburgerEl.addEventListener('click', (e) =>{
modal.style.display = "block"
})



let paragraph = document.getElementsByName('p')

var burgerOneEl = document.getElementById("one")
var burgerTwoEl = document.getElementById("two")
var burgerThreeEl = document.getElementById("three")

var timeDate = document.getElementById("time-container-id")
var burgerEl = document.querySelectorAll('.burger-layers')
// variables created from menu items. We'll use event listeners to activate the modes when menu links are pressed
var cleanMinimalEl = document.getElementById("clean-minimal")
var darkModeEl = document.getElementById("dark-mode")
var lightModeEl = document.getElementById("light-mode")
var defaultModeEl = document.getElementById("default")


// CLEAN AND MINIMAL MODES
cleanMinimalEl.addEventListener('click', (e) =>{
          // styling for time element
        hourEl.style.cssText = " background-color: black; box-shadow: 1px 1px 5px grey;"
               minEl.style.cssText = " background-color: black; box-shadow: 1px 1px 5px grey;"
          timeDate.style.cssText = " background-image: url('clean minimal.png');"
    burgerOneEl.style.cssText = "list-style-image: url('list dash black.png'); height:12px"
    burgerTwoEl.style.cssText = "list-style-image: url('list dash black.png'); height:12px"
    burgerThreeEl.style.cssText = "list-style-image: url('list dash black.png'); height:12px"
    modal.style.display = "none"
                    })


        // DARK MODE
    darkModeEl.addEventListener('click', (e) =>{
                           // styling for time element
            hourEl.style.cssText = " box-shadow: 1px 1px 5px grey; background-image: url('full-moon-forest.jpg'); color:rgb(0, 204, 255) ; "
            minEl.style.cssText = "box-shadow: 1px 1px 5px grey; background-image: url('full-moon-forest.jpg'); color:rgb(0, 204, 255) ; "           
              timeDate.style.backgroundImage = "url('moon crescent.png')"
        burgerOneEl.style.cssText = "list-style-image: url('list dash blue.png'); height:14px"
        burgerTwoEl.style.cssText = "list-style-image: url('list dash blue.png'); height:14px"
        burgerThreeEl.style.cssText = "list-style-image: url('list dash blue.png'); height:14px"
        modal.style.display = "none"       
             })


             // LIGHT MODE
        lightModeEl.addEventListener('click', (e) =>{
                            // styling for time element
                hourEl.style.cssText = " background-color: rgb(179, 179, 179);  box-shadow: 1px 2px 7px black; color:rgb(51, 51, 51); text-shadow: 1px 1px 5px white; opacity: 0.95;"
                minEl.style.cssText = " background-color: rgb(179, 179, 179);  box-shadow: 1px 2px 7px black; color:rgb(51, 51, 51); text-shadow: 1px 1px 5px white; opacity: 0.95;"
                  timeDate.style.backgroundImage = "url('clock wallpaper.jpg')"
                    burgerOneEl.style.cssText = "list-style-image: url('list dash black.png'); height:14px;"
            burgerTwoEl.style.cssText = "list-style-image: url('list dash black.png'); height:14px;"
            burgerThreeEl.style.cssText = "list-style-image: url('list dash black.png'); height:14px;"
            modal.style.display = "none" 
           
                        })

// DEFAULT MODE
defaultModeEl.addEventListener('click', (e) =>{
                    // styling for time element
        hourEl.style.cssText = " background-color:  rgba(19, 43, 89,0.9);  box-shadow: 3px 3px 7px rgb(49, 149, 216); color:white; text-shadow: none;"
        minEl.style.cssText = " background-color:  rgba(19, 43, 89,0.9);  box-shadow: 3px 3px 7px rgb(49, 149, 216); color:white; text-shadow: none;"
          timeDate.style.backgroundImage = "url('clock dark cropped.jpg')"
           burgerOneEl.style.cssText = "list-style-image: url('list dash white.png'); height:14px;"
    burgerTwoEl.style.cssText = "list-style-image: url('list dash white.png'); height:14px;"
    burgerThreeEl.style.cssText = "list-style-image: url('list dash white.png'); height:14px;"
    modal.style.display = "none" 
                })
