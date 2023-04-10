let monthsArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
let dayContainer = document.getElementById('day-container')
let hoursContainer = document.getElementById('hours')
let dailyArray = []// contains the dates of all seven days in the fetch data (ISO format)
let dailyArrayFull = [] // contains overall data for each day (all seven days)
let dailyDataArray = [] // contains the selected day's overall data
let hourlyArray = []// contains 168 objects, one for each hour of one week (7 days x 24 hours)
let hourlyDataArray = []// contains data for each hour of a specific day
let hourIndexArray = []
// weathercode values included in response ( with transslation of values to words)
var wmoObj = {
"0": 'clear skies',
"1": 'mainly clear',
'2': 'partly cloudy',
'3': 'overcast',
'45': 'foggy',
'48': 'very foggy',
'51': 'light drizzle',
'53': 'moderate drizzle',
'55': 'dense drizzle',
'66': 'light, freezing drizzle',
'57': 'dense, freezing drizzle',
'61': 'light rain',
'63': 'moderate rain',
'65': 'heavy rain',
'66': 'freezing rain: light',
'67': 'freezing rain: heavy',
'71': 'light snowfall',
'73': 'moderate snowfall',
'75': 'heavy snowfall',
'77': 'snow grains',
'80': 'light rain showers',
'81': 'moderate rain showers',
'82': 'violent rain showers',
'85': 'light snow showers',
'86': 'heavy snow showers',
'95': 'thunderstorms',
'96': 'thunderstorms with light hail',
'99': 'thunderstorms with heavy hail'
}

var showDate = new Date()
var showDateWords = showDate.toDateString()
var showDateISO = showDate.toISOString().slice(0,10)

// weathercode values are linked to images for visual interpretation of code 
var wmoImagesObj = {
    "0": './weather images/clear skies.png',
    "1": './weather images/clear skies.png',
    '2': './weather images/partly cloudy.png',
    '3': './weather images/overcast.png',
    '45': './weather images/foggy.png',
    '48': './weather images/very foggy.png',
    '51': './weather images/light drizzle.png',
    '53': './weather images/moderate drizzle.png',
    '55': './weather images/moderate drizzle.png',
    '66': 'light, freezing drizzle',
    '57': 'dense, freezing drizzle',
    '61': './weather images/light rain.png',
    '63': './weather images/moderate rain.png',
    '65': './weather images/heavy rain.png',
    '66': 'freezing rain: light',
    '67': 'freezing rain: heavy',
    '71': './weather images/light snowfall.png',
    '73': './weather images/moderate snowfall.png',
    '75': './weather images/heavy snowfall.png',
    '77': './weather images/hailstorm.png',
    '80': './weather images/light rain.png',
    '81': './weather images/moderate rain.png',
    '82': './weather images/violent rain.png',
    '85': './weather images/light snowfall.png',
    '86': './weather images/heavy snowfall.png',
    '95': './weather images/thunderstorms.png',
    '96': 'thunderstorms with light hail.png',
    '99': 'thunderstorms with heavy hail.png'
}

/*


800	New-moon	New-moon
801	Waxing crescent	Waning crescent
802	First quarter	Last quarter
803	Waxing gibbous	Waning gibbous
804	Full-moon	Full-moon
805	Waning gibbous	Waxing gibbous
806	Last quarter	First quarter
807	Waning crescent	Waxing crescent
*/

var moonPhaseObj = {
    '800': './weather images/moon new.png',
    '801': './weather images/moon waxing crescent.png',
    '802': './weather images/moon first quarter.png',
    '803': './weather images/moon waxing gibbous.png',
    '804': './weather images/moon full.png',
    '805': './weather images/moon waning gibbous.png',
    '806': './weather images/moon last quarter.png',
    '807': './weather images/moon waning crescent.png',
}
// ARROW KEYS
$('#hour-right').click(() =>{
    console.log('right click')
    document.getElementById('hour-container').scrollBy({left:1200, behavior:'smooth'})
})

$('#hour-left').click(() =>{
    console.log('left click')
    document.getElementById('hour-container').scrollBy({left:-1200, behavior:'smooth'})
})

const showHours = (id) =>{
    dailyArrayFull.forEach(day =>{
        if(day.daily_name === id){
            getDayData(day.daily_date)
        }else{
            
       }
    })}


// render SINGLE DAY data (also get day name)
const renderDataDay = () =>{

dailyArrayFull.forEach(day =>{
    // create containing div
let dayDiv;

// doing it this way as having spaces causes a text mode to be placed between divs (need to research anther method) see above comment for original code. 
dayDiv = `<div class="day-div" id="${day.daily_name}" ><p class="medium"> <span class="month-name">${day.daily_name}</span> <span class="day-digit">${day.day_number}</span></p><img class="weather-icon" src="${wmoImagesObj[day.weathercode_key]}" ><div class="min-max"> <p class="large-para">${day.daily_max}&deg;</p><p class="small-para">${day.daily_min}&deg;</p></div><div class="precipitation"><p class="rain-para">${day.weathercode}</p></div></div>`

$('#day-container').append(dayDiv)

})

// add event listeners to each div
setTimeout(() => {
    // style first day in day container since that is the default displayed date
    $(`#${dailyArrayFull[0].daily_name}`).addClass('day-click-style')
$('.day-div').click((e) =>{

    // find ID of clicked element
const findID = (target) =>{
    // remove highlight class from any highlighted div before reapplying it to clicked div   
dailyArrayFull.forEach(day =>{
    let dayName = day.daily_name;
    $(`#${dayName}`).removeClass('day-click-style')
})

if(target.id){ showHours(target.id)
    $(`#${target.id}`).addClass('day-click-style')
 }else{findID(target.parentNode)}
}
findID(e.target)

})
}, 100);
}

// render HOURLY DATA for selected (or default) day
const prepareDataHours = (hourData, whichDay) =>{
  console.log(hourData, whichDay)

  // clear previous hours
  while(hoursContainer.firstChild){
    hoursContainer.removeChild(hoursContainer.firstChild)}

    hourData.forEach(hour =>{
        let hourDiv;
        hourDiv = `<div class="hour-div" id="${hour.day_name}"><img class="weather-icon" src="${wmoImagesObj[hour.weathercode_key]}" cloud-sun-img> <p class="large-para">${hour.hourly_temperature}<span>&deg;</span></p><p class="medium-weathercode">${hour.weathercode}</p><div class="precipitation-hour"><img class="raindrop" src="./raindrop large.png" ><p class="rain-para">${hour.precipitation_probability}</p></div><p class="medium">${hour.hour}</p></div>`
        
        $('#hours').append(hourDiv)
          })  

// GET SUNRISE AND SUNSET DATA FOR CLIKCED DAY!
          let todayName = hourData[0].day_name // get name of clicked day
          let dayLengthSunrise; // variable for sunrise element
          let dayLengthSunset // variable for sunset element
          // delete previous sunrise/sunset elements
          while(document.getElementById('sun-moon-times').firstChild){
            document.getElementById('sun-moon-times').removeChild(document.getElementById('sun-moon-times').firstChild) }
        
        // populate elements with HTML structure and new sunrise/sunset data by looping through dailyArrayFull to find day of currently displayed hours
        dailyArrayFull.forEach(day =>{
            if(day.daily_name === todayName){
// create sunrise element
dayLengthSunrise =`<div class="day-length-div"><img class="weather-icon-small" src="./weather images/sunrise.png"><p class="small">Sunrise</p><p class="medium">${day.sunrise}</p></div>`
// create sunset element
dayLengthSunset =`<div class="day-length-div"><img class="weather-icon-small" src="./weather images/sunset.png"><p class="small">Sunset</p><p class="medium">${day.sunset}</p></div>`
// append elements
$('#sun-moon-times').append(dayLengthSunrise)
$('#sun-moon-times').append(dayLengthSunset)
            }
        })

    }

// get selected day hours for another day
const getOtherDayHours = (day) =>{
hourlyDataArray = []
hourlyArray.forEach(hour =>{
        if(hour.date === day){ // if hour-object date matches selected day
 hourlyDataArray.push(hour)
    }})

    let otherDay = new Date(day).toString().slice(0,3)
   prepareDataHours(hourlyDataArray, otherDay)
}


// get selected day hours for current day
const getCurrentDayHours = (currentHour, currentDay) =>{

    console.log(currentHour,currentDay)
   hourlyDataArray = [] // clear any previous hourly data
// get hour objects of the current day
    hourlyArray.forEach(hour =>{
let hourObjectHour = hour.hour.slice(0,2) // convert hour-objects' hours to tens and units
        if(hour.date === currentDay){ // if hour-object date matches selected day
  //  console.log('default day matches current day', currentDay)
if(hourObjectHour == currentHour){ // in matching hour-objects, if hour matches current hour
     let index = hourlyArray.indexOf(hour) // get index of that hour
   //  console.log(index, hour)
for(i=index; i<index + 24; i++){
    hourlyDataArray.push(hourlyArray[i])
}
 }
   }
    })
   
   prepareDataHours(hourlyDataArray, 'TODAY')
}



// get data for for selected day. 
const getDayData = (day) =>{
let currentDayCheck = new Date() // get current date
let thisDay =  new Date(day)

// only populate days if function argument day is the same as current day. 
if(currentDayCheck.toString().slice(0,3) === thisDay.toString().slice(0,3)){
  //  console.log('same day')
// clear previous day divs 
    while(dayContainer.firstChild){
        dayContainer.removeChild(dayContainer.firstChild)
    }
        dailyArrayFull.forEach(element =>{
            if(element.daily_date === day){
    dailyDataArray.push(element)}
     // render daily hours data
        })

        renderDataDay(dailyDataArray)

}else{console.log('otherDay')}
// check whether selected day is current day or another day

let currentDayCheckString = new Date().toString().slice(0,16) // convert date to string for comparison
let dayReformatString = new Date(day).toString().slice(0,16) //reformat 'day' to 'long date', and string

if(dayReformatString === currentDayCheckString){ // if selected day matches current day
let currentHour = currentDayCheck.toString().slice(16,18) // get current hour
//  console.log(currentHour)
    getCurrentDayHours(currentHour, day) // send day and current hour
}else{ // selected day is not current day
 getOtherDayHours(day)}

}


// DAILY FETCH (REMEMBER TO PUT TIMEZONE FOR DAILY REQUESTS)
fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,weathercode')
.then(response =>{
return response.json();
})
.then(data =>{
    console.log(data)
    let dailyData = data.daily;
dailyData.time.forEach(element =>{
    let dayIndex = dailyData.time.indexOf(element)
     // create object for each day's data
   let dailyObj = {
    "daily_date": '',
    "daily_name": '',
    "daily_max": '',
    "daily_min": '',
    "sunrise": '',
    "sunset": '',
    "day_number": '',
    "month_name": '',
    "daily_precipitation": '',
    "weathercode_key": '',
    "weathercode": '',
    }
let elementDate = new Date(element) // get long date rendinging to extract day name
let dayName = elementDate.toString().slice(0,3) // extract day name

dailyObj.daily_date = element;
dailyObj.daily_name =  dayName;
dailyObj.daily_max = Math.round(dailyData.temperature_2m_max[dayIndex])
dailyObj.daily_min = Math.round(dailyData.temperature_2m_min[dayIndex])
dailyObj.sunrise = dailyData.sunrise[dayIndex].slice(11,17)
dailyObj.sunset = dailyData.sunset[dayIndex].slice(11,17)
dailyObj.day_number = parseInt(element.slice(8,10))
dailyObj.month_name = monthsArray[(parseInt(element.slice(5,7))) - 1]
dailyObj.daily_precipitation = dailyData.precipitation_probability_max[dayIndex]
dailyObj.weathercode_key = dailyData.weathercode[dayIndex]
dailyObj.weathercode = wmoObj[`${dailyData.weathercode[dayIndex]}`]
dailyArrayFull.push(dailyObj)
})
   console.log(dailyArrayFull)
let sevenDays = data.daily.time;
sevenDays.forEach(day =>{
dailyArray.push(day)
})

})
.catch(err =>{
console.log(`error - cannot load weather data: ${err}`)

})

// HOURLY FETCH. 
fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,precipitation_probability')
.then(response =>{
    return response.json()
})
.then(data =>{
let hourlyData = data.hourly;
 // will use weathercode to give familiar layman terms, such as cloudy, clear skies  etc... 
hourlyData.time.forEach(element => {
    let hourIndex = hourlyData.time.indexOf(element)

    let hourlyObj = {
        "date": '',
        "day_name": '',
        "day_number": '',
        "hour": '',
        "hourly_temperature": '',
        "apparent_temperature": '',
        "precipitation_probability": '',
        "weathercode_key": '',
        "weathercode": '',
    }
    hourlyObj.day_name  = (new Date(element.slice(0,10))).toString().slice(0,3)
    hourlyObj.day_number = parseInt((new Date(element.slice(0,10))).toString().slice(9,11))
    hourlyObj.date =  element.slice(0,10);
    hourlyObj.hour = element.slice(11,16);
    hourlyObj.weathercode_key = data.hourly.weathercode[hourIndex]
    hourlyObj.weathercode = wmoObj[`${data.hourly.weathercode[hourIndex]}`]
    hourlyObj.hourly_temperature = Math.round(data.hourly.temperature_2m[hourIndex])
    hourlyObj.apparent_temperature = Math.round(data.hourly.apparent_temperature[hourIndex])
    hourlyObj.precipitation_probability = data.hourly.precipitation_probability[hourIndex] + '%'
hourlyArray.push(hourlyObj)
    
});
// send the current date, at the zero'th position of the daily array to get hour data for current date
getDayData(dailyArray[0])
})
.catch(err =>{
console.log(`error - cannot load weather data: ${err}`)    
})





// MOON AND OTHER WEATHER DATA
// get data from nasa API
var nasaApiKey = 'DpEFzDckZgib7IVffUhcbSYtmQUr2i7U7Anbw4NE'


// MOON KEY FOR Q-WEATHER
var qWeatherKey = '378770395e954a6c9c251ecb7f4a3727';

var weatherWithMoon = 'https://devapi.qweather.com/v7/weather/3d?location=A57D&key=378770395e954a6c9c251ecb7f4a3727';

// find location details
var cityLookUpUrl = 'https://geoapi.qweather.com/v2/city/lookup?location=A57D&key=378770395e954a6c9c251ecb7f4a3727';

var detailedMoondUrl = 'https://devapi.qweather.com/v7/astronomy/moon?location=A57D&language=en&date=20230425&key=378770395e954a6c9c251ecb7f4a3727';

var weatherUrl = 'https://devapi.qweather.com/v7/weather/3d?location=A57D&key=378770395e954a6c9c251ecb7f4a3727'


fetch(weatherWithMoon)
.then(response =>{
return response.json()
})
.then(data =>{
    console.log(data)
let moonrise;
let moonset;
let moonphase;
let dayLengthMoonrise;
let dayLengthMoonset;
console.log(data.daily[0].moonPhaseIcon)
// in case there is no moonrise
if(data.daily[0].moonrise == ''){moonrise = 'None'}else{
moonrise = data.daily[0].moonrise 
}
// in case there is no moonset
if(data.daily[0].moonset == ''){moonset = 'None'}else{
    moonset = data.daily[0].moonset 
}

// create moonphase element

moonphase = `<img id="moon-phase"class="weather-icon" src="${moonPhaseObj[data.daily[0].moonPhaseIcon]}">`
    // create sunrise element
dayLengthMoonrise =`<div class="day-length-div"><img class="weather-icon-small" src="./weather images/moonrise.png"><p class="small">Moonrise:</p><p class="medium">${moonrise}</p></div>`
// create sunset element
dayLengthMoonset =`<div class="day-length-div"><img class="weather-icon-small" src="./weather images/moonset.png"><p class="small">Moonset</p><p class="medium">${moonset}</p></div>`
// append elements


$('#sun-moon-times').append(moonphase)
$('#sun-moon-times').append(dayLengthMoonrise)
$('#sun-moon-times').append(dayLengthMoonset)



})
.catch(err =>{
    console.log(err)
})