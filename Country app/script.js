let log = console.log;
var nameArray = [] // for country names to display alphabetically. 
var nameArraySorted;
var mapArray = []
    // COUNTRIES API
    const getCountries = (api) =>{

        return new Promise((resolve, reject) =>{
        const request_2 = new XMLHttpRequest();
        
        request_2.addEventListener('readystatechange', () =>{

            if(request_2.status === 200 && request_2.readyState === 4){
                resolve(JSON.parse(request_2.responseText))
            }else if(request_2.readyState === 4){
                reject(`error: unable to fetch data ${request_2.status}, url: ${api}`)
            }
         })
        
        request_2.open('GET', api)
        request_2.send(null)
        }) 
                
            }




// render chosen entries from the parsed data
const renderCountryData = (data) =>{
data.sort((a,b) => (a.name.common > b.name.common) ? 1: -1)    
let name;
let capital
let flag; 


data.forEach(element =>{
  
name = element.name.common
 // save list of names for country select dropdown
nameArray.push(name)
//  object for name, flag image and map data link
let countryObj = {
    country_name: '',
    country_map: '',
    country_flag: '',
    country_capital: ''
    }

    // populate object for name, flag and map
// save country name and country map to object for later retrieval
countryObj.country_name = `${element.name.common}`;
if(element.maps.googleMaps === undefined){
if(element.maps.openStreetMaps !== undefined){
    countryObj.country_map = element.maps.openStreetMaps   
}else{countryObj.country_map = 'no map'}
}else{countryObj.country_map = element.maps.googleMaps}



// check for existence of capital city
if(element.capital === undefined){
    capital = 'N/A'
}else{ capital = element.capital[0]; countryObj.country_capital = element.capital[0];}
// check for existence of flag - assign variable if exists
if(element.flags.png === undefined){ // do nothing
}else{ flag = element.flags.png; countryObj.country_flag = element.flags.png;}

// push object with country data for later retrieval when country is selected in 'select' element
mapArray.push(countryObj)

// CREATING HTML ELEMENTS TO DISPLAY FLAG COUNTRY AND CAPITAL

// create container for flag, country and capital and assign class
let container = document.createElement('DIV');
container.classList.add('country-style'); 

// holder div for flag
let flagContainer = document.createElement('DIV')
flagContainer.classList.add('flag-holder')

// create image element to contain flag and assign class
let countryFlag = document.createElement('IMG')
countryFlag.classList.add('country-flag');


// create para for country and capital city and assign class 
let countryPara = document.createElement('P'); 
countryPara.classList.add('country-para');

// define image source
countryFlag.setAttribute('src', `${flag}`)
// set paragraph text
countryPara.textContent = `${name} | Capital: ${capital}`;

// append flag to flac container
flagContainer.appendChild(countryFlag)
// append flag image and paragraph to container 
container.appendChild(flagContainer)
container.appendChild(countryPara)
// append to hard coded HTML container
document.getElementById('country-container').appendChild(container)

// set default country large image to first country in the select list (afghanistan)
$('#map-link').attr('href', mapArray[0].country_map)
$('#country-image-large').attr('src', mapArray[0].country_flag)
$('#country-para-large').html(mapArray[0].country_name)
$('#capital-para-large').html(`Capital: ${mapArray[0].country_capital}`)
// display the container holding large image and country info
$('#large-display').css('display','block')

})  


nameArray.forEach(named =>{
// create an option element for the dropdown list of country names
let countryOption = document.createElement('OPTION')
countryOption.classList.add('option')
countryOption.setAttribute('value', `${named}`)
countryOption.textContent = `${named}`
// append to HTML hidden container and unhide
document.getElementById('select-container').appendChild(countryOption)

})

$('#options-container').toggle()

}




const showCountryFlag = (countryText, source) =>{

    mapArray.forEach(country =>{
        if(country.country_name == countryText){
         $('#map-link').attr('href', country.country_map)
         $('#country-image-large').attr('src', country.country_flag)
         $('#country-para-large').html(country.country_name)
         $('#capital-para-large').html(`Capital: ${country.country_capital}`)
 
        }
     });

}


// select a country to display larger country map and country details. 
$('#select-container').change((e) =>{
  let selected = e.target.value; // get country name
  showCountryFlag(selected, 'select options'); // and send to large flag renderer
})



// button activation for getting API data            
            $('#get-data').click(() =>{
$('#get-data').hide()
                getCountries('https://restcountries.com/v3.1/all')
                .then((data) =>{
                renderCountryData(data)

                })
                .catch((data) =>{
                    $('#error-para').html('Oops! something went wrong!')
                    $('#error-para').css('display','block')
                    $('#error-img-holder').css('display','block')
                    console.log(data)
                })             
            })

            // clicking on country text of country element renders large flag and map link. 
document.addEventListener('click', (e) =>{
let nameString = e.target.textContent; // get country element text
let separatorIndex = nameString.indexOf('|') - 1; // get index of first space after country name

let countryText = nameString.slice(0,separatorIndex);// slice country and send to large flag renderer
showCountryFlag(countryText, 'country div');
                })