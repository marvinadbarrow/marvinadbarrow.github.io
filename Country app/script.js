let log = console.log;



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
let name;
let capital
let flag; 
data.forEach(element =>{
  
name = element.name.common

// check for existence of capital city
if(element.capital === undefined){
    console.log(data.indexOf(element), element.name)
    capital = 'N/A'
}else{ capital = element.capital[0];}

// check for existence of flag - assign variable if exists
if(element.flags.png === undefined){
console.log(data.indexOf(element), element.name)
}else{ flag = element.flags.png;}

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
document.getElementById('country-container').appendChild(container)

})  



}





// button activation for getting API data            
            $('#get-data').click(() =>{
$('#get-data').hide()
                getCountries('https://restcountries.com/v3.1/all')
                .then((data) =>{
                renderCountryData(data)

                })
                .catch((data) =>{
                    console.log(data)
                })
        
                
            })



        














