var picOne = document.getElementById('one')
var picOneLarge = document.getElementById('one')
var picTwo = document.getElementById('two')
var picThree = document.getElementById('three')
var picFour = document.getElementById('four')
var picFive = document.getElementById('five')
var picSix = document.getElementById('six')
var imageDiv = document.getElementById('image-div')
var slideImg = document.getElementById('simple-modal')
var applicationEl = document.getElementById('application')
var bodyEl = document.getElementById('body')
var indexesLog = []// we'll hold the main folder and sub folder indexes here
var thumb; // indicates which thumb is being clicked
indexesLog[0] = 0;
indexesLog[1] = 0;
var fullPageEl = document.getElementById('full-screen')
var slideShowStart = [] // using this to prevent repeated presses of any key causing a duplicate timer to run. if this has 2 or more entries in it, the slide show function will not respond to further clicks. 

var picArr = []
picArr.push(picOne,picTwo,picThree,picFour,picFive,picSix)

var testArr = [] // to test how we push the file names to arrays


// file paths to all image folders (they contain 6 images each)
var filePath1 = "./Thumbs for image gallery/1-6/"
var filePath2 = "./Thumbs for image gallery/7-12/"
var filePath3  = "./Thumbs for image gallery/13-18/"
var filePath4  = "./Thumbs for image gallery/19-24/"
var filePath5  = "./Thumbs for image gallery/25-30/"
var filePath6  = "./Thumbs for image gallery/31-36/"
var filePath7  = "./Thumbs for image gallery/37-42/"
var filePath8  = "./Thumbs for image gallery/43-48/"
var filePath9  = "./Thumbs for image gallery/49-54/"
var filePath10  = "./Thumbs for image gallery/55-60/"



// the left and arrow elements for displaying previous or next thumbnails
let arrowLeft = document.getElementById('left-arrow')
let arrowRight = document.getElementById('right-arrow')
var folderNumber = 0; // This variable indicates which sub-array inside  allFoldersArry contains the sources of the the thumbnails currently on display. 





// folder '1-6' is the 'string' destination of filepath1, then  concatinate each of the image filenames in that destination to the 'filepath1' string.  The concatinated strings result in the entire path of each image inside folder '1-6'. So six images sources are created inside each movieArr[i] for 1 <= i <= number of folders
const movieArr1 = [filePath1 + "avatar.jpg",
filePath1 + "death wish.jpg",
filePath1 + "men.jpg",
filePath1 + "the dark knight.jpg",
filePath1 + "total recall 2.jpg",
filePath1 + "project power.jpg"
]









var movieFolder = []
// setting the default images for the thumbnails - this is what you see when the page opens up; the first six images in the gallery. The images are contained in div elements. When the side arrows are clicked, the divs are updated with a new set of images, six different ones than before.  
picOne.src = movieArr1[0]
picTwo.src = movieArr1[1]
picThree.src =  movieArr1[2]
picFour.src =  movieArr1[3]
picFive.src =  movieArr1[4]
picSix.src =  movieArr1[5]
imageDiv.src = movieArr1[0] // default displayed image
picArr.push(folderNumber) // so we can move to next or previous folder with 6 new images

// in order to get things started we'll create an IF statement and use it to check if imgDiv.firstChild is false (which it will be when you open the page), then it will push picOne to highlight(picNumber)


// folder '7-12'
const movieArr2 = [filePath2 + "animal 2.jpg",
filePath2 + "extinction.jpg",
filePath2 + "now ruined.jpg",
filePath2 + "raw.jpg",
filePath2 + "tomb raider.jpg",
filePath2 + "unbound.jpg",
]

// folder '13-18'
const movieArr3 = [filePath3 + "extraction 2.jpg",
filePath3 + "scream 1.jpg",
filePath3 + "scream 2.jpg",
filePath3 + "scream 3.jpg",
filePath3 + "scream 4.jpg",
filePath3 + "Watcher.jpg",
]

// folder '19-24'
const movieArr4 = [filePath4 + "harder they come.jpg",
filePath4 + "live or let die 2.jpg",
filePath4 + "prometheus.jpg",
filePath4 + "prometheus-movie-poster.jpg",
filePath4 + "smile.jpg",
filePath4 + "watcher 2.jpg",
]


// folder '25-30'
const movieArr5 = [filePath5 + "eon 2.jpg",
filePath5 + "forbidden planet 2.jpg",
filePath5 + "inception.jpg",
filePath5 + "the day the earth stood still 2.jpg",
filePath5 + "the day the earth stood still.jpg",
filePath5 + "willow.jpg",]


// folder '31-36'
const movieArr6 = [filePath6 + "deadlock.jpg",
filePath6 + "goodfellas.jpg",
filePath6 + "hard-kill-poster-bruce-willis.jpg",
filePath6 + "red notice.jpg",
filePath6 + "the kitchen 2.png",
filePath6 + "the kitchen.jpg",]


// folder '37-42'
const movieArr7 = [filePath7 + "harry potter 2.jpg",
filePath7 + "harry potter.jpg",
filePath7 + "night's end.jpg",
filePath7 + "star wars ep 3.jpg",
filePath7 + "star wars.jpg",
filePath7 + "the irishman.jpg",]


// folder '43-48'
const movieArr8 = [filePath8 + "211.jpg",
filePath8 + "apocalypse.jpg",
filePath8 + "the edge.jpg",
filePath8 + "the grey.jpg",
filePath8 + "the way back.jpg",
filePath8 + "welcome to the punch.jpg",]


// folder '49-54'
const movieArr9 = [filePath9 + "project power 2.jpg",
filePath9 + "satanic.jpg",
filePath9 + "total recall 3.jpg",
filePath9 + "total recall.jpg",
filePath9 + "willow 2.jpg",
filePath9 + "willow 3.jpg",]


// folder '55-60'
const movieArr10 = [filePath10 + "animal.jpg",
filePath10 + "fire starter.jpg",
filePath10 + "joker 2.jpg",
filePath10 + "joker.jpg",
filePath10 + "live or let die.jpg",
filePath10 + "127 hours.jpg",]





// the below array now holds 'all' of the bove arrays (each array contains 6 entries, strings of the source of 6 images within that folder location)
const allFoldersArray = [
movieArr1, movieArr2, movieArr3, movieArr4, movieArr5, movieArr6, movieArr7, movieArr8, movieArr9, movieArr10
]
// this function is activated by arrow left (previous set of images) or arrow right (next set of images) - it assigns 6 new images to our thumbnail image elements and gives us access to the images associated with those thumbnails 
    const chooseFolder = (index) =>{
        thumb = 1 // so we can push the index to indexesLog[1]



        // now we use the index to access the correct sub-array of allFoldersArray so we can use the elements in that sub-array as sources for our thumbnails associate them with the thumbnaild divs we already pushed to picArr, i.e picOne, picTwo, etc
        picArr[0].src = allFoldersArray[index][0]
        picArr[1].src = allFoldersArray[index][1]
        picArr[2].src =  allFoldersArray[index][2]
         picArr[3].src =  allFoldersArray[index][3]
         picArr[4].src =  allFoldersArray[index][4]
         picArr[5].src =  allFoldersArray[index][5]   
         // to ensure that the first thumbnail in the row is highlighted
         outlineThumb(picArr[0], thumb) // sends first image in the array as an argument to the outlineThumb function so that first image gets highlighted and the function then pushesit as an argume to 'changeImage' so the image is displayed. 

      // this sends the index to the function which
       ThumbIndexLocation(index)
           }




      // the below two functions use the value of the last entry of picArr which gives us the index number which corresponds to the folder we are currently pulling images from; we can use this number to access the next or previous folder by increasing or decreasing the number by  1 and using that as the new index we desire. 

      // accessing the NEXT array's folder values
    arrowLeft.addEventListener('click', (e) => {
        
        if(picArr[6] > 0){
                        picArr[6] -= 1;
            let index = picArr[6];
                      // now we can push the index to a function which will use it to pick out the index of allFoldersArray where our images are located
chooseFolder(index)
               }
        
        })

    
    // accessing the PREVIOUS array's folder values
    arrowRight.addEventListener('click', (e) => {
    // this condition will change the value of the last entry of picArr which we can then use to dictate which which index of allFoldersArray we pull the 6 thumbnails from
        if(picArr[6] < allFoldersArray.length){
            picArr[6] += 1;
            let index = picArr[6];
                       // now we can push the index to a function which will use it to pick out the index of allFoldersArray where our images are located
chooseFolder(index)
               }
        })






// for highligting the thumbnail when clicked (mutually exclusive)
picOne.addEventListener('click', (e) =>{

  outlineThumb(picArr[0])

  })

picTwo.addEventListener('click', (e) =>{
    outlineThumb(picArr[1])
    
   })

   picThree.addEventListener('click', (e) =>{
    outlineThumb(picArr[2])
   
   })

   picFour.addEventListener('click', (e) =>{
    outlineThumb(picArr[3],)
   
   })

   picFive.addEventListener('click', (e) =>{
    outlineThumb(picArr[4])
   
   })

   picSix.addEventListener('click', (e) =>{
    outlineThumb(picArr[5])
  
   })



  // function to outline a clicked thumnail
   const outlineThumb = (picNumber) =>{


     // then we clear any oulined thumbs
    picOne.style.outlineStyle = "none";
    picTwo.style.outlineStyle = "none";
    picThree.style.outlineStyle = "none";
    picFour.style.outlineStyle = "none";
    picFive.style.outlineStyle = "none";
    picSix.style.outlineStyle = "none";

// we want the exact index of picNumber so that we can push it to indexesLog[1]

// create a for loop to loop through the picArr array to see which one of the indexes match our input variable 'picNumber' and outline the thumbnail associated with the matching index. 
for (i=0; i<picArr.length; i++){
    if(picNumber === picArr[i]){ picArr[i].style.outlineStyle = "solid"
  changeImage(picArr[i], i); 
  }}

}




// function to change currently displayed main image to that of the clicked thumbnail's source image
const changeImage = (thumbnail, position) =>{
   ThumbIndex(position)
  
 imageDiv.src = thumbnail.src // change image element's source to thumbnail's source

}







// FUNCTIONS FOR SLIDESHOW


// START OF MODAL FUNCTIONS AND VARIABLES


// MODAL VARIABLES
var modalOpenEl = document.getElementById('slide-show')
var containerEl = document.getElementById('modal-container')
var closeModalEl  = document.getElementById('close-btn')

// we can use an event listener 'mouseover' to unhide the modal close button when we move the mouse over the image
slideImg.addEventListener('mouseover', (e) =>{
    closeModalEl.style.opacity = "1"; // show the close modal icon
    fullPageEl.style.opacity = "1"; // show full page icon
})

// keep close modal icon from disappearing when hovered over
closeModalEl.addEventListener('mouseover', (e) =>{
    closeModalEl.style.opacity = "1"; // since hovering over the icon causes you to be over the icon and not the image, it disappears so we have to cause it to activate it again when we are over it but not over the image... this works - no need for a 'mouseout' because when we move away we will be over the image and the icon will not disappear until we are away from the image; off the page basically
    
})

// full screen when full screen icon clicked
fullPageEl.addEventListener('click', (e) =>{
        slideImg.requestFullscreen();
   
})


// mouseover shows full screen icon
fullPageEl.addEventListener('mouseover', (e) =>{
        fullPageEl.style.opacity = "1";
        
})


// 'mouseout' hides full screen icon
slideImg.addEventListener('mouseout',  (e) =>{
    // hide icons that obscure image
    closeModalEl.style.opacity = "0"; // hide the close modal icon
    fullPageEl.style.opacity = "0";// hide full page icon
})

// opens modal on click
modalOpenEl.addEventListener('click', (e) => {
    containerEl.style.display = "none";
    slideShowStart.push("start")// item in array indicates slideshow has already started
if(slideShowStart.length <2){slideShow()}// activate slideshow only if one entry is in the 'slideshow' array, otherwise ignore click
              modalOpenEl.style.opacity = "0"; // hide start button
       
}) 


// to close full screen when page is clicked
slideImg.addEventListener('click', (e) =>{
document.exitFullscreen();
})


// TIMER FUNCTION - 

// index of image - we'll use this for
const ThumbIndex = (thumb) =>{
    indexesLog.pop();
    indexesLog.push(thumb); // index of thumbnail
    console.log(indexesLog[1], "image index")
}

const ThumbIndexLocation = (thumbFolder) =>{
    indexesLog.shift()
    indexesLog.unshift(thumbFolder); // index of thumbnail containing folder
     console.log(indexesLog[0], 'folder index')
}



var interval = 3000;
var time = 0; // To increase the time
var clockLong; // variable name for long timer
var clockShort; // short timer variable
var arrowRightClick; // to move page onto next 6 thumbnails

// SLIDESHOW FUNCTION WITH TIMER
const slideShow = () =>{
    
var i = indexesLog[1]; // thumb index (changes when any specific image is clicked so the slideshow will begin in that exact destination)
var j = indexesLog[0];  // folder index (changes when any specific image is clicked so the slideshow will begin in that exact destination)

    slideImg.src = allFoldersArray[j][i] // this introduces the default starting image - later we'll try to change this for the currently clicked image if the start arrar has contains an entry
    styleBody()
    time=0;
        clockLong = setInterval(() => {
                  time++; // increases time
                  if(j<10){


                     // run the outlineThumb function with the value of 'i+1' so that the current slide image will have the its thumbnail highlighted.  
                     outlineThumb(picArr[i+1])

                    i+=1; // increase 'i' each interval
                   
                    imageDiv.src   =  `${allFoldersArray[j][i]}`;
                    slideImg.src   =  `${allFoldersArray[j][i]}`;
                     console.log(imageDiv)           
                    if(i>4){time = -1; i=time;j+=1; // restart time and increase 'j' variable by one so we can access the next folder containing the new set of 6 images



                        // below delays the arrow right function by one time interval because for some reason it clicks at an interval of 'one' image before it is meant to
                        arrowRightClick =  setTimeout(() => {
                        arrowRight.click()
                    }, 3000);

     }
                // no idea why i>4 and time = -1 works for this but it has solved the problem and gets all elements
                }
 else{j=0; clearInterval(clockLong); // clear the clock
                       ThumbIndex(0) // reset index for thumb
                       ThumbIndexLocation(0) // reset index for folder
                        if(picArr[6] > 8){ picArr[6] = -1; chooseFolder(0)} // reset value of folder index indicator so rightArrow function can restart
                        
                        slideShow() // run slideshow again
 }
                   
                  
                   
           


                  
        
//while(i=0 && j<allFoldersArray.length){j+=1}
           // increase 'i' for next time around
             
    }, interval);  
}


// to close modal using 'X' icon inside modal
closeModalEl.addEventListener('click', (e) =>{
    containerEl.style.display = "none"; // hide slideshow
    unstyleBody(); // returns body to original styling
    clearInterval(clockLong); 
    clearTimeout(arrowRightClick);
    slideShowStart = []; // cleard so slideshow button becomes active
      modalOpenEl.style.opacity = "1"; // unhide start button
    })

    


const styleBody = () =>{bodyEl.style.backgroundColor = "black"}

const unstyleBody = () =>{bodyEl.style.backgroundColor = "rgb(41, 39, 39)"}

