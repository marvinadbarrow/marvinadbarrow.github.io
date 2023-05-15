// create an array to hold channel names

channelArray = []

// youtube homepage which will have @channel-name added, to link to channel homepage
let ytHomePage = 'https://www.youtube.com/'


var vidTitle = document.querySelectorAll('.title')




// get channel name and homepage url and image url for each element
vidTitle.forEach(element =>{

// object containing channel name, home page, and image url
    let channelObj = {
channel_name: '',
home_page: '',
image_url: ''
    }

    // variable for channel name
    let channelName = element.innerHTML

    // variable for href value linking to channel page (URL relative to C-drive storage)
    let href = element.parentNode.parentElement.href

    // re-format href value: replace 'file:///C:/    with  yt homepage URL and assing variable
    let channelHomePage = href.replace(`file:///C:/`, ytHomePage)

    // variable for channel icon (relative to parent of videTital class)
    let imageSrc = element.parentNode.childNodes[4].firstElementChild.src;

// update the channel objects with variables
channelObj.channel_name = channelName;
channelObj.home_page = channelHomePage;
channelObj.image_url = imageSrc; 
// push channel object to channel array
channelArray.push(channelObj)
})



// now channels objects can be sorted by channel name alphabetically
let channelArraySorted  =  channelArray.sort((a,b) => (a.channel_name > b.channel_name) ? 1 : -1)
// create a JSON file of array
let channeJSON = JSON.stringify(channelArraySorted)
// save in local storage for later retrieval in other apps. 
localStorage.setItem('youtube_subscriptions', channeJSON)
