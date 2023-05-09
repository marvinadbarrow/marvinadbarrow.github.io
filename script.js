let cardPack = [ 
  "1.png","2.png","3.png","4.png",
  "5.png","6.png","7.png","8.png",
  "9.png","10.png","11.png","12.png",
  "13.png","14.png","15.png","16.png",
  "17.png","18.png","19.png","20.png",
  "21.png","22.png","23.png","24.png",
  "25.png","26.png","27.png","28.png",
  "29.png","30.png","31.png","32.png",
  "33.png","34.png","35.png","36.png",
  "37.png","38.png","39.png","40.png",
  "41.png","42.png","43.png","44.png",
  "45.png","46.png","47.png","48.png",
  "49.png","50.png","51.png","52.png",]


let dealBtn = document.getElementById('deal-btn')
//variabel to add event listeners to all piles using forEach
var dropPilesEl = document.querySelectorAll('.piles')
// to add event listeners to all foundation piles using forEach
var foundationPilesEl = document.querySelectorAll('.foundation-pile')

// to adjust game container afer deal button disappears, giving more space for the game. 

let gameContainerEl = document.getElementById('game-container')
// the below two functions are used to indicate whether the mouse button is pressed down or not. So in the multiReset function we can reset things more quickly if the mousup is the the value that we will be reading at mouseDownArr[0]

// ORIENTATION OF PAGE  - since the wrapper behaviour doesn't change appropriately when orientation is changed to portrait, I'll use this code to check orientation and, depending on what the orientation is, we can then use an appropriate wrapper for either portrait or landscape. - so if winW < winH we're in portrait and if winW > winH we're in landscape

let winW;
let winH;
let winCalc;



var mouseDownArr = []
var mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown = 1;
  mouseDownArr.unshift(mouseDown)
  console.log(mouseDownArr)
}
document.body.onmouseup = function() {
  mouseDown = 0;
  mouseDownArr.unshift(mouseDown)
  console.log(mouseDownArr)
}




// seven pile elements
var pileOne = document.getElementById('pile-one');
var pileTwo = document.getElementById('pile-two');
var pileThree = document.getElementById('pile-three');
var pileFour = document.getElementById('pile-four');
var pileFive = document.getElementById('pile-five');
var pileSix = document.getElementById('pile-six');
var pileSeven = document.getElementById('pile-seven');
var remainPile = document.getElementById('reveal')
var wastePile = document.getElementById('waste-pile')
var movingCardsEl; // for the variables once cards are loaded

// arrays associated with each drop target
var origArr = []; 
var halfArr = [];
var destArr = [];
var shuffleArr = [];
var newArr; // we'll use this to shift the array elements from the waste array to the remain array

// arrays for the piles
var pileOneArr;
var pileTwoArr;
var pileThreeArr;
var pileFourArr;
var pileFiveArr;
var pileSixArr;
var pileSevenArr;
var remainingCardsArr;
var wastArr = []



var foundationPileOne = document.getElementById('foundation-one');
var foundationPileTwo = document.getElementById('foundation-two');
var foundationPileThree = document.getElementById('foundation-three');
var foundationPileFour = document.getElementById('foundation-four');

// create some arrays which will take images associated with the values in the piles array... so pileOneArr will have an array associated with it that will, for each index value, have an associated url  to the image associated with that value
var pileOneImgArr = [];
var pileTwoImgArr = [];
var pileThreeImgArr = [];
var pileFourImgArr = [];
var pileFiveImgArr = [];
var pileSixImgArr = [];
var pileSevenImgArr = [];

// array to store selected cards and parent pile for multiple drag
let selectArray = []
// this array is for all of the id's of each element
let dragIdArray = []

// contains data in multi drag cards 
let dataArray = []


// a collection of all the arrays
var pileImgArrays = [ pileOneImgArr, pileTwoImgArr, pileThreeImgArr, pileFourImgArr, pileFiveImgArr, pileSixImgArr, pileSevenImgArr]

var secondLastChildArr = [] // Takes the details of the top .face-down card exposed when you remove cards from a pile in order to change its class to .face-up if the cards you removed are dropped elsewhere. 




// card shuffle functions - we'll have a button which will shuffle and deal

const pushRandom = () =>{
  // random numbers between 1 and 52 inclusive
  const randomCard = Math.floor(Math.random()*52 + 1); 
  // if number isn't already in array then push to array and run shuffle initiator again
 if(!shuffleArr.includes(randomCard)){shuffleArr.push(randomCard); shuffleCards()}
 // otherwise run the initiator again to get another card
 else{shuffleCards()}
}




const shuffleCards = () =>{

  // disappear the deal button 
  dealBtn.style.display = "none"

  // move game container up a little bit
  gameContainerEl.style.cssText = ' margin-top:-8vh;'
  // this will only run if our shuffle array isn't full otherwise it will log 'complete'
if(shuffleArr.length < 52){ pushRandom()}else{cardsDistribute()
}}



//dealBtn.addEventListener('click', shuffleCards)
// the below function rids us of the necessity for a button click and just starts the game automatically. 
window.onload = function() {
  shuffleCards();
};







// now we'll create all seven piles  and remaining cards pile and distribute the randomly generated cards among them

const cardsDistribute = () =>{

// seventh pile.  -- NOTE: get pile is a variable for the spliced shuffle array, and it is returned as an array with the specified spliced elements
var getPile7 = shuffleArr.splice(0,7);

// sixth pile
var getPile6 = shuffleArr.splice(0,6);

// fifth pile
var getPile5 = shuffleArr.splice(0,5);

// fourth pile
var getPile4 = shuffleArr.splice(0,4);

// third pile
var getPile3 = shuffleArr.splice(0,3);

// second pile
var getPile2 = shuffleArr.splice(0,2);

// first pile
var getPile1 = shuffleArr.splice(0,1);

var remainingCardsArr = shuffleArr.splice(0,24)

// so all cards are now taken care of. But we don't have access to these arrays outside of the function so we need to push the array somewhere; we can assign each array to an uninitiated variable, like the array 'getPile7 can be assigned to pileOneArr. 

showCardPiles(getPile1, getPile2, getPile3, getPile4, getPile5, getPile6, getPile7, remainingCardsArr)


}




function showCardPiles(one, two, three, four, five, six, seven, reveal){
// these parameters are assigned variables so we can pull from the arrays in a later function when we need to distribute the cards
   pileOneArr = one;
 pileTwoArr = two;
 pileThreeArr = three;
 pileFourArr = four;
 pileFiveArr = five;
 pileSixArr = six;
 pileSevenArr = seven;
 remainingCardsArr = reveal;
  // we now have access to the random cards distributed into seven arrays and can distribute them into our piles

  pushPiles() // we'll push all piles info to populate piles function

  
}


const pushPiles = () =>{
  
  populatePiles(pileOneArr, pileOne, pileOneImgArr);
  populatePiles(pileTwoArr, pileTwo, pileTwoImgArr)
  populatePiles(pileThreeArr, pileThree, pileThreeImgArr)
  populatePiles(pileFourArr, pileFour, pileFourImgArr)
  populatePiles(pileFiveArr, pileFive, pileFiveImgArr)
  populatePiles(pileSixArr, pileSix, pileSixImgArr)
  populatePiles(pileSevenArr, pileSeven, pileSevenImgArr)
  // below goes to its own function which just takes the array and the pile, since we only need one card at a time from the array to be revealed. 
  pickPile(remainPile)
   }


// this creates images which the source cards can be pushed to
  const populatePiles = (array, pile, imageArray) =>{
    if(pile.childNodes.length < 1){
     
      pile.style.opacity = '1'
  // condition ensures pile will start to be populated only if the pile is empty;  preventing repopulation
    for(i=0; i<array.length; i++){
      let testCard = document.createElement('img') // create image
      let id = cardPack[array[i] - 1] // create id using card value
      testCard.setAttribute('id', id) // set id as img attribute
      testCard.classList.add('cardEl')// give img a class
           testCard.setAttribute('draggable', false) // make img un-draggable
        testCard.src = `images/backgnd.jpg` // to be changed once card becomes draggable
        testCard.classList.add('card-border')
      testCard.style.display = 'inline-block'
      let image = testCard.src
   imageArray.push(image)
 
      
   
      pile.appendChild(testCard);// append card image to pile

      testCard.addEventListener('dragstart', dragStart) // added an event listener here to affect all loaded cards

      testCard.addEventListener('dragend', dragEnd)

      // give top cards class of .face-up and all other cards class of .face-down
    if (i<array.length -1){testCard.classList.add('face-down')}else{testCard.classList.add('face-up');
       testCard.setAttribute('draggable', true) // make img draggable
   testCard.src = `images/${id}` // make card face up

  }}
  
   }
  }


// flips remain pile cards
  const pickPile =(pile, waste) =>{
// create image for remain pile

let testCard = document.createElement('img') 
testCard.classList.add('cardElWaste')
testCard.classList.add('card-border')
testCard.src = `images/backgnd.jpg`
remainPile.appendChild(testCard)
pile.style.opacity = '1' // show border when card back is loaded
wastePile.classList.add('card-size'); // make waste pile same size as the size of the card

  }

  
// checks that the top card of any drop pile is face down, and if so, will flip it to face up. 
const   flipCard = (flip) =>{
// check that the received card is not draggable
   flip.setAttribute('draggable',true);
  flip.classList.add('face-up');
  let id = flip.id
  flip.src = `images/${id}`
  // ok, this works perfectly, so hopefully when we are able to drag several cards the card will flip once the remaining top card is not draggeable.
}




const   sortWaste = (card) =>{
  // you probably had this correct and all you needed to do was add the event listeners but now we have an issue with the cards in the wastepile doubling up so we'll, just remove the image and replace it.  


  wastePile.removeChild.firstChild
console.log(card) // card's integer base value

// now we can use it to display the corresponding card in the wastepile; which has no element since the image was removed from it


let value = card - 1
let newId = cardPack[value]
let image = document.createElement('img')
image.classList.add('cardElWaste')
image.classList.add('face-up')
image.classList.add('card-border')

image.setAttribute('draggable',"true")
image.src = `images/${newId}`
image.setAttribute('id', newId)
wastePile.appendChild(image) 
// we must remember to give the new card event listeners for dragstart and dragdrop otherwise, there is no setData information available for the dragdrop 
image.addEventListener('dragstart', dragStart) // added an event listener here to affect all loaded cards
image.addEventListener('dragend', dragEnd)

let source = wastePile.firstChild.getAttribute('src')
console.log(source)
// for some reason the source returns undefined in some situations so this below code is to remove the image and create a new one with a default image I have created. 
if(source == 'images/undefined'){console.log('no source')
wastePile.removeChild(wastePile.firstChild)
console.log('child removed')
let newDefaultImage = document.createElement('img')
//newDefaultImage.src = 'images/cardgame-background.jpg';
newDefaultImage.classList.add('cardElWaste')
newDefaultImage.style.cssText = 'border: 1px aqua solid; opacity:0;'
wastePile.append(newDefaultImage)
}

if(remainingCardsArr.length < 1 && wastArr.length < 1){
  wastePile.removeChild(wastePile.firstChild)
  let newDefaultImage = document.createElement('img')
  newDefaultImage.src = 'images/no more cards img.png';
  newDefaultImage.classList.add('cardElWaste')
  newDefaultImage.classList.add('card-border')
  wastePile.append(newDefaultImage)

  remainPile.removeChild(remainPile.firstChild)
  let newremainImage = document.createElement('img')
  newDefaultImage.src = 'images/default card face.png';
  newDefaultImage.classList.add('cardElWaste')
  newDefaultImage.classList.add('card-border')
  remainPile.append(newremainImage)

}


}


// giving an empty clear image to wastepile after the only card is pulled and dropped leaving the div empty of an image - maybe it's better to put the requirements to run this code inside the 'sortwaste' instead of 'presortwast' 
const refreshWaste = () =>{
  let wasteCard = document.createElement('img') 
  wasteCard.classList.add('cardElWaste')
  wasteCard.classList.add('card-border')
  wasteCard.src = `images/default card face.png`
  remainPile.appendChild(wasteCard)

}



// sorting the arrays associated with cards in the waste pile.  After which, once the array items are adjusted we run the sortwaste() array which deals with they visual representation of the adjustments. 
const preSortWaste = (card) =>{
  console.log(card)
let cardId = card.id // pull id from drop card
let cardIdInteger = parseInt(cardId) // pull integer from id
let msg; // to tell whether card is in array or not


if(wastArr.includes(cardIdInteger)){msg = 'in array';
wastArr.shift(); console.log(wastArr);
sortWaste(wastArr[0])
}
else{msg = 'not in array';
console.log(msg)
 console.log('nothing to remove from wastArr')
}



// if waste pile has no card in it
if(wastePile.childNodes.length < 1){
  console.log('pick another card from remain pile')
  // we'll have to remove the card from the remain array too so..
  wastArr.shift()
  console.log(wastArr, remainingCardsArr)
  }else{

console.log(msg, cardIdInteger, wastArr)

// if drop card in array we'll need to remove it from 

} }


  


    // this function checks to see if the card at the top of any of the piles is face down. If the card is face down then we run flipCard() which will turn the top card face up 
    const faceUp = () =>{

// loop through each pile
for(i=0; i < dropPilesEl.length; i++){
// if there exists a lastChild and the last child is not draggable, send to flipCard
if (dropPilesEl[i].lastChild && dropPilesEl[i].lastChild.getAttribute('draggable') === 'false'){
flipCard(dropPilesEl[i].lastChild)
}}
             
      }



// replaceing card back when cards are in remain array, but no cards are in the waste pile
const refreshRemain = () =>{
  
    let newRemainCard = document.createElement('img') 
    newRemainCard.classList.add('cardElWaste')
    newRemainCard.classList.add('card-border')
    newRemainCard.src = `images/backgnd.jpg`
    remainPile.appendChild(newRemainCard)
   
}





// this flips through the cards so they cycle on the waste pile
const remainFlip = () =>{
  //CARD BACK DISPLAY
  if(remainPile.childNodes.length > 0){
    remainPile.removeChild(remainPile.firstChild)
    let newRemainCard = document.createElement('img') 
    newRemainCard.classList.add('cardElWaste')
    newRemainCard.classList.add('card-border')
    newRemainCard.src = `images/backgnd.jpg`
    remainPile.appendChild(newRemainCard)}

              // CARD FOR DISPALY ON WASTE PILE
let testCard = document.createElement('img') // create image
let index = remainingCardsArr.length - 1 // we'll use last index for our id number
let value = remainingCardsArr[index] // last index, LIV, value pulled
let id = cardPack[value - 1] // id is cardpack[LIV]
testCard.setAttribute('id', id)// give image id attribute
 testCard.classList.add('cardElWaste')// give image a class
 testCard.classList.add('card-border')// add border
testCard.setAttribute('draggable', true) // make draggable
testCard.src = `images/${id}` // define source

// CARD CREATION COMPLETE

console.log(wastArr, remainingCardsArr)

// copy last remain array itme to zero index of waste array - then we read out of wastArr to display the waste card, which makes sense.
wastArr.unshift(remainingCardsArr[index]);  

// pop the item out of remain array since it is now in wastArr
remainingCardsArr.pop() 

// then we need to append it to the waste pile
// remove card image if one exists
if(wastePile.childNodes.length > 0){
wastePile.removeChild(wastePile.firstChild)}
// append created card
wastePile.appendChild(testCard)
// add dragstart and dragend event listeners
testCard.addEventListener('dragstart', dragStart)
testCard.addEventListener('dragend', dragEnd)
}
  
 // when no more waste cards are available 
const remainFlipNoCard = () =>{
remainPile.removeChild(remainPile.firstChild)
remainPile.style.width = "9vw"; 
refreshRemain()
wastePile.removeChild(wastePile.firstChild)
console.log(wastePile)

// use newArr variable to hold the array of entire values all spliced from wastArr
newArr = wastArr.splice(0, wastArr.length);

// push all of those values to remain array
newArr.forEach(element => remainingCardsArr.push(element));

// clear newArr ready for next cycle
newArr = []
}



// decides what to do when the waste pile is clicked, depending on whether waste cards are available or have run out
const cardChoice = () =>{

 
if(remainingCardsArr.length > 0){remainFlip()
}else{remainFlipNoCard()}
   }
      
remainPile.addEventListener('click', cardChoice)




// for when multiple cards are dragged
const dragstartMulti = (event) =>{
console.log('hello')
event.target.style.width = '8.5vw'
event.dataTransfer.setData("text/plain", event.target.id)
setTimeout(() => {
  event.target.classList.add('hide')

}, 1);
}

// for when multiple cards are dropped
const dragendMulti = (event) =>{
  
  console.log('dragging ended')
  
  }
  



// BEGIN DRAG
const dragStart = (event) =>{
  //let card = event.target;
  event.target.classList.add('dragging')
 event.dataTransfer.setData("text/plain", event.target.id);

}

// STOP DRAG
const dragEnd = (event) =>{
  event.target.classList.remove('dragging')
 
}


// ENTER DROP TARGET
const dragEnter = (event) =>{
  event.target.classList.add('enter')

}

// DRAG OVER DROP TARGET
const dragOver = (event) =>{
   event.preventDefault();
 
}


// LEAVE DROP TARGET
const dragLeave = (event) =>{
  // NOTE, the event target is the PILE
  event.target.classList.remove('enter');// gets rid of highlight
}
 
// we need an auto reset for the non ace drop. 




// similar to MULTI RESET - this runs if multiple cards are clicked but not dragged, or if dragged multiple cards fail drop requirements and are returned to original pile  
const autoResetGo = (pile,object,wrapper, command) =>{

// then we can establish the pile type from its class
let getPileType = pile.getAttribute('class');
console.log(getPileType)
console.log(command)
console.log(pile)
if(command < 3 && pile.childNodes.length > 0){
// that means that there's a child in the clicked pile that has an id length of '2' digits or less so it must be a wrapper element so we can remove it (also the 'pile.childNodes.length > 0' ensures that if the exited pile contains no childnodes, then the For Loop for setting children attributes to 'draggable, true' does not run: previously, before adding the childnodes.length condition there was an error being thrown back)
  let wrapperElement = document.getElementById(wrapper.id)
  var parent = wrapperElement.parentNode
  console.log(object)
  console.log(wrapper.firstChild)
  console.log(wrapper.lastChild)

  let children = wrapper.childNodes
  // ERROR HERE possibly - we should be checking wrapper childnodes length.. SORTED - we had the delete wrapper elements inside the loop. So the children were being removed from the wrapper before they could have the draggable attribute reset because they were no longer inside the wrapper.  So; moved the unwrap functioun outside of the loop and placed it AFTER the loop. So, once the loop is complete and all children attributes are reset, we then unwrap the wrapper and delete it.... PROBLEM SOLVED. 

           // loop through children to add draggable:true; attribute
  for(i = 0; i < object.length ; i++){
    console.log(children)
    children[i].setAttribute('draggable', 'true')
    children[i].classList.remove('multi-style')
  }



      // for unwrapping the multiple dragged cards

// essentially, if wrapper has a first child, then, insert it before wrapper element, so eventually this will happen until there are no more children
while (wrapperElement.firstChild) parent.insertBefore(wrapperElement.firstChild, wrapperElement);

// remove wrapper from pile once no more first children exist
parent.removeChild(wrapperElement);
// ok, this actually works so now 




  console.log(pile)
  // to check their draggability
}else{
// all id's have a character length longer than 3 so all of them must be image elements and not a wrapper so we will do nothing just log that there's no wrapper

console.log('no wrapper')
}}



  


// DROP TO TARGET
const drop = (event) =>{

 
 event.target.style.opacity = "1";

  // remove pile highlight
  event.target.classList.remove('enter')

  // THIS COULD BE IN A FUNCTION 
  // get id data from dragged card
  const id = event.dataTransfer.getData("text/plain");
  // create new object using id 
  const newObj = document.getElementById(id);

  // extract integer value from id
let objBaseValue = parseInt(newObj.id)
// convert number to card's true value
let objTrueValue = Math.ceil(objBaseValue/4)

// variables for checking card colors
let lastChildSuitColor; 
let dropCardSuitColor; 

// if multiple cards are dropped this resets the cards to draggable 'true' and unwraps them, then deletes the wrapper from the drop pile
const multiReset = (wrapper) =>{

  // check if object has children, i.e. is a wrapper
  let wrapperElement = document.getElementById(wrapper.id)
  console.log(wrapperElement)
 
let hasChildren = wrapper.childNodes.length
if(hasChildren > 0){
  // if true, give child nodes a variable so we can add or remove attributes and classes
  let children = wrapper.childNodes
  console.log('multiple cards')
  // loop through children to add attributes
  for(i = 0; i < hasChildren; i++){
    children[i].setAttribute('draggable', 'true')
    children[i].classList.remove('multi-style')
  }
  
// CONSOLE console.log(wrapperElement)
  
// for unwrapping the multiple dragged cards
var parent = wrapperElement.parentNode
console.log(parent.childNodes)
while (wrapperElement.firstChild) parent.insertBefore(wrapperElement.firstChild, wrapperElement);
parent.removeChild(wrapperElement);
// ok, this actually works so now 

  console.log(event.target) // check card attributes in the drop pile

  // we might be able to use insertBefore to take the cards out of the wrapper and then we can delete it. 

}else{console.log('single card')}
}


// if needed, convert waste cards to normal cards, since waste cards are only dragged as single cards, and there is no wrapper to unwrap, we can avoid both multiReset and autoResetGo if on conversion and just prevent default.  No need to run faceUp either because they don't come from a drop pile. but presortWaste needs to run. 


// LAST GATE FOR CARD DROPS
const cardType = (object) =>{
console.log(object)
let objectType = object.getAttribute('class')
console.log(objectType)
// NOTE - cardElWaste also contains the dragging class - maybe we can remove it inside the dragEnd function for wastecards
if(objectType.includes('dragging')){
  object.classList.remove('dragging')
  console.log(object);
}

  if(objectType.includes('cardElWaste')){
    object.classList.remove('cardElWaste');
    object.classList.add('cardEl'); 
  console.log(object);
  }


event.preventDefault()
event.target.appendChild(newObj)
faceUp()
preSortWaste(newObj)
multiReset(newObj) // this removes the red border and wrapper

// give empty drop piles a visible border for easy locating
dropPilesEl.forEach(function(cardPile){
  if(cardPile.childNodes.length < 1){
cardPile.style.cssText = 'border-style: solid;background-color:none; border-color:yellow; border-width:2px;'

    }else{cardPile.style.cssText = 'border-style: none;'}
  })



  // give empty foundation piles visible border for locating  
    foundationPilesEl.forEach(function(cardPile){
      if(cardPile.childNodes.length < 1){
    cardPile.style.cssText = 'border-style: solid;'
            }else{cardPile.style.cssText = 'border-style: none; background-color:none;';}
})







  }

// non king drop DROP PILE
const checkNumbers = (color1, color2, number1, number2) =>{

  // parameter for adjacent card difference calculation
  let consecutiveVal = number1 - number2
switch(consecutiveVal){
case 1: if(color1 !== color2){ // if the difference of two consecutive cards is '1' and colours are different, then drop the card
  cardType(newObj)
}else{console.log('invalid card: consecutive cards must be of different colors')};
break;
default: 
console.log('invalid card: difference between consecutive cards must be 1')}
}






const checkColors = (prevCard, dropCard) =>{
  // determine previous card colour
  switch(prevCard % 4){
    case 0:
    case 1: lastChildSuitColor = 'black'
    break;
    default: lastChildSuitColor = 'red'
    }

// determine drop card color
    switch(dropCard % 4){
      case 0:
      case 1: dropCardSuitColor = 'black'
      break;
      default: dropCardSuitColor = 'red'
         }

         // convert previous card base value to true value 
         let lastChildTrueVal = Math.ceil(prevCard/4)
         // variable takes drop object's true value
         let dropCardTrueVal = objTrueValue
checkNumbers(lastChildSuitColor, dropCardSuitColor, lastChildTrueVal, dropCardTrueVal)
}



// king drop DROP PILE
const placeKing = () =>{
  cardType(newObj)
 }


const placeNonKing = () =>{
  let endChild = event.target.lastChild;
  let lastChildBaseValue = parseInt(endChild.id)
  checkColors(lastChildBaseValue, objBaseValue)

}

// NON ACE DROP FOUNDATION PILE
const FoundationNumbers = (prevCard, dropCard) =>{
    // from foundationSuits()
  let consecutiveVal = prevCard - dropCard;
  console.log(consecutiveVal)

  switch(consecutiveVal){
   case -1: 
      cardType(newObj)
   console.log(newObj)// want to check class properties
  break;
  default:
    console.log('difference of consecutive cards should be 1')
  
         }}

const FoundationSuits = (prevCard, dropCard) =>{
// from foundationPlaceNonAce()
  let prevSuit = prevCard % 4;
  let dropSuit = dropCard % 4;
  // determine previous card colour
  switch(prevSuit){
    case dropSuit:
      console.log('suit matches')
   // convert previous card base value to true value 
   let lastChildTrueVal = Math.ceil(prevCard/4);
 // variable takes drop object's true value
 let dropCardTrueVal = objTrueValue
FoundationNumbers(lastChildTrueVal, dropCardTrueVal)
break;
    default: console.log('suits must match in foundation pile')
    }



      
        

}

// ACE DROP FOUNDATION PILE
const foundationPlaceAce = () =>{
    cardType(newObj)
}

// if foundation pile is not empty we drop a non-ace (only single card drops allowed here)
const foundationPlaceNonAce = () =>{
// check drop object
console.log(newObj)
// check how many cards (children) in object
if(newObj.childNodes.length < 2){
  // if just one card, all is ok and we can continue processing the single card for color and numerical value
  console.log('single card drop allowed');
  let endChild = event.target.lastChild;
  let lastChildBaseValue = parseInt(endChild.id)
FoundationSuits(lastChildBaseValue, objBaseValue)

}else{
    // if multiple cards (which is not allowed on a foundation pile), process discontinues, so cards will jump back to their origin without further processing
    console.log('multiple card drop disallowed');}
 }



// switch to decide what to do dependent on the nature of the drop target, either piles 1-7 or foundation piles
switch(event.target){
case foundationPileOne:
case foundationPileTwo:
case foundationPileThree:
case foundationPileFour:
// drop target is foundtion pile
if(event.target.childNodes.length === 0 ){
  // if foundation pile is empty
if(objTrueValue === 1){ foundationPlaceAce() // drop the ace}  
}else{ // otherwise pile isn't empty so don't drop ace
console.log('only an ace can be placed on empty foundation')
 }
}else{
// where the pile is 'not' empty then from foundationPlaceNonAce we'll push to the color check and number check to determine if a non-ace drop should happen
foundationPlaceNonAce()
}
  break;

  // the DEFAULT is what happens if we're not dropping to a foundation pile, i.e. piles 1-7  and whether the card is a king or not (already handled)
  default:   
if(objTrueValue === 13){
    // if card is king check number of cards in pile
  switch(event.target.childNodes.length){
    case 0: placeKing() // drop the king
    break;
   default: console.log('cannot drop king on another card')
  }
  }else{
    switch(event.target.childNodes.length){
      case 0: console.log('cannot drop non-king card on empty space')
      break;
      default: placeNonKing(); // drop any card but a king
  }}
  
}
// dealing with two values: king or non-king
}



// we don't need forEach for this since it is only one element
wastePile.addEventListener('dragover', dragOver)
wastePile.addEventListener('dragleave', dragLeave)


// add event listeners to all foundation piles
foundationPilesEl.forEach(function(element){
  element.addEventListener('dragenter', dragEnter)
  element.addEventListener('dragover', dragOver)
  element.addEventListener('dragleave', dragLeave)
  element.addEventListener('drop', drop)
})

// add event listeners to all drop piles
dropPilesEl.forEach(function(element){
  element.addEventListener('dragenter', dragEnter)
  element.addEventListener('dragover', dragOver)
  element.addEventListener('dragleave', dragLeave)
  element.addEventListener('drop', drop)
})








// after looping through clicked to top card of pile we send the pile, clicked card and top card for selection - 
const selectRange = (pile, start,object) =>{
let pileId = pile.id // we need pile id to grab element properly
// switch id and use the pile that has matching id as element for start and end children in new range. 

  


switch(pileId){
case pileOne.id: tempPile = pileOne
break;
case pileTwo.id: tempPile = pileTwo
break;
case pileThree.id: tempPile = pileThree
break;
case pileFour.id: tempPile = pileFour
break;
case pileFive.id: tempPile = pileFive
break;
case pileSix.id: tempPile = pileSix
break;
case pileSeven.id: tempPile = pileSeven
break;
}


console.log(start, pile.childNodes.length, object)

let end = pile.childNodes.length;
let testRange = new Range() // create new range
testRange.setStart(tempPile, start); // set 'element, start child'
testRange.setEnd(tempPile, end);// set 'element, end child'
  document.getSelection().removeAllRanges(); // clear existing selection if any
 document.getSelection().addRange(testRange); // select new range
 // $(tempPile).multidraggable() // make pile multidraggable

 
  let firstCard = object[0]
  let wrapperId = parseInt(object[0].id)
 
// we could try to create a dive here, insert it into tempPile, and then append all items in the array to it, increase its z-index to above the cards and then make it draggable, and see if we can move it to another position. But then that would defeat whole purpose of multidraggable... Well, let's see. UPDATE = yes, it was right; we no longer needed the the multidraggable JQuery... I just removed the 'draggable function from the cards that we append to the div so that they could not be moved.  gave the wrapper an id of the base value of the first card, and then when it gets dropped that number is used to check the colour and true number of the div which, if suitable, allows the div to be dropped onto a card or an empty space.. WORKS LIKE A CHARM! 

let wrapper = document.createElement('div') // div to wrap cards in
wrapper.setAttribute('id',wrapperId) // give id (integer value of clicked card so when wrapper is dropped, drop handler can read it's id and extract true value and colour value which would match the clicked card to see if colour and number match criteria for dropping)

// now check orientation of the page and give appropriate wrapper dimensions. If width > height, use landscape, or if width < height, use portrait
winW = window.innerWidth;
winH = window.innerHeight
winCalc = winW - winH


if(winCalc < 0){
  wrapper.classList.add('wrapper-portrait')
}else{

  wrapper.classList.add('wrapper-landscape')
}



wrapper.setAttribute('draggable', 'true') // make draggable
tempPile.insertBefore(wrapper,firstCard) // insert into pile
console.log(tempPile)
wrapper.addEventListener('dragstart', dragstartMulti)// add event listeners
wrapper.addEventListener('dragend', dragendMulti)

for(i=0; i < object.length; i++){
  wrapper.appendChild(object[i]) // append cards to be dragged
  object[i].setAttribute('draggable', 'false')// make cards un-draggable

}
// now the wrapper can be dragged and dropped (if the id value allows for it)


// BUT if the drop fails, or we change our minds and choose not to drag the wrapper, we need to make the undraggable cards dragabble again, and to unwrap the wrapper: those two things would have been done if the wrapper was dropped, but since in this scenario there is no drop we'll use the below function and in it, set a time delay of a couple of seconds before resetting the selected cards to their normal draggable, unwrapped state. 




let commandUnwrap = 0;
let commandNothing = 0;


// since this settimeout is causing some issues of the card disappearing for over a second when the mouse button is released, we might as well try to ditch the time out and use mouseup instead, that might actually work better.  I've had to jig this function quite a bit to get a reasonable timing from card pickup  to card drop or reject - still working on it

if(mouseDownArr[0] === 0){
console.log('mouse down')

setTimeout(() => {
      
   
  console.log(pile.childNodes.length)
  
    for(i = 0; i<pile.childNodes.length; i++)
    { 
     console.log(pile.childNodes[i].id.length)
  if(pile.childNodes[i].id.length < 3){
  commandUnwrap += pile.childNodes[i].id.length
  }else{
    commandNothing += pile.childNodes[i].id.length
  }}
  
  // if commandUnwrap has no value then the auto reset go will not run, but if it does have a value then the reset function will run
  if(commandUnwrap > 0){autoResetGo(pile,object,wrapper,commandUnwrap)}else{autoResetGo(pile,object,wrapper,commandNothing)}

}, 3000);


}else{

  setTimeout(() => {
      
   
    console.log(pile.childNodes.length)
    
      for(i = 0; i<pile.childNodes.length; i++)
      { 
       console.log(pile.childNodes[i].id.length)
    if(pile.childNodes[i].id.length < 3){
    commandUnwrap += pile.childNodes[i].id.length
    }else{
      commandNothing += pile.childNodes[i].id.length
    }}
    
    // if commandUnwrap has no value then the auto reset go will not run, but if it does have a value then the reset function will run
    if(commandUnwrap > 0){autoResetGo(pile,object,wrapper,commandUnwrap)}else{autoResetGo(pile,object,wrapper,commandNothing)}

  }, 1500);

}

      
   



 // ok, so we can use the id length to figure out if the pile contains a wrapper, because the wrapper id consists of only 1 or two charachters, a single or a double digit - all other id's are at least 5 characters long because '.png' is four characters long, and a number (single digit or double digit) is added making the 'id' 5 or 6 charachters long.   
}



// WHEN PILE IS CLICKED draggable cards from clicked card upwards are highlighted ready for dragging
dropPilesEl.forEach(function(cardPile){
  // for each pile add an event listener. 

// PROBLEM SOLVED... 'click' is a combination of 'mousedown' and 'mouseup', so you have to wait for mouseup to happen before the function actually starts running. So by setting the event listener to 'mousedown' everything will start to run as soon as you click down on the mouse.  The function will then decide if the target is draggable, i.e, the actual clicked card, and loop from that card through to the last card if 'draggable:true; '. Then the parent is pushed to the array, and so are the click child.  Then in the select array, they are wrapped and the wrapper is made draggable and highlighted, given an id that corresponds to the value of the clicked card, and is therefore ready for dragging and dropping.  This means that it is impossible to drag a sandwiched draggable card without dragging all of the cards above it.  As opposed to using the click function which requires 'mouseup'; if you tried to drag the card between mousedown and mouseup, then the loop and highlight function would not work so you could drag the card out; but now that's impossible. PROBLEM SOLVED.  Now you just need to check the issues with dragging into the foundation pile to prevent that occuring - we can just specify what type of 'attribute' to disallow from any attempted drop cards.  

// NOTE 2.. we also need to deal with what happens if multiple cards are dropped back into their original pile because you change your mind. You'll need to unwrap them so perhaps we can make the unwrap function separate (which I think we already have; it's the multiReset function) - I think the conditions for this already exist in the drop() frunction, 

// and you need to do multi-reset on from the foundation pile as well. this wasn't an issue before because when draging just one card, which is what we do to drop a card on a foundation pile, it wasn't wrapped in a container, but now even just 'one' selected card is wrapped so we need to unwrap it.  

cardPile.addEventListener('mousedown', (event) => {
  // clear select array on double click 
  selectArray = []
  dragIdArray = []




  // define pile children, children length, and clicked target
  let children = cardPile.childNodes // cards belonging to pile
  let maxVal = children.length // number of cards
  let target = event.target // clicked card
  let parent = target.parentNode // parent pile
  let attr = target.getAttribute('draggable') // target drag status
if(attr == "true"){ // if draggable: true;
selectArray.push(parent)
//$(cardPile).multidraggable()
for(i=0; i < maxVal; i++){ // loop through pile's children (cards)
if(children[i] == target){ // when child[i] is target card
let JthChild = children[i] // assign child[i] a variable
console.log(JthChild) // logged child[i]
let j;
for(j=i; j<maxVal; j++){ 
// loop through parent pile from child[j] to last child
  children[j].classList.add('multi-style')// style looped children
selectArray.push(j) // push children to array
dragIdArray.push(children[j])
console.log(dragIdArray)

}}}
// create an object from array entries with the indexes as keys

selectRange(selectArray[0], selectArray[1], dragIdArray)
}else{
console.log('cannot drag a face down card')

}


})
})

// further NOTES*  Now we need to ensure that if you are dragging a card that it 'must' take the card or cards above it. 

// checking portrait vs landscape orientation

