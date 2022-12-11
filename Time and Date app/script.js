




let yearEl = document.getElementById('year')
let monthEl = document.getElementById('month')
let dayEl = document.getElementById('day')
let hourEl = document.getElementById('hour')
let minEl = document.getElementById('min')
let secEl = document.getElementById('sec')
var dayNameIndex;
const leapYears = 12 // leap years since 1970 (num of days to subtract)
const hourSpring = 1// hour  for clocks forward
const hourFall = -1// hour for clocks back
let dstArr = [0]
let acDateArr = [] // actual date array with year, month, day, min, sec
let dayNameArr = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
let dayNameEl = document.getElementById("dayname") // for day name display
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
// for spring daylight saving hours
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
    
    var month;
    // determin current month from current day range
    if (  cd < 32 && cd > 0){ month ="jan"}
    if ( cd < 60 && cd >31 ){ month ="feb"}
    if (cd < 91 && cd >59 ){ month ="mar"}
    if ( cd < 121 && cd >90 ){ month ="apr"}
    if (  cd < 152 && cd >120 ){ month ="may"}
    if ( cd < 182 && cd >151 ){ month ="Jun"}
    if (  cd < 213 && cd >181 ){ month ="jul"}
    if (  cd < 244 && cd >212 ){ month ="aug"}
    if (  cd < 274 && cd >243 ){ month ="sep"}
    if (  cd < 305 && cd >273 ){ month ="oct"}
    if ( cd < 335 && cd >304 ){ month ="nov"}
    if (  cd < 366 && cd >334 ){ month ="dec"}

    // determines date of the month;

    var dayNum;
    if (cd > 0){ dayNum = cd}
    if (cd >31 ){ dayNum = cd - 31}
    if (cd >59 ){ dayNum = cd - 59}
    if (cd >90 ){ dayNum = cd - 90}
    if (cd >120 ){ dayNum = cd - 120}
    if (cd >151 ){ dayNum = cd - 151}
    if (cd >181 ){ dayNum = cd - 181}
    if (cd >212 ){ dayNum = cd - 212}
    if (cd >243 ){ dayNum = cd - 243}
    if (cd >273 ){ dayNum = cd - 273}
    if (cd >304 ){ dayNum = cd - 304}
    if (cd >334 ){ dayNum = cd - 334}
    
    acDateArr.push(ctyear, month, dayNum, ctHour,ctMinute,ctSecond)
    //console.log(acDateArr[4])
    console.log(cd)
    dayNameIndex = (cd + 5) % 7 // note, we're adding 5 here because the last day of the year 2021 was day 5 of the week; friday. So, the first day of the year, day 1, would correspond to saturday, the 6th day of the week.  which is 1 + 5, and the second day of the year would correspond to Sunday, the 7th day of the week, which is 2 + 5; so to extract the day number, which cycles, we would need to use the calculation  of (current day + 5) % 7 to get our current day number, which all are stored in the day name array, sunday is zero, which represents the seventh element in modular arithmetic. 
    console.log(dayNameIndex)
    console.log(dayNameArr[dayNameIndex])
}
    

var clock;
let time = 0;
clock = setInterval(function() {
time++; log();
yearEl.textContent = acDateArr[0]
monthEl.textContent = acDateArr[1]
dayNameEl.textContent = dayNameArr[dayNameIndex]
dayEl.textContent = acDateArr[2]
hourEl.textContent = acDateArr[3]
// below two give double digits if min/sec < 10

if (acDateArr[3] < 10){hourEl.textContent =  "0" + acDateArr[3]}
else{hourEl.textContent = acDateArr[3]}


if (acDateArr[4] < 10){minEl.textContent =  "0" + acDateArr[4]}
else{minEl.textContent = acDateArr[4]}

if (acDateArr[5] < 10){secEl.textContent = "0" + acDateArr[5]}
else{secEl.textContent = acDateArr[5]}

}, 1000)







// use this go get seconds. Maybe have different time measures in each box and use the setTime functions to refresh once ever 1000 milliseconds to display seconds, 60k milliseconds to display minutes, 3600 milliseconds to display hours etc. 


/*



var clock;
let time = 0;
clock = setInterval(function() {
time++; log();

}, 1000)





EXAMPLES OF CODES TO USE FOR TIMING



yearEl.textContent = acDateArr[0]
monthEl.textContent = acDateArr[1]
hourEl.textContent = acDateArr[2]
minEl.textContent = acDateArr[3]
secEl.textContent = acDateArr[4]




Date.prototype.setDate()
Sets the day of the month for a specified date according to local time.

Date.prototype.setFullYear()
Sets the full year (e.g. 4 digits for 4-digit years) for a specified date according to local time.

Date.prototype.setHours()
Sets the hours for a specified date according to local time.

Date.prototype.setMilliseconds()
Sets the milliseconds for a specified date according to local time.

Date.prototype.setMinutes()
Sets the minutes for a specified date according to local time.

Date.prototype.setMonth()
Sets the month for a specified date according to local time.

Date.prototype.setSeconds()
Sets the seconds for a specified date according to local time.


*/