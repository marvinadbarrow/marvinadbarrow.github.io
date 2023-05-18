// variables for input elements
    var width;
    var height;
    var newWidth;
    var newHeight;
    var imgSourceWidth;
    var imgsourceHeight;
    var imageArray = []
var outputElWidth = document.getElementById("output-width");
var outputElHeight = document.getElementById("output-height");
var imgDetailsArr  = []
var actualImgSize = document.getElementById("output-size")
var fileChooserEl = document.getElementById("file-chooser")
var uploadEl= document.getElementById("uploaded-pic");
var dimensionsEl = document.getElementById("output-size-container")
var selectedSizeEl = document.getElementById("selected-size")
var fullArray = [] // for the moment we'll use this to limit the number of images we can pull
var currentImagePara = document.getElementById('current-image') // display's the image dimensions
var imageThumb = document.getElementById("thumb-select")

var nodeZero;
var nodeOne;
var nodeTwo;
var nodeThree;

// input elements for height and width
var widthEl = document.getElementById('new-width')
var heightEl = document.getElementById('new-height')

// array containing input element
var dimentionsElArr = [widthEl, heightEl]

// for each array element in dimensions array (height and width input) add event listener to clear associated placeholder (or any previously inputted value) when input text area is clicked
dimentionsElArr.forEach(element =>{
element.addEventListener('click',function(){
  element.placeholder = ''
  element.value = ''

})})




  // BELOW holds the chosen files and since we can't choose multiple files, element.files will only have one entry; the entry(ies) are always cleared when we choose new files. And this is why, for the moment, we only ever have index [0] because we can only choose one at a time, which gets replaced when we choose a new file.  
  const inputImage = document.querySelector("#file-chooser")

// associating the last child of the uploaded-pic element with variables

var LastKid; 
var currentImageEl = document.getElementById('current-image')
var count = document.getElementById("uploaded-pic") // we'll manipulate this div later
 // we'll see if we can get a nodelist from this and have access to the nodelist elements via the 'element[i] method. 





  // FUNCTIONS FOR LOADEDING CHOSEN FILES AND CLICKED IMAGES
  inputImage.addEventListener('change', function (e) {

    // this prevents more than four images being loaded. (I've also added an alert! method to warn the user)
    if(fullArray.length < 4){ fullArray.push("img"); 
         
const reader = new FileReader()
reader.onload = function(){
const img = document.createElement('img') // created new image (we could use document.createNew)
img.src = reader.result // image source is reader result
img.classList.add("img-load") // given image a class
uploadEl.appendChild(img) // image appended to div
img.style.cssText = "height:200px; margin: 10px 0px 10px 10px; border-radius: 4px;"
var count2  = document.getElementsByClassName("img-load")
console.log(count2)


let newId = inputImage.files[0]["name"]// we extract file name from the image  (which is an object)
LastKid = count.lastChild;
LastKid.setAttribute('id', newId)
console.log(count) // derived from 'id' this logs a 'div' containing html elements with attributes
console.log(count2[0])// derived from className, this logs a ;Nodelist' of the div; the elements inside the div are indexed and each indexed element contains everything there is to know about the element, from id and class to image size, dimensions, date modified etc.  You can then access the elements with the array method, i.e. for the above use count2[i] for some index 'i' -  we should now be able to push this to the get size function and maybe use it 'there' 

console.log(count.childNodes) // we probably don't need this one ----- 
// OK, this was a BIG surprise. By giving the new 'id' to the last child, each new child takes the name of the current image name.  I suppose that's because the 'last child' is the last child to be added so this process is working. 



// now lets use a for loop to see if we can recall the childnodes from count.. If we can pull out the individual ones, maybe we can manipulate them. 
// console.log(count.child[0]) doesn't work - you need first child, last child or nth child. They're indexed so I'm surprised you can't access them using an array method; OUCH I think we would have to re-write this  because I've used queryselector(id) whereas I think it's necessary to use a 'class' and access it using 

// now we add an event listener to each image do define what happens when we click (WORKS)
img.addEventListener('click', (e) =>{
    const actualWidth = img["naturalWidth"];
  const actualHeight = img["naturalHeight"];
  console.log(img) // this console logs the currently clicked image (including the images 'id')
console.log(img.id)
currentImagePara.textContent = " " +  img.id;


// ok, GREAT; this line below removes the child from the div where we uploaded the thumb image which belongs to the image size calculate - I got confused with the parameter for remove child - you need to include the element so element.removeChild(element.childposition) even when the element is the same. 
if(imageThumb.firstChild){ console.log('first child is'); imageThumb.removeChild(imageThumb.firstChild); console.log('first child removed')}


// we push natural hight and natural width of the current image to be processed by the getimage size funciton for display. We also send the image so that we can clone it to display a representational thumbnail of it when it is selected for manipulation, and we send the nodelist of uploaded images so that we can distinguish between uploaded images and CSS style them individually if needed. 
 getImageSize(actualWidth, actualHeight, img, count2)


})
 // it's element by class name that reveals the html collection. good. 
}
reader.readAsDataURL(inputImage.files[0]);

}else{alert("maximum images allowed: 4")} }, false )




// GET IMAGE SIZE function
const getImageSize = (getWidth, getHeight, img, nodelist) =>{
  // these clear the array ready to push the next width/height values to positions 0 and 1 which will be read for the final display.


  console.log(nodelist)// just to make sure the nodelist 'count2' is reading correctly when it gets to this function. 
 

// NOTE*: nodelist[0].id) give the 'id' of the image in at that index; AND, nodelist[0].style.opacity = "0" actually styles the image at that position; so we could either style directly, or use the id's and then style.  Maybe it's not good practice to style without using the id.  


// let's format the images with the outling - for some reason CSSText returns the loaded image to its original size so I'll have to figure that one out, it almost works like setAttribute, erasing all of the formatting - I noticed that it also got rid of the border radius as well. 
if (nodelist[0]){
  nodeZero = document.getElementById(nodelist[0].id);
  nodeZero.style.outlineStyle = "none";
  nodeZero.style.outlineColor = "blue";
  nodeZero.style.outlineWidth = "5px";
  nodeZero.style.outlineOffset = "2px";
}

if (nodelist[1]){
  nodeOne = document.getElementById(nodelist[1].id);
  nodeOne.style.outlineStyle = "none";
  nodeOne.style.outlineColor = "blue"
  nodeOne.style.outlineWidth = "5px";
  nodeOne.style.outlineOffset = "2px";
}


if (nodelist[2]){
  nodeTwo = document.getElementById(nodelist[2].id);
  nodeTwo.style.outlineStyle = "none";
  nodeTwo.style.outlineColor = "blue"
  nodeTwo.style.outlineWidth = "5px";
  nodeTwo.style.outlineOffset = "2px";
}
if (nodelist[3]){
  nodeThree = document.getElementById(nodelist[3].id);
  nodeThree.style.outlineStyle = "none";
  nodeThree.style.outlineColor = "blue"
  nodeThree.style.outlineWidth = "5px";
  nodeThree.style.outlineOffset = "2px";
}



// now a switch statement for styling the currently clicked image (and here's where using variables is useful)


if (img.id === nodeZero.id){console.log("match")}else{console.log("no match")} // quick check to see if we can compare the currently clicked image with all of the loaded images to see if we can recognize a match or no match... this will enable us to single out the match for formating with the outline and use default to eliminate the others. - DONE!  - the only issue here is if the node item doesn't exist, things still work, but we get an error thrown back because we are referring to a node member that does not exist and trying to manipulate what doesn't exist in the DOM.  dealt with this by having if statements inside the switch statements to only style if the element exists in the nodelist otherwise the execute for such element will not try to execute on a non-existent element so we'll get no error. 

switch(img.id){
case nodeZero.id: console.log("node Zero");
nodeZero.style.outlineStyle = "solid"
if( nodeOne && nodeTwo && nodeThree){
nodeOne.style.outlineStyle = "none";
nodeTwo.style.outlineStyle = "none";
nodeThree.style.outlineStyle = "none";}
break;

case nodeOne.id: console.log("node One");
nodeZero.style.outlineStyle = "none"
nodeOne.style.outlineStyle = "solid";
if(nodeTwo && nodeThree){
nodeTwo.style.outlineStyle = "none";
nodeThree.style.outlineStyle = "none";}
break;

case nodeTwo.id: console.log("node Two");
nodeZero.style.outlineStyle = "none"
nodeOne.style.outlineStyle = "none";
nodeTwo.style.outlineStyle = "solid";
if(nodeThree){
nodeThree.style.outlineStyle = "none";}
break;

case nodeThree.id: console.log("node Three");
nodeZero.style.outlineStyle = "none"
nodeOne.style.outlineStyle = "none";
nodeTwo.style.outlineStyle = "none";
nodeThree.style.outlineStyle = "solid";
break;

}
// note, you cannot append the image to another place because it will remove the image from its original position (i.e. uploaded pic div) and be appended to te new location, so we need to create a duplicate image as below. 

var clonedImage = img.cloneNode(true); // clone the image for the duplicate
clonedImage.setAttribute('id', "first-id") // give it an 'id'
clonedImage.classList.remove('img-load') // delete its class - because img-load is for the 'choose-file' images - this image stands on its own
clonedImage.classList.add('img-load-rename') // create new class
clonedImage.style.cssText = "max-width:200px; max-height:190px;" // set display width/height
console.log(clonedImage.id) // check for id
imageThumb.appendChild(clonedImage) // append to 'selected image' display thumbnail div
//console.log(imageThumb.firstChild)
imageThumb.style.borderStyle = "none" // so border only appears when no thumbnail is present
console.log(imageThumb)




 imgDetailsArr.pop() 
 imgDetailsArr.shift()
 // our image in HTML has the id of 'image' and we read it's dimensions below.  This is not an uploaded image but a fixed one via html
 let imgSource = document.getElementsByClassName("img-load")
let n = imgSource.length
 imgDetailsArr.push(getWidth, getHeight)
imgSourceWidth = imgDetailsArr[0]
imgsourceHeight = imgDetailsArr[1]


var selectImgDimensions = imgSourceWidth + " x " + imgsourceHeight 
selectedSizeEl.textContent = selectImgDimensions
  //    actualImgSize.textContent += imgDimensions// pushing read dimensions to the output div (we'll hold this for the moment)
  

  }




// FUNCTIONS FOR GETTING NEW IMAGE SIZE FROM NEW WIDTH OR IMAGE SIZE FROM NEW HEIGHT

  // generate size for new landscape thumbnail -WIDTH GETTER
const newImgSizeLandscape = () =>{

  if(imgDetailsArr[0] && imgDetailsArr[1]){
  newWidth = parseInt(document.getElementById("new-width").value);
  // the calculation
  newHeight = Math.floor((newWidth*imgDetailsArr[1])/imgDetailsArr[0]);
  let newCalc = newWidth + " x " + newHeight;
  outputElWidth.textContent = newCalc }else{alert('select an already uploaded image to recalculate size')}
  }
  
  
  // generate size for new PORTRAIT thumbnail - HEIGHT GETTER
  const newImgSizePortrait = () =>{
    if(imgDetailsArr[0] && imgDetailsArr[1]){
  newHeight = parseInt(document.getElementById("new-height").value);
  // the calculation
  newWidth = Math.floor((imgDetailsArr[0]*newHeight)/imgDetailsArr[1]);
  let newCalc = newWidth + " x " + newHeight;
  outputElHeight.textContent = newCalc;}else{alert('select an  already uploaded image to recalculate size')}
  }
  
  