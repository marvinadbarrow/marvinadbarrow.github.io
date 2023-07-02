let deleteArray = []// contains channel ID of subscription to be deleted
let subscriptionsArray = [] // holds all details for all subscriptions
let currentDateFull = new Date() // current date object
let dateAbbrv = currentDateFull.toDateString().replaceAll(' ', '_') // abbreviation for current date
if(localStorage.getItem(dateAbbrv)){
  console.log(JSON.parse(localStorage.getItem(dateAbbrv))) // check details
}

// localStorage.removeItem(dateAbbrv)

console.log(JSON.parse(localStorage.getItem(dateAbbrv)))
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
  constructor(thumbnailAddress, channelAddress, channelName, channelDescription, subscriptionId){
      this.logo = thumbnailAddress;
      this.channelAddress = 'https://www.youtube.com/channel/' + channelAddress;
      this.channelName = channelName;
      this.description = channelDescription;
      this.subID = subscriptionId
      }
   };

 
   const appendVideoDetails = (vidInfo) =>{
    // console.log(vidInfo)
    let deleteBtnId = vidInfo.channelName.replace(/\W/g, '') // create a string
  
    const videoThumnail = `
    <div class="video-container"><div class="video-thumbnail-container">
    <a target="_blank"  href="${vidInfo.channelAddress}"><img class="video-thumbnail" src="${vidInfo.logo}" ></a></div>

    <div class="channel-name-holder"><p class="channel-name"><a class="channel-name-anchor" target="_blank"  href="${vidInfo.channelAddress}">${vidInfo.channelName}</a></p></div>

    <div class="details-holder"><div class="video-links"><a id="${vidInfo.subID}"  class="descriptions-anchor multiline-ellipsis" target="_blank"  href="${vidInfo.channelAddress}"><p class="description multiline-ellipsis" >${vidInfo.description}</p></a></a>

    <div class="delete-btn-holder">
    <button id="${deleteBtnId}" class="delete-btn">Delete</button>
  </div>
            </div>
        </div>
    </div>
</div>`
// append video information to container for subscriptions data
$('.rows').append(videoThumnail)


$(`#${deleteBtnId}`).click((e) =>{ // add event listener to 'delete' button


  // get the href of the previous element sibling of the parent div.  That's an 'a' tag containing the channel link.  And then extract the channel ID from the href. 
    let channelLinkId = e.target.parentNode.previousElementSibling.id

     deleteSubscription(channelLinkId) // send channel id for deletion of subscription
})



}



// DELETE subscription request
const deleteSubscription = (channelId) =>{
// create an ajax request
deleteArray.unshift(channelId)
console.log(deleteArray, channelId)
initTokenClient()

}



let getTokenBtn = document.getElementById('token-btn') // button to request token and to open UX popup

var tokenClient;
var access_token;
var google_client;
var next_page_token;
let url;


// render subscriptions to page links and 50 subs per link
const renderSubscriptions = (array) =>{

// create pages using the index numbers for each subarray, each representing a page of results returned by the API fetch
array[0].forEach(element =>{
  let page = array[0].indexOf(element); // assign page number
  let pageAdjust = page + 1; // add 1 to page number since indexes start at zero
   let listItem = `<li class="page-list-item">Page <span class="page-number">${pageAdjust}</span>`;
   $('#page-list').append(listItem); // create a list item for each page and append to unordered list element
})

// render initial first 50 elements
array[0][0].forEach(element =>{
  let newObject = new VideoDetails(element.thumbnails.medium.url, element.channel_ID, element.channel_title, element.channel_description, element.subscription_ID, element.page_number  )
//console.log(newObject)
  appendVideoDetails(newObject)
//  createPages(length) // create a link for each page
  })



// add 'click' event listener to page numbers
$('.page-list-item').click((e) =>{
let childrenContainer = e.target.parentNode // get ordered list element containing all page elements
let pageChildren = childrenContainer.childNodes // create a nodelist out of page elements
pageChildren.forEach(child =>{ // loop through children
if(!child.contains(e.target) && child.getAttribute('class','page-list-item')){ // if child element (page page) isn't clicked, 
  $(child).css('background', 'black') // make its background color black
}
})


  $(e.target).css('background', 'rgb(96, 191, 235)') // change background color of clicked page element

  let pageNumber = parseInt((e.target.children[0].textContent) - 1) // get page number from text content and convert to integer that matches the index number of the associated subarray

  pickPage(pageNumber) // retrieve subscriptions 
       })

  console.log(array[0][0][0])
  // console.log(array[0]) // this part of the array contains all of the page subarrays. 



const pickPage = (pageNumberArray) =>{
  $('.rows').children().remove() // remove previous subscription elements from container
  let arrayIndex = pageNumberArray
  array[0][arrayIndex].forEach(element =>{ // select subarray associated with page number
    let newObject = new VideoDetails(element.thumbnails.medium.url, element.channel_ID, element.channel_title, element.channel_description, element.subscription_ID ) // create a new object of video details
  //console.log(newObject)
    appendVideoDetails(newObject) // create html element with object details
  //  createPages(length) // create a link for each page
    })


}

}

//  NEW IMPLICIT FLOW
const saveSubscriptions = (response) =>{
console.log(response) // js object containing one page's worth of subscriptions

let videoPageNumber = subscriptionsArray.length // each response is a page that holds 50 subscriptions (which was specified in the request). Since the contents of each response is stored in a subarray inside subscriptionsArry, the current subarray represents the current response page and because it is the currently last subarray, it's index is the length of the main array (-1). The current length of the main array can be used to indicate which subarray all of the currently processed subscriptions sit in.  That info will be used to retrieve and delete the record of any particular subscription user wishes to delete one of their subscriptions.  

let pageArray = [] // to contain each page worth of subscriptions
response.items.forEach(item =>{ // for each subscription object pull out the following key values and store in the below object

  let subscriptionObject = {
    "channel_ID": item.snippet.resourceId.channelId, 
    "channel_title": item.snippet.title,
    "channel_description": item.snippet.description,
    "thumbnails": item.snippet.thumbnails,
    "subscription_ID": item.id,
    "page_number": videoPageNumber
    }
  
  pageArray.push(subscriptionObject) // push each subscription object to the page array

    });
console.log(pageArray)
    subscriptionsArray.push(pageArray) // push full page array to subscriptions array
    
    if(!response.nextPageToken){ // if no next page exists
      if(response.prevPageToken){ // and if a previous page exists
// the current response is last page of responses
console.log(subscriptionsArray)
localStorage.setItem(dateAbbrv, JSON.stringify(subscriptionsArray) ) // create a local storage item to store the array, setting the current date (dateAbbrv) as its key. 
renderSubscriptions(subscriptionsArray) // since this is the un-stringified version of the array we can send it immediately to get rendered to the page. 
      }
    }
  }


// Create an XML request to fetch subscriptions from API
const createRequest = (accessToken, url) =>{
if(url == undefined){ // url is undefined, use default below. 
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
      createRequest(accessToken, url) // reate new XML request with next page url

     }else{
      // otherwise no next page exists so just render the response since there is no need to create a new request
      saveSubscriptions(subscriptionResponse)
    }

  }else if(xhr.readyState === 4){ // if ready state is complete
    if(!xhr.status === 200){ // but there is a status code other than 200
      console.log('error',  xhr.status)// log the
    }

  }
})


// open the request
xhr.open('GET', url);

// set appropriate header info
xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

// send the request
xhr.send();
}




// request to delete a subscription
const createDeleteRequest = (accessToken) =>{

  let subscriptionID = deleteArray[0] // get subscription id for URL

  let url = 'https://youtube.googleapis.com/youtube/v3/subscriptions?id=' + subscriptionID +'&key=' +  api_key


  // XML request
  var xhr = new XMLHttpRequest();
if(xhr.status === 200 && xhr.readyState === 4){
console.log('delete successful')
  // this means that the deletion was successful and you will have to remove the channel information from the relevant array
}else if(xhr.readyState === 4){ // if ready state is complete
  if(!xhr.status === 200){ // but there is a status code other than 200
    console.log('error',  xhr.status)// log the error
  }
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
if(!localStorage.getItem(dateAbbrv) || deleteArray.length > 0){ // if subscription array is not saved to local storage

  tokenClient = google.accounts.oauth2.initTokenClient({ // then initialize client
    client_id: clientID, // get client id from client_secret.json (already imported)
    scope: 'https://www.googleapis.com/auth/youtube \
    https://www.googleapis.com/auth/youtube.force-ssl' , // two scopes, one for read only and the other not read only so that subscriptions can be deleted
  


    
      callback: (response) => { // returned response
  
     if(response && response.access_token){ // if response and access token exists
      console.log(response) // you can see the access token in the response. 
      access_token = response.access_token // assign it a variable
      // NOTE - what are we supposed to do with the access token???? 


  
      // checking scope has been approved
      if (google.accounts.oauth2.hasGrantedAllScopes(response, // use hasGrantedAnyScope(response, scope)
        'https://www.googleapis.com/auth/youtube', 
        'https://www.googleapis.com/auth/youtube.force-ssl'
        )) { // scope
  console.log('requested scope approved') // scope approved
  
  if( deleteArray.length > 0){
  // create a request for subscription deletion
console.log('subscription delete request...')
createDeleteRequest(access_token) // create a delete subscription XML request
  }else{

  // create the XML request
  createRequest(access_token)
  }

  
        }else{console.log('requested scope NOT approved')} // scope not approved
  
     }
    }, // end of callback -
  
  
  });
  
  // after initialization, if the delete array has a value in it then request an access token immediately
  // if( deleteArray.length > 0){
  //   tokenClient.requestAccessToken()
  // }
}else{
  // DON'T initialize since an API fetch has been made on current day and subscriptions are already saved in local storage
let savedSubscriptions = localStorage.getItem(dateAbbrv) // assign variable to saved localstorage entry
subscriptionsArray.push(JSON.parse(savedSubscriptions)) // parse the entry
//console.log(subscriptionsArray) // log the parsed array 
console.log(subscriptionsArray)
renderSubscriptions(subscriptionsArray)
}

}

// get ACCESS TOKEN - if API fetch for current day hasn't already happened. 
const getToken = () =>{

if(subscriptionsArray.length > 0){
  alert('subscriptions already fetched')

}else{   
  tokenClient.requestAccessToken()
}
  


  
}

  getTokenBtn.addEventListener('click', () =>{
    console.log('getting token....')
    getToken()
  })

