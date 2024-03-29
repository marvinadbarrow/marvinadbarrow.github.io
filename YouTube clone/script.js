var guideModalEl = document.getElementById('guide-section-modal')
var guideContentEl = document.getElementById('guide-content')
var hamburgerBtn = document.getElementById('hamburger-btn')
var youtubeAccountEl = document.getElementById('youtube-account-modal')
let micSearchAudio = new Audio('mic alert.mp3')

// array containing the id's of all modals. 
var modalNameArr = ["guide-section-modal","microphone-modal","creator-modal","notifications-modal","switch-account-modal","restricted-mode-modal","language-modal","location-modal","keyboard-shortcuts-modal","youtube-account-modal","appearance-modal"]


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

        openModalArray.forEach(element =>{ 
            if(document.getElementById(element['button_id']).contains(e.target)){// if icon/button clicked
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



//

// my channel id
let youtubeId = 'UCpCdAp4bI9IPGAFa_jIW0XA'
let key = 'AIzaSyAC3lYXGeYIxev1b07LLBn5s0HCzEb2UWw'


