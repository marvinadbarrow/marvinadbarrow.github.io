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
  // console.log(
    
  // )
}
document.body.onmouseup = function() {
  mouseDown = 0;
  mouseDownArr.unshift(mouseDown)
  // console.log(mouseDownArr)
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
var solveBtn = document.getElementById('solve-btn')
var movingCardsEl; // for the variables once cards are loaded
solveBtn.style.display = 'none'








// arrays associated with each drop target
let origArr = []; 
let halfArr = [];
let destArr = [];
let shuffleArr = [];
let newArr; // we'll use this to shift the array elements from the waste array to the remain array

// arrays for the piles
let pileOneArr;
let pileTwoArr;
let pileThreeArr;
let pileFourArr;
let pileFiveArr;
let pileSixArr;
let pileSevenArr;
let remainingCardsArr;
let wastArr = []



let foundationPileOne = document.getElementById('foundation-one');
let foundationPileTwo = document.getElementById('foundation-two');
let foundationPileThree = document.getElementById('foundation-three');
let foundationPileFour = document.getElementById('foundation-four');
let clickedFoundationArr = []





// the elements in this array are node lists, each one listing the contents (cards elements) of one of the foundation piles.  In the event that all pick cards are used and all of the drop pile cards are revealed, each nodelist will be looped through where, for each card element, the id will be extracted, the file extension removed from the id string, and the remaining string converted to a number, the resulting numbers will be pushed to a subarray representing the foundation pile corresponding to the node list. The resulting subarrays along with subarrays representing the drop piles, will be used used to create a method for automating the completion of the game from the above described scenario.  then the player will be given the option to allow the game to auto complete. 
let foundationPileMainArray = [foundationPileOne, foundationPileTwo, foundationPileThree, foundationPileFour]
  
// add event lister to all of the foundation piles so we can get the id of a clicked pile
foundationPileMainArray.forEach(element =>{

  element.addEventListener('mousedown', (e) =>{
    // to ensure that the value pushed to the clicked foundation array is always the id of the foundation pile. 
if(e.target.id.includes('.png')){
  clickedFoundationArr.push(e.target.parentNode.id)
}else{clickedFoundationArr.push(e.target.id)}
  })
})

// create some arrays which will take images associated with the values in the piles array... so pileOneArr will have an array associated with it that will, for each index value, have an associated url  to the image associated with that value
let pileOneImgArr = [];
let pileTwoImgArr = [];
let pileThreeImgArr = [];
let pileFourImgArr = [];
let pileFiveImgArr = [];
let pileSixImgArr = [];
let pileSevenImgArr = [];

// array to store selected cards and parent pile for multiple drag
let selectArray = []
// this array is for all of the id's of each element
let dragIdArray = []

// contains data in multi drag cards 
let dataArray = []

// card tracking objects temporarily pushed to this array, pending drop status; if drop fails, this array is emptied of the temporary card; if drop succeeds, then the card in the array is pushed to the breadcrumb array, after which it is deleted from this temporary array
let tempDragCardArr = []


// each subarray represents one of each of the drop piles
var pileImgArrays = [ pileOneImgArr, pileTwoImgArr, pileThreeImgArr, pileFourImgArr, pileFiveImgArr, pileSixImgArr, pileSevenImgArr]

var secondLastChildArr = [] // Takes the details of the first .face-down card from bottom. If it is exposded, by lifting the card(s) covering it and dropping them elsewhere, its class will be changed to .face-up, causing it to flip and to face upward. 




// card shuffle functions - this happens automatically

const pushRandom = () =>{
  // random numbers between 1 and 52 inclusivet
  const randomCard = Math.floor(Math.random()*52 + 1); 
  // if number isn't already in array then push to array and run shuffle initiator again
 if(!shuffleArr.includes(randomCard)){shuffleArr.push(randomCard); shuffleCards()}
 // otherwise run the initiator again to get another card
 else{shuffleCards()}
}




const shuffleCards = () =>{

  // this will only run if our shuffle array isn't full otherwise it will log 'complete'
if(shuffleArr.length < 52){ pushRandom()}
else{
  
  // disappear the deal button 
  dealBtn.style.display = "none"

  // move game container up a little bit
  gameContainerEl.style.cssText = ' margin-top:-8vh;'
  
  
  cardsDistribute()
}}



//dealBtn.addEventListener('click', shuffleCards)
// the below function rids us of the necessity for a button click and just starts the game automatically. 
window.onload = function() {
  shuffleCards();
};







// now we'll create all seven piles  and remaining cards pile and distribute the randomly generated cards among them

const cardsDistribute = () =>{

 //create array by extracting and using the first 7 cards of shuffled array
var getPile7 = shuffleArr.splice(0,7);

// then the next six cards
var getPile6 = shuffleArr.splice(0,6);

// next 5 cards for pile 5
var getPile5 = shuffleArr.splice(0,5);

// next 4 cards for pile 4
var getPile4 = shuffleArr.splice(0,4);

// next 3 cards for pile 3
var getPile3 = shuffleArr.splice(0,3);

// next 2 cards for pile 2
var getPile2 = shuffleArr.splice(0,2);

// // next card for pile 1
var getPile1 = shuffleArr.splice(0,1);

// there are 24 cards left over and they'll be used for the pick pile
var remainingCardsArr = shuffleArr.splice(0,24)


console.log(getPile7)
console.log(getPile6)
console.log(getPile5)
console.log(getPile4)
console.log(getPile3)
console.log(getPile2)
console.log(getPile1)
console.log(remainingCardsArr)

// so all cards are now taken care of. But we don't have access to these arrays outside of the function so we need to push the array somewhere; we can assign each array to an uninitiated variable, like the array 'getPile7 can be assigned to pileOneArr. 

showCardPiles(getPile1, getPile2, getPile3, getPile4, getPile5, getPile6, getPile7, remainingCardsArr)


}


// ----------------- TRACKING ARRAYS ---------------------------

// arrays to keep track of cards in each pile - these are populated with integer values representing card values of each corresponding drop pile
let dropPileOne = []

let dropPileTwo = []
let dropPileThree = []
let dropPileFour = []
let dropPileFive = []
let dropPileSix = []
let dropPileSeven = []
let dropPileTracker; // to hold the above arrays


// main array and subarrays for foundation pile
let foundationOneArr = []
let foundationTwoArr = []
let foundationThreeArr = []
let foundationFourArr = []

// arrays for keeping track of card positions
let foundationTracker = [foundationOneArr, foundationTwoArr, foundationThreeArr, foundationFourArr]

let breadcrumbArray = []


let allTrackers;

let pileNavigation = ['pile-one', 'pile-two', 'pile-three', 'pile-four', 'pile-five', 'pile-six', 'pile-seven' ]
let foundationNavigation = ['foundation-one', 'foundation-two', 'foundation-three', 'foundation-four']
// ----------------------------------------------------  


function showCardPiles(one, two, three, four, five, six, seven, reveal){


one.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-one',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: ''
    }
  dropPileOne.push(newObj)
})
two.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-two',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: ''
    }
  dropPileTwo.push(newObj)
})
three.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-three',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: ''
    }
  dropPileThree.push(newObj)
})
four.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-four',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: ''
    }
  dropPileFour.push(newObj)
})
five.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-five',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: ''
    }
  dropPileFive.push(newObj)
})
six.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-six',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: ''
    }
  dropPileSix.push(newObj)
})
seven.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-seven',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: ''
    }
  dropPileSeven.push(newObj)
})


dropPileTracker = [dropPileOne, dropPileTwo, dropPileThree, dropPileFour, dropPileFive, dropPileSix, dropPileSeven]
allTrackers = [dropPileTracker, foundationTracker]


console.log(dropPileTracker)
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
    if (i<array.length -1){}else{
       testCard.setAttribute('draggable', true) // make img draggable
   testCard.src = `images/${id}` // change the card image from card back to card value

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
image.classList.add('card-border')

image.setAttribute('draggable', true)
image.src = `images/${newId}`
image.setAttribute('id', newId)
wastePile.appendChild(image) 
// we must remember to give the new card event listeners for dragstart and dragdrop otherwise, there is no setData information available for the dragdrop 
image.addEventListener('dragstart', dragStart) // added an event listener here to affect all loaded cards
image.addEventListener('dragend', dragEnd)

let source = wastePile.firstChild.getAttribute('src')
// console.log(source)
// for some reason the source returns undefined in some situations so this below code is to remove the image and create a new one with a default image I have created. 
if(source == 'images/undefined'){console.log('no source')
wastePile.removeChild(wastePile.firstChild)
// console.log('child removed')
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
  // console.log(card)
let cardId = card.id // pull id from drop card
let cardIdInteger = parseInt(cardId) // pull integer from id
let msg; // to tell whether card is in array or not


if(wastArr.includes(cardIdInteger)){msg = 'in array';
wastArr.shift(); 
console.log('checking waste array')
console.log(wastArr);
if(wastArr.length > 0){
  sortWaste(wastArr[0])
}

}
else{msg = 'not in array';
// console.log(msg)
//  console.log('nothing to remove from wastArr')
}



// if waste pile has no card in it
if(wastePile.childNodes.length < 1){
  // console.log('pick another card from remain pile')
  // we'll have to remove the card from the remain array too so..
  wastArr.shift()
  // console.log(wastArr, remainingCardsArr)
  }else{

// console.log(msg, cardIdInteger, wastArr)

// if drop card in array we'll need to remove it from 

} }


  


    // this function checks to see if the card at the end of any of the piles is face down. If the card is face down then we run flipCard() which will turn the top card face up. This occurs when the cards have just been distritubes because, just after distribution, all cards are face down, including the end cards of each pile, and the only card in the first pile; all of these need to be facing upward. 
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

// console.log(wastArr, remainingCardsArr)

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
// console.log(wastePile)

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
// console.log('hello')
event.target.style.width = '8.5vw'
event.dataTransfer.setData("text/plain", event.target.id)
setTimeout(() => {
  event.target.classList.add('hide')

}, 1);
}

// for when multiple cards are dropped
const dragendMulti = (event) =>{
  
  // console.log('dragging ended')
  
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
// console.log(getPileType)
// console.log(command)
// console.log(pile)
if(command < 3 && pile.childNodes.length > 0){
// that means that there's a child in the clicked pile that has an id length of '2' digits or less so it must be a wrapper element so we can remove it (also the 'pile.childNodes.length > 0' ensures that if the exited pile contains no childnodes, then the For Loop for setting children attributes to 'draggable, true' does not run: previously, before adding the childnodes.length condition there was an error being thrown back)
  let wrapperElement = document.getElementById(wrapper.id)
  var parent = wrapperElement.parentNode
  // console.log(object)
  console.log('selected card')
  console.log(wrapper.firstChild)
  if(wrapper.length > 1){
    console.log('last card in group')
    console.log(wrapper.lastChild)
  }


  let children = wrapper.childNodes
  // ERROR HERE possibly - we should be checking wrapper childnodes length.. SORTED - we had the delete wrapper elements inside the loop. So the children were being removed from the wrapper before they could have the draggable attribute reset because they were no longer inside the wrapper.  So; moved the unwrap functioun outside of the loop and placed it AFTER the loop. So, once the loop is complete and all children attributes are reset, we then unwrap the wrapper and delete it.... PROBLEM SOLVED. 

           // loop through children to add draggable:true; attribute
  for(i = 0; i < object.length ; i++){
  
    children[i].setAttribute('draggable', 'true')
    children[i].classList.remove('multi-style')
  }



      // for unwrapping the multiple dragged cards

// essentially, if wrapper has a first child, then, insert it before wrapper element, so eventually this will happen until there are no more children
while (wrapperElement.firstChild) parent.insertBefore(wrapperElement.firstChild, wrapperElement);

// remove wrapper from pile once no more first children exist
parent.removeChild(wrapperElement);
// ok, this actually works so now 




  // console.log(pile)
  // to check their draggability
}else{
// all id's have a character length longer than 3 so all of them must be image elements and not a wrapper so we will do nothing just log that there's no wrapper

// console.log('no wrapper')
}}







// once all cards are face up and there are no remaining pick cards, this array will be mapped and used configure a pathway from current game state to completed game state
// let allCurrentPilesArray = [currentPileOne, currentPileTwo, currentPileThree, currentPileFour, currentPileFive, currentPileSix, currentPileSeven]



// variables for card elements in each pile
let pileOneChildren = pileOne.childNodes
let pileTwoChildren = pileTwo.childNodes
let pileThreeChildren = pileThree.childNodes
let pileFourChildren = pileFour.childNodes
let pileFiveChildren = pileFive.childNodes
let pileSixChildren = pileSix.childNodes
let pileSevenChildren = pileSeven.childNodes

// array of pile cards which will be mapped through to get the id of each card in a given pile.
let allPilesArray = [pileOneChildren, pileTwoChildren, pileThreeChildren, pileFourChildren, pileFiveChildren, pileSixChildren, pileSevenChildren]




// let allFoundationPilesArray = [currentFoundationPileOne, currentFoundationPileTwo, currentFoundationPileThree, currentFoundationPileFour]

let pickCardsFinished = 0; // when cards are finished, increment this value to '1' so that you can stop the 'cards finished' alert from re-executing each time you move a card in the drop pile after the initial alert.  you might also be able to manipulate the allPilesArray from within that condition. So, rather than repopulating the array from scratch, you can pick push the moved card values to destination piles and pop moved cards from origin piles. 

// console.log(pileOneArr, pileTwoArr, pileThreeArr, pileFourArr,    pileFiveArr, pileSixArr, pileSevenArr)





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



// CODE SETUP FOR AUTO COMPLETE AVAILABILITY -----------
let cardValueString; // variable assgned to id string extracted from each drop pile card
let cardValueInteger; // variable siged to the above string when coverted to an integer value
let foundationCardValueString; // variable assgned to id string extracted from each foundation pile card
let foundationCardValueInteger; // variable siged to the above string when coverted to an integer value


let faceDownCards = 0;

// console.log('id')
let autoCardValue = Number(id) // this is the value of  the dropped card but I don't think this is needed in this process. 

// console.log(autoCardValue)

// when these two arrays are empty it means that all cards have been picked out of the waste pile, and there are no more cards left in the pick pile; i.e. there are no cards available other than those in the foundation piles and the drop piles

if(wastArr.length < 2 && remainingCardsArr.length === 0 && wastePile.childNodes.length < 2){


  // run test to see if any cards are face down
  // for the all children array (containing subarrays, one for each pile of card elements)
allPilesArray.forEach(cardPile =>{ // in each pile
  cardPile.forEach(card =>{ // for each card
   if(card.draggable === false){ // if card is not draggable 
     faceDownCards += 1 // it is face down so increment facedown variable
   }else{faceDownCards = faceDownCards} // otherwise don't increment
  })
 })


 

if(faceDownCards === 0){ // all cards are facing up, and since this condition is only checked if there are no pick cards available, all cards are facing up and game completion must be possible. So give player the option to auto complete game. NOTE* we only want this alert to run once, so maybe there needs to be an array that contains a single value to indicate that the alert has already been called; otherwise the alert will execute each time the player moves a card from one drop pile to another. 

// clear rows so they can be repopulated with correct card values
// it's better to actually just modify the subarrays of the two piles; the pile from which the card is removed and the pile onto which the card is dropped (if it's a drop pile, otherwise just remove the card from the all piles array)

if(pickCardsFinished < 0){
  alert(`
  number of face down cards is ${faceDownCards}
  and pick/waste piles are empty: 
  Do you want the game to auto complete?
  `)

  // maybe it's a good idea to check the contents of the piles from here and then use newly constructed arrays to manipulate them. 
  
  solveBtn.style.display = 'block'
  // increase cards finish variable so next time a card is dropped alert will not execute and neither will construction of allpiles array
  pickCardsFinished += 1


  // populate subarrays corresponding to each drop pile with integer values of the cards in the each pile
  allPilesArray.forEach((pile, pileIndex) =>{
  
    pile.forEach(card =>{
      // remove file extenison
      cardValueString = card.id.replace('.png', '')
  // convert string to an integer
      cardValueInteger = Number(cardValueString) 
  // push to array associated with the pile
      allCurrentPilesArray[pileIndex].push(cardValueInteger)
      })
  
  })


  foundationPileMainArray.forEach((pile, pileIndex) =>{
 // clear previous entries  of subarray
    allFoundationPilesArray[pileIndex] = []
    console.log('index: ' + pileIndex)
    console.log(pile.childNodes)
    pile.childNodes.forEach(card =>{
            // remove file extenison from id string
            foundationCardValueString = card.id.replace('.png', '')
            // convert string to an integer
      foundationCardValueInteger = Number(foundationCardValueString) 
    // push to array associated with specific foundation pile
    allFoundationPilesArray[pileIndex].push(foundationCardValueInteger)
     
    })
  })
  
console.log(allFoundationPilesArray)
console.log(allCurrentPilesArray)
}else{

  // recalculate array values to represent new position of dropped card. 

  // the great thing about this part of the game is that, moving cards from the drop piles to the foundation piles involves moving the card with the lowest value in the pile, i.e. the last card in the pile to one of the foundation piles; and since the foundation piles consist of cards of the same suit and color and are ascending in value, and the drop piles consist of cards of alternate suits and colors and are descending in value, you can only ever move 'one' card at a time, from drop pile to foundation pile; this makes the process of game auto completion relatively simple when compared to the movements from pile to pile which can include as much as 'all' of the cards in the pile. 

  // this can be done in two different ways I think. Before the method can run you're going to need to create an array for each foundation pile and nest the four arrays in an array for all the foundations.  The last card in each drop pile will be checked to see if it qualifies as a card that can be dropped to any of the foundation piles. 



  // METHOD 1.  Starting with the first drop pile subarray in the allcurrentpiles array, get the value of the last card, then loop through the foundation pile subarrays, checking whether the currently assessed card of the first drop pile subarray can be dropped onto any of the foundation piles; if it can, then drop it, carry out a drop and 'pop' the card out of the array. Then repeat this process on the next card in the drop pile subarray.  When a card is found that cannot be dropped on any foundation pile, move to the next drop pile subarray and repeat the process.  

  // a useful method would be to only execute a search of a drop pile subarray if the array length is not zero, so the subarrays for empty piles will not be looped through.  In fact, it might be a good idea to have a variable for the number of piles that are empty, so, if when the assessment begins there are empty piles, then the variable, which we can initiate with a zero integer value, can be incremented. Then we can set the condition to loop through the array containing the drop pile subarrays, only if the value of the variable for the number of empty piles is less than 7.  When it reaches seven that means that all cards have been placed on the foundation pile and the game is complete. 

  // loop through foundation piles to get id's of cards in each pile.
  





}



}

}





// pick each foundation pile one by one and send them to the compare function


// if needed, convert waste cards to normal cards, since waste cards are only dragged as single cards, and there is no wrapper to unwrap, we can avoid both multiReset and autoResetGo if on conversion and just prevent default.  No need to run faceUp either because they don't come from a drop pile. but presortWaste needs to run. 


// LAST GATE FOR CARD DROPS
const cardType = (object) =>{

console.log('card HTML element')
console.log(object)

let objectType = object.getAttribute('class')
// console.log(objectType)
// NOTE - cardElWaste also contains the dragging class - maybe we can remove it inside the dragEnd function for wastecards
if(objectType.includes('dragging')){
  object.classList.remove('dragging')
  // console.log(object);
}

  if(objectType.includes('cardElWaste')){
    object.classList.remove('cardElWaste');
    object.classList.add('cardEl'); 
  // console.log(object);
  }



event.preventDefault()
// this is the destination 
event.target.appendChild(newObj)




let destination = event.target.id
console.log('destination')
console.log(destination)

// functions for moving cards to appropriate tracking array --- 


// card originating in waste pile
const wasteCardDrop = (card, destination, cardObject) =>{
  console.log('waste card drop function in operation ...')
  console.log('card details')
  console.log(
    `
   card: ${card}
  origin: ${cardObject.primary_card.origin}
  destination: ${destination}
    `
  )

  // get destination index and push OBJECT to associated array (note, waste pile cards positions are automatically updated elsewhere, so no need to find and remove them from waste array since that is alread done)
let destinationIndex; 
// if destination is a drop pile
if(destination.includes('pile')){
pileNavigation.forEach(element =>{
   // check navigation array for destination name
  if(element == destination){
    // get index of matching name
    destinationIndex = pileNavigation.indexOf(element)
    dropPileTracker[destinationIndex].push(cardObject)
console.log('destination pile')
console.log(dropPileTracker[destinationIndex])
  }
})


}else{ // if destination is a foundation pile
  foundationNavigation.forEach(element =>{
// check navigation array for destination name
    if(element == destination){
      // get index of matching destination name
      destinationIndex = foundationNavigation.indexOf(element)
//push object to the foundation array having the same index
foundationTracker[destinationIndex].push(cardObject)
    }
  })
}

console.log('all code executed logging tracking arrays...')
console.log(allTrackers)
}

// card originating in foundation pile
const foundationCardDrop = (card, destination, cardObject) =>{
let cardOrigin = cardObject.primary_card.origin
  console.log('foundation card drop function')
  console.log(
    `
  card: ${card}
  origin: ${cardOrigin}
  destination: ${destination}
    `
  )


  // NOTE: foundation cards can only go to drop piles so the object is going to pile tracker. cards of one foundation pile can be moved to another foundation pile if its empty, but the whole group has to move which is redundant so I could prevent movement from one foundation to another and that would solve the problem of having to code for multiple foundation cards moving from one foundation pile to  another which is redundant and in no way impacts the game outcome. Since the only card that can move into an empty spot is an 'ace' you could prevent a card drop to a foundation pile if the card's origin is a foundation pile.  Since in group drops, only the first card's details are used, preventing the ace drop prevents the whole group drop. 


    // ADD CARD TO DESTINATION - get destination index and push OBJECT to associated array
  let destinationIndex; 
  // if destination is a drop pile
   pileNavigation.forEach(element =>{
     // check navigation array for destination name
    if(element == destination){
      // get index of matching name
      destinationIndex = pileNavigation.indexOf(element)
console.log(destinationIndex)
      //push object to the pile array with the same index
      dropPileTracker[destinationIndex].push(cardObject)
      console.log(allTrackers)
    }
  })

   // REMOVE CARD FROM ORIGIN get origin index and pop OBJECT from associated array
   let originIndex; 
   foundationNavigation.forEach(element =>{
    if(element == cardOrigin){
      originIndex = foundationNavigation.indexOf(element)
      // card must be the end card in the foundation subarray since it is the last card on the foundation pile (only one at a time can be dropped)
      foundationTracker[originIndex].pop()
      console.log(allTrackers)
  }
  })

}
 
// single card originating in drop pile 
const singleCardDrop = (card, destination, cardObject, ) =>{
  console.log('single card drop function... in operation')
// destination can be another drop pile or a foundation pile.
console.log('object (post drop) of selected card with DESTINATION added')

let cardOrigin = cardObject.primary_card.origin
console.log(cardObject)
console.log('card tracking details')
console.log(
  `
card: ${card}
origin: ${cardOrigin}
destination: ${destination}
  `
)


let destinationIndex;
 // get destination index and push OBJECT to associated array
 // if destination is a foundation pile
if(destination.includes('foundation')){
  // push object to foundation tracker
  foundationNavigation.forEach(element =>{
    // check navigation array for destination name
        if(element == destination){
          // get index of matching destination name
          destinationIndex = foundationNavigation.indexOf(element)
    //push object to the foundation array having the same index
    foundationTracker[destinationIndex].push(cardObject)
    console.log(allTrackers)
        }
      })
}else{// foundation pile is not a destination
  // push object to drop pile tracker
  pileNavigation.forEach(element =>{
    // check navigation array for destination name
   if(element == destination){
     // get index of matching name
     destinationIndex = pileNavigation.indexOf(element)
     dropPileTracker[destinationIndex].push(cardObject)

   }
 })
}


// get index for card origin and remove from associated drop pile subarray in drop pile tracker
// CURRENTLY NOT CATCHING THE CARD FROM ORIGIN. 
pileNavigation.forEach(element =>{
  if(element == cardOrigin){
    index = pileNavigation.indexOf(element)
    dropPileTracker[index].pop()
}})

console.log('all code executed - log tracking array')
console.log(allTrackers)

}

// multiple cards originating in drop pile 
const multipleCardDrop = (card, destination, cardObject) =>{
  console.log('card')
  console.log(card)

  console.log('multiple card drop function')
  console.log(
    `
  card: ${card}
  origin: ${cardObject.primary_card.origin}
  destination: ${destination}
  cards moved: ${cardObject.total_selected}
    `
  )



    // the advantage is that multiple cards only move from drop pile to drop pile, so, unlike with single card or waste pile drops, destination type check is not needed. 

const modifyGroupCards = (selected, total, array) =>{
console.log(selected, total, array)

let destinationArray;
let destinationIndex; 
let trueDestination = array[selected].primary_card.destination
let trueOrigin = array[selected].primary_card.origin

console.log(trueOrigin, trueDestination)

// finding destination array
pileNavigation.forEach(element =>{
  // check navigation array for destination name
 if(element == destination){
   // get index of matching name
   destinationIndex = pileNavigation.indexOf(element)
   destinationArray = dropPileTracker[destinationIndex]

   // the group elements total is missing from the first element so I'm adding it here, it's not really necessary because the total is already in 'selected' but just for uniformity. 
array[selected].primary_card.group_elements = total


// creating a completely new object since altering the object alters other instances of it. 
// let firstObject = {
//   primary_card: {
//     card:array[selected].primary_card.card,
//     origin: trueOrigin,
//     destination:trueDestination,
//     group_elements: total
//   }, 
  
//   total_selected: total
//   }

   // because you don't need to alter the first card for group elements, true origin and destinations you could push it to the destination array from here - its details will still be available for the other objects in the incoming 'origin' array because that array isn't cleared of the first element until ALL modifications are complete. 

   // this will only push the first selected card object to the destination array
  //  breadcrumbArray.push(firstObject)
   destinationArray.push(array[selected])
  }
})



// adding '1' to selected means that only the cards beyond the first selected card in the original pile will receive the modifications of origin, group elements, and destination, which are already correct on the first selected card. 
for(i = selected +1; i < array.length; i++){

// create a new object and populate with data for transfer objects
  let newDestinationObj = {
    primary_card: {
      card:array[i].primary_card.card,
      origin: trueOrigin,
      destination:trueDestination,
      group_elements: total
    }, 
    
    total_selected: total
    }

    breadcrumbArray.push(newDestinationObj)
    destinationArray.push(newDestinationObj)

    /*
    
    
      // make sure all elements receive transfer total
  array[i].group_elements = total;
  // give true destination
  array[i].primary_card.destination = trueDestination;
  // give true origin
  array[i].primary_card.origin = trueOrigin
  // the group elements property  will be used to indicate to the back function how many cards in the breadcrumb array to move from destination back to origin. 

  // send the array object to the breadcrumb array

  breadcrumbArray.push(array[i])
  console.log(array[i])
    
    */


// push objects to destination tracker array

}
  // after all card objects have been modified and pasted pushed to destination tracker, then the original objects can be deleted from origin tracking array. 
    dropPileTracker[originIndex].splice(selected, total)
console.log(allTrackers)
console.log(breadcrumbArray)

}
  

  // the only difficulties here involve  splicings all moved cards from the origin subarray, and pushing all cards to destination subarray. The easier of the two is removing the card objects from the origin array because only the index of the first card, which we already have the code for finding in other functions, is needed. Then just splice from that index to the end of the array; so I'll start with that
let originIndex;
let cardIndex
let originTrackerArray;
let originArrayLength
let toDelete
pileNavigation.forEach(element =>{
   // check navigation array for destination name
  if(element == cardObject.primary_card.origin){
    // get index of matching name
    originIndex = pileNavigation.indexOf(element)

    // but this is just the index which finds the subarray with the destination name; what's still needed is the index of the exact card object
    originTrackerArray = dropPileTracker[originIndex]
originArrayLength = originTrackerArray.length
    dropPileTracker[originIndex].forEach(elementValue =>{
      if(elementValue.primary_card.card === card){
        cardIndex = dropPileTracker[originIndex].indexOf(elementValue)
         toDelete = originArrayLength - cardIndex
// splice all moved cards from original tracking array

        modifyGroupCards(cardIndex, toDelete, originTrackerArray)
// dropPileTracker[originIndex].splice(cardIndex, toDelete) 
      }
    })
  }
})



// all cards apart from the first are showing, so the arrays need to be populated immediately after shuffle. Face down cards should also be included.

}

// -----------------------------------------------------------


// tracking card movement; this will be used for the auto complete when it becomes clear that there is a solution to win the game. It can also be used to create a history of movements in the game so that a back button can be used. 
const trackCard = (cardObject) =>{
console.log('tracking object')
console.log(cardObject)
  //prior to the calling of this function, the temporary object for the drop card has been pushed to breadcrumb array so the temporary array entry can be deleted because it is no longer needed - a copy of it was sent to this function so now the copy is used. 

  tempDragCardArr = [] 
console.log('card tracker function in operation...')
console.log('card object, argument to this function')
console.log(cardObject)


let card;
let origin;
let dropDestination;
let cardsMoved;


  if(cardObject){
    console.log('card is being tracked')

    objectOnly = cardObject.primary_card
    card = cardObject.primary_card.card
    origin = cardObject.primary_card.origin;
    dropDestination = cardObject.primary_card.destination;
    cardsMoved = cardObject.total_selected;

  console.log('show object deails prior to sending to card appropriate card drop manager - which transfers the objects between origin and destination tracking arrays')

console.log(`
card: ${card}
origin: ${origin}
destination: ${dropDestination}
cards moved: ${cardsMoved}
`)
  

// origin of card dicates how it is to be processed
// if the origin was the waste pile
if(origin == 'waste-pile'){
  wasteCardDrop(card, dropDestination, cardObject)
  }else if(origin.includes('foundation')){
    // if the origin was a foundation pile
  foundationCardDrop(card, dropDestination, cardObject)
  // only the inner object needs to be sent because 
  }else{
  
    switch(cardsMoved){
      case 1: // do same code as moving foundation card (once that is figured out)
      singleCardDrop(card, dropDestination, cardObject)
      break;
      default: // work out how to catch all moved cards in the origin  array and to push them all to the destination array
      multipleCardDrop(card, dropDestination, cardObject)
    }
  
  
  }
    
  }else{
    console.log('card is not being tracked')
  }



}



// card ORIGIN is waste pile - WASTE PILE cards have no object associated with them because they are not contained in a drop pile or foundation pile. One reason why these are dealt differently than other cards is because, each times the cards are flipped through, most of them will not be used, so it's of no value to add them to the breadcrumb pile, unless they are actually dropped into position. That's the purpose of the breadcrumb array, to register a completed move from origin to destination because that's the information needed for the history; if the card is dropped to the waste pile and never used, then it is as if the card was never dropped, since it will go back into the remain pile; registering that movement would be redundant because, in the history, what's the point of placing the card from the waste pile back into the remain pile only to take it out again in order to place it somewhere - you may as well just leave it untracked.  And, given that the auto complete depends upon the remain pile being empty, all cards would have been moved by that point (with exception to the final waste pile card), perhaps 'then' you could push the card to the breadcrumb array and begin the auto-complete.
if(wastArr[0] === Number(object.id.replace('.png',''))){
  console.log(' card originated in waste pile')
  let wasteCardValue = Number(object.id.replace('.png',''))
  
  // create a tracking object for the card which can then be pushed to breadcrumb array
  let wasteObj = {
    primary_card: {
      card:wasteCardValue,
      origin:'waste-pile',
      destination:event.target.id
         }, 
    
    total_selected: 1
  }
  console.log('new waste object')
console.log(wasteObj)
  breadcrumbArray.push(wasteObj)
  console.log('breadcrumb array')
  console.log(breadcrumbArray)

      // send card object to tracker
  trackCard(wasteObj)
  }else{
    // card did not originate in waste pile, so it already exists in breadcrumb array;  

    // get drop card object
let breadcrumbObject = tempDragCardArr[0]
// update object's destination property
  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile


if(breadcrumbObject.primary_card.destination !==''){
  // that means that the card was moved before, because at card destribution, card objects have empty destination properties because they have not yet been moved.  So a string value here indicates the card has already moved at least once. 
let oldDestination =  breadcrumbObject.primary_card.destination
// update the object's origin property with the previous destination
breadcrumbObject.primary_card.origin = oldDestination
}else{ //otherwise the destination property was an empty string so the this is the first time the card is moving, so keep the origin as is, since the origin is the original, first origin. 
  breadcrumbObject.primary_card.origin = breadcrumbObject.primary_card.origin 
}

let newDestination = event.target.id
breadcrumbObject.primary_card.destination = newDestination


// send object for tracking
      trackCard(breadcrumbObject)
  }

  // show breadcrumb object
  console.log('breadcrum array to ensure moved cards appear in array and are the array\'s last element')
console.log(breadcrumbArray)


  




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




// non king drop to DROP PILE
const checkNumbers = (color1, color2, number1, number2) =>{

  // parameter for adjacent card difference calculation
  let consecutiveVal = number1 - number2
switch(consecutiveVal){
case 1:
  
if(color1 !== color2){ // if the difference of two consecutive cards is '1' and colours are different, then drop the card

// SUCCESS so push card to breadcrumb
  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    breadcrumbArray.push(tempDragCardArr[0])
  }


  cardType(newObj)
}else{console.log('invalid card: consecutive cards must be of different colors')};
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
break;

default: // consecutive value variable is not equal to one so illegal move, no need to check the card suits
console.log('invalid card: difference between consecutive cards must be 1')
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
}
}

// for cards being dropped to drop piles
const checkColors = (prevCard, dropCard) =>{
  // determine previous card colour by finding the remainder of the card raw value divided by 4. 
  switch(prevCard % 4){
    case 0: //spades
    case 1: lastChildSuitColor = 'black' // clubs
    break;
    default: lastChildSuitColor = 'red' // any other number and the suits are dimonds or hearts
    }

// determine drop card color with the same method above
    switch(dropCard % 4){
      case 0:
      case 1: dropCardSuitColor = 'black'
      break;
      default: dropCardSuitColor = 'red'
         }

         // convert end card raw value to true value 
         let lastChildTrueVal = Math.ceil(prevCard/4)
         // variable takes drop card's true value
         let dropCardTrueVal = objTrueValue

         // send end card and drop card suit colour and end card and drop card tru value
checkNumbers(lastChildSuitColor, dropCardSuitColor, lastChildTrueVal, dropCardTrueVal)
}



// DROP CARD SCENARIOS BELOW --------------------------------- these functions are used to decide if the card will be appended to the drop target, the intended pile destination. If the card is rejected because of an illegal move, then the cards tracking object is deleted from the temporary drag card array. 

// king drop to DROP PILE
const emptyPilePlaceKing = () =>{

  // push card object to breadcrumb as this card's drop is successful
  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    breadcrumbArray.push(tempDragCardArr[0])
  }
  cardType(newObj)
 }

// placement on DROP PILE
const placeNonKing = () =>{
  // get last child in drop target pile
  let endChild = event.target.lastChild;
 
// extract id
  let lastChildBaseValue = parseInt(endChild.id)
  // NOTE- I thought parseInt only returned an integer from a string representation of an integer, but it turns ANY string into a number, so I can use this else where; I had been using, Number(string.replace('.png', '')) on the id string, for example '12.png' returns the number 12. But looks like it can be done with just parseInt(id)

  // send end card value and drop card value
  checkColors(lastChildBaseValue, objBaseValue)

}

// NON ACE DROP FOUNDATION PILE
const FoundationNumbers = (prevCard, dropCard) =>{
   
  let consecutiveVal = prevCard - dropCard;
  // if drop card and end card true values are consecutive subtracting the drop card's value from the end card's value should result in -1; any other result indicates the cards' values are not consecutive

  switch(consecutiveVal){
   case -1: // cards are consecutive so go ahead and complete card drop

   // SUCCESS so push card to breadcrumb
  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    breadcrumbArray.push(tempDragCardArr[0])
  }

      cardType(newObj)
  
  break;
  default:
    console.log('only ajdacent cards must have consecutive numbers')
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
         }}

// check suit of drop card against the last card in the pile
const FoundationSuits = (prevCard, dropCard) =>{
// from foundationPlaceNonAce()
  let prevSuit = prevCard % 4;
  let dropSuit = dropCard % 4;
  // if the division of drop card and end card's raw number by 4 results in the same remainder; the cards are of the same suit, so you can proceed and check the true values are consecutive. 

  // determine previous card suit
  switch(prevSuit){
    case dropSuit: // cards are the same suit
   
   // convert previous card raw value to true value
   let lastChildTrueVal = Math.ceil(prevCard/4);
 // variable takes drop object's true value
 let dropCardTrueVal = objTrueValue
 // send both cards to check their true values are consecutive
FoundationNumbers(lastChildTrueVal, dropCardTrueVal)
break;// cards are not of the same suit so reject card drop
    default: console.log('suits must match in foundation pile')
    // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
    }



      
        

}

// ACE DROP on EMPTY foundation pile
const emptyFoundationPlaceAce = () =>{

  // SUCCESS - but if the card comes from the waste pile, there is not a copy in the temporary array because the tracking object is created only when a card from the waste pile successfully drops to foundation or drop piles, so there's nothing here to push; so check the condition of temporaray array first and if it's empty, no matter because the drop card will be pushed to breadcrumb array by other means. 

  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    breadcrumbArray.push(tempDragCardArr[0])
  }

    cardType(newObj)
}

// if foundation pile is not empty we drop a non-ace (only single card drops allowed here)
const foundationPlaceNonAce = () =>{
// if the number of cards in the wrapper is less than two, then only one card is being dropped and the attempted move is legal
if(newObj.childNodes.length < 2){
 // now the current card's color and number needs to be checked against the colour and number of card we are attempting to drop onto
 // get the pile's end card
  let endChild = event.target.lastChild;
  // get the raw valuie of the end card
  let lastChildBaseValue = parseInt(endChild.id)
  // send card to check its suit
FoundationSuits(lastChildBaseValue, objBaseValue)

}else{
    // number of cards in the wrapper is 2 or greater
    console.log('multiple card drop disallowed');
  // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
  
  }
 }



// SWITCH PILE TYPE and check whether card is ACE or NON-ACE, for foundation piles, and KING or NON-KING for drop piles
switch(event.target){
  // if the destination is a foundation pile
case foundationPileOne:
case foundationPileTwo:
case foundationPileThree:
case foundationPileFour:
// if the pile is empty and the true value of the dragged card is '1', i.e. it is an ace
if(event.target.childNodes.length === 0 ){
  // drop the card to the empty foundation pile
if(objTrueValue === 1){ emptyFoundationPlaceAce() // drop the ace}  
}else{ // PILE EMPTY, but card isn't an ace; illegal move
console.log('only an ACE can be placed on empty foundation')
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
 }
}else{
// foundation pile not empty, so check card values for placement. Note; if the card IS an ACE it will be rejected later because the foundation pile cards are consecutive and all other card values are greater than the value of the ace, so the ace will not be able to drop because doing so will break the rule for consecutive cards. 
foundationPlaceNonAce()
}
  break;

// cards attempting a drop on DROP PILES. 
  default:   
if(objTrueValue === 13){ // CARD = KING
// check number of cards in pile
  switch(event.target.childNodes.length){ 
    case 0: emptyPilePlaceKing() // of pile is empty place king
    break;
    // otherwise pile is not empty; illegal move
   default: console.log('cannot drop king on another card')
   // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
  }
  }else{ //CARD = NON KING 
    switch(event.target.childNodes.length){
      // if pile is empty - illegal move cannot drop a non-king
      case 0: console.log('cannot drop non-king card on empty space')
      // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
      break;
 // pile contains cards to attempt drop
      default: placeNonKing();
  }}
  
}
// dealing with two values: king or non-king
}


let lastFoundationCard;
let totalCardsAdded = 0;



// AUTO-COMPLETE CHECK TO SEE IF ALL CARDS ARE FACE UP
function comparePileCard(fPile, index){
// CHECK how many drop piles are empty, when this reaches 7 this function will not execute again. 

let totalEmptyDropPiles = 0;

  // get endcard in foundation pile
  lastFoundationCard = fPile[fPile.length - 1]
  // variable for end card in drop pile
  let lastDropPileCard;
  allCurrentPilesArray.forEach((dropPile, dropIndex) =>{

    if(dropPile.length > 0){ // only compare if the dropPile is non empty

  
      lastDropPileCard = dropPile[dropPile.length -1]

      if(lastDropPileCard - lastFoundationCard === 4){
        allFoundationPilesArray[index].push(lastDropPileCard)
        totalCardsAdded ++
        lastFoundationCard += 4;
        allCurrentPilesArray[dropIndex].pop()
      }else{

      }
    }else{

totalEmptyDropPiles ++;
    }


if(dropIndex === 6){

if(totalEmptyDropPiles > 6 ){
  // do nothing
  console.log('SOLVE COMPLETE')

            console.log('all foundations array')
          console.log(allFoundationPilesArray)
        
          console.log('all drop piles array')
          console.log(allCurrentPilesArray)
}else{

  if(totalCardsAdded > 0){
    totalCardsAdded = 0;
    pickFoundation(index)
  }else{
      let newIndex = (index + 1)%4
      pickFoundation(newIndex)
      }


}


}
 
//     if(index === 3){ // the last foundation pile has been processed
// pickFoundation()
//     }
  })

}


function pickFoundation(foundationIndex){
  let newIndex = foundationIndex  
let pickFoundation = allFoundationPilesArray[newIndex]  
    comparePileCard(pickFoundation, newIndex)  
}



// add an event listener to solve button
solveBtn.addEventListener('click', () =>{
  console.log('running solve')
  pickFoundation(0)
})

// if multiple cards are dropped this resets the cards to draggable 'true' and unwraps them, then deletes the wrapper from the drop pile
const multiReset = (wrapper) =>{

  
// check if object has children, i.e. is a wrapper
let wrapperElement = document.getElementById(wrapper.id)
// console.log(wrapperElement)

let hasChildren = wrapper.childNodes.length
if(hasChildren > 0){
// if true, give child nodes a variable so we can add or remove attributes and classes
let children = wrapper.childNodes

if(hasChildren > 1){
console.log('multiple cards')
console.log('children')
console.log(children)
}

// loop through children to add attributes
for(i = 0; i < hasChildren; i++){
  children[i].setAttribute('draggable', 'true')
  children[i].classList.remove('multi-style')
 
  // push the children to a temporary array
}

// CONSOLE console.log(wrapperElement)

// for unwrapping the multiple dragged cards
var parent = wrapperElement.parentNode
// console.log(parent.childNodes)
while (wrapperElement.firstChild) parent.insertBefore(wrapperElement.firstChild, wrapperElement);
parent.removeChild(wrapperElement);
// ok, this actually works so now 

// check card attributes in the drop pile
// console.log(event.target) 





// the calculation can be made when the pick source is empty, 
/* 
   
*/
// we might be able to use insertBefore to take the cards out of the wrapper and then we can delete it. 

}else{console.log('single card')}
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

 console.log('origin pile')
 console.log(testRange.endContainer.id)
 console.log('testRange')
 console.log(testRange.commonAncestorContainer.childNodes)

  let firstCard = object[0]
  let wrapperId = parseInt(object[0].id)

  console.log('first card value - which is card id')
  console.log(wrapperId)


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
// console.log(tempPile)
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
// console.log('mouse down')

setTimeout(() => {
      
   
  // console.log(pile.childNodes.length)
  
    for(i = 0; i<pile.childNodes.length; i++)
    { 
    //  console.log(pile.childNodes[i].id.length)
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
      
   
    // console.log(pile.childNodes.length)
    
      for(i = 0; i<pile.childNodes.length; i++)
      { 
      //  console.log(pile.childNodes[i].id.length)
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


let cardValue = Number(target.id.replace('.png', ''))
console.log('origin pile element below:')
console.log(parent)
console.log('origin pile name below:')
console.log(parent.id)

// getting the object of the clicked card from the tracking array. 
let pileIndex;
let cardObj
pileNavigation.forEach(pile =>{
  if(pile == parent.id){
pileIndex = pileNavigation.indexOf(pile)
console.log('card objects in tracking subarray of origin pile (minus the moved card - unopened console element will show original number of cards in pile; but opened, the correct total will show')
console.log(dropPileTracker[pileIndex])
dropPileTracker[pileIndex].forEach(card =>{
if(card.primary_card.card === cardValue){
cardObj = card
console.log('object of selected card, with destination properties added')
console.log(cardObj)
}
})
  }
})
// let cardObj = {

// primary_card: {
//   card:cardValue,
//   origin:parent.id,
//   destination:''
// }, 

// total_selected: ''
// }


if(attr == "true"){ // if draggable: true; get the HTML element
selectArray.push(parent)
//$(cardPile).multidraggable()
for(i=0; i < maxVal; i++){ // loop through pile's children (cards)
if(children[i] == target){ // when child[i] is target card

let j;
for(j=i; j<maxVal; j++){ 
// loop through parent pile from child[j] to last child
  children[j].classList.add('multi-style')// style looped children
selectArray.push(j) // push children to array
dragIdArray.push(children[j])
// console.log(dragIdArray)

}}}


cardObj.total_selected = dragIdArray.length
tempDragCardArr.push(cardObj)

console.log('breadcrumbs - last element is last card moved')

// create an object from array entries with the indexes as keys

selectRange(selectArray[0], selectArray[1], dragIdArray)
}else{
console.log('cannot drag a face down card')

}





})
})

// further NOTES*  Now we need to ensure that if you are dragging a card that it 'must' take the card or cards above it. 

// checking portrait vs landscape orientation

/*

0
: 
(8) [4, 8, 12, 16, 20, 24, 28, 32]
1
: 
(10) [2, 6, 10, 14, 18, 22, 26, 30, 34, 38]
2
: 
(12) [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47]
3
: 
(11) [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41]
length
: 
4



0
: 
[]
1
: 
(3) [52, 46, 44]
2
: 
[]
3
: 
(4) [50, 45, 42, 40]
4
: 
[49]
5
: 
[]
6
: 
(2) [51, 48]


*/