let deleteArray = []// contains channel ID of subscription to be deleted
let subscriptionIdArray = []// array which holds subscription personal identifier (not channel ID)
let pageNumberArray = []// holds the page number of subscription element chosen for deletion
let accessTokenArray = []// contains all access token, zero position holds current token
let subscriptionsArray = [] // holds all details for all subscriptions
let currentDateFull = new Date() // current date object
let dateAbbrv = currentDateFull.toDateString().replaceAll(' ', '_') // abbreviation for current date

if(localStorage.getItem(dateAbbrv)){ // if a subscription list with current date exists, log to console
  console.log(JSON.parse(localStorage.getItem(dateAbbrv))) // check details
}

if(localStorage.getItem('tiny_maths_delete_token')){ // if there's an access token object in local storage
let tokenObject = JSON.parse(localStorage.getItem('tiny_maths_delete_token')) // get the token object
let expiry = tokenObject.token_expiry // assign the expiry time a variable
let exactTime = Date.now()/1000 // assign current time in seconds to a variable
let timeLeft = Math.floor(Math.floor(expiry - exactTime)/60)// calculate time left in minutes

console.log(timeLeft) // log time left
console.log(tokenObject)
}

console.log()
//localStorage.removeItem(dateAbbrv)
// console.log(localStorage)
let videoThumnail;
let clientID;
let channelId;
let api_key
// import client OAuth2 information json file
fetch('./client_secret.json')
.then((response, err) =>{ 
  if(err) throw err;
  return response.json() // parse the json data
})
.then(data =>{
  console.log(data)
  clientID = data.web.client_id;
  //api_key = data.web.
  console.log(clientID)
})


// importing account info (API key and channel id)
fetch('./yt_account.json')
.then((response, err) =>{
if(err) throw err;
return response.json();
})
.then(data =>{
channelId = data.account_details.channel_id;
api_key = data.account_details.api_key;

console.log(`
channel ID: ${channelId}
api key: ${api_key}
`)
})

// html element to be populated from subscription objects. 
fetch('./subscriptions_element.json')
.then((response, err) =>{
  if(err) throw err;
  return response.json();
  })
.then(data =>{
  videoThumnail = data.subscription_element
})




// Class for populating subscription objects
class VideoDetails {
  constructor(thumbnailAddress, channelAddress, channelName, channelDescription, subscriptionId, pageNumber){
      this.logo = thumbnailAddress;
      this.channelAddress = 'https://www.youtube.com/channel/' + channelAddress;
      this.channelName = channelName;
      this.description = channelDescription;
      this.page = pageNumber;
      this.subID = subscriptionId;
      this.uniqueId = channelAddress
      }
   };

 // HTML element to hold new subscription object details
   const appendVideoDetails = (vidInfo) =>{
 
    let deleteBtnId = vidInfo.uniqueId.replace(/\W/g, '').replace('_','') // create a string out of channel address ID (remove non alpha-numeric characters and underscores) to use as id of delete button for each subscription. 

  
    // note, I'm using a custom data-* html attribute; each main element is given the attribute data-page-number="", with the current page number being the set value. That number will be used to locate the the subarray which contains the subscription object of the deleted subscription; so that the object can be removed and will not be available to render to the page when the page is accessed once again. 

    const videoThumnail = `
    <div class="video-container" data-page-number="${vidInfo.page}" data-unique-id="${vidInfo.subID}"><div class="video-thumbnail-container">
    <a target="_blank"  href="${vidInfo.channelAddress}" ><img class="video-thumbnail" src="${vidInfo.logo}" ></a></div>

    <div class="channel-name-holder"><p class="channel-name"><a class="channel-name-anchor" target="_blank"  href="${vidInfo.channelAddress}">${vidInfo.channelName}</a></p></div>

    <div class="details-holder"><div class="video-links"><a class="descriptions-anchor multiline-ellipsis" target="_blank"  href="${vidInfo.channelAddress}"><p class="description multiline-ellipsis" >${vidInfo.description}</p></a></a>

    <div class="delete-btn-holder">
    <button id="${deleteBtnId}" class="delete-btn">Delete</button>
  </div>
            </div>
        </div>
    </div>
</div>`
// append video information to subscriptions element
$('.rows').append(videoThumnail)




// DELETE SUBSCRIPTION BUTTON given click event. 
$(`#${deleteBtnId}`).click((e) =>{ // add event listener to 'delete' button
  // get the href of the previous element sibling of the parent div.  That's an 'a' tag containing the channel link.  And then extract the unique channel ID from the href, by removing the non-unique part of the channel link. 
    let channelLinkId = e.target.parentNode.previousElementSibling.href.replace('https://www.youtube.com/channel/', '');
    let channelName =  e.target.parentNode.parentNode.parentNode.previousElementSibling.firstChild.textContent;  // get channel name
    let subscriptionContainer =  e.target.parentNode.parentNode.parentNode.parentNode; //get container element of subscription 
    let pageNumber = subscriptionContainer.getAttribute('data-page-number'); // page number of sub
    let uniqueId = subscriptionContainer.getAttribute('data-unique-id'); // unique id for delete API 
    console.log(`unique ID: ${uniqueId}`)

    console.log(subscriptionContainer) // check container element of subscription
  

   deleteSubscription(channelLinkId, channelName, subscriptionContainer, pageNumber, uniqueId) // send channel id, channel name, subscription container, page number, unique id for deletion process. 
})
}


let getTokenBtn = document.getElementById('token-btn') // button to request token and to open UX popup
var tokenClient;
var access_token;
var google_client;
var next_page_token;
let url;
let deleteTokenClient




// DELETE subscription request
const deleteSubscription = (channelId, channelName, subscriptionContainer, pageNumber, uniqueId) =>{
// create an ajax request

// store the unique id and page number to be used in case no valid access token is available. These values will be used in the token for delete function, which has a callback function to process a new access token.  In that callback, the access token, page number and unique id can be sent to createDeleteRequest function for a new xml request and to delete the subcription object from the containing subarray. 
subscriptionIdArray.unshift(uniqueId)
pageNumberArray.unshift(pageNumber)
// this function will run once the decision to delete has been confirmed by user
const proceedWithDelete = () =>{

  deleteArray.unshift(channelId) // check channel name
 
  
  // Before attempting to request an access token, check if a valid token is available in localStorage
  if(localStorage.getItem('tiny_maths_delete_token')){ // if a saved token OBJECT exists
  let tokenObject = JSON.parse(localStorage.getItem('tiny_maths_delete_token'))//assign it the 'tokenObject' variable
  let tokenString = tokenObject["token_string"] // get the token string
  let tokenExpiry = parseInt(tokenObject["token_expiry"]) // get expiry data
  let dateNow = Math.floor(Date.now()/1000) // get current time
  
  if(tokenExpiry - dateNow <= 0){ // token has expired or is at expiry time
    tokenForDelete() // request a new access token
    console.log('token has expired')
  }else{ // if token has not yet expired
   
    console.log('token still valid')
// create a request, WHEN a valid token exists
    createDeleteRequest(tokenString, pageNumber, uniqueId) // create a delete subscription XML request using the current valid 'token' as an argument
  }
  
  }else{
    console.log('no token exists')
    tokenForDelete() // request a new access token
  }
}



let modalDocument = document.createElement('DIV') // new div to be used as alert modal
modalDocument.setAttribute('class', 'alert-modal') // set class attribute for styling

// create a popup for modal content which opens above the subscription element. 
let deletePopup = `<div id="delete-subscription"><div id="delete-added-items"><div id="paragraph-holder"><h4>Delete this subscription?</h4></div><div id="channel-name"><p id="delete-this-item">Channel Name: <span id="delete-span">${channelName}<span></p></div><button id="confirm-delete" class="navigate-btn delete-choice">Yes: Delete!</button><button id="cancel-delete" class="navigate-btn delete-choice">Cancel</button></div></div>`


modalDocument.innerHTML = deletePopup // set deletePopup variable as inner html of new niv
console.log(modalDocument) //check new div
subscriptionContainer.prepend(modalDocument) // prepend modal div to subscription container

$('#confirm-delete').click(()=> { // add click event to confirm delete button inside popup
  subscriptionContainer.removeChild(subscriptionContainer.firstChild); // remove alert modal
  proceedWithDelete() // go ahead with subscription delete process
})
$('#cancel-delete').click(() =>{  // add click event to cancel delete button
subscriptionContainer.removeChild(subscriptionContainer.firstChild) // remove alert modal
// no further action needs to be taken, since delete process is canceled

})
}


// if no token exists, or the saved token has expired, start the initialize token client process
const tokenForDelete = () =>{


  // alert('new token requested for subscription delete...') // alert user that request has been made
  deleteTokenClient = google.accounts.oauth2.initTokenClient({ // then initialize client
    client_id: clientID, // get client id from client_secret.json (already imported)
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl' , // two scopes, one for read only and the other not read only so that subscriptions can be deleted
  
    // create callback for token request
      callback: (response) => { // returned response
  

        let uniqueSubscriptionId = subscriptionIdArray[0]
        let pageNumber = pageNumberArray[0]
        
     if(response && response.access_token){ // if response and access token exist
        access_token = response.access_token // assign access token a variable
  
      // checking scope has been approved
      if (google.accounts.oauth2.hasGrantedAnyScope(response, // use hasGrantedAnyScope(response, scope)
      'https://www.googleapis.com/auth/youtube.force-ssl'
      )) { // scope
  console.log('requested scopes approved') // if scope approved
  
  let dateNow = Math.floor(Date.now()/1000) // get current date/time in seconds
  let tokenExpiry = dateNow + 3599
  // create a token object to contain: access token, and token expiry time. This object can be analized prior to an attempt at requesting a new token.  If tokenExpiry - Date.now() is negative, the expiry time is less than the current time so the expiry time is passed; a new token can be requested.  If the sum is zero, then a new token should be requested. 
  let tokenObject = {
"token_string" : access_token,
"token_expiry" : tokenExpiry
  }
  // save a copy of the access token object for retrieval when a request to delete is made within the access token expiry time. 
  localStorage.setItem('tiny_maths_delete_token', JSON.stringify(tokenObject)) // save the stringified object to local storage
  
  //create the XML request
  createDeleteRequest(access_token, pageNumber, uniqueSubscriptionId) // create a delete subscription XML request, with saved access token, page number and unique subscription id. 
  
        }else{alert('requested scope NOT approved')} // if scope not approved alert user
  
     }
    }, // end of callback -
  
  
  });
// after token client initialization, request a token to be processed in the callback
getDeleteToken()
}

// render subscriptions to page links and 50 subs per link
const renderSubscriptions = (array, pageNumber) =>{
console.log(array)
if(pageNumber){console.log(pageNumber)}
// create a list of page numbers using the index numbers of each subarray of the main subscription array, which represent a unique page of results 
array.forEach(element =>{
  let page = array.indexOf(element); // assign page number
  let pageAdjust = page + 1; // add 1 to page number since indexes start at zero
   let listItem = `<li class="page-list-item">Page <span class="page-number">${pageAdjust}</span>`;
   $('#page-list').append(listItem); // create a list item for each page and append to unordered list element
})







// CLICK EVENT on page numbers
$('.page-list-item').click((e) =>{

  if(e.target.parentNode.getAttribute('class', 'page-number')){
    // target must be number span which is not required
    console.log(e.target)
  }else{ // target must be number span parent which is the required element
    let childrenContainer = e.target.parentNode // get element containing page numbers
    let pageChildren = childrenContainer.childNodes // create a nodelist out of page number elements
    pageChildren.forEach(child =>{ // loop through page numbers
    if(!child.contains(e.target) && child.getAttribute('class','page-list-item')){
        // if child element (page number) isn't clicked, 
        $(child).css('background', 'black') // turn background to black
     
    
    
    }else{$(child).css('background', 'rgb(96, 191, 235)') 
    let pageNumber = parseInt((e.target.children[0].textContent) - 1) // get page number from text content and convert to integer that matches the index number of the associated subarray

  pickPage(pageNumber) // retrieve subscriptions associated with page number parameter
  
  
  } // otherwise turn background to light blue
    })
    


  }




       })
  //  console.log(array[0]) // this part of the array contains all of the page subarrays. 

  // RENDER SUBSCRIPTIONS OF CLICKED PAGE
const pickPage = (pageNumberArray) =>{
  $('.rows').children().remove() // remove previous subscription elements from page
  let arrayIndex = pageNumberArray // assign page number a variable
  console.log(array[arrayIndex]) // check correct subarray is accessed

  array[arrayIndex].forEach(element =>{ // select subarray associated with page number
    let newObject = new VideoDetails(element.thumbnails.medium.url, element.channel_ID, element.channel_title, element.channel_description, element.subscription_ID, element.page_number ) // create a new object of video details for each subarray item, for rendering subscription to the page
  // console.log(newObject)
    appendVideoDetails(newObject) // create and load html element for each new object, for any clicked page

    })


}

// if the pageNumber parameter has a value
if(pageNumber){ 
  let page = parseInt(pageNumberArray)
pickPage(page) // run pickPage function to render to the page all subscriptions associated with page number. The page number link should still be highlighted. 
}else{

// render subscriptions if first subarray (this is the default page when opening the app)
array[0].forEach(element =>{ // create a new video object for subscription in the subarray
  let newObject = new VideoDetails(element.thumbnails.medium.url, element.channel_ID, element.channel_title, element.channel_description, element.subscription_ID, element.page_number )
//console.log(newObject)
  appendVideoDetails(newObject) // create HTML element for each objec and load to page (this is for the initial page load where page 1 of subscriptions results is loaded
  })
}



}

//  NEW IMPLICIT FLOW
const saveSubscriptions = (response) =>{
console.log(response)
let videoPageNumber = subscriptionsArray.length // each response argument coming through this function contains the results returned in 'one' API call. A maximum number of results is set for each fetch.  If more than the max results exist, then more responses will be sent, containing up to the set maximum number of results.  Each result in this response is converted to an object and placed in a subarray representing the current response. Each subarray can be thought of as a page of results; the objects converted from results are given a property of page_number, which corresponds to the index of the containing subarray; that number is set as the value of a custom attribute (name-*) in the HTML subscription elements rendered to the page. If a subscription is deleted, the page number in the name-* attribute is used to locate the subarray containing the object associated with the deleted suscription, and the object is spliced from the subarray. 


let pageArray = [] // subarray to contain results (converted to objects) of each response
response.items.forEach(item =>{

  let subscriptionObject = {
  "channel_ID": item.snippet.resourceId.channelId, 
  "channel_title": item.snippet.title,
  "channel_description": item.snippet.description,
  "thumbnails": item.snippet.thumbnails,
  "subscription_ID": item.id,
  "page_number": videoPageNumber
  }
  
  // console.log(subscriptionObject)
  pageArray.push(subscriptionObject) // push each subscription object to the page array

    });

    subscriptionsArray.push(pageArray) // push full page array to subscriptions array once all subscriptions for current response converted to objects and pushed to subarray

    if(!response.nextPageToken){ // if no next page exists
      if(response.prevPageToken){ // but if a  previous page exists
// this must be the final response page
console.log(subscriptionsArray) // array should have several subarrays
localStorage.setItem(dateAbbrv, JSON.stringify(subscriptionsArray) )  // create a local storage item to store the array, setting the current date (dateAbbrv) as its key. I want to allow only a once a day calling of the API for subscription data. 

renderSubscriptions(subscriptionsArray) // send array containing full set of responses (entire subscription list) to function that renders subscription objects to the page as HTML elements
      }
    }
  }


// Create an XML request to fetch subscriptions from API
const createRequest = (accesToken, url) =>{
if(url == undefined){ // url is undefined, this is a new request for first page of results; use default url below. 
  url = 'https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&channelId=UCpCdAp4bI9IPGAFa_jIW0XA&maxResults=50&key='  + api_key
}
  var xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', () =>{
  //console.log(xhr, xhr.readyState, xhr.status)
  if(xhr.status === 200 && xhr.readyState === 4){ // if ready state is 4 and there are no errors
     console.log('response is ready') // inform user in console that result is ready
     let subscriptionResponse = JSON.parse(xhr.responseText) // parse response
     if(subscriptionResponse.nextPageToken){// if nextpage exists
      next_page_token = subscriptionResponse.nextPageToken // assign next page token a variable
      saveSubscriptions(subscriptionResponse) // render response
      url = 'https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&channelId=UCpCdAp4bI9IPGAFa_jIW0XA&' + 'pageToken=' + next_page_token + '&maxResults=50&key=' + api_key // prepare adapted url for next page request
      createRequest(accesToken, url) // reate new XML request with next page url

     }else{
      // otherwise no next page exists so just render the response since there is no need to create a new request
      saveSubscriptions(subscriptionResponse)
    }

  }else if(xhr.readyState === 4){ // if ready state is complete
    if(!xhr.status === 200){ // but there is a status code other than 200
      console.log('error',  xhr.status)// there must be an error so log it to the console
    }

  }
})


// open the request
xhr.open('GET', url);

// set appropriate header info
xhr.setRequestHeader('Authorization', 'Bearer ' + accesToken);

// send the request
xhr.send();
}


// request to delete a subscription
const createDeleteRequest = (accessToken, pageNumber, uniqueId) =>{
console.log(accessToken, pageNumber, uniqueId)

  let url = 'https://youtube.googleapis.com/youtube/v3/subscriptions?id=' + uniqueId +'&key=' +  api_key


  // XML request
  var xhr = new XMLHttpRequest();
if(xhr.status === 0){
console.log('delete successful')
  // this means that the deletion was successful and you will have to remove the channel information from the relevant array

  let channelId = deleteArray[0] // get the current channel id which is in the zero position of the delete array
  subscriptionsArray[pageNumber].forEach(element =>{ // each subarray in the main array
  if(channelId == element.channel_ID){ // if you find the channel id inside a channel object
    console.log(element.channel_ID)
    let channelIndex =  subscriptionsArray[pageNumber].indexOf(element);//get subarray channel index
    console.log(channelIndex)
    subscriptionsArray[pageNumber].splice(channelIndex, 1) // splice channel from subarray
    console.log(subscriptionsArray[pageNumber]) // check subscription object is no longer in array
  }

  }); 

  alert('deletion completed...')

  localStorage.setItem(dateAbbrv, JSON.stringify(subscriptionsArray) ) // re-write a new saved copy of array to local storage
  renderSubscriptions(subscriptionsArray, pageNumber) // render updated subscriptions and in the page that the subscription was deleted from. 
}else{ // if there is a status code other than 204
    console.log('error',  xhr.status)// log the error
  
}


// open the request
xhr.open('DELETE', url);

// set appropriate header info
xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

// send the request
xhr.send();

}




//   IMPLICIT FLOW
const initTokenClient = () =>{


//  initialized ONLY if an API fetch has not been made on current day
if(!localStorage.getItem(dateAbbrv)){ // if subscription array is not saved to local get access token for new API call

  tokenClient = google.accounts.oauth2.initTokenClient({ // then initialize client
    client_id: clientID, // get client id from client_secret.json (already imported)
    scope: 'https://www.googleapis.com/auth/youtube' , // two scopes, one for read only and the other not read only so that subscriptions can be deleted
  
      callback: (response) => { // returned response
  
     if(response && response.access_token){ // if response and access token exist
        access_token = response.access_token // assign access token a variable
  
      // checking scope has been approved
      if (google.accounts.oauth2.hasGrantedAnyScope(response, // use hasGrantedAnyScope(response, scope)
      'https://www.googleapis.com/auth/youtube'
      )) { // scope
  console.log('requested scopes approved') // if scope approved
  
  // create the XML request
  createRequest(access_token)
  
        }else{console.log('requested scope NOT approved')} // if scope not approved
  
     }
    }, // end of callback -
  
  
  });
  

}



else{
  // DON'T initialize or request an access token; subscriptions already saved to local storage and no items exist in delete array
let savedSubscriptions = localStorage.getItem(dateAbbrv) // assign variable to saved localstorage entry
subscriptionsArray.push(...JSON.parse(savedSubscriptions)) // parse the entry
//console.log(subscriptionsArray) // log the parsed array 
renderSubscriptions(subscriptionsArray)
}

}

const getDeleteToken = () =>{
  deleteTokenClient.requestAccessToken()
}

// get ACCESS TOKEN - if API fetch for current day hasn't already happened. 
const getToken = () =>{

  if(subscriptionsArray.length > 0){ // if fetch already done then array will have entries
        alert('subscriptions already fetched') // inform user that fetched array exists
  }else{
    tokenClient.requestAccessToken() // otherwise client will have been initiated due to no current day local storage being saved, and a token can be requested so that an API fetch can be made to get subscriptions list. 
  }
  
}

  getTokenBtn.addEventListener('click', getToken)

