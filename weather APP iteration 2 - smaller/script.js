$countrySelect = $('#country-modal')
$countrySelect.prepend('<label for="select-container" class="label">Choose a city</label><br>')
$selectItem = $('#select-container')
let openWeatherAPIKey = 'aa9ca08e40e1a619bcc7007904a2754c'
let dayEl = document.getElementById('day-direction-div')
let hourEl = document.getElementById('hour-direction-div')
let sunMoonEl = document.getElementById('sun-moon-times')
// internal containers that contain actual hours and days below
let mainDayEl = document.getElementById('main-day-content')
let hourHolder = document.getElementById('hours')
let dayHolder = document.getElementById('day-container')
let elementArray = [dayHolder, hourHolder, sunMoonEl, mainDayEl]
let mainContainersArray = [dayEl, hourEl, sunMoonEl]
let dayContainer = document.getElementById('day-container')
let hoursContainer = document.getElementById('hours')
let dailyDates = []// contains the dates of all seven days in the fetch data (ISO format)
let dailyArrayFull = [] // contains overall data for each day (all seven days)


let dailyDataArray = [] // contains the currently selected day's overall data
let hourlyArray = []// contains 168 objects, one for each hour of one week (7 days x 24 hours)
let hourlyDataArray = []// contains data for each hour of a specific day
let hourIndexArray = []

let moonDataArray = [] // contains an object representing each day of moon data
let nighttimeArray = [] //stores hours between sunset of day x and sunrise of day x + 1, where night icons will replace day icons
let  currentHourArray = []
let townArray = [] // contains data of searched town; town name, latitude, longitude, parent country, country code
var countryDetailsArr = []
var showDate = new Date()
var showDateWords = showDate.toDateString()
var showDateISO = showDate.toISOString().slice(0,10)
var arrayContainerArr = [dailyDates, dailyArrayFull, dailyDataArray, hourlyArray, hourlyDataArray,
    hourIndexArray, moonDataArray, nighttimeArray, currentHourArray, hourlyArray,]
var moonPhaseObj, wmoImagesObj, wmoNightImagesObj, wmo_translation 
// daylight status mode renderer (night or day mode)
const daylightStatus = (status) =>{
    console.log(status)
    let night =' background-color: rgba(255, 255, 255, 0.178);';
    let day =' background-color: rgba(255, 255, 255, 0.634);' ; 
switch(status){
    case 'night': $('.convert-btn').css('color', 'white');
    mainContainersArray.forEach(element =>{ element.style.cssText = night});
    $('body').addClass('night-colors');
    break;
    default:mainContainersArray.forEach(element =>{ element.style.cssText = day});
    $('body').removeClass('night-colors');
}
    }

 // PREPARING AND RENDERING MOONRISE/MOONSET AND MOONPHASE INFORMATION
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
    document.getElementById('hour-container').scrollBy({left:1200, behavior:'smooth'})
   })
   $('#hour-left').click(() =>{
           document.getElementById('hour-container').scrollBy({left:-1200, behavior:'smooth'})
   })

   // GET HOURLY DATA FOR SPECIFIC CLICKED DAY (executes getDayData() with selected day as parameter)
const showHours = (id) =>{
    dailyArrayFull.forEach(day =>{
        if(day.daily_name === id){            console.log(day)
            getDayData(day.daily_date, hourlyDataArray[0])
        }else{

       }
    })}
// DISPLAY FULL WEATHER DETAILS for current day
const fullDayDetails = (array) =>{
let todayContainer;
// if current hour data already showing, don't re-load current weather info
if(currentHourArray[0] == array.hour){console.log('current hour already displaying')}else{
    currentHourArray = [] // clear array containing previous math-floor hour string
    currentHourArray.push(array.hour) // push current math-floor hour string to array
    let dateNow = new Date() // get current precise hour
let imageSource; // set image source accoring to daylight status (dark or light)
if(array.is_day === 1){ imageSource = wmoImagesObj}else{imageSource = wmoNightImagesObj}
    todayContainer = `<p id="location-para">${countryDetailsArr[0]}, ${countryDetailsArr[1]}</p>
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

// render gereral weather data for each day
const renderDataDay = () =>{
    // take 7 days of data and render each day from day one. 
    dailyArrayFull.forEach(day =>{
     // create containing HTML element to render weather data and images
    let dayDiv = `<div class="day-div" id="${day.daily_name}" ><p class="medium"> <span class="month-name">${day.daily_name}</span> <span class="day-digit">${day.day_number}</span></p><img class="weather-icon" src="${wmoImagesObj[day.weathercode_key]}" ><div class="min-max"> <p class="large-para">${day.daily_max}&deg;</p><p class="small-para">${day.daily_min}&deg;</p></div><div class="precipitation"><p class="rain-para">${day.weathercode}</p></div></div>`
    
    $('#day-container').append(dayDiv)
    
    })
    // EVENT LISTENER FOR EACH DAY ELEMENT
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
    while(hoursContainer.firstChild){hoursContainer.removeChild(hoursContainer.firstChild)}
  console.log(hourData)
      hourData.forEach(hour =>{
          let imgSource;
  // set conditions for choosing image source (daytime or nighttime object)
          if(hour.is_day === 0){ // 0 = night hours
              imgSource = wmoNightImagesObj; 
           }else{imgSource = wmoImagesObj;}
             
        let hourDiv;
        hourDiv = `<div class="hour-div" id="${hour.day_name}"><img class="weather-icon" src="${imgSource[hour.weathercode_key]}" cloud-sun-img> <p class="large-para">${hour.hourly_temperature}<span>&deg;</span></p><p class="medium-weathercode">${hour.weathercode}</p><div class="precipitation-hour"><img class="raindrop" src="./raindrop large.png"><p class="rain-para">${hour.precipitation_probability}</p></div><p class="medium">${hour.hour}</p></div>`
        
        $('#hours').append(hourDiv)
          })  
// GET SUNRISE AND SUNSET DATA FOR CLIKCED DAY!
          let todayName = hourData[0].day_name // get name of clicked day
          let dayLengthSunrise; // variable for sunrise element
          let dayLengthSunset // variable for sunset element
          // delete previous sunrise/sunset elements
          while(document.getElementById('sun-moon-times').firstChild){
            document.getElementById('sun-moon-times').removeChild(document.getElementById('sun-moon-times').firstChild) }
        
// get sunrise/sunset data
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

    // PREPARE HOURLY WEATHER DATA FOR SPECIFICALLY SELECTED DAY 
const getOtherDayHours = (day) =>{
    hourlyDataArray = []
    hourlyArray.forEach(hour =>{
            if(hour.date === day){ // if hour-object date matches selected day
     hourlyDataArray.push(hour) // push all matching objects (there are 24) to hourly data array
        }})
        let otherDay = new Date(day).toString().slice(0,3)
       renderDataHours(hourlyDataArray, otherDay,dailyDataArray) // send hour data array and day date to hour renderer
    }

// PREPARE HOURLY WEATHER DATA FOR CURRENT DAY (default day)

const getCurrentDayHours = (currentHour,offset, day) =>{
    hourlyDataArray = [] // clear any previous hourly data
    // get hour objects of the current daylet timeNow = currentHour;
let timeOffsetSum = currentHour + offset;
console.log(timeOffsetSum)
let newTime;
let timeFormat

// check daylight status of local time
const checkDaylight = () =>{
    if(hourlyDataArray[0].is_day === 0){ 
        daylightStatus('night')}
        else{daylightStatus('day')} 
       fullDayDetails(hourlyDataArray[0])  // renders day full details
  renderDataHours(hourlyDataArray, 'TODAY', dailyDataArray)// render current hours on-screen
}


// find hour object corresponding to new location's local time
const findHourObject = (newHour, day) =>{
hourlyArray.forEach(hour =>{
    if(hour.date === day){ // if array object hour matches current hour parameter
if(hour.hour == newHour){ //if array object hour matches current hour
 let index = hourlyArray.indexOf(hour) // get index of that hour
for(i=index; i<index + 24; i++){ // select 24 hour-objects from the matching hour onwards

    hourlyDataArray.push(hourlyArray[i]) // push those 24 objects to array for rendering data
}}}
})
checkDaylight(hourlyDataArray)
}


// convert new location's local time to ISO format (HH:MM)
const convertNewTime = (testTime) =>{
    if(testTime < 10){timeFormat = `0${testTime}:00`}
    else{timeFormat = testTime + ':00'}
    findHourObject(timeFormat, day)
    }
    
    // get local time of new location
    if(timeOffsetSum < 0){newTime = 24 + timeOffsetSum; convertNewTime(newTime)}
    else if(timeOffsetSum > 23){newTime = (timeOffsetSum -1) % 24; convertNewTime(newTime)}
    else{newTime = timeOffsetSum; convertNewTime(newTime)}
    
    }

    
    // PREPARES DATA FOR GENERAL DAY WEATHER, AND CALLS FUNCTION WHICH PREPARES HOURLY WEATHER DATA

    const getDayData = (day, hours) =>{
        // day is ISO date of first day of all the hours
        console.log(hours)
        console.log(day)
        console.log(dailyDates)
        // hours is the first  hour of the day
            let currentDayCheck = new Date() // get current date

            let currentHour = currentDayCheck.getHours() // get current hour

            // clear previous day divs if there are any
        while(dayContainer.firstChild){dayContainer.removeChild(dayContainer.firstChild)}

        
        dailyDates.forEach(element =>{ // check array with 7 day objects
            if(element === day){ // if the day's date, matches a day object's date
                console.log('clicked day IS current day')
    let index = dailyDates.indexOf(element)
    dailyDataArray.push(dailyArrayFull[index])}// save day data
    else{console.log('clicked day is not current day')}
             })
        renderDataDay(dailyDataArray)

                // check if the first of the returned days matches the day sent to this function. 
                if(dailyArrayFull[0].daily_date === day){  
                    getCurrentDayHours(currentHour, hours.timezone_offset_hours, day)// if so, render hours of first day
                        }else{getOtherDayHours(day)} // otherwise, render hours of clicked day
                    }

                    
                    // HOURLY WEATHER FETCH. 
const fetchHouryData = (town, state, latitude, longitude, timezone) =>{
    console.log(town, state, latitude, longitude)
        let hourlyUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&timezone=' + timezone + '&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,precipitation_probability,windspeed_10m,is_day'
        fetch(hourlyUrl)
        .then(response => response.json()
        )
        .then(data =>{
            console.log(data)
        let hourlyData = data.hourly;
         // will use weathercode to give familiar layman terms, such as cloudy, clear skies  etc... 
        hourlyData.time.forEach(element => {
            let hourIndex = hourlyData.time.indexOf(element)
        // object to hold all hourly parameters

        
    let timezone_offset_hours = (data.utc_offset_seconds)/3600
    let hourlyObj = {

        "date": element.slice(0,10),
        "day_name": (new Date(element.slice(0,10))).toString().slice(0,3),
        "day_number": element.slice(8,10),
        "hour": element.slice(11,16),
        "hourly_temperature": Math.round(data.hourly.temperature_2m[hourIndex]),
        "apparent_temperature": Math.round(data.hourly.apparent_temperature[hourIndex]),
        "precipitation_probability": data.hourly.precipitation_probability[hourIndex] + '%',
        "weathercode_key": data.hourly.weathercode[hourIndex],
        "weathercode": wmo_translation[`${data.hourly.weathercode[hourIndex]}`],
        "relative_humidity": data.hourly.relativehumidity_2m[hourIndex],
        "windspeed_10m": data.hourly.windspeed_10m[hourIndex],
        "is_day": data.hourly.is_day[hourIndex],
        "timezone":data.timezone,
        "timezone_abbreviation":data.timezone_abbreviation,
        "timezone_offset_seconds": data.utc_offset_seconds,
        "timezone_offset_hours": timezone_offset_hours,
    };
hourlyArray.push(hourlyObj)

  });   
  console.log(hourlyArray)
  getDayData(hourlyArray[0].date, hourlyArray[0] )
})
.catch(err =>{
console.log(`error - cannot load weather data: ${err}`)    
})

}
// DAILY FETCH
const fetchDailyData = (town, state, latitude, longitude, timezone) =>{
console.log(town, state, latitude, longitude, timezone)
countryDetailsArr = [] // contains parameters for getting country weather
countryDetailsArr.push(town, state, longitude, latitude)
let dailyUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&timezone=' + timezone + '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,weathercode'
fetch(dailyUrl)
.then(response =>response.json())
.then(data =>{
    console.log(data)
    let dailyData = data.daily;
dailyData.time.forEach(element =>{
    let dayIndex = dailyData.time.indexOf(element)
     // create object for each day's data
     let elementDate = new Date(element) // get long date rendinging to extract day name
     let dayName = elementDate.toString().slice(0,3) // extract day name
     let dailyObj = {
      "daily_date": element,
      "daily_name": dayName,
      "daily_max": Math.round(dailyData.temperature_2m_max[dayIndex]),
      "daily_min": Math.round(dailyData.temperature_2m_min[dayIndex]),
      "sunrise": dailyData.sunrise[dayIndex].slice(11,16),
      "sunset": dailyData.sunset[dayIndex].slice(11,16),
      "day_number": parseInt(element.slice(8,10)),
      "daily_precipitation": dailyData.precipitation_probability_max[dayIndex],
      "weathercode_key": dailyData.weathercode[dayIndex],
      "weathercode": wmo_translation[`${dailyData.weathercode[dayIndex]}`],
      "timezone":data.timezone,
      "timezone_abbreviation":data.timezone_abbreviation,
          };
  dailyArrayFull.push(dailyObj)
  })
              

     console.log(dailyArrayFull)
     let sevenDays = data.daily.time;
     sevenDays.forEach(day =>{
     dailyDates.push(day)
     })
     fetchHouryData(town, state, latitude, longitude, timezone)
     })
     .catch(err =>{
     console.log(`error - cannot load weather data: ${err}`)
         })
 }
 // city has been selected so clear all arrays and element children so new city can be rendered
 const clearAllData = (city, state, latitude, longitude, timezone) =>{
     elementArray.forEach(element =>{
     while(element.firstChild){element.removeChild(element.firstChild)}
 }) // clear all arrays
 dailyDates = []; dailyArrayFull = []; dailyDataArray = []; hourlyArray = []; hourlyDataArray = []
 hourIndexArray = []; nighttimeArray = []; currentHourArray = []; townArray = []; 
 countryDetailsArr = [];
     fetchDailyData(city, state, latitude, longitude, timezone)
    }
    // MOON  DATA FETCH
    const fetchMoonData = (longitude, latitude) =>{
        var weatherAndMoonUrl = 'https://devapi.qweather.com/v7/weather/7d?location=' + longitude + ',' + latitude +'&key=378770395e954a6c9c251ecb7f4a3727';
        // check if moon data has been fetched and stored for current day already;
        fetch(weatherAndMoonUrl) // if not, fetch
    .then(response => response.json())
    .then(data =>{
    data.daily.forEach(day =>{
     moonDataArray.push(day)
       })
    localStorage.setItem(`${showDateISO}`, JSON.stringify(moonDataArray))
    console.log(localStorage.getItem(`${showDateISO}`))
    fetchDailyData('London', 'England', '51.5075', '0.1276', 'Europe/London')
      })
    .catch(err =>{
        console.log(err)
    })
    }

    const initiateFetches = () =>{
        if(localStorage.getItem(`${showDateISO}`)){console.log('moon data already fetched')
    moonDataArray = []
    let moonDataParsed = (JSON.parse(localStorage.getItem(`${showDateISO}`)))
    moonDataParsed.forEach(day =>{
    moonDataArray.push(day);
    })

    
fetchDailyData('London', 'England', '51.5075', '0.1276', 'GMT')
}else{
    fetchMoonData('0.12','51.49') // longitude and latitude parameters
}
}

// FETCH MOST POPULAR 5 CITIES WITH SEARCH NAME
const getCity = (city) =>{
    // clear options from select element
    $selectItem.children().remove()
    $selectItem.prepend('<option class="option">Choose City</option>')
var geoCityUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + openWeatherAPIKey
// fetch
    fetch(geoCityUrl)
    .then(response=> response.json())
    .then(data =>{
data.forEach(town =>{
    console.log(data)
let tempArray = [town.name, town.state, town.lat, town.lon, `${town.lat},${town.lon}`] // array for cities data
townArray.push(tempArray)
// append details to select element in an option element
$selectItem.append(`<option class="option" value="${town.lat},${town.lon}">${town.name}, ${town.state}:${town.country}</option>`)
       })
       $('#country-modal').css('opacity', '1')
       $('#country-modal').show()
 console.log(townArray)
    })
}

// clear placeholder for new search
$('#search-bar').focus((e) =>{
    document.getElementById('search-bar').value = ''; // clear any previous search bar entry
    $('#search-bar').attr('placeholder', '')// ensure placeholder is empty
})
// SEARCH CITY INPUT
$('#search-btn').click((e) =>{ // when search button clicked
    let input = document.getElementById('search-bar').value //clear previous text entry
if(input == ''){alert('please enter a city name')} // if search bar empty alert user
else{ townArray = [] 
    $selectItem.children().remove() // clear previous options
     let selectedCity = input; // otherwise, inputted word is selected city
   getCity(selectedCity) // send to get city function with 'city' name as parameter
}
})
// SELECTING A CITY OPTION 
$('#select-container').change((e) =>{
    document.getElementById('search-bar').value = ''; // clear any previous search bar entry
    let selectedCoords = e.target.value
townArray.forEach(town =>{
    if(town.includes(selectedCoords)){
let city = town[0]
let state = town[1]
let latitude = town[2]
let longitude = town[3]
$('#country-modal').hide()
let geoapifyUrl = 'https://api.geoapify.com/v1/geocode/reverse?lat='+ latitude + '&lon=' + longitude +'&apiKey=6978b4e9f2aa49869db225cada3b5168'
fetch(geoapifyUrl).then(response => response.json())
.then(data =>{
    let timezone = data.features[0].properties.timezone.name
console.log(timezone)
clearAllData(city, state, latitude, longitude, timezone)
})
    }
})
})

// FETCH WEATHERCODE AND MOONPHASE DATA, AND WEATHERCODE IMAGES FROM JSON FILE. 
fetch('./weather.json')  // fetch weather code and moon phase data
.then(response => response.json())
.then(data =>{
     wmo_translation = data.wmo_translation;
    wmoImagesObj = data.wmoImagesObj;
    wmoNightImagesObj = data.wmoNightImagesObj;
    moonPhaseObj = data.moonPhaseObj
    console.log(wmoNightImagesObj)
    initiateFetches()

})

