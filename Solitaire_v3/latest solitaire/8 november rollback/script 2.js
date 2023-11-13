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


  // FETCHING AUTO SOLVE SCENARIO LAYOUT FOR TESTING SOLVE BUTTON - 

  // variables for foundation trackers and drop pile trackers in solve scenario

  // variables for testing solve scenario
let dropPilesScenario = [];
let foundationPilesScenario = [];

// created a JSON file with a card layout where all cards are facing upward and used it to run a test on the solve function to see if the auto solve would be able to sort the cards to complete the game.  I don't know if it will work for EVERY scenario; I would have to sit down and try to figure out if there is some sort of 'general' solution that can be applied to ANY card scenario.  That's a project for much later. 
  fetch('/solve_scenario.json')
  .then(res => res.json())
  .then(data =>{
    console.log('..fetched data')
    dropPilesScenario.push(...data.drop_piles)
    foundationPilesScenario.push(...data.foundations)

useArrays(dropPilesScenario, foundationPilesScenario)
  })



let undoBtn = document.getElementById('undo-btn')
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
  

  // move game container up a little bit
  gameContainerEl.style.cssText = ' margin-top:-8vh;'
  
  
  cardsDistribute()
}}



//undoBtn.addEventListener('click', shuffleCards)
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


// let trackingCompiler = [{getPile1: 'pile-one'}, {getPile2: 'pile-two'}, {getPile3: 'pile-three'}, {getPile4: 'pile-four'}, {getPile5: 'pile-five'}, {getPile6: 'pile-six'}, {getPile7: 'pile-seven'}]

showCardPiles(getPile1, getPile2, getPile3, getPile4, getPile5, getPile6, getPile7, remainingCardsArr)

// showCardPiles(trackingCompiler)
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

let wasteCardTracker = []
let pickCardTracker = []

let breadcrumbArray = []


let allTrackers;

let pileNavigation = ['pile-one', 'pile-two', 'pile-three', 'pile-four', 'pile-five', 'pile-six', 'pile-seven' ]
let foundationNavigation = ['foundation-one', 'foundation-two', 'foundation-three', 'foundation-four']
// ----------------------------------------------------  


function showCardPiles(one, two, three, four, five, six, seven, reveal){

reveal.forEach(revealCard =>{
// create an object for each card in the pick pile
  let revealObj = {

    primary_card: {
      card:revealCard,
      origin:'pick-pile',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
  principal_origin: 'pick-pile'
    }

pickCardTracker.push(revealObj)
})

one.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-one',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-one'
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
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-two'
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
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-three'
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
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-four'
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
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-five'
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
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-six'
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
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-seven'
    }
  dropPileSeven.push(newObj)
})


dropPileTracker = [dropPileOne, dropPileTwo, dropPileThree, dropPileFour, dropPileFive, dropPileSix, dropPileSeven]
allTrackers = [dropPileTracker, foundationTracker]

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
  
  populatePiles(pileOneArr, pileOne, pileOneImgArr, dropPileOne);
  populatePiles(pileTwoArr, pileTwo, pileTwoImgArr, dropPileTwo)
  populatePiles(pileThreeArr, pileThree, pileThreeImgArr, dropPileThree)
  populatePiles(pileFourArr, pileFour, pileFourImgArr, dropPileFour)
  populatePiles(pileFiveArr, pileFive, pileFiveImgArr, dropPileFive)
  populatePiles(pileSixArr, pileSix, pileSixImgArr, dropPileSix)
  populatePiles(pileSevenArr, pileSeven, pileSevenImgArr, dropPileSeven)
  // below goes to its own function which just takes the array and the pile, since we only need one card at a time from the array to be revealed. 
  pickPile(remainPile)
   }


// this creates images which the source cards can be pushed to
  const populatePiles = (array, pile, imageArray, trackArray) =>{
// tracking array is here because the last object in the array which represents the end card of the distributed pile needs to have show that the card was flipped at distribution, so set that object's 'when_flipped' property to zero - at the same time that the card's 'draggable' attribute is set to true, because that means the card gets flipped imediately, at zero, when no moves have been made. 
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
   testCard.src = `images/${id}` // change the card image from card back to card value, i.e. face down to face up


  // here you need to set the when_flipped property on the tracking object to zero,  indcating that the card was flipped at distribution before any moves were made. 

   trackArray[i].when_flipped = 0;
 

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
const   flipCard = (flipThis, index) =>{
// check that the received card is not draggable
   flipThis.setAttribute('draggable',true);
  let id = flipThis.id
  flipThis.src = `images/${id}`

// code for locating the tracking object and assigning a value to its when_flipped property

// get the index of pile tracking array
let trackingArray = dropPileTracker[index]
// edit the when_flipped property of the last card in the pile
trackingArray[trackingArray.length - 1].when_flipped = breadcrumbArray.length



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


  


    // if on moving a card away from a pile, the top card left behind is facing down, flip it to face up
    const faceUp = () =>{

// loop through each pile
for(i=0; i < dropPilesEl.length; i++){
// if there exists a lastChild and the last child is not draggable, this means that the card is at the end of the pile but is face down

// check which of the piles has the face down end card; this can only apply to one pile, since moving cards can only occur one pile at a time. 
if (dropPilesEl[i].lastChild && dropPilesEl[i].lastChild.getAttribute('draggable') === 'false'){//if pile end card isn't draggable
  let indexOfPile = i
flipCard(dropPilesEl[i].lastChild, indexOfPile)// send card to the flip function

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





// this flips through the pick cards so they cycle on the waste pile
const remainFlip = () =>{
  //CARD BACK DISPLAY
  if(remainPile.childNodes.length > 0){
    // remove the current card displayed on the pick pile
    remainPile.removeChild(remainPile.firstChild)
    // create a new card and give class details
    let newRemainCard = document.createElement('img') 
    newRemainCard.classList.add('cardElWaste')
    newRemainCard.classList.add('card-border')
    // set the image source to cardback and image to the pile
    newRemainCard.src = `images/backgnd.jpg`
    remainPile.appendChild(newRemainCard)}


              // CARD FOR DISPALY ON WASTE PILE
 // create new image for wastepile card
let testCard = document.createElement('img')
// we'll use last index for our id 
let index = remainingCardsArr.length - 1 

// the last card in the array gets displayed in the remain-waste
let value = remainingCardsArr[index] // last index, LIV, value pulled
let id = cardPack[value - 1] // id is cardpack[LIV]
testCard.setAttribute('id', id)// give image id attribute
 testCard.classList.add('cardElWaste')// give image a class
 testCard.classList.add('card-border')// add border
testCard.setAttribute('draggable', true) // make draggable
testCard.src = `images/${id}` // define source

// CARD CREATION COMPLETE

// console.log(wastArr, remainingCardsArr)

// copy last remain array item to zero index of waste array - then we read out of wastArr to display the waste card, which makes sense.
wastArr.unshift(remainingCardsArr[index]);  

// pop the item out of remain array since it is now in wastArr
remainingCardsArr.pop() 

// set card's move order to breadcrumb length
pickCardTracker[pickCardTracker.length -1].when_moved = breadcrumbArray.length + 1

// set the card's when flipped order to the breadcrumb length
pickCardTracker[pickCardTracker.length -1].when_flipped = breadcrumbArray.length + 1


// write the destination on the card object
pickCardTracker[pickCardTracker.length -1].primary_card.destination = 'waste-pile'
// write the destination on the card object
pickCardTracker[pickCardTracker.length -1].primary_card.origin = 'pick-pile'
// push card to breadcrumb
breadcrumbArray.push(pickCardTracker[pickCardTracker.length -1])

// unshift card object to waste pile array
wasteCardTracker.unshift(pickCardTracker[pickCardTracker.length -1])

// pop object from pickcard tracker
pickCardTracker.pop()


console.log(pickCardTracker)
console.log(wasteCardTracker)
// then we need to append it to the waste pile
// remove card image if one exists
if(wastePile.childNodes.length > 0){
wastePile.removeChild(wastePile.firstChild)
}
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
if(wastePile.firstChild){
  wastePile.removeChild(wastePile.firstChild)
  // console.log(wastePile)
  
}

// use newArr variable to hold the array of entire values all spliced from wastArr
newArr = wastArr.splice(0, wastArr.length);

// push all of those values to remain array
newArr.forEach(element => remainingCardsArr.push(element));

// this also has to be done for the tracking objects - all the elements in the waste tracker need to be pushed to the pick card tracker; we can do it using spread. 

// first we need to swap all of the destinations with origins on the waste card array to indicate that they went from the waste pile back to the origin.  They will all get the same breadcrumb number and that will indicate that they were all moved together, in fact, instead of sending all of the 24 cards to the breadcrumb array, we could send a special object to indicate the transfer of all the cards back to the pick pile. 

wasteCardTracker.forEach(object =>{
  object.primary_card.destination = 'pick-pile'
  object.primary_card.origin = 'waste-pile'
  object.when_moved = breadcrumbArray.length
  object.primary_card.group_elements = wasteCardTracker.length
})
pickCardTracker.push(...wasteCardTracker)

// create an object to represent all of the cards returned to the pick pile; this object will be sent to breadcrumb so that undo can be alerted of this 'special' undo case. 
let pickCardResetObj = {
  primary_card: {
    card:'all pick pile',
    origin:'waste-pile',
    destination:'pick-pile',
    group_elements:wasteCardTracker.length
  }, 
  
  total_selected: wasteCardTracker.length, 
when_flipped: '', 
when_moved: breadcrumbArray.length, 
principal_origin: 'pick-pile'
  }
  
wasteCardTracker = [] // clean the waste card tracker






  breadcrumbArray.push(pickCardResetObj)
// clear newArr ready for next cycle
newArr = []
}


// decides what to do when the waste pile is clicked, depending on whether waste cards are available or have run out
const cardChoice = () =>{

 
if(remainingCardsArr.length > 0){remainFlip()
}else{remainFlipNoCard()}
   }
      
   // attach event listener to remain pile; 
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
   if(wrapper.length > 1){

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

let autoSolvePossible = 0; // when cards are finished, increment this value to '1' so that you can stop the 'cards finished' alert from re-executing each time you move a card in the drop pile after the initial alert.  you might also be able to manipulate the allPilesArray from within that condition. So, rather than repopulating the array from scratch, you can pick push the moved card values to destination piles and pop moved cards from origin piles. 

// console.log(pileOneArr, pileTwoArr, pileThreeArr, pileFourArr,    pileFiveArr, pileSixArr, pileSevenArr)


undoBtn.addEventListener('click', ()=>{
  console.log('back button clicked... checking breadcrumb history')
  let lastBreadcrumb = breadcrumbArray[breadcrumbArray.length - 1]


console.log(`
card value: ${lastBreadcrumb.primary_card.card}
current location: ${lastBreadcrumb.primary_card.destination}
previous location: ${lastBreadcrumb.primary_card.origin}
number of cards moved: ${lastBreadcrumb.primary_card.group_elements}
number of cards selected: ${lastBreadcrumb.total_selected}
when moved: ${lastBreadcrumb.when_moved}
when flipped: ${lastBreadcrumb.when_flipped}
`)



  // METHOD 1.  Starting with the first drop pile tracker in the dropPileTracker array, get the value of the last card object, then loop through the last card of each of the foundationTracker subarrays, checking whether the current drop pile card object can be added to the foundation pile; if it can, then drop it and update both subarrays (foundation and drop pile). Then repeat this process on the next card in the first drop pile subarray.  When a card is found that cannot be dropped on any foundation pile, move to the next drop pile subarray and repeat the process.  

  // a useful method would be to only execute a search of a drop pile subarray if the array length is not zero, so the subarrays for empty piles will not be looped through.  In fact, it might be a good idea to have a variable for the number of piles that are empty, so, if when the assessment begins there are empty piles, then the variable, which we can initiate with a zero integer value, can be incremented. Then we can set the condition to loop through the drop pile tracking array, only if the value of the variable for the number of empty subarrays is less than 7.  When it reaches seven that means that all cards have been placed on the foundation pile and the game is complete. 


// lookup origin pile tracker
let originalPile = lastBreadcrumb.primary_card.origin
if(originalPile.includes('pile')){ // drop pile origin
  pileNavigation.forEach(pile =>{
    if(pile == originalPile){
      let indexOfPile = pileNavigation.indexOf(originalPile)
      // console.log('drop pile')
      // console.log(dropPileTracker[indexOfPile])
    }
  })
}else if(originalPile.includes('foundation')){ //foundation origin
foundationNavigation.forEach(foundation =>{
  if(foundation == originalPile){
    let indexOfPile = foundationNavigation.indexOf(originalPile)
    // console.log('foundation pile')
    // console.log(foundationTracker[indexOfPile])
  }
})
}else{ // waste card origin
  // console.log('tracking waste')
  // console.log(wasteCardTracker)
  // console.log('tracking pick pile')
  // console.log(pickCardTracker)

}
// now we need to look at the card that this current card left exposed back at the previous pile. 

// if the pile was the foundation then that's simple enough, because that would just be the equivalent of a normal drop of a drop pile card to a foundation pile. the card that it left exposed was unaffected because foundation cards don't flip. 

// if it was not a drop pile then it must have been the waste pile, so it will go directly back there.  As we are going backward, the action is always taken on the card just moved; the breadcrumb chronology will prevent any errors. 

// if the pile was a drop pile that is a bit more difficult.  We have to work out whether the card left behind was face up or face down so that, if it was face down, then it needs to be turned over again. 
})


// DROP TO TARGET
const drop = (event) =>{
// console.log(event)


// ASSESS CONDITION OF WASTE PILE AND PICK PILE HERE ---------

let faceDownCards = 0;



// trying this function on waste card drops

// the below condition applies when all pick cards have been  distributed, with the exception of 'one' card, the only card in the waste pile and which is face up; if true, then all cards originating in the pick pile are now faceup and distributed.
console.log('wasteCardTracker')
console.log(wasteCardTracker)
console.log('pickCardTracker')
console.log(pickCardTracker)
if(wasteCardTracker.length < 2 && pickCardTracker.length === 0){
 
  console.log('pick pile and waste pile are empty')
console.log(`auto solve possible variable ${autoSolvePossible}`)
  // if autosovepossible variable is 1 the check for card orientation has been done and it was already found that all cards are face us, so the check (which is inside this condition) will not run since, once cards are oriented in a face up position, they cannot be facedown again, so once this situation of all cards being oriented face up is achieved, the sate remains for the rest of the game. 
  if(autoSolvePossible < 1){ 

console.log('auto solve is possible')

// loop through drop piles 
dropPileTracker.forEach(pile =>{  // on each drop pile
  // if the first card's tracking object has an empty string for the when_flipped property it must still be face down
console.log('checking drop pile face down cards')
  // forgot that the pile needs to actually have cards in order to check otherwise this will fail.  The tracking array will have contain no elements on which to check the 'when_flipped' property; only do this on populated piles. 
  if(pile.length > 0){
    console.log(pile)
    console.log(pile[0])

    if(pile[0].when_flipped ==''){
      // increment the faceDownCards variable
      faceDownCards +=1
        }else{
           // otherwise when_flipped has a value, so don't increment
          faceDownCards = faceDownCards
        console.log(faceDownCards)
        }
    
  }

})


if(faceDownCards === 0){ // all cards are facing up, and game completion must be possible. So give player the option to auto complete game. NOTE* if the player continues the game, there is no need to re-run this function because this current condition always applies; pick cards and all other cards are already facing upward. 

  console.log('all cards are facing up - show solve button')
// show auto solve button 
  solveBtn.style.cssText = 'display:block;'
  alert('would you like to auto solve this game? if so click the solve button')
  // increase cards finish variable, which will prevent the 'faceup' check running again. 
  autoSolvePossible += 1


}else{

  console.log('some cards are still face down')
  // do nothing - the game can only be solved once all cards are face up so although  autoSolvePossible variable will only increment at that point if it is ever reached. 

}
}

}else{console.log('piles not empty yet')}


// ASSESS CONDITION OF WASTE PILE AND PICK PILE HERE ---------








 
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

// variable used to store the number of facedown cards in the drop piles when all pick cards have been distributed







// pick each foundation pile one by one and send them to the compare function


// if needed, convert waste cards to normal cards, since waste cards are only dragged as single cards, and there is no wrapper to unwrap, we can avoid both multiReset and autoResetGo if on conversion and just prevent default.  No need to run faceUp either because they don't come from a drop pile. but presortWaste needs to run. 


// LAST GATE FOR CARD DROPS
const cardType = (object) =>{

  if(breadcrumbArray.length > 0){
    // show button if breadcrumbs exist
    undoBtn.style.display = "block"
  
  }

// console.log('card HTML element')
// console.log(object)

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
// console.log('destination')
// console.log(destination)

// functions for moving cards to appropriate tracking array --- 


// card originating in WASTE pile
const wasteCardDrop = (card, destination, cardObject) =>{
  // console.log('waste card drop function in operation ...')
  // console.log('card primary details')
  // console.log(
  //   `
  //  card: ${card}
  // origin: ${cardObject.primary_card.origin}
  // destination: ${destination}
  //   `
  // )

  // console.log('card main details')
  // console.log(cardObject)
  // get destination index and push OBJECT to associated array (note, waste pile cards positions are automatically updated elsewhere, so no need to find and remove them from waste array since that is alread done)
let destinationIndex; 
// if destination is a drop pile
if(destination.includes('pile')){
pileNavigation.forEach(element =>{
   // check navigation array for destination name
  if(element == destination){ 
    // get index of the element wwhose value is the destination name
    destinationIndex = pileNavigation.indexOf(element)

// use the index to get the array which corresponds to the pile name and push the object to the end of the array, which represents the card being at the end of the pile
    dropPileTracker[destinationIndex].push(cardObject)

    // check the destination pile to ensure it worked
console.log('destination pile (from WASTE pile')
console.log(dropPileTracker[destinationIndex])
  }
})


}else{ // if destination is a foundation pile
  foundationNavigation.forEach(element =>{
// check navigation array for destination name
    if(element == destination){
      // get index of matching destination name
      destinationIndex = foundationNavigation.indexOf(element)
// using the index value find the corresponding tracking array in the main foundation tracker, and push the object to that array so it will be the last element of the array, which represents its true position in the pile, the last card. 
foundationTracker[destinationIndex].push(cardObject)
    }
  })
}

// console.log('all code executed logging tracking arrays...')
// console.log(allTrackers)








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
//   console.log(breadcrumbArray[breadcrumbArray.length - 1])
//   console.log('single card drop function... in operation')
// // destination can be another drop pile or a foundation pile.
// console.log('object (post drop) of selected card with DESTINATION added')

let cardOrigin = cardObject.primary_card.origin
// console.log(cardObject)
// console.log('card tracking details')
// console.log(
//   `
// card: ${card}
// origin: ${cardOrigin}
// destination: ${destination}
//   `
// )


let destinationIndex;
 // get destination index and push OBJECT to associated array
 // if destination is a foundation pile
if(destination.includes('foundation')){
    // push object to foundation tracker
  foundationNavigation.forEach(element =>{
    // check navigation array for destination name
        if(element == destination){
          // get index of matching foundation name
          destinationIndex = foundationNavigation.indexOf(element)
    //push object to the foundation  tracking array having the same index
    foundationTracker[destinationIndex].push(cardObject)
    console.log(allTrackers)
        }
      })
}else{
  
  
  // foundation pile is not a destination
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

// console.log('all code executed - log tracking array')
// console.log(allTrackers)

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
let moveMade = breadcrumbArray.length
// array is origin array
// total is number of cards selected, how many to delete in splice
// selected is card index in original array
let destinationArray;
let destinationIndex; 
let trueDestination = destination
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
array[selected].primary_card.destination = destination
array[selected].when_moved = moveMade


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
      destination:destination,
      group_elements: total
    }, 
    
    total_selected: total, 
    when_flipped:array[i].when_flipped, 
    when_moved: moveMade,
    principal_origin: array[i].principal_origin
    }

    breadcrumbArray.push(newDestinationObj)
    destinationArray.push(newDestinationObj)


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
        console.log(cardIndex)
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

// console.log('tracking object')
// console.log(cardObject)
  //prior to the calling of this function, the temporary object for the drop card has been pushed to breadcrumb array so the temporary array entry can be deleted because it is no longer needed - a copy of it was sent to this function so now the copy is used. 

  tempDragCardArr = [] 
// console.log('card tracker function in operation...')
// console.log('card object, argument to this function')
// console.log(cardObject)


let card;
let origin;
let dropDestination;
let cardsMoved;


  if(cardObject){
    // console.log('card is being tracked')

    objectOnly = cardObject.primary_card
    card = cardObject.primary_card.card
    origin = cardObject.primary_card.origin;
    dropDestination = cardObject.primary_card.destination;
    cardsMoved = cardObject.total_selected;

//   console.log('show object deails prior to sending to card appropriate card drop manager - which transfers the objects between origin and destination tracking arrays')

// console.log(`
// card: ${card}
// origin: ${origin}
// destination: ${dropDestination}
// cards moved: ${cardsMoved}
// `)
  

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
    // do nothing
    console.log('card is not being tracked')
  }



}



// card ORIGIN is waste pile
if(wastArr[0] === Number(object.id.replace('.png',''))){
  // console.log(' card originated in waste pile')
  
  // console.log('card moved from waste pile')
 
  let wasteObj = {
    primary_card: {
          card:  wasteCardTracker[0].primary_card.card,
          origin:'waste-pile',
          destination:event.target.id, 
          group_elements: ''
             }, 
        when_flipped:breadcrumbArray.length + 1,
        when_moved:breadcrumbArray.length + 1,
        total_selected: 1,
        principal_origin: wasteCardTracker[0].principal_origin
      }

breadcrumbArray.push(wasteObj)
// NOW removed the card from the pack-waste workflow
wasteCardTracker.shift()



  // update origin and destination details of object because, in the breadcrumb array, the object will still have origin as pick pile and destination as waste pile. 
let breadcrumbWasteCard = breadcrumbArray[breadcrumbArray.length - 1]
      // send card object to tracker
  trackCard(breadcrumbWasteCard)
  }else{

    if(tempDragCardArr.length < 1){ // ORIGIN is foundation pile

      // if an element doesn't exist in the  temporary object arry then this must have originated in the foundation because foundation clicks don't send objects to the temporary array

      // to get the origin pile it's possible to loop through the tracking array of all foundation piles, check only the end element of each subarray, and whichever one has the card value of the parsed object id, is the object which belongs to the card.  then in the below new object we could copy accross the details that should remain and update the new object, push it to the array for the destination and also push it to the breadcrumb. 
      let rawValue = parseInt(object.id)
      let destinationPile = event.target.id
      let foundationIndex;
      let foundationName; 
      let foundationObjectDropped;

foundationTracker.forEach(subarray =>{
  if(subarray.length > 0){
    let finalCard = subarray[subarray.length - 1]
    if(finalCard.primary_card.card === rawValue){
      foundationIndex = foundationTracker.indexOf(subarray)
     foundationName = foundationNavigation[foundationIndex]
    //  console.log('finalCard')
    //  console.log(finalCard)
    //  console.log('name of foundation pile')
    //  console.log(foundationName)

// create a new object
      foundationObjectDropped = {
      primary_card: {
        card:  rawValue,
        origin:foundationName,
        destination:destinationPile, 
        group_elements: ''
           }, 
      when_flipped:finalCard.when_flipped,
      when_moved:breadcrumbArray.length + 1,
      total_selected: 1,
      principal_origin: finalCard.principal_origin

    }
    breadcrumbArray.push(foundationObjectDropped)
    // console.log(breadcrumbArray)
    // console.log('foundation card just moved')
    // console.log(foundationObjectDropped)
    trackCard(foundationObjectDropped)
    }
  }

})



    }else{
// ORIGIN is drop pile
// console.log('check there is a temporary object for the dropped card')

if(tempDragCardArr[0]){
  // console.log('checking temporary object array')
  // console.log(tempDragCardArr[0]) 
  let droppedObject = tempDragCardArr[0]

  // create a new drop object and add/update details

  // NOTE: if the card has moved before, then the ORIGIN needs to be taken from the card' destination; two ways of doing this are to check that the 'when moved' property has a value, or to check whether the destination property is a non empty string. 

  // an example, if I moved card '2' from pile seven to pile one, then it's properties will be ORIGIN:pile-7, DESTINATION:pile1.  If I go to move it back to pile 7, when I update the new object with the previous detials, I'll use target.id for the destination, which is correct, but the origin is pile-7, so the new object will have the properties;  ORIGIN:pile-7, DESTINATION:pile-7. This is going to affect the functions that search for and remove items, meaning the item origin, being wrong, might cause no object to be returned in the search for the object in the origin tracking array.  So nothing may be moved, leading to the object being in two places.  So that the tracking is no longer accurate.  

  // create a variable for the origin and assign the correct value depending on whether the card was previously moved. 

  let trueOrigin; 
  if(droppedObject.when_moved > 0){
// console.log('this card has been moved before; use destination property for new origin property')
trueOrigin = droppedObject.primary_card.destination
  }else{
    // console.log('first time movement of this card, so use origin for new origin')
    trueOrigin = droppedObject.primary_card.origin
  }
   let pileObjectDropped = {
    primary_card: {
      card:  droppedObject.primary_card.card,
      origin:trueOrigin,
      destination:event.target.id, 
      group_elements: ''
         }, 
    when_flipped:droppedObject.when_flipped,
    when_moved:breadcrumbArray.length,
    total_selected: droppedObject.total_selected,
    principal_origin:droppedObject.principal_origin
   }
   breadcrumbArray.pop() // get rid of old object
   breadcrumbArray.push(pileObjectDropped) // push new object
   trackCard(pileObjectDropped)
}else{
  // console.log('no object exists in temporaray store')
}
    }



  }

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
//if the adjacent cards are consecutive their sum difference is 1
case 1:
  // then if the adjacent colours are different
if(color1 !== color2){ 

// the card drop is legal
// if temporary array contains the card's tracking object
  if(tempDragCardArr.length > 0){
// push tracking object to breadcrumb
// console.log('check temporary array')
// console.log(tempDragCardArr[0])
    breadcrumbArray.push(tempDragCardArr[0])
  }


  cardType(newObj) // send card to be appended. 
}else{
  // if the cards are consecutive but are not different colours
  console.log('invalid card: consecutive cards must be of different colors')};
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop() // don't push to breadcrumb and don't append
break;
// if the card values are not consecutive
default: // illegal move 
console.log('invalid card: difference between consecutive cards must be 1')
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
}
}

// drop pile cards check adjascent colours
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



// DROP CARD SCENARIOS BELOW --------------------------------- these functions are used to decide if the card will be appended to the drop target, the intended pile destination. This is done by comparing the details of the last card in event target, the destination pile, with the details of the card that is attempting to make the drop,  If the card attempting to drop is rejected because of an illegal move, then the cards tracking object is deleted from the temporary drag card array. But, note, for cards originating in the waste pile and foundation pile, there exist no temporary object yet because they were only created in the event listener for drop pile clicked cards. Those objects have to be created separately. 

// king drop to DROP PILE
const emptyPilePlaceKing = () =>{

  // push card object to breadcrumb as this card's drop is successful
  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    // console.log('empty drop pile placing KING...')
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



// SWITCH PILE TYPE, then check pile state and drop card to see whether the card meets the initial conditions for dropping on the specific pile in its given state; if the card meets initial conditions, it is sent on to one of the above functions, either for the final decision to drop or for further assessment. 
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
// foundation pile contains cards so 'attempt to place non ace'
foundationPlaceNonAce()
}
  break;

// any other card must have a destination of drop pile (waste pile drops are handled elsewhere)
  default:   
if(objTrueValue === 13){ // if card is KING
// check number of cards in pile
  switch(event.target.childNodes.length){// check number of cards in pile
    case 0: emptyPilePlaceKing()// if pile is empty, drop king
    break;
    // otherwise pile is not empty; KING drop is illegal
   default: console.log('cannot drop king on another card')
   // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
  }
  }else{ // otherwise card is NON-KING
    switch(event.target.childNodes.length){
      // if pile is empty - illegal move cannot drop a non-king
      case 0: console.log('cannot drop non-king card on empty space')
      // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
      break;
 // otherwise pile is not empty so drop non king
      default: placeNonKing();
  }}
  
}
// dealing with two values: king or non-king
}





//AUTO SOLVE FUNCTIONS BELOW-------------------------------------


// variable for end card of foundation pile
let lastFoundationCard;

let totalCardsAdded = 0;

// temporary function for testing solve scenario; auto solve function seems to be working now - will need to test on several solve scenarios. 
function useArrays(newdrop, newFoundation){

  // dropPileTracker.push(...newdrop)
  // foundationTracker.push(...newFoundation)
}


// AUTO-COMPLETE CHECK TO SEE IF ALL CARDS ARE FACE UP
function comparePileCard(fPile, index){


// variable for the number of empty drop pile trackers
let totalEmptyDropPiles = 0;

  // get endcard in foundation pile
  lastFoundationCard = fPile[fPile.length - 1].primary_card.card
  // variable for end card in drop pile
  let lastDropPileCard;

  // loop through the drop pile tracker
  dropPileTracker.forEach((dropPile, dropIndex) =>{
// only check non-empty drop piles;  if pile is empty, increment totalEmptyDropPiles variable in else part of this condition
    if(dropPile.length > 0){ 
      console.log(dropPile, dropIndex)
  // get the raw value of the last card of the current drop pile 
      lastDropPileCard = dropPile[dropPile.length -1].primary_card.card

      // if the absolute value fo the sum difference of both cards id 4
      if(lastDropPileCard - lastFoundationCard === 4){

        // push the drop pile card object to the foundation tracker
        foundationTracker[index].push(dropPile[dropPile.length -1])
        // if total cards added is incremented (as they are when a compatible card is found), the greater than zero value indicates that the card was removed from the tracking subarray for drop piles and a new end card exists; the new card can be used to check the other foundation arrays to see if it is compatible with any of the end cards. 
        totalCardsAdded ++

// use reassign the last foundation card with the raw value of the new card added from drop pile end 
        lastFoundationCard += 4;
        // pop the moved card's object from the current drop pile tracking array
        dropPileTracker[dropIndex].pop()
      }else{
// drop pile card is incompatible with end card of foundation pile so do nothing. 
      }
    }else{
// drop pile tracker subarray is empty so increment variable holding the number of empty drop pile tracking arrays. 
totalEmptyDropPiles ++;
    }

// if the loop has reached the last subarray
if(dropIndex === 6){
// if all drop piles are empty
if(totalEmptyDropPiles > 6 ){

  // all drop piles have been re-located to foundation piles and the solve is complete
  console.log('SOLVE COMPLETE')

          //   console.log('all foundations array')
          //   // each pile should contain 13 cards
          // console.log(foundationTracker)
        
          // console.log('all drop piles array')
          // // all drop piles should be empty
          // console.log(dropPileTracker)
}else{ 
  // there are still populated drop pile tracking arrays so solve is not complete. 
// if one or more cards were added to foundation piles, this means that the cards added to the foundation pile, when moved, exposed new end cards on the drop piles; those cards now need to be checked against the current foundation pile 
  if(totalCardsAdded > 0){
  
    // cards have been added so reset the total added cards and loop through the drop pile arrays again to see if any cards (some of which will be new) are compatible with the new end cards in the current foundation pile. 
    totalCardsAdded = 0;
    pickFoundation(index)
  }else{

    // no cards were added to the current pile because none of the end cards in the drop piles were compatible.  increment the index and run pick foundation to select the next foundation tracking array, 

    // NOTE: the use of the '%' operation is so that when the last foundation index is reached, the incremented new index will return to the first index number, and the first foundation tracking array will be examined again.  This will continue to happen until all drop pile triacking arrays are empty. 
      let newIndex = (index + 1)%4
      pickFoundation(newIndex)
      }


}


}
 
  })

// eventually there will be the scenario where the index of the looped drop pile will be 6, AND, the number of empty drop pile tracking arrays will be seven, which indicates that the there are no more cards in drop pile tracking subarrays and hence all cards have been transferred to foundation piles. This will execute the 'solve complete' part of this function, so that there will be no further calls of the pickFoundation function below and the solve is complete. 

}

function pickFoundation(foundationIndex){
  let newIndex = foundationIndex  
  // select foundation tracking subarray 
let pickFoundation = foundationTracker[newIndex]  
// send array and its index to the compare function

    comparePileCard(pickFoundation, newIndex)  
}


// Send initial index value to examine first foundation pile
solveBtn.addEventListener('click', () =>{
  // console.log('running solve')
  pickFoundation(0)
})


//AUTO SOLVE FUNCTIONS ABOVE-------------------------------------








































































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
// console.log('multiple cards')
// console.log('children')
// console.log(children)
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


// console.log(start, pile.childNodes.length, object)

let end = pile.childNodes.length;
let testRange = new Range() // create new range
testRange.setStart(tempPile, start); // set 'element, start child'
testRange.setEnd(tempPile, end);// set 'element, end child'
  document.getSelection().removeAllRanges(); // clear existing selection if any
 document.getSelection().addRange(testRange); // select new range
 // $(tempPile).multidraggable() // make pile multidraggable

//  console.log('origin pile')
//  console.log(testRange.endContainer.id)
//  console.log('testRange')
//  console.log(testRange.commonAncestorContainer.childNodes)

  let firstCard = object[0]
  let wrapperId = parseInt(object[0].id)

  // console.log('first card value - which is card id')
  // console.log(wrapperId)


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

  console.log('NEW CARD SELECTED ----------------------------')
  selectArray = []
  dragIdArray = []





  // define pile children, children length, and clicked target
  let children = cardPile.childNodes // cards belonging to pile
  let maxVal = children.length // number of cards
  let target = event.target // clicked card
  let parent = target.parentNode // parent pile
  let attr = target.getAttribute('draggable') // target drag status


let cardValue =  parseInt(target.id)
// console.log('origin pile element below:')
// console.log(parent)
// console.log('origin pile name below:')
// console.log(parent.id)
if(event.target.length > 0){
  // console.log('previous card')
  // console.log(event.target.previousSibling)
}else{
  // console.log('no cards left in pile')
}


// getting the object of the clicked card from the tracking array. 
let pileIndex;
let cardObj
pileNavigation.forEach(pile =>{
  if(pile == parent.id){
pileIndex = pileNavigation.indexOf(pile)
// console.log('card objects in tracking subarray of origin pile (minus the moved card - unopened console element will show original number of cards in pile; but opened, the correct total will show')
// console.log(dropPileTracker[pileIndex])
dropPileTracker[pileIndex].forEach(card =>{
if(card.primary_card.card === cardValue){
cardObj = card
// console.log('object of selected card, with destination properties added')
// console.log(cardObj)
}
})
  }
})


// THIS IS FOR CREATING THE DRAGGABLE GROUP
if(attr == "true"){ // if draggable: true; get the HTML element
selectArray.push(parent) // THIS IS THE SELECTED PILE
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

// console.log('breadcrumbs - last element is last card moved')
// console.log(tempDragCardArr[0])
// create an object from array entries with the indexes as keys

selectRange(selectArray[0], selectArray[1], dragIdArray)
}else{
console.log('cannot drag a face down card')

}





})
})



