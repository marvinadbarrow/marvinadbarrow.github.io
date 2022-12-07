
var indexesLog = []// main folder and sub folder indexes here
var thumb; // indicates which thumb is being clicked
indexesLog[0] = 0;
indexesLog[1] = 0;
var fullPageEl = document.getElementById('full-screen')
var slideShowStart = [] // using this to prevent repeated presses of any key causing a duplicate timer to run. if this has 2 or more entries in it, the slide show function will not respond to further clicks. 
var tempArray = []

var testArr = [] // to test how we push the file names to arrays
var addressDumpArr = []

// file paths to all image folders
var folder1 = "./Thumbs for image gallery/1-6/"
var folder2 = "./Thumbs for image gallery/7-12/"
var folder3  = "./Thumbs for image gallery/13-18/"
var folder4  = "./Thumbs for image gallery/19-24/"
var folder5  = "./Thumbs for image gallery/25-30/"
var folder6  = "./Thumbs for image gallery/31-36/"
var folder7  = "./Thumbs for image gallery/37-42/"
var folder8  = "./Thumbs for image gallery/43-48/"
var folder9  = "./Thumbs for image gallery/49-54/"
var folder10  = "./Thumbs for image gallery/55-60/"

// the below  are a the arrays that hold images for each of our 10 image folders

// folder '1-6'
const movieArr1 = [folder1, ['avatar.jpg', "death wish.jpg", "men.jpg", "the dark knight.jpg", "total recall 2.jpg", "project power.jpg"]]


// folder '7-12'
const movieArr2 = [folder2, ["animal 2.jpg", "extinction.jpg", "now ruined.jpg", "raw.jpg", "tomb raider.jpg", "unbound.jpg",] ]

// folder '13-18'
const movieArr3 = [folder3, ["extraction 2.jpg", "scream 1.jpg", "scream 2.jpg", "scream 3.jpg", "scream 4.jpg","Watcher.jpg", ]]

// folder '19-24'
const movieArr4 = [folder4, ["harder they come.jpg", "live or let die 2.jpg", "prometheus.jpg", "prometheus-movie-poster.jpg", "smile.jpg", "watcher 2.jpg",]]


// folder '25-30'
const movieArr5 = [folder5 ,["eon 2.jpg", "FORBIDDEN PLANET 2.jpg", "inception.jpg", "the day the earth stood still 2.jpg", "the day the earth stood still.jpg", "willow.jpg",]]


// folder '31-36'
const movieArr6 = [folder6 ,[ "deadlock.jpg", "goodfellas.jpg", "hard-kill-poster-bruce-willis.jpg", "red notice.jpg", "the kitchen 2.png", "the kitchen.jpg",]]


// folder '37-42'
const movieArr7 = [folder7 ,["harry potter 2.jpg", "harry potter.jpg", "night's end.jpg", "star wars ep 3.jpg", "star wars.jpg", "THE IRISHMAN.jpg",]]


// folder '43-48'
const movieArr8 = [folder8 ,["211.jpg", "apocalypse.jpg", "the edge.jpg", "the grey.jpg", "the way back.jpg", "welcome to the punch.jpg",]
]


// folder '49-54'
const movieArr9 = [folder9 ,[ "project power 2.jpg", "satanic.jpg", "total recall 3.jpg", "total recall.jpg", "willow 2.jpg", "willow 3.jpg",]]


// folder '55-60'
const movieArr10 = [folder10,[ "animal.jpg", "fire starter.jpg", "joker 2.jpg", "joker.jpg", "live or let die.jpg", "127 hours.jpg",]]

// the below array now holds 'all' of the above arrays  as subarrays. Each subarray contains, a string at the zero'th index and a subarray containing all 6 image names which correspond to the names of the images contained the folder name variable at the zero'th index of each subarray. 
const allFoldersArray = [
    movieArr1, movieArr2, movieArr3, movieArr4, movieArr5, movieArr6, movieArr7, movieArr8, movieArr9, movieArr10
    ]

// when the window loads, check the page body 'id' with a switch statement and then run the appropriate code for that specific page...

let gallerySelectorArr = [] // this will hold a data object from localStorage with information about the home of the clicked image on the display gallery.  The data in the object can be accessed to define the main image to be displayed and the and thumbnails to display in the thumbnail container 




// CODE FOR SLIDESHOW PAGE

// variables for slideshow
const slideshowVariables = () =>{
// check if the saved data is in local
if(localStorage.length > 0){
// parse JSON object in localStorage
let originalObj = JSON.parse(window.localStorage.getItem("image_store"))
// move to first index position of below array for later dater collection
gallerySelectorArr.unshift(originalObj)

}




    let anchorEl = document.getElementById('anchor')
//var imageDiv = document.getElementById('')
var imageContainer = document.getElementById('image-container')
var slideImg = document.getElementById('simple-modal')
var applicationEl = document.getElementById('application')
var bodyEl = document.getElementById('body-slideshow')
let thumbDivParent = document.getElementById('container-arrow-holder')

// get elements that will contain thumbnails above displayed image
let thumbDivOne = document.getElementById('img-one')
let sixThumbs = document.querySelectorAll('.thumbnail-img')
let hamburgerEl = document.getElementById('hamburger-div')
let modalContentEl = document.getElementById('modal-content')

// MODAL VARIABLES
var modalOpenEl = document.getElementById('slide-show')
var containerEl = document.getElementById('modal-container')
var closeModalEl  = document.getElementById('close-btn')

// SPEED ADJUST FOR SLIDES

// array for slide speed/time values - unshift and timer will take from array[0]
var slideSpeedArr = [15000]

// event listeners for modal contents
modalContentEl.addEventListener('click', (e) =>{

let requestData = e.target.innerHTML
// switching target's innerHTML to identify clicked element
switch(requestData){
case 'slow (1 min)': 
slideSpeedArr.unshift(60000)// send time value
imageContainer.click()// simulate click of main image to close menu
break;
case 'medium (30 secs)':
slideSpeedArr.unshift(30000) // send time value
imageContainer.click()// simulate click of main image to close menu
break;
case 'regular (15 secs)': 
slideSpeedArr.unshift(15000)// send time value
imageContainer.click()// simulate click of main image to close menu
break;
case 'fast (5 secs)':
slideSpeedArr.unshift(5000)// send time value
imageContainer.click()// simulate click of main image to close menu
break;
case 'Go To Gallery':
setTimeout(() => {
    window.open("file:///C:/Users/Marvin/Desktop/Js%20Doc%20Web/projects%20in%20the%20making/Whole%20App%20Website/main%20page/image%20apps/slideshow%20gallery/image%20gallery%20thumbnail%20page/Index.html") // opens main gallery page
    
}, 200);

imageContainer.click()// simulate click of main image to close menu
break;
default: console.log('nothing selected')
}


})




hamburgerEl.addEventListener('click', function(){ // opens slideshow speed menu
    modalOpenEl.style.display = 'none'
    modalContentEl.style.display = 'block'
})



imageContainer.addEventListener('click', function(){// closes slideshow speed menu
    modalContentEl.style.display = 'none'
    modalOpenEl.style.display = 'block'
})
// used to find position of subfolder that 6 thumbnail sources are pulled from (there are 10 folders with 6 image sources in each) 
let subGalleryArr = [0]




let imageDiv = document.createElement('img') // create new image

 // OUTLINE THUMB - selected thumbnail asociated with image, in order to ouline thumb
 const outlineThumb = (thumbnail, div) =>{
    // pic number is the clicked thumb
    // div is thumb container & siblings of clicked
         sixThumbs.forEach(element => { //clear any oulined thumbs
        element.style.outlineStyle = "none";});
        
    // loop through thumb div to identify thumb matching parameter;
    for (i=0; i<div.length; i++){
       if(thumbnail === div[i]){ 
        div[i].style.outlineStyle = "solid"; // outline thumbnail when match found
        ThumbIndex(i-1)
     }}
    console.log(indexesLog)
    }

    
// makes thumbs outline ready
    const autoOutline = () =>{

      // THIS NEEDS TO BE AFTER LOAD THUMBS FOR YOU TO SEE WHAT'S IN THE DIV
// add outline potential to all thumb divs
let arrowContent = thumbDivParent.children.length
let childrenLength = arrowContent - 1
for(i=1; i < childrenLength ; i++){
     
     console.log(thumbDivParent.children[i])
     // give outline class for highlighting when needed
thumbDivParent.children[i].classList.add('outline')
// make the outlines invisible by default
thumbDivParent.children[i].style.outlineStyle = 'none'
} }


// load main image
const mainImgLoad = (folder, image) =>{
// folder parameter is path to source folder.
// Image is image-name.filetype  
// concatentation gives full relative path to image

let id = image // assign image-name.filetype to id variable
imageDiv.setAttribute('id',`${id}`) // set id (as image-name.filetype)
imageDiv.classList.add('image-div')// add class for general styling
imageDiv.classList.add('outline')// add class for outline styling
imageDiv.style.outlineStyle = "none"; // set outline to invisible
imageContainer.appendChild(imageDiv) // append image to div
imageDiv.src = folder + image // concatenate sources for full path to source and set as source of image
outlineThumb(imageDiv,thumbDivParent) // send thumb info to outline thumb
console.log(imageDiv, thumbDivParent)
}


// append six thumbs to the thumbnail container
const loadThumbs = (sourceFolder,images) =>{
let length = images[0].length; // length of array containing images
  for(i=0; i < length; i++){
     let j = i+1; // first j value is 1, which is the position of first thumnail image
 //source of each thumb is sourfolder address plus image name (both strings in array) 
 thumbDivParent.children[j].src = sourceFolder + images[0][i] }
 }



// this is activated to push the index of thumbnail for retrieval so that the slideshow can know where to get the first image from
const ThumbIndex = (thumbIndex) =>{
    indexesLog.pop();
    indexesLog.push(thumbIndex); // index of thumbnail
    console.log("image index: " + indexesLog[1])
}

// for retrieval of the folder from which current image is taken from so that the thumbnai
const ThumbIndexLocation = (thumbFolderIndex) =>{
    indexesLog.shift()
    indexesLog.unshift(thumbFolderIndex); // index of thumbnail containing folder
     console.log("folder index: " + indexesLog[0])
}



// Loads default image and sibling thumbnails if slideshow is opened independently of main gallery
const defaultImgsLoad = () =>{
    mainImgLoad(movieArr1[0],movieArr1[1][0]); // array item containing main folder 'string' and array item containing specific image name string
    loadThumbs(movieArr1[0],movieArr1[1]); //folder string and image siblings array
    
}

// loads image selected in main gallery along with its sibling thumbnails
const inheritedImgsLoad = () =>{
    mainImgLoad(gallerySelectorArr[0]['folder_destination'],gallerySelectorArr[0]['image']) // load main image from localStorage data

    loadThumbs(gallerySelectorArr[0]['folder_destination'],gallerySelectorArr[0]['folder_content'])// load thumbs from local storage data
    subGalleryArr[0] = gallerySelectorArr[0]['dest_folder_index']
    autoOutline() // make thumbs outline-ready 
 
    
 
   ThumbIndex(gallerySelectorArr[0]['image_index'])
    ThumbIndexLocation(subGalleryArr[0])


}



// if gallerySelectorArr contains no term, no gallery image has been clicked so drop default image and sibling thumbs when slideshow page is opened, otherwise display clicked main gallery image and thumb siblings. 
switch(gallerySelectorArr.length){
case 0: 
defaultImgsLoad()
break;
default:
   inheritedImgsLoad()
}




const leftArrow = () =>{// left arrow clicked
    if(subGalleryArr[0] > 0){ // if images folder index value > 0
        subGalleryArr[0] -= 1; // subtract 1 from value
    let index = subGalleryArr[0]; // assign value new index variable
    indexesLog[0] = index
    chooseFolder(index)//send new index to choose 6 images from 'previous' array's sources
    console.log(indexesLog)
}else{

    let index = 9;
    subGalleryArr[0] = index;
    chooseFolder(index)
    indexesLog[0] = index
    console.log(indexesLog)
}


}


const rightArrow = () =>{ // right arrow clicked
    if(subGalleryArr[0] < allFoldersArray.length -1){// if index number less than last item number
        subGalleryArr[0] += 1; // add 1 to value
    let index = subGalleryArr[0]; // assign new value a new index
    indexesLog[0] = index
    chooseFolder(index) //send new index to choose next array's images
    console.log(indexesLog)
                   }else{
                    // reset folder index to zero and zero'th value of the array to zero also... so we can just cycle. 
                    let index = 0;
                    subGalleryArr[0] = index;// correct subgallery
                    indexesLog[0] = index // correct indexes log
                chooseFolder(index)
                console.log(indexesLog)
                }
                
                
                
                }


                   
const arrowSelect = (arrow) =>{
let idName = arrow.getAttribute('id') 
switch(idName){// check which arrow (right or left) has been clicked
case 'left-arrow': leftArrow(); // run left arrow function 
break;
case 'right-arrow': rightArrow();// run right arrow function
}}
 



// render clicked thumbnail
const selectThumbImage = (e) =>{
let className = e.target.getAttribute('class') // get target class name
switch(className){
case 'thumbnail-img outline': // target is thumbnail
imageDiv.src = e.target.src  // set main image src = thumb src
outlineThumb(e.target, thumbDivParent.children) //send thumb for outlining
break;
default: // otherwise target is arrow (R or L)
arrowSelect(e.target)//send target to filter arrow
} }


   // discerns which element is clicked, thumnail or arrow
   anchorEl.addEventListener('click', selectThumbImage)


    // activated by left or right arrow click
    const chooseFolder = (index) =>{
        thumb = 1 // so we can push the index to indexesLog[1]
        let mainAddress = allFoldersArray[index][0]
        let imagesAddress = allFoldersArray[index][1]
// load next page's images into thumbnail containers
for(i=1; i < thumbDivParent.children.length - 1; i++){
    let j = i-1 // since 'i' starts at one so that we can capture the first appropriate child in the thumbdivParent (which also includes arrows; first thumb div is second child), if we used 'i' to access subarray values, we would miss the first image address inside the subarrays, j=i-1 ensures j starts at zero and we can use it to loop through the subarrasy, starting at position zero. 'i' terminates at 6 inside the thumb div parent, and therefore at 5 inside the subarray, which is covers all six entries in those arrays
    thumbDivParent.children[i].src = mainAddress + imagesAddress[j]
}
// changes the value in indexLog to the folder index of the resulting from this chooseFolder function. 
        
thumbDivOne.click() // simulate click of first thumb of siblings so when six new images are added, the first thumb is automatically highlighted
           }


// END OF SLIDESHOW static page PAGE VARIABLES


// FUNCTIONS FOR SLIDESHOW


// START OF MODAL FUNCTIONS AND VARIABLES




// we can use an event listener 'mouseover' to unhide the modal close button when we move the mouse over the image
slideImg.addEventListener('mouseover', (e) =>{
    closeModalEl.style.opacity = "1"; // unhide the close modal icon
    fullPageEl.style.opacity = "1";
})

// keep close modal icon from disappearing when hovered over
closeModalEl.addEventListener('mouseover', (e) =>{
    closeModalEl.style.opacity = "1"; // since hovering over the icon causes you to be over the icon and not the image, it disappears so we have to cause it to activate it again when we are over it but not over the image... this works - no need for a 'mouseout' because when we move away we will be over the image and the icon will not disappear until we are away from the image; off the page basically

    hamburgerEl.style.display = 'block' // display hamburger menu icon

   })

// to make the application full screen
fullPageEl.addEventListener('click', (e) =>{
        slideImg.requestFullscreen();
   
})


// to keep the full screen icon visible when  mousing over it
fullPageEl.addEventListener('mouseover', (e) =>{
        fullPageEl.style.opacity = "1";
        
})


// then with 'mouseout' we can hide it again when we move away from the image
slideImg.addEventListener('mouseout',  (e) =>{
    closeModalEl.style.opacity = "0"; // hide the close modal icon
    fullPageEl.style.opacity = "0";
})

// to open the modal using button
modalOpenEl.addEventListener('click', (e) => {
    hamburgerEl.style.display = 'none'
containerEl.style.display = "block";
slideShowStart.push("start")
if(slideShowStart.length <2){slideShow()}
modalOpenEl.style.opacity = "0"; // hide start button      
}) 


// to close full screen when page is clicked
slideImg.addEventListener('click', (e) =>{
document.exitFullscreen();

})


// TIMER FUNCTION - 
var interval;
var time = 0; // To increase the time
var clockLong; // variable name for long timer
var k; 
var i;// either zero or folder index of image clicked
var folderSlide;
var imageSlide;

// SLIDESHOW FUNCTION WITH TIMER
const slideShow = () =>{
   interval = slideSpeedArr[0]; // speed set in slideshow galleryh
    var h = indexesLog[0]
    var j = indexesLog[1]// either zero or image index from clicked display image

// set beginning image for slideshow - will change appropriately thereafter
folderSlide = allFoldersArray[indexesLog[0]][0]
imageSlide = allFoldersArray[indexesLog[0]][1][indexesLog[1]]
slideImg.src = folderSlide + imageSlide

    styleBody()
   
        clockLong = setInterval(() => {
                  time++; // increases time
j+=1
k = j%6 // IMAGE LOOP VARIABLE - cycles from 0 through 5
i = (Math.floor(j/6) + h)%10// SUBFOLDER LOOP VARIABLE - cycles from 0 through 9... the value will either be zero if we start from the beginning or taken from the currently clicked inner thumb, from within the slideshow, or the index generated from the display gallery thumbnails. Whatever it is, since j will always will be between 0 and 5 depending on what is in the lindexLog array, the math floor of j/6 will be zero, and you will add that to the 'h' value, which will be anywhere between zero and 9... when the math floor changes to '1' as 'j' that will automatically increase the folder number until the sum of the math floor and the folder number reaches 10, and at that point we get the formula (as is the case with all formulas) (Math.floor(j/6) + h)%10 = (10)%10 = 0, so our folder index will be zero and therefore the slide show has got to the beginning of the image gallery and the process starts from displaying the beginning images. 
indexesLog[0] = i;
indexesLog[1] = k;
console.log(indexesLog)

folderSlide = allFoldersArray[i][0]
imageSlide = allFoldersArray[i][1][k]
// then create a new image uplaod
mainImgLoad(folderSlide, imageSlide)
slideImg.src = folderSlide + imageSlide // change slide source to new image

if(k === 0){ // right arrow will activate once all six images are looped
    if(i<9){
        rightArrow()
    }
    
}else{console.log('wait')}


// 1. imageDiv & slideImage need source
// 2. highlight highlight thumb associated with source
// 3. change set of displayed thumbnails when subarray changes
// 4. highlight first thumb when change 3 happens
                   

             
    }, interval);  
}


// to close modal using 'X' icon inside modal
closeModalEl.addEventListener('click', (e) =>{
    containerEl.style.display = "none"; // hide slideshow
    unstyleBody(); // returns body to original styling
    clearInterval(clockLong); 
    slideShowStart = []; // cleard so slideshow button becomes active
      modalOpenEl.style.opacity = "1"; // unhide start button
            console.log(indexesLog)
    })

    


const styleBody = () =>{bodyEl.style.backgroundColor = "black"}

const unstyleBody = () =>{bodyEl.style.backgroundColor = "rgb(41, 39, 39)"}

}



// CODE FOR MAIN PAGE

// variables for main gallery
const mainGalleryVariables = () =>{


let thumbnailGallery = document.getElementById('application-body')
console.log(thumbnailGallery)





const showElement = (e) =>{
   
    // since local storage will already contain information, it will need to be cleared each time we run showElement() - so do that here. 
    window.localStorage.clear();

    // two variables, 'addressObj' to create an object for the image store details and 'storageObj' for the stringyfied object
let addressObj; 
let storageObj; 

    let elementType = e.target.tagName // variable to hold tag type
    if(elementType == 'IMG'){ // if tag type is an image
// log the image source

let sourceInfo = e.target.outerHTML // gets the relative source as a string. 
console.log(sourceInfo)
// loop through ENTIRE arrays
for(i=0; i < allFoldersArray.length; i++){
    for(j=0; j <  allFoldersArray[i][1].length; j++){

// loop through all arrays and subarrays containing the addresses
addressDumpArr.push(allFoldersArray[i][0] + allFoldersArray[i][1][j])  
// check if our sourceInfo string contains any of the addresses in any of the arrays (which it will) - log 'i' and 'j' and the address name. 
if(sourceInfo.includes(allFoldersArray[i][0] + allFoldersArray[i][1][j])){ console.log('found');

// log destination folder and image 'name.type'
console.log(i,j, allFoldersArray[i][0] + allFoldersArray[i][1][j])

addressObj = {
    folder_content:[allFoldersArray[i][1]] ,
    folder_destination: allFoldersArray[i][0],
       image: allFoldersArray[i][1][j],
       dest_folder_index: i, // for arrow navigation to thumb sets
       image_index:j

}

// for cleaner code,  stringify object
storageObj= JSON.stringify(addressObj) 
console.log(storageObj)


// then store the oject as a key value (key being 'image_store'). Needed to use string literals with the variable for it to work, the variable by itself didn't seem to work and returned 'null' in the new page. 
window.localStorage.setItem("image_store", `${storageObj}`)
// object is now available to slideshow page so a path to the clicked image is created for display in the image element
}else{console.log('not found')}}
}


setTimeout(() => {
    window.open("./index - image-page.html") // opens a the page in the first parameter (second parameter is optional where you can specify the target, e.g '_blank') 
}, 200);

}}

thumbnailGallery.addEventListener('click', showElement)
}












// check which window is loaded and create appropriate variables only for the specific HTML page. 
    window.onload = function() {
        switch(document.body.id){
case 'body-slideshow': console.log('slide show gallery'); 
slideshowVariables()
break;
case 'body-page-1':
case 'body-page-2':
case 'body-page-3':
case 'body-page-4':

console.log('main gallery');
mainGalleryVariables();
break;
        }
      };




      // ERROR below emphasises why you need to be careful about which i, j, k (etc) variables you are using to pull out array items. This messed up the slides and it took ages to realize what the problem was (thank god for console.log())


/* IMAGE DISPLAY ISSUES..  So, it looks like the only images that are displaying are where the folder number matches the image number so images only appear when we are accessing:
folder(0)image(0)
 folder(1)image(1)
 folder(2)image(2)
 folder(3)image(3)
 folder(4)image(4)
 folder(5)image(5)

 since image numbers go no higher than (5), this will not work for folder(6) and beyond.  REALLY not sure why this is happening but we need some investigation.  Maybe it's with the way i've set the numbers up

OMG... I've found it; 
it appears that the folder changes are incrementing at the same rate as the image changes and so we're jumping as below:
 folder(0) - folder(0)image(0) - combination exists
 folder(1) - folder(0)image(1) - combination doesn't exist
 folder(2) - folder(0)image(2) - combination doesn't exist
 folder(3) - folder(0)image(3) - combination doesn't exist
 folder(4) - folder(0)image(4) - combination doesn't exist
 folder(5) - folder(0)image(5) - combination doesn't exist
folder(0) - folder(1)image(0) - combination doesn't exist
folder(1) - folder(1)image(1) - combination exists


you are looping both folder and image at the same rate, and it's only when for: a, b, c
folder(a) + folder(b)image(1) is the address,
in otherwords, when a = b, so I've probably put the wrong letters into the equations for capturing the entire address because most of the addresses don't exist. 
IN OTHER WORDS, it should read like folder(a) + folder(a)image(c)


FOUND IT, 



just found the mistake, I did folder(c) + folder(a)image(c)
and that made the folders revolve at the same rate as the image loop.. hence the problem.. It should be solved now. 



*/










