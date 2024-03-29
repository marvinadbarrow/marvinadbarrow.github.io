console.log(window.localStorage)

// sound played each time square is moved
let moveAudio = new Audio('pop.mp3')

// end of game sound
let gameEndAudio = new Audio('cymbal.mp3')
//window.localStorage.setItem('high_score', '')
// empty square elements
let oneDiv = document.getElementById('one')
let twoDiv = document.getElementById('two')
let threeDiv = document.getElementById('three')
let fourDiv = document.getElementById('four')
let fiveDiv = document.getElementById('five')
let sixDiv = document.getElementById('six')
let sevenDiv = document.getElementById('seven')
let eightDiv = document.getElementById('eight')
let nineDiv = document.getElementById('nine')
let tenDiv = document.getElementById('ten')
let elevenDiv = document.getElementById('eleven')
let twelveDiv = document.getElementById('twelve')
let thirteenDiv = document.getElementById('thirteen')
let fourteenDiv = document.getElementById('fourteen')
let fifteenDiv = document.getElementById('fifteen')
let sixteenDiv = document.getElementById('sixteen')
let oneBtn = document.getElementById('oneBtn')// 
let messageEl = document.getElementById('message-el')
// getting puzzle body element
let puzzleEl = document.getElementById('puzzle-body')
// progress bar element
let progressEl = document.getElementById('progress-element')
// paragraph for displaying number of moves made
let counterEl = document.getElementById('counter')

// element containing highscore paragraphs - normally hidden
let highScoreEl = document.getElementById('highscore-container')
// highscore message paragraph
let highscoreMsg = document.getElementById('high-score')
// container for score reset
let scoreBtnContainer = document.getElementById('scoreclear-container')
// score reset button
let scoreClearBtn = document.getElementById('score-clear-btn')
// button for closing GAME OVER modal
let closeBtn = document.getElementById('close-btn')

// modal element
var modalEl = document.getElementById('modal-container')

// event listener for closing modal
closeBtn.addEventListener('click', function(){
location.reload()


})


let emptyDiv = []
var orderArray = []
var permutedArray = []
var permutedArraySpread = []
var mixArray = []
var mixStatusArr = []
var tallyArray = [0] // contains the number of moves made in game
var inverseArray =[]// to hold all inverse pairs
var inversePair = [] // to temporarily collect inverse pair
// button elements 
let btn1 = document.getElementById('one-1')
let btn2 = document.getElementById('two-2')
let btn3 = document.getElementById('three-3')
let btn4 = document.getElementById('four-4')
let btn5 = document.getElementById('five-5')
let btn6 = document.getElementById('six-6')
let btn7 = document.getElementById('seven-7')
let btn8 = document.getElementById('eight-8')
let btn9 = document.getElementById('nine-9')
let btn10 = document.getElementById('ten-10')
let btn11 = document.getElementById('eleven-11')
let btn12 = document.getElementById('twelve-12')
let btn13 = document.getElementById('thirteen-13')
let btn14 = document.getElementById('fourteen-14')
let btn15 = document.getElementById('fifteen-15')




// css selector for indicators
let indicatorBars = document.querySelectorAll('.indicator-containers')
// default background colour styling for indicators. A function will be created to count the number of blue indicators (which show that pieces are inserted correctly), and put out different messages depending on how many of the blue indicators are showing; i.e. how many pieces are in the correct position. 

console.log(progressEl)



 const colorIndicators = () =>{
indicatorBars.forEach((element)  =>{
element.style.cssText = "background-color:white;"
})
 }

 colorIndicators()

// array holding all button elements
var buttonArray = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10, btn11, btn12, btn13, btn14, btn15]



// append free button to slots in main square
const loadButtons = (array) =>{
    console.log(array)
    for(i=0; i < array.length; i++){
               puzzleEl.children[array[i]].appendChild(buttonArray[i])
            
}
rearrangeNumbers()
}




// for re-running scramble if the order 
const evenPermutations = () =>{
    inversePair = []
    permutedArray = []
    permutedArraySpread = []
    inverseArray = []
    mixArray = []
    orderArray = []
    mixStatusArr = []
    mixButtons()
}

// if the number of inverses is odd, then the puzzle is solvable
const checkParity = (testVal, array, i) =>{
  
    for(j=i+1; j < array.length; j++){
    if(array[j] < testVal){
            inversePair = [testVal, array[j]]
        inverseArray.push(inversePair)
        inversePair = []
        }
    
    }
    
    if(i > 13){
        console.log(inverseArray.length)
        if(inverseArray.length % 2 === 0){
         console.log('even permutation')
         console.log(inverseArray);
         evenPermutations()
        }else{loadButtons(array); console.log('odd permutation')}
    }}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // the inverses will be used to check the parity of the permutation later
    const preCheckParity = (array) =>{
    console.log(array)
    for(i=0; i < array.length; i++){
    checkParity(array[i], array, i)
    
    }}
    


// I think that from here, instead of loading buttons, the permutation should be checked for evenness or oddness and then 'from there' it can be decided when to load buttons. 
const mixButtons = () =>{
    let numbers = Math.ceil(Math.random()*15)
    if(mixArray.length > 14){preCheckParity(mixArray)
        console.log(mixArray)}else{
if(!mixArray.includes(numbers)){mixArray.push(numbers);mixButtons()}else{mixButtons()}

}

    

}



// winner message
const winnerMessage = () =>{
    gameEndAudio.play()
    modalEl.style.display = 'block'
    highScoreEl.style.display = 'block';
    let prevHighScore;
       messageEl.textContent = `Well done! you did it in ${tallyArray[0]} moves!`;
       if(!window.localStorage.high_score){
        window.localStorage.setItem('high_score', `${tallyArray[0]}`)
       highscoreMsg.textContent = `No other move scores recorded yet; you have the fewest moves`
       }else{ // if previous scores exist
        scoreBtnContainer.style.display = 'block';
prevHighScore = window.localStorage.getItem("high_score")
if(tallyArray[0] > prevHighScore){
    highscoreMsg.textContent = `Fewest moves: ${prevHighScore}, better luck next try`
}else if(tallyArray[0] === prevHighScore) {
    highscoreMsg.textContent = `You matched the previous fewest moves of ${prevHighScore}`
}else{
    highscoreMsg.textContent = `Excellent! you beat the previous fewest moves of ${prevHighScore}: new top score: ${tallyArray[0]}`
    // then change the local storage value to the new high score
    window.localStorage.setItem('high_score',`${tallyArray[0]}` )

} }
  }


  
// progress indicator pars turn blue when associated piece is in the correct place. 
const indicator = (button) => {

let index = button.innerHTML -1;

// we're seeing if the clicked button's innerHTML number matches the button number inside the puzzle div with the same index number.  If there is a match it means that the button is in the correct div. 
let indexChild = puzzleEl.children[index].firstChild

if(indexChild == button){
    //console.log('button is in correct place')
    // change associated bar to blue
    progressEl.children[index].style.cssText = 'background-color:blue;'
}else{
    // change color of associated bar
     progressEl.children[index].style.backgroundColor = 'white'
        }
    // GREAT - APPLICATION IS FINISHED. 

    // trying to get style attribute of the divs so we can see which color it is. If this can be done then the number of colours can be use to alter the message text as the number of correctly placed pieces 

let colorAttrBlue = 0;
let indicatorColor;
for(i=0; i < progressEl.childElementCount; i++){
    indicatorColor = progressEl.children[i].getAttribute('style')
if(indicatorColor == 'background-color: blue;'){

colorAttrBlue +=1;
}}

// now, depending on number of blue indications shown, render an appropriate message on screen. 
switch(colorAttrBlue){
case 0:
case 1:
case 2:
case 3:
messageEl.textContent = 'get the first few squares'
break;
case 4:
case 5:
case 6:
case 7:
messageEl.textContent = 'great! You made progress'
break;
case 8:
case 9:
case 10:
messageEl.textContent = 'Good; more than halfway there'
break;
case 11:
case 12:
messageEl.textContent = 'not far now'
break;
case 13:
case 14: messageEl.textContent = `the final few!`
break;
case 15: winnerMessage();
break;

}
}










//  when all chip numbers are consecutive - i.e. 1, 2, 3,......., 15, that marks the end of the game since the pices are ordered
const gameState = (array) =>{
   
   // check for when the array ( created in the below function gameStateCheck) item values are all consecutive i.e. 1, 2, 3, 4.... Which means that the squares are in the solved permutation. 
    const gameStateCheck = (currentValue, previousValue) => currentValue > previousValue;

    let isGameOver = array.every(gameStateCheck)
    switch(isGameOver){
case true:
messageEl.textContent = 'puzzle complete'
break;
default:
    
    }

   
    }// end of for loop





//CREATE an ARRAY that shows the permutation of the squares, which number order they are in.  
const getPermutation = (array) =>{
   // console.log(array)
  permutedArray = [] // clear permuted array to display new permutation
array.forEach(element => {

// extract integers from id's and push to permuted arrays in position order
    if(element){
       let numberExtract = element.id
       let reg = /\d+/g;
       let result = numberExtract.match(reg)
       permutedArray.push(parseInt(result))
    }
});
// spread permuted valuies into one array
permutedArraySpread = [].concat(...permutedArray)
gameState(permutedArraySpread)
console.log(permutedArraySpread)

    }


// 15 of the divs will have a child (numbered piece).  Each time a piece is moved the way the pieces are arranged is changed; either to a different permutation or, at minimum, the divs containing children will change. Each position of orderArray represents the numerical div positions in the main square and the value at each position is the element numbered piece appended to that div (otherwise 'null' if no piece is in the div)
const rearrangeNumbers = () =>{
orderArray[0] =   oneDiv.firstChild 
orderArray[1] =   twoDiv.firstChild 
 orderArray[2] =  threeDiv.firstChild 
orderArray[3] =   fourDiv.firstChild 
orderArray[4] =   fiveDiv.firstChild 
orderArray[5] =   sixDiv.firstChild 
 orderArray[6] =  sevenDiv.firstChild 
orderArray[7] =   eightDiv.firstChild 
orderArray[8] =   nineDiv.firstChild 
 orderArray[9] =  tenDiv.firstChild 
orderArray[10] =   elevenDiv.firstChild 
orderArray[11] =   twelveDiv.firstChild 
orderArray[12] =   thirteenDiv.firstChild 
orderArray[13] =   fourteenDiv.firstChild 
orderArray[14] =   fifteenDiv.firstChild 
orderArray[15] =   sixteenDiv.firstChild 
getPermutation(orderArray)
//console.log(orderArray)
}




// OBJECT containing all of the neighbours of each div.  The neighbours will be evalueated and if empty, the clicked button will move either x, -x, y or -y, to move into the empty div element. 
var neighboursObj = {
    one:[2,5],
    two:[1,3,6],
    three:[2,4,7],
    four:[3,8],
    five:[1,9,6],
    six:[2,5,7,10],
    seven:[3,6,8,11],
    eight:[4,7,12],
    nine:[5,13,10],
    ten:[6,9,11,14],
    eleven:[7,10,12,15],
    twelve:[8,11,16],
    thirteen:[9,14],
    fourteen:[13,10,15],
    fifteen:[14,11,16],
    sixteen:[12,15],
    }
    


// MOVE CLICKED SQUARE TO ADJACENT EMPTY SPACE IF ONE EXISTS
const moveSquare = (square) =>{
    inverseArray = []
 let divId = square.parentNode.id // id of div is also a key in the object
 let objIndex = neighboursObj[`${divId}`] // get key value (which is an array), where key belongs to object on lines 86
let neighbours = square.parentNode.parentNode.children // all div children of app body
let classType = square.getAttribute('class')
if(classType == 'square-containers'){messageEl.textContent = 'choose a square to move'}else{

    for(i=0; i < objIndex.length; i++){

        // objectIndex[i] are items of the array which are the object key values
        let childIndex =  objIndex[i] // assign a variable to the indexed item
    let neighbourDivs = neighbours[childIndex - 1]
        // use the variable to display neighbours of the clicked button
       if(neighbourDivs.children.length < 1){ // if any of the neigbhour divs are empty, append the clicked button to the div.  
            neighbourDivs.appendChild(square) // 'BOOM' it works
            tallyArray[0] += 1;
            moveAudio.play()
    }
      }
      
      console.log(tallyArray[0])
counterEl.textContent = `Moves: ${tallyArray[0]}`
    rearrangeNumbers()
}

}




// add event listener to puzzle body
puzzleEl.addEventListener('click', function(e){
moveSquare(e.target)
// send 
setTimeout(() => {
    indicator(e.target)
}, 200);
})









// clear stored score
scoreClearBtn.addEventListener('click', function(){
    window.localStorage.setItem('high_score', '')
    messageEl.textContent = 'Fewest moves scores removed'
    highScoreEl.textContent = ''
    })




const beginScramble = () =>{
    if(mixStatusArr.length < 1){
        mixStatusArr.push('MIX BUTTONS')
        inverseArray = []
       mixButtons()

      
    }else{messageEl.textContent = "refresh page for new game"}

}


beginScramble()