// elements where app age is rendered
let youtubeSubsEl = document.getElementById('youtube-subs-api');

// object contains game age and element for rendering age
let apiAppAgeCreatedObj = {
    youtubeSubsApi :['2023/06/30', youtubeSubsEl],

}

// get object keys from age object, this makes the object iterable using forEach
let apiAppAge = Object.keys(apiAppAgeCreatedObj)

// current date variable, and date broken down into different time measures, days, months, hours etc. 
let date = new Date()
let year = date.getFullYear(); // gets year
let month = date.getUTCMonth(); // gets month, add 1 because months start at zero
let day = date.getUTCDate() // 
let hour = (date.getUTCHours()+1)%24;  // gets hours, add 1 because hours start at zero
let mins = date.getUTCMinutes();

// function for rendering game age to 'age' element in stats section of each thumbnail container
const imageAppAge = (apiAppDates) =>{
 apiAppDates.forEach(youtubeApp =>{
 // published date variable below takes the created date for each game and then extracts time measures from year down to minutes

let published = new Date(apiAppAgeCreatedObj[`${youtubeApp}`][0]); // date format for uploaded date
let uploadYear =  published.getFullYear(); // get year
let uploadMonth =  published.getMonth(); // get month
let uploadDayDate =  published.getDate(); // get date
let uploadHour = published.getHours(); // get hours
let uploadMins = published.getMinutes(); // get minutes

// variables for calculating the difference between current date time measure and game created date time measures, which is the age of the game (rendered in the appropriate time measure; years, day, hour etc)
let yearCalc = year - uploadYear;
let monthCalc = month - uploadMonth;
let dayCalc = day - uploadDayDate;
let hourCalc = hour - uploadHour;
let minsCalc = uploadMins;
let age; // age value will be assigned this variable via a switch statement.
console.log(yearCalc)
console.log(monthCalc)
console.log(dayCalc)
console.log(hourCalc)
console.log(minsCalc)

// code for rending age, NEEDS TO BE INSIDE FOREACH to inspect each video
if(yearCalc > 0){if(yearCalc > 1){ // if two years or greater
    age = `${yearCalc} years ago`; // render text as plural years

}else{ // if yearCalc > 1 is false. 

    
// NOTE* if, for yearCalc > 0 (which means that current month and created month are not in the same year value), the difference between current month and created month is less than 12, then monthCalc will be negative, meaning that, relative to the year in which they fall, current month is earlier than created month, so current month's value will be lower than created month's value; current month - created month < 12, and a year has not yet elapsed. So although the year calculation is greater than zero, the difference in actual months equates to less than a year. The expression let monthAge = 12 + monthCalc will give the distance between the two months and therefore the age of the app in months, when the difference between year values is 1 but the actual age is less than one year. 

let monthAge;  // variable for calculation of months  0 < months <1 2
if(monthCalc < 0){
    monthAge = 12 + monthCalc;
    console.log('monthAge',monthAge)
    {if(monthAge > 1){age = `${monthAge} months ago`}else{age = `${monthAge} month ago`}}
    } 
else if(monthCalc > 0){
    console.log('monthCalc',monthCalc)
age = '1 year ago'
   // this results because, although they are in different years, current month has a greater value than created month. Example; if current month is august and created month is july (of the previous year obviously) then 13 months have elapsed, which is greater than one year; but the actual value of monthCalc would be 8-7 = 1; Any value greater than zero indicates more than one year has elapsed. 
}else{ 
// current and created months have the same value, so monthCalc = 0.  Then use dayCalc; a negative number indicates current day < created day so a full month has not elapsed, so a full year has not elapsed, or else, current day > created day which means that at least one year and one day have elapsed. Or current and created day are equal which is in effect exactly one day and have elapsed. 
if (dayCalc < 0){
    console.log('monthCalc', monthCalc)
    age = '12 months ago'
}else{age = '1 year ago'}

}

}}


    
    // otherwise if yearCalc is not greater than zero, use month/day/mins/or hours
else if(monthCalc > 0){if(monthCalc > 1){age = `${monthCalc} months ago`}else{
    // same rules apply as with year calc
    
    
    age = `${monthCalc} month ago`}}
else if(dayCalc > 0){if(dayCalc > 1){age = `${dayCalc} days ago`}else{age = `${dayCalc} day ago`}}
else if(hourCalc > 0){if(hourCalc > 1){age = `${hourCalc} hours ago`}else{age = `${hourCalc} hour ago`}}
else if(minsCalc > 0){if(minsCalc > 1){age = `${minsCalc} mins ago`}else{age = `${minsCalc} mins ago`}}


apiAppAgeCreatedObj[`${youtubeApp}`][1].textContent = age;


});
}
imageAppAge(apiAppAge)