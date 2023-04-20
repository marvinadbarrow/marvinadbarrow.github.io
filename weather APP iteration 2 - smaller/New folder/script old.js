
let openWeatherAPIKey = 'aa9ca08e40e1a619bcc7007904a2754c'
console.log(openWeatherAPIKey)

let dayEl = document.getElementById('day-direction-div')
let hourEl = document.getElementById('hour-direction-div')
let sunMoonEl = document.getElementById('sun-moon-times')

let monthsArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
let dayContainer = document.getElementById('day-container')
let hoursContainer = document.getElementById('hours')
let dailyArray = []// contains the dates of all seven days in the fetch data (ISO format)
let dailyArrayFull = [] // contains overall data for each day (all seven days)
let dailyDataArray = [] // contains the selected day's overall data
let hourlyArray = []// contains 168 objects, one for each hour of one week (7 days x 24 hours)
let hourlyDataArray = []// contains data for each hour of a specific day
let hourIndexArray = []
let moonDataArray = [] // contains an object representing each day of moon data
let nighttimeArray = [] //stores hours between sunset of day x and sunrise of day x + 1, where night icons will replace day icons
let  currentHourArray = []
var countryDetailsArr = [{
    city: 'London',
    country: 'England'
}]

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
'56': 'light, freezing drizzle',
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
    "1": './weather images/partly cloudy.png',
    '2': './weather images/partly cloudy.png',
    '3': './weather images/overcast.png',
    '45': './weather images/foggy.png',
    '48': './weather images/very foggy.png',
    '51': './weather images/light drizzle.png',
    '53': './weather images/light drizzle.png',
    '55': './weather images/moderate drizzle.png',
    '56': 'light sleet.png',
    '57': 'heavy sleet.png',
    '61': './weather images/light rain.png',
    '63': './weather images/moderate rain.png',
    '65': './weather images/heavy rain.png',
    '66': 'light hail.png',
    '67': 'heavy hail.png',
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

var wmoNightImagesObj = {
    "0": './weather images/clear skies night.png',
    "1": './weather images/partly cloudy night.png',
    '2': './weather images/partly cloudy night.png',
    '3': './weather images/overcast.png',
    '45': './weather images/foggy night.png',
    '48': './weather images/foggy night.png',
    '51': './weather images/light drizzle night.png',
    '53': './weather images/light drizzle night.png',
    '55': './weather images/moderate drizzle night.png',
    '56': 'light sleet night.png',
    '57': 'heavy sleet.png',
    '61': './weather images/light rain.png',
    '63': './weather images/moderate rain.png',
    '65': './weather images/heavy rain.png',
    '66': 'light hail.png',
    '67': 'heavy hail.png',
    '71': './weather images/light snowfall.png',
    '73': './weather images/moderate snowfall.png',
    '75': './weather images/heavy snowfall.png',
    '77': './weather images/hailstorm.png',
    '80': './weather images/light rain night.png',
    '81': './weather images/moderate rain.png',
    '82': './weather images/violent rain.png',
    '85': './weather images/light snowfall.png',
    '86': './weather images/heavy snowfall.png',
    '95': './weather images/thunderstorms.png',
    '96': 'thunderstorms with light hail.png',
    '99': 'thunderstorms with heavy hail.png'


}
var moonPhaseObj = {
    '800': './weather images/moon new.png',
    '801': './weather images/moon waxing crescent.png',
    '802': './weather images/moon first quarter.png',
    '803': './weather images/moon waxing gibbous.png',
    '804': './weather images/moon full.png',
    '805': './weather images/moon waning gibbous.png',
    '806': './weather images/moon third quarter.png',
    '807': './weather images/moon waning crescent.png',
}

// between sunset and sunrise changes body background image, text color and day/hour/sun-moon container opacities. 
const nightColors = () =>{
$('body').addClass('night-colors')
dayEl.style.cssText =' background-color: rgba(255, 255, 255, 0.178);'
hourEl.style.cssText =' background-color: rgba(255, 255, 255, 0.178);'
sunMoonEl.style.cssText =' background-color: rgba(255, 255, 255, 0.178);'
$('.convert-btn').css('color', 'white')
}

// between sunrise and sunset revert to default page styling
const dayColors = () =>{
    $('body').removeClass('night-colors')
    dayEl.style.cssText =' background-color: rgba(255, 255, 255, 0.634);'
    hourEl.style.cssText =' background-color: rgba(255, 255, 255, 0.634);'
    sunMoonEl.style.cssText =' background-color: rgba(255, 255, 255, 0.634);'

    }
// MOON AND OTHER WEATHER DATA

const getMoonData = (hourData) =>{
    let moonrise;
    let moonset;
    let moonphase;
    let dayLengthMoonrise;
    let dayLengthMoonset;
    let hoursStartDate = hourData[0].date;

    moonDataArray.forEach(day =>{
        if(day.fxDate === hoursStartDate){
let moonDataIndex = moonDataArray.indexOf(day) //get index of moon array that corresponds to hours' day.
// in case there is no moonrise, use this condition
    if(moonDataArray[moonDataIndex].moonrise == ''){moonrise = 'None'}else{
        moonrise = moonDataArray[moonDataIndex].moonrise 
        }
        // in case there is no moonset use this condition
        if(moonDataArray[moonDataIndex].moonset == ''){moonset = 'None'}else{
            moonset = moonDataArray[moonDataIndex].moonset 
        }

    // create moonphase element
    moonphase = `<img id="moon-phase"class="weather-icon" src="${moonPhaseObj[moonDataArray[moonDataIndex].moonPhaseIcon]}">`
    // create moonrise element
dayLengthMoonrise =`<div class="day-length-div"><img class="weather-icon-small" src="./weather images/moonrise.png"><p class="small">Moonrise:</p><p class="medium">${moonrise}</p></div>`
// create moonset element
dayLengthMoonset =`<div class="day-length-div"><img class="weather-icon-small" src="./weather images/moonset.png"><p class="small">Moonset</p><p class="medium">${moonset}</p></div>`
// append elements


$('#sun-moon-times').append(moonphase)
$('#sun-moon-times').append(dayLengthMoonrise)
$('#sun-moon-times').append(dayLengthMoonset)
        }
    })

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


const fullDayDetails = (array) =>{
let todayContainer;

console.log(array)

// if current hour data already showing, don't re-load current weather info
if(currentHourArray[0] == array.hour){console.log('current hour already displaying')}else{
    currentHourArray = [] // clear array containing previous math-floor hour string
    currentHourArray.push(array.hour) // push current math-floor hour string to array
    let dateNow = new Date() // get current precise hour

let imageSource; // set image source accoring to daylight status (dark or light)
if(array.is_day === 1){ imageSource = wmoImagesObj}else{imageSource = wmoNightImagesObj}
    todayContainer = `<p id="location-para">${countryDetailsArr[0].city}, ${countryDetailsArr[0].country}</p>
    <div id="image-temperature-container">
        <img src="${imageSource[array.weathercode_key]}" class="weather-icon-large" alt="wmo extreme image">
        <p id="temperature-para">${array.hourly_temperature}&deg;</p>
            <div id="conversion-container">
            <button class="convert-btn" id="celcius-btn">C</button>
            <button class="convert-btn" id="fahrenheit-btn">F</button>
            </div>
    </div>

    <p id="wmo-extreme-para">${array.weathercode}</p>
    <p id="last-update-para">Last updated: ${dateNow.toTimeString().slice(0,5)}</p>
            <div class="secondary-day-details" id="secondary-details-container">
            <p id="apparent-temperature">Feels like: ${array.apparent_temperature}&deg;</p>
            <p id="humidity">Humidity: ${array.relative_humidity}%</p>
            <p id="wind-speed">Windspeed: ${array.windspeed_10m}km/h</p>
            </div>
    
    `
$('#main-day-content').html(todayContainer)

}

}

// render SINGLE DAY data (also get day name)
const renderDataDay = () =>{

dailyArrayFull.forEach(day =>{
    // create containing div
let dayDiv;

// doing it this way as having spaces causes a text mode to be placed between divs (need to research anther method) see above comment for original code. 
dayDiv = `<div class="day-div" id="${day.daily_name}" ><p class="medium"> <span class="month-name">${day.daily_name}</span> <span class="day-digit">${day.day_number}</span></p><img class="weather-icon" src="${wmoImagesObj[day.weathercode_key]}" ><div class="min-max"> <p class="large-para">${day.daily_max}&deg;</p><p class="small-para">${day.daily_min}&deg;</p></div><div class="precipitation"><p class="rain-para">${day.weathercode}</p></div></div>`

$('#day-container').append(dayDiv)

})



// DAY MODE / NIGHT MODE SETUP
let sunriseHour = parseInt(dailyArrayFull[0].sunrise) // get sunrise hour
let sunsetHour = parseInt(dailyArrayFull[0].sunset) // get sunset hour
let date = new Date()
let hourNow = parseInt(date.toTimeString().slice(0,2))
if(hourNow < sunriseHour){nightColors()}
else if(hourNow < sunsetHour + 1){ dayColors()}
else{nightColors()}
// add event listeners to each div
setTimeout(() => {
    // highlight first day
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
    $(`#${target.id}`).addClass('day-click-style') // highlight clicked day
 }else{findID(target.parentNode)}
}
findID(e.target)

})
}, 100);
}



// render HOURLY DATA for selected (or default) day
const renderDataHours = (hourData, whichDay, periodArray) =>{
  // when a different hour is clicked, hour container scrolls to far left of hour output. 
  document.getElementById('hour-container').scrollBy({left:-3600, behavior:'smooth'})
  // clear previous hours
  while(hoursContainer.firstChild){
    hoursContainer.removeChild(hoursContainer.firstChild)}
console.log(hourData)

    hourData.forEach(hour =>{
        let imgSource;
// set conditions for choosing image source (daytime images or nighttime images)
        if(hour.is_day === 0){ // 0 = night hours
            imgSource = wmoNightImagesObj; 
         }else{imgSource = wmoImagesObj;}
   
        let hourDiv;
        hourDiv = `<div class="hour-div" id="${hour.day_name}"><img class="weather-icon" src="${imgSource[hour.weathercode_key]}" cloud-sun-img> <p class="large-para">${hour.hourly_temperature}<span>&deg;</span></p><p class="medium-weathercode">${hour.weathercode}</p><div class="precipitation-hour"><img class="raindrop" src="./raindrop large.png" ><p class="rain-para">${hour.precipitation_probability}</p></div><p class="medium">${hour.hour}</p></div>`
        
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

 // set delay and then send hourData to get moon data array
 setTimeout(() => {
  getMoonData(hourData)
 }, 500);   

    }


// get selected day hours for another day
const getOtherDayHours = (day) =>{
hourlyDataArray = []
hourlyArray.forEach(hour =>{
        if(hour.date === day){ // if hour-object date matches selected day
 hourlyDataArray.push(hour) // push all matching objects (there are 24) to hourly data array
    }})

    let otherDay = new Date(day).toString().slice(0,3)
   renderDataHours(hourlyDataArray, otherDay,dailyDataArray) // send hour data array and day date to hour renderer
}


// get selected day hours for current day
const getCurrentDayHours = (currentHour, currentDay) =>{

hourlyDataArray = [] // clear any previous hourly data
// get hour objects of the current day
    hourlyArray.forEach(hour =>{
let hourObjectHour = hour.hour.slice(0,2) // convert hour-objects' hours to tens and units
        if(hour.date === currentDay){ // if hour-object date matches selected day
  //  console.log('default day matches current day', currentDay)
if(hourObjectHour == currentHour){ // in matching hour-objects, if hour matches current hour
     let index = hourlyArray.indexOf(hour) // get index of that hour
   //  console.log(index, hour)
for(i=index; i<index + 24; i++){ // push 24 objects containing hour data, to hourly data array (beginning with current hour object)
    hourlyDataArray.push(hourlyArray[i])
}
 }
   }
    })

// check if current hour is daytime or nighttime and execute correct day or night render. 
    if(hourlyDataArray[0].is_day === 0){ // 0 = night hours
        nightColors()}else{dayColors}
     
    fullDayDetails(hourlyDataArray[0])  // renders day full details
   renderDataHours(hourlyDataArray, 'TODAY', dailyDataArray)
}



// this should only run once the last fetch is complete
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
        dailyArrayFull.forEach(element =>{ // check array with 7 day objects
            if(element.daily_date === day){ // if the day's date, matches a day object's date
    dailyDataArray.push(element)}// push that day (containing one day's details) to daily data
     
        })

        renderDataDay(dailyDataArray)

}else{console.log('otherDay')}
// check whether selected day is current day or another day

let currentDayCheckString = new Date().toString().slice(0,16) // convert date to string for comparison
let dayReformatString = new Date(day).toString().slice(0,16) //reformat 'day' to 'long date', and string

if(dayReformatString === currentDayCheckString){ // if selected day matches current day
let currentHour = currentDayCheck.toString().slice(16,18) // get current hour
//  console.log(currentHour)
    getCurrentDayHours(currentHour, day) // send current hour and current date 

}else{ // selected day is not current day so send just day (and hours of other day will be rendered, starting at 00:00 hrs)
 getOtherDayHours(day)}

}


-
// DAILY FETCH (REMEMBER TO PUT TIMEZONE FOR DAILY REQUESTS)
fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4996&longitude=-0.2953&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,weathercode')
.then(response =>{
return response.json();
})
.then(data =>{

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

// setting conditions for when there is no sunrise or no sunset
if(dailyData.sunrise == ''){dailyObj.sunrise = 'none'}else{dailyObj.sunrise = dailyData.sunrise[dayIndex].slice(11,17)}
if(dailyData.sunset == ''){dailyObj.sunset = 'none'}else{dailyObj.sunset = dailyData.sunset[dayIndex].slice(11,17)}

dailyObj.daily_date = element;
dailyObj.daily_name =  dayName;
dailyObj.daily_max = Math.round(dailyData.temperature_2m_max[dayIndex])
dailyObj.daily_min = Math.round(dailyData.temperature_2m_min[dayIndex])
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
fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4996&longitude=-0.2953&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,precipitation_probability,windspeed_10m,is_day')
.then(response =>{
    return response.json()
})
.then(data =>{
    console.log(data)
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
        "relative_humidity": '',
        "windspeed_10m": '',
        "is_day": '',
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
    hourlyObj.relative_humidity = data.hourly.relativehumidity_2m[hourIndex]
    hourlyObj.windspeed_10m = data.hourly.windspeed_10m[hourIndex]
    hourlyObj.is_day = data.hourly.is_day[hourIndex]

hourlyArray.push(hourlyObj)
    
});

})
.catch(err =>{
console.log(`error - cannot load weather data: ${err}`)    
})

var weatherAndMoonUrl = 'https://devapi.qweather.com/v7/weather/7d?location=A57D&key=378770395e954a6c9c251ecb7f4a3727';


// QUOTA FOR MOON DATA FETCHES IS QUITE SMALL SO LIMIT THE SEARCH TO ONLY ONCE A DAY IF JUST REFRESHING THE PAGE - FOR NOW.  THIS WILL NEED TO CHANGE WHEN CITY DATA IS CHANGED IN FETCHES
const fetchMoonData = () =>{
    // if moon data has not been fetched and stored in local storage today do the following;
if(!localStorage.getItem(`moon_data_${showDateISO}`)){
    fetch(weatherAndMoonUrl)
.then(response =>{
return response.json()
})
.then(data =>{
// store data in localStorage with current day's date in the key
localStorage.setItem(`moon_data_${showDateISO}`, JSON.stringify(data))
data.daily.forEach(day =>{
    moonDataArray.push(day)
    })
// send the current date, at the zero'th position of the daily array to get hour data for current date
getDayData(dailyArray[0])    
  })
.catch(err =>{
    console.log(err)
})
}else{ // otherwise data has already been fetched so get data from localStorage
let moonData = localStorage.getItem(`moon_data_${showDateISO}`)
let moonDataParsed = JSON.parse(moonData)
console.log(moonDataParsed)
moonDataParsed.daily.forEach(day =>{
    moonDataArray.push(day)
})
setTimeout(() => {
    getDayData(dailyArray[0]) 
}, 200);

}

}

fetchMoonData()



const getCity = (city) =>{

let limit = 5; 
// add city name and limit of returned cities to geo location url
var geoOnlyUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=' + limit +'&appid=' + openWeatherAPIKey

// fetch
    fetch(geoOnlyUrl)
    .then(response=>{
        return response.json()
    })
    .then(data =>{
        console.log(data)
        let townPara;
        data.forEach(town =>{


 townPara = `<div class="town-div"><p class="town-para">${town.name}, ${town.state}: ${town.country}</p></div>`;
  $('#country-modal').append(townPara)          
        })
 
    })
}





$('#search-bar').focus((e) =>{
    console.log(e)
    $('#search-bar').attr('placeholder', '')
})

$('#search-btn').click((e) =>{ // when search button clicked
    let input = document.getElementById('search-bar').value // get value in search bar
if(input == ''){console.log('please enter a city name')} // if search bar empty alert user
else{ // 
   let selectedCity = input; // otherwise, inputted word is selected city
   getCity(selectedCity) // send to get city function with 'city' name as parameter
}
})



