let mathAppOneEl = document.getElementById('app-1-thumbnail')
let mathAppTwoEl = document.getElementById('app-2-thumbnail')
let mathAppThreeEl = document.getElementById('app-3-thumbnail')
let mathAppFourEl = document.getElementById('app-4-thumbnail')

let calcRandomAgeEl = document.getElementById('calc_random_age')
let calcSimpleAgeEl = document.getElementById('calc_simple_age')
let quadGeneratorAgeEl = document.getElementById('quad_generator_age')
let calcSciAgeEl = document.getElementById('calc_scienctific_age')
let convertFracAgeEl = document.getElementById('fraction_convert_age')

let mathAppsCreatedObj = {
    calcRandomCreated :['2022/06/05', calcRandomAgeEl],
    calcSimpleCreated :['2022/06/08', calcSimpleAgeEl],
   quadGeneratorCreated :['2022/05/11', quadGeneratorAgeEl], 
   calcSCiCreated :['2022/12/21', calcSciAgeEl],
   convertFracCreated :['2022/12/07', convertFracAgeEl]
 }


 let mathAppAgeArr = Object.keys(mathAppsCreatedObj)

 // current date variable, and date broken down into different time measures, days, months, hours etc. 
 let date = new Date()
 let year = date.getFullYear();
 let month = date.getUTCMonth() + 1;
 let day = date.getUTCDate()
 let hour = (date.getUTCHours()+1)%24; 
 let mins = date.getUTCMinutes();
 
 // function for rendering game age to 'age' element in stats section of each thumbnail container
 const mathAppAge = (mathAppDates) =>{
  mathAppDates.forEach(mathApp =>{
  // published date variable below takes the created date for each game and then extracts time measures from year down to minutes
 
 let published = new Date(mathAppsCreatedObj[`${mathApp}`][0]); // date format
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
 
 
 mathAppsCreatedObj[`${mathApp}`][1].textContent = age;
 
 })}
 
 mathAppAge(mathAppAgeArr)
 















let mathElementsArr = [mathAppOneEl, mathAppTwoEl, mathAppThreeEl, mathAppFourEl]

let gifAddressArr = [
    './calculator random.gif',
    './calculator simple.gif',
    './quadratic generator.gif',
    './calculator scientific.gif',
  ]


let imageAddressArr = [
    './calculator-random.png',
    './calculator-simple.png',
    './quadratic generator.png',
    './thumbnail scientific calculator cropped.png',
   
]

mathElementsArr.forEach(element =>{
    let imageIndex = mathElementsArr.indexOf(element)
 
    // on mouseover gif image of gample play replaces still image
    element.addEventListener('mouseover', function(){
        element.src = gifAddressArr[imageIndex]
    })

// on mouseout still image of game replaces gif
    element.addEventListener('mouseout', function(){
        element.src = imageAddressArr[imageIndex]
    })

})

