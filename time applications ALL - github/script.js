let timeDateAgeEl = document.getElementById('time_date_age');
let countdownAgeEl = document.getElementById('countdown_age')
let pomodoroAgeEl = document.getElementById('pomodoro_age')
let basicDigitalAgeEl = document.getElementById('basic_digital_age')
let analogueClockAgeEl = document.getElementById('analogue_clock_age')
let flipClockAgeEl = document.getElementById('flip_clock_age')


let timeAppsCreatedObj = {
    timeDateCreation :['2022/06/04', timeDateAgeEl],
    countdownCreation :['2022/06/24', countdownAgeEl],
    pomodoroCreation :['2022/09/05', pomodoroAgeEl],  
    basicDigitalCreation :['2022/12/05', basicDigitalAgeEl],
    analogueClockCreation :['2022/12/11', analogueClockAgeEl],
    flipClockCreation :['2023/03/04', flipClockAgeEl], 
}







let timeAppOneEl = document.getElementById('time-app-1-thumbnail')
let timeAppTwoEl = document.getElementById('time-app-2-thumbnail')
let timeAppThreeEl = document.getElementById('time-app-3-thumbnail')
let timeAppFourEl = document.getElementById('time-app-4-thumbnail')
let timeAppFiveEl = document.getElementById('time-app-5-thumbnail')
let timeAppSixEl = document.getElementById('time-app-6-thumbnail')



let clockAppAgeArr = Object.keys(timeAppsCreatedObj)

// current date variable, and date broken down into different time measures, days, months, hours etc. 
let date = new Date()
let year = date.getFullYear();
let month = date.getUTCMonth() + 1;
let day = date.getUTCDate()
let hour = (date.getUTCHours()+1)%24; 
let mins = date.getUTCMinutes();

// function for rendering game age to 'age' element in stats section of each thumbnail container
const clockAppAge = (imageAppDates) =>{
 imageAppDates.forEach(ImageApp =>{
 // published date variable below takes the created date for each game and then extracts time measures from year down to minutes

let published = new Date(timeAppsCreatedObj[`${ImageApp}`][0]); // date format
let uploadYear =  published.getFullYear();
let uploadMonth =  published.getMonth();
let uploadDayDate =  published.getDate();
let uploadHour = published.getHours();
let uploadMins = published.getMinutes();

// variables for calculating the difference between current date and game created date, which is the age of the game (rendered in the appropriate time measure; years, day, hour etc)
let yearCalc = year - uploadYear;
let monthCalc = month - uploadMonth;
let dayCalc = day - uploadDayDate;
let hourCalc = hour - uploadHour;
let minsCalc = uploadMins;
let age; // age value will be assigned this variable via a switch statement.

console.log(monthCalc)
// code for rending age, NEEDS TO BE INSIDE FOREACH to inspect each video
if(yearCalc > 0){if(yearCalc > 1){age = `${yearCalc} years ago`}else{

    // if yearCalc > 0 but less than 1. 
// NOTE* if, for yearCalc > 0, the difference between current and created month is less than 12, then month calc will be negative, meaning that, relative to the year in which they fall, current month is earlier than created month, so current month's value will be lower than created month's value; current month - created month < 12, and a year has not yet elapsed. So although the year calculation is greater than zero, the difference in actual months equates to less than a year. The expression let monthAge = 12 + monthCalc will give the distance between the two months and therefore the age of the app in months
let monthAge;  
if(monthCalc < 0){
    monthAge = 12 + monthCalc;
    console.log('monthAge',monthAge)
    {if(monthAge > 1){age = `${monthAge} months ago`}else{age = `${monthAge} month ago`}}
    } 
else if(monthCalc > 0){
    console.log('monthCalc',monthCalc)
age = '1 year ago'
   // this results because, although they are in different years, current month has a greater value than created month. Example; if current month is august and created month is july (of the previous year obviously) then 13 months have elapsed, which is greater than one year; but the actual value of monthCalc would be 8-7 = 1; Any value greater than one indicates more than one year has relapsed. 
}else{ 
// current and created months have the same value, so monthCalc = 0.  Then use dayCalc; a negative number indicates current day < created day so a full month has not elapsed, so a full year has not elapsed, or else, current day > created day which means that at least one year and one day have elapsed. Or current and created day are equal which is in effect exactly one day and have elapsed. 
if (dayCalc < 0){
    console.log('monthCalc', monthCalc)
    age = '12 months ago'
}else{age = '1 year ago'}

}

}}


    
    // otherwise if yearCalc is not greater than zero, use month/day/mins/or hours
else if(monthCalc > 0){if(monthCalc > 1){age = `${monthCalc} months ago`}else{age = `${monthCalc} month ago`}}
else if(dayCalc > 0){if(dayCalc > 1){age = `${dayCalc} days ago`}else{age = `${dayCalc} day ago`}}
else if(hourCalc > 0){if(hourCalc > 1){age = `${hourCalc} hours ago`}else{age = `${hourCalc} hour ago`}}
else if(minsCalc > 0){if(minsCalc > 1){age = `${minsCalc} mins ago`}else{age = `${minsCalc} mins ago`}}


timeAppsCreatedObj[`${ImageApp}`][1].textContent = age;

})}

clockAppAge(clockAppAgeArr)










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

