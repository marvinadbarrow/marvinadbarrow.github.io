
let micSearchAudio = new Audio('mic alert.mp3')
import { myUploadsObj } from "./channel_uploads.js"; 
// imports for notification modal elements
import { appendNotifictions } from "./notifications_class.js" // function to populate  notifications
import NotificationDetails from "./notifications_class.js"//notifications constructor
import {notificationsListArr} from "./notifications_list.js" // list of notifications
console.log(notificationsListArr)
notificationsListArr.forEach(element =>{
    let newNotification = new NotificationDetails(element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], element[8])
    appendNotifictions(newNotification)
})

// imports for video elements
import { appendVideoDetails } from "./video_class.js";  // function to populate  videos
import VideoDetails from "./video_class.js"; // class with constructor video data
import { videoListArr } from "./video_list.js"; // list of videos to render
videoListArr.forEach(element =>{
let newObject = new VideoDetails(element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], element[8],element[9], element[10], element[11], element[12])
appendVideoDetails(newObject)
})

// imports for creator modal elements
import {appendCreatorElements} from "./creator_class.js"// function to pupulate creator modal
import CreateModalDetails from "./creator_class.js";// class with creator constructor
import {creatorModalListArr} from "./create_list.js" // list of creator elements
creatorModalListArr.forEach(element =>{
    let newCreatorObject = new CreateModalDetails(element[0], element[1], element[2]);
    appendCreatorElements(newCreatorObject);
})

// each object in the below array contains three or four key/value pairs: the first key value is the id of the element that triggers the opening of a modal, the second key value is the id of the associated modal, and, if the triggering element is itself a category within another modal, the third key value is the id of the modal that the triggering element sits in, so that when the triggering element is closed, or its back button is used, the triggering modal is hidden and the parent modal is opened up again; for access to other triggering elements nested in the same parent modal. 
var openModalArray = [
    
{button_id:'shortcuts-container',modal_id:'keyboard-shortcuts-modal',parent_id:'youtube-account-modal',back_arrow_id: 'none'},
{button_id:'switch-account-element', modal_id:'switch-account-modal', parent_id:'youtube-account-modal',back_arrow_id: 'back-arrow-switch-account'},
{button_id:'appearance-element', modal_id:'appearance-modal', parent_id:'youtube-account-modal',back_arrow_id: 'back-arrow-appearance'},
{button_id:'language-element', modal_id:'language-modal', parent_id:'youtube-account-modal',back_arrow_id: 'back-arrow-language'},
{button_id:'location-element', modal_id:'location-modal', parent_id:'youtube-account-modal',back_arrow_id: 'back-arrow-location'},
{button_id:'restricted-mode-element',modal_id:'restricted-mode-modal', parent_id:'youtube-account-modal',back_arrow_id: 'back-arrow-restricted-mode'},
{button_id:'inner-help-panel', modal_id:'help-search-modal', parent_id:'help-modal',back_arrow_id: 'none'},
{button_id:'mic-btn', modal_id:'microphone-modal',back_arrow_id: 'none'},
{button_id:'video-plus-icon', modal_id:'creator-modal',back_arrow_id: 'none'},
{button_id:'channel-icon', modal_id:'youtube-account-modal',back_arrow_id: 'none'},
{button_id:'bell-icon', modal_id:'notifications-modal',back_arrow_id: 'none'},

]


var backArrowArray = [
    {button_id:'back-arrow-appearance', modal_id:'appearance-modal'},
    {button_id:'back-arrow-language', modal_id:'language-modal'},
{button_id:'back-arrow-location', modal_id:'location-modal'},
{button_id:'back-arrow-restricted-mode',modal_id:'restricted-mode-modal'},
{button_id:'back-arrow-switch-account', modal_id:'switch-account-modal'}
]


var backArrowArray2 = [
    'back-arrow-appearance',
    'back-arrow-language',
    'back-arrow-location',
    'back-arrow-restricted-mode',
    'back-arrow-switch-account',

]

// I think this is finally it - clicking away from both the main modal, its submodal works. AND, the back arrow of the submodal brings you back to the main modal.... PHEW! that was difficult. Now just need to find out why help and feedback modals aren't being activated from the account menu
    document.addEventListener('click', function(e) { // add event listener to document; on mouseup
console.log(e.target)
        openModalArray.forEach(element =>{ 
            if(document.getElementById(element['button_id']).contains(e.target)){// if icon/button clicked
                console.log(e.target)
                $(`#${element['modal_id']}`).toggle() // toggle associated modal
if(element['parent_id']){
    $(`#${element['parent_id']}`).hide() // hide parent modal
  }
    }else if(backArrowArray2.includes(e.target.id)){ // back-arrow clicked
        let index = backArrowArray2.indexOf(e.target.id)
        console.log(index)
        $('#youtube-account-modal').css('display','block')
        document.getElementById(backArrowArray[index]['modal_id']).style.cssText ='display:none;';
}else{ // if neither icon, button, nor back-arrow is clicked, then hide any displayed modal
 
    $(`#${element['modal_id']}`).hide()  
}

   // $(`#${element['modal_id']}`).hide()

                })
            })
        
$('#hamburger-icon').click(function(){
    console.log('hamburger clicked')
    $('#guide-section-modal').toggle()
    $('#guide-content').css('left', '0')
})

$('#help-element').click(function(){
    $('#help-modal').toggle()
    $('#youtube-account-modal').hide()
})

$('#feedback-element').click(function(){
    $('#feedback-base-modal').toggle()
    $('#youtube-account-modal').hide()
})

$('#guide-help-element').click(function(){
    $('#help-modal').toggle()
    $('#youtube-account-modal').hide()
})

$('#guide-feedback-element').click(function(){
    $('#feedback-base-modal').toggle()
    $('#youtube-account-modal').hide()
})


// shows close indicator when hovering over help modal close button
$('#help-close-btn').hover(function(){
    $('#close-indicator-help').toggle()
})

// close button takes you back to main page
$('#help-close-btn').click(function(){
    $('#help-modal').hide()
})

// there's also a subcategory in the 'guide-modal' with an option for giving feedback and the same rules apply here as for the 'help' element in the guide modal

// HIDING AND UNHIDING PLAYLISTS

// show playlists drop down elements when 'show more' div is clicked and hide 'show-more' div
$('#show-playlists').click( function(e){
    $('#hidden-playlists').css('display','block')
    $(this).hide()
})

// hide playlists drop down elements when 'show less' div is clicked and unhide 'show-less' div
$('#hide-playlists').click( function(e){
    $('#hidden-playlists').hide()
    $('#show-playlists').css('display','flex')
})


// HIDING AND UNHIDING SUBSCRIPTIONS

// show subscriptions drop down elements when 'show more' div is clicked and hide 'show-more' div
$('#show-subscriptions').click( function(e){
    $('#hidden-subscriptions').css('display','block')
    $(this).hide()
})

// hide subscriptions drop down elements when 'show less' div is clicked and unhide 'show-less' div
$('#hide-subscriptions').click( function(e){
    $('#hidden-subscriptions').hide()
    $('#show-subscriptions').css('display','flex')
})






// back arrow goes from help search sub modal back to main 'help' modal
$('#dismiss-btn').click(function(){
    $('#keyboard-shortcuts-modal').hide()
  })
  
    // back arrow goes from help search sub modal back to main 'help' modal
    $('#back-arrow-language').click(function(){
        $('#youtube-account-modal').toggle()
        $('#language-modal').hide()
    })

  
  // back arrow goes from help search sub modal back to main 'help' modal
  $('.back-arrow-search-help').click(function(){
      $('#help-modal').toggle()
      $('#help-search-modal').hide()
  })
  
  // close button takes you back to main page from search help sub modal
  $('#close-element-help-search').click(function(){
      $('#help-search-modal').hide()
  })
  


// close button takes you back to main page
$('#feedback-close-btn').hover(function(){
    $('#close-indicator-feedback').toggle()
})

// close button takes you back to main page
$('#feedback-close-btn').click(function(){
    $('#feedback-base-modal').hide()
})


// toggle sensitive information inside feedback modal on hovering over circled question mark
$('.fa-question-circle').hover( function(){
    $('#sensitive-info-blob').toggle()
})

// close button takes you back to main page
$('#microphone-close-btn').click(function(){
    $('#microphone-modal').hide()
})


// toggle send button information inside feedback modal on hovering over button
$('#send-btn').hover( function(){
    $('#send-btn-blob').toggle()
})

// since this refers to teh current date it only needs to be called once so can be outside of the forEach loop. 
let date = new Date()
let year = date.getFullYear();
let month = date.getUTCMonth() + 1;
let day = date.getUTCDate()
let hour = (date.getUTCHours()+1)%24; 
let mins = date.getUTCMinutes();




// this is the object containing all video items
let items = myUploadsObj.myUploads.items
items.forEach(video =>{
let  snippet = video.snippet;
let title = snippet.title;
let channel = snippet.channelTitle;
let videoId = snippet.resourceId.videoId;
let videoUrl = `https://www.youtube.com/watch?v=${videoId}`
let thumbnails = snippet.thumbnails; 
let defaultThumbnail = thumbnails.standard.url;
let channelPage = `https://www.youtube.com/channel/${snippet.videoOwnerChannelId}`


// this goes into the foreach loop  since each video's upload date needs to be evaluated to compare it to current date
let published = new Date(snippet.publishedAt.slice(0, -1)); // date format
let uploadYear =  published.getFullYear();
let uploadMonth =  published.getMonth();
let uploadDayDate =  published.getDate();
let uploadHour = published.getHours();
let uploadMins = published.getMinutes();

// this needs to be inside the forEach loop because it evaluates the upload date parameter for each video object
let yearCalc = year - uploadYear;
let monthCalc = month - uploadMonth;
let dayCalc = day - uploadDayDate;
let hourCalc = hour - uploadHour;
let minsCalc = uploadMins;
let age;

// code for rending age, NEEDS TO BE INSIDE FOREACH to inspect each video
if(yearCalc > 0){if(yearCalc > 1){age = `${yearCalc} years ago`}else{age = `${yearCalc} year ago`}}
else if(monthCalc > 0){if(monthCalc > 1){age = `${monthCalc} months ago`}else{age = `${monthCalc} month ago`}}
else if(dayCalc > 0){if(dayCalc > 1){age = `${dayCalc} days ago`}else{age = `${dayCalc} day ago`}}
else if(hourCalc > 0){if(hourCalc > 1){age = `${hourCalc} hours ago`}else{age = `${hourCalc} hour ago`}}
else if(minsCalc > 0){if(minsCalc > 1){age = `${minsCalc} mins ago`}else{age = `${minsCalc} mins ago`}}

// object for each video
let videoObject = {
    "URL": videoUrl,
    "thumbnail": defaultThumbnail,
    "video_alt": title,
    "duration": "00:20",
    "channel_home_link": channelPage,
    "anchor_id": channel,
    "logo_address": "./my logo small.png",
    "logo_id": channel,
    "channel_logo_alt": title,
    "channel_alt": title,
    "channel_name": channel, 
    "views": "100 views",
    "vid_age": `&#183 ${age}`,    
    }
   
console.log(videoObject)
let newObject = new VideoDetails(videoObject.URL, videoObject.thumbnail, videoObject.video_alt, videoObject.duration, videoObject.channel_home_link, videoObject.anchor_id, videoObject.logo_address, videoObject.logo_id, videoObject.channel_logo_alt, videoObject.channel_alt, videoObject.channel_name, videoObject.views, videoObject.vid_age)
  appendVideoDetails(newObject)


})

let videoThumbnailEl = document.querySelectorAll('thumbnail-video');
videoThumbnailEl.forEach(video =>{
    video.style.cssText = "width: 96%; border-radius: 12px; margin-left: 2%; margin-top: 2%;"
})