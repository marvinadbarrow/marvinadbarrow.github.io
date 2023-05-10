// local storage
if(window.localStorage){
    console.log(window.localStorage)
}else{console.log('no scores stored yet')}


// audio clips for game events
let startAudio = new Audio('Game Start.mp3')
let GameOverAudio = new Audio('Game Over.mp3')
let LineCompleteAudio = new Audio('Tetris Normal Lines.mp3')
let TetrisBoomAudio = new Audio('Tetris Boom Tetris.mp3')
let killAudio = new Audio('Explosion.mp3')
let rotationBlip = new Audio('rotate blip.mp3')

// BUTTON ELEMENTS FOR NAVIGATION
//GAME OPERATION BUTTONS
let startEl = document.getElementById('start')
let pauseEl = document.getElementById('pause')
let refreshEl = document.getElementById('refresh')
let killEl = document.getElementById('kill')
let navButtons = document.getElementById('nav-button-container')
// TETRIMINO MANIPULATION BUTTONS
let moveLeftEl = document.getElementById('move-right')
let moveRightEl = document.getElementById('move-left')
let rotateEl = document.getElementById('rotate')

// element containing game state buttons
let gameStateBtns = document.getElementById('game-state-buttons-container')

// images nested inside game state buttons
let skullImg = document.getElementById('skull-crossbones-img')
let pauseImg = document.getElementById('pause-img')
let startImg = document.getElementById('start-img')
let recycleImg = document.getElementById('recycle-img')

// images nested inside tetrimino buttons
let rotateImg = document.getElementById('rotate-tetrimino-img')
let leftImg = document.getElementById('left-arrow-img')
let rightImg = document.getElementById('right-arrow-img')

// array for gamestate buttons
let gamestateArr = [startEl, pauseEl, refreshEl, killEl]


// ALREADY EXISTING ELEMENTS
let shapeCreatorEl = document.getElementById('create-shapes')
let shapeBody = document.getElementById('game-grid')
let nextPieceEl = document.getElementById('next-piece-div')
let lineRecordEl = document.getElementById('line-para')
let levelEl = document.getElementById('level-para')
let levelCount; // variable for level counter
let levelCountArr = [0]// using this value to pick interval from tetriminoSpeedArr
let scoreEl = document.getElementById('score-para')
let pointsCountArr = [0]
let lineRecordArr = [0]
let count; // variable for count taken from lineRecordArr
let pauseBtn = document.getElementById('pause-game')
let arr = [0, 0, 0, 0] // to hold changing a, b, c, d values
let shapeClock; // variable for TIMER
let rightBoundaryArr;// for right boundary
let leftBoundaryArr;// for left boundary
let picker; // used to pick which rotation to render 90, 180, 270, or original
let rowCompleteArray = [0,0] // use positions index 0 and 1 to record incomplete and complete row amounts


// MODAL ELEMENTS
let modalEl = document.getElementById('simple-modal')
let modalCloseBtn = document.getElementById('close-btn')
let endScoreEl = document.getElementById('end-score') // end game score display
let endLevelEl = document.getElementById('end-level') // end game level display
let endLinesEl = document.getElementById('end-lines') // end game lines display
let newGameEl = document.getElementById('new-game')
let highscoreMsg = document.getElementById('high-scores')

// PAUSE MODAL elements
let pauseModalEl = document.getElementById('modal-pause')

// code for disabling zoom on double-tap in the game. Zoom on double-tap causes the screen to zoom in if you are tapping several times to rotate a tetrimino or to move a tetrimino quickly to a far away position, the screen zooms in and which usually means that most of the screen cannot be seen, usually resulting in a collision while player is busy trying to un-zoom to see the screen properly again. 

var doubleTouchStartTimestamp = 0;
document.addEventListener("touchstart", function(event){
    var now = +(new Date());
    if (doubleTouchStartTimestamp + 500 > now){
        event.preventDefault();
    };
    doubleTouchStartTimestamp = now;
});


newGameEl.addEventListener('click', function(){
location.reload()

})
// close modal
modalCloseBtn.addEventListener('click', function(){
    modalEl.style.zIndex = '-1'
    modalEl.style.display = 'none'
})




// set div numbers for boundaries left and right 
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// Generate numbers range 0..4
leftBoundaryArr = range(0, 200, 10); // creates an array with tens from 0 - 200

rightBoundaryArr = range(9, 200, 10);  // creates an array from  9  to 200, every consecutive entry's value is previous value + 10; so 9, 19, 29,,, 189
console.log(`left boundary: ${leftBoundaryArr}`)
console.log(`right boundary: ${rightBoundaryArr}`)
// numbers for rows
let row1 = [0,1,2,3,4,5,6,7,8,9]
let row2 = [10,11,12,13,14,15,16,17,18,19]
let row3 = [20,21,22,23,24,25,26,27,28,29]
let row4 = [30,31,32,33,34,35,36,37,38,39]
let row5 = [40,41,42,43,44,45,46,47,48,49]
let row6 = [50,51,52,53,54,55,56,57,58,59]
let row7 = [60,61,62,63,64,65,66,67,68,69]
let row8 = [70,71,72,73,74,75,76,77,78,79]
let row9 = [80,81,82,83,84,85,86,87,88,89]
let row10 = [90,91,92,93,94,95,96,97,98,99]
let row11 = [100,101,102,103,104,105,106,107,108,109]
let row12 = [110,111,112,113,114,115,116,117,118,119]
let row13 = [120,121,122,123,124,125,126,127,128,129]
let row14 = [130,131,132,133,134,135,136,137,138,139]
let row15 = [140,141,142,143,144,145,146,147,148,149]
let row16 = [150,151,152,153,154,155,156,157,158,159]
let row17 = [160,161,162,163,164,165,166,167,168,169]
let row18 = [170,171,172,173,174,175,176,177,178,179]
let row19 = [180,181,182,183,184,185,186,187,188,189]
let row20 = [190,191,192,193,194,195,196,197,198,199]
// put all rows into one array below
let allRowsArr = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12, row13, row14, row15, row16, row17, row18, row19, row20 ]

// colors for tetrimino


// below are the arrays with block positions for each rotation of a tetrimino - a separate array for each tetrimino
let jRotateArr = [[-10, 9, 10], [-11, -1, 1], [-10, -9, 10], [-1, 1, 11], 0]//rotate J
let lRotateArr = [[-10, 10, 11], [-1, 1, 9], [-11, -10, 10], [-9, -1, 1], 0]// rotate L
let sRotateArr = [[-10, -9, -1], [-11, -1, 10], [-10, -9, -1], [-11, -1, 10], 0] 
let zRotateArr = [[-11, -10, 1], [-9, 1, 10], [-11, -10, 1], [-9, 1, 10], 0] 
let tRotateArr = [[-10, -1, 1], [-10, 1, 10], [-1, 1, 10], [-10, -1, 10], 0]//rotate T
let oRotateArr = [[1, 10, 11], [1, 10, 11], [1, 10, 11], [1, 10, 11], 0] //rotate O
let iRotateArr = [[1, 2, 3], [10, 20, 30], [1, 2, 3], [10, 20, 30], 0]


let tetriminoSpeedArr = [500, 450, 400, 350, 300, 275, 250, 225, 200, 180, 160]
//array for next tetrimino display
let jNextArr = [-1, 1, 7]
let lNextArr = [-1, 1, 5]
let zNextArr = [-1, 6, 7]
let sNextArr = [1, 5, 6]
let tNextArr = [-1, 1, 6]
let oNextArr = [1, 6, 7]
let iNextArr = [-1, 1, 2]

let filledSquareArr = [] // filled squares numbers pushed to this array to prevent collisions
let colorArr = ['orange', 'pink', 'red', 'blue', '#39FF14', 'purple', 0]
let allShapesArr = []
let indexNumArray = []
let shapeContainerArr = []// array to hold created shapes - each shape is contained in a subarray which will be pushed here
let deliveredShapesArr = []
let shapeArr = []// each entry represents number of blocks on each row - first entry, row 1, sencond row 2 etc. Only four blacks available for entire shape
let rotationTrackerArr = [] // keeps track of current tetrimino rotation
let rowRecordArr = []// holds records of rows that the landed tetrimino spans
let rowDeleterArr = [] // collects rows that are full for deletion
let startCommandArr = [] //if array contains a value; 'start' cannot be operated - so start can only operate ONCE - until game is reset
let gameOverArray = []// will receive the string 'game over' once the game is over so the refresh page button can be executed if the modal is already closed and the 'new game' button is unavailable - we might even need a 'view stats again' button for the last game. 

let killArray = []
let mergedArray = [] // contains merged version of all completed rows
let pauseIntervalArr = []
let tetrisBlockArr = []
let rowSelectArr = [] // holds index number of completed rows; values are used to clear rows. 
let elementNum;
let rowNum;
let selectedShape;
let shapesPermutation;

// variables for rotated blocks
let rotateB;
let rotateC;
let rotateD;

let permutationsArray = []// holds all 60 permutations of 7 tetriminos

// contains points for 1, 2, 3 and 4 lines - just need to multiply these by 'level + 1' since all points are simply multiples of the first level points
let pointsArr = [40, 100, 300, 1200] 
const obstacleObj = {floor:0, tetrimino:0} // object for obstacle strikes of floor or tetrimino
let obstacleCountArr = [obstacleObj]; // array to hold obstacle strikes data

console.log(obstacleCountArr[0]['floor'])
console.log(obstacleCountArr[0]['tetrimino'])



// show modal with all stats including high scores and comparison
const showModal = () =>{
// OPEN modal with end of game stats
modalEl.style.cssText = 'z-index:1;';
modalEl.style.cssText = 'display:block;';

}


// store high scores in localStorage
const setHighScores = () =>{
    let score = pointsCountArr[0] // use current score if no high score recorded


    if(!window.localStorage.high_score_tetris){ // if no score stored in localstorage
        window.localStorage.setItem('high_score_tetris', `${score}`) //set as current
       highscoreMsg.textContent = `you have the current high score: ${score} `
       }else{ // if previous score exists assign variable to it
      prevHighScore = window.localStorage.getItem("high_score_tetris")
if(score < prevHighScore){ // if player score less than previous high score
highscoreMsg.textContent = `Your score is less than high score: ${prevHighScore}`
}else if(score === prevHighScore) { // if player score equals high score
    highscoreMsg.textContent = `You matched high score: ${prevHighScore}`
}else{ // if player beats high score
    highscoreMsg.textContent = `Congratulations! You beat the previous high score, ${prevHighScore}: new high score: ${score} `
    // then change the local storage value to the new high score
    window.localStorage.setItem('high_score_tetris',`${score}` )

} }

showModal()

}




// game statistics for modal display
const statsForModal = () =>{
 // play end of game sounds
GameOverAudio.play()
let score = pointsCountArr[0]
let level = Math.floor(lineRecordArr[0]/10)
let lines = lineRecordArr[0]


// render score
if(score >= 40){ // display score as normal 2+ digits
endScoreEl.textContent = `SCORE: ${score}`
}else{endScoreEl.textContent = `SCORE: ${00}`} // 40 is minimum any other score is '00'


// render level
if(level > 10){ // game ends because you've TRANSCENDED the game levels :)
    endLevelEl.textContent = `GOD LEVEL`
}else if(level < 10){ //levels 0-9, add preceding zero for double digits
    endLevelEl.textContent = `LEVEL: 0${level}`
    }else{ // game level must be 10 levels are double (only GOD gets here)
        endLevelEl.textContent = `LEVEL: ${level}`
    console.log('game almost complete COME ON!')
    }

// render lines
if(lines < 10){ endLinesEl.textContent = `LINES: 00${lines}`
}else if(lines < 100){endLinesEl.textContent = `LINES: 0${lines}`
}else{endLinesEl.textContent = `LINES: ${lines}`}

setHighScores()

}



// TETRIMINO AND FLOOR OBSTACLES COMBINED
const obstacle = (a, b, c, d, blockA, blockB, blockC, blockD, obstacleType) =>{
    clearInterval(shapeClock) // stop clock and append tetrimino and remove 'descending' class

    // REGISTER POSITIONS
    const registerPositions = (a, b, c, d, obstacleType) =>{
        arr[0] = a; arr[1] = b; arr[2] = c; arr[3] = d;
        filledSquareArr.push(arr[0], arr[1], arr[2], arr[3])
        console.log(`resting squares: ${arr}`)
        console.log(filledSquareArr)
if(arr.includes(14)){ // the tetrimino ist resting in its initial position
console.log('no need to run row check, collision at top of grid: GAME OVER')

// append the collided final tetrimino using actual a, b, c and d values and it appends correctly aligned with the below tetrimino
shapeBody.children[a].appendChild(blockA)
shapeBody.children[b].appendChild(blockB)
shapeBody.children[c].appendChild(blockC)
shapeBody.children[d].appendChild(blockD)
gameOverArray.push('game over')
statsForModal()

}else{
    // the tetrimino isn't resting in its initial position
        switch(obstacleType){
            case 'floor': 
            obstacleCountArr[0]['floor'] += 1;
            console.log('checking for filled rows....FLOOR object')
checkRowStatus(filledSquareArr, allRowsArr, obstacleType)
                break;
            case 'tetrimino': 
            obstacleCountArr[0]['tetrimino'] += 1;
            console.log(`number of TETRIMINO strikes: ${obstacleCountArr[0]['tetrimino']}`)
            console.log('checking for filled rows....TETRIMINO object')
checkRowStatus(filledSquareArr, allRowsArr, obstacleType) // check row status
            break;
        }}
    }
    // END OF REGISTER POSITIONS



const removeClass = (a, b, c, d, blockA, blockB, blockC, blockD, obstacleType) =>{
    blockA.classList.remove('descending') // remove descending 'class'
    blockB.classList.remove('descending')
    blockC.classList.remove('descending')
    blockD.classList.remove('descending')
registerPositions(a, b, c, d, obstacleType)
}
// this operates first within the function deciding what to do based on obstacle type
    switch(obstacleType){
        case 'floor': console.log('FLOOR OBSTACLE')
        removeClass(a, b, c, d, blockA, blockB, blockC, blockD, obstacleType)
            break;


        case 'tetrimino': console.log('TETRIMINO OBSTACLE')
console.log(a, b, c, d, tetrisBlockArr[4])
// this seems to be the best place for the END GAME SCENARIO
    a-=10; b-=10; c-=10; d-=10;
    shapeBody.children[a].appendChild(blockA)
    shapeBody.children[b].appendChild(blockB)
    shapeBody.children[c].appendChild(blockC)
    shapeBody.children[d].appendChild(blockD)
    removeClass(a, b, c, d, blockA, blockB, blockC, blockD, obstacleType)




            break;    
    }
}

// might not need this function
const dropFloaters = (rowMinumum) =>{
    let increaseIndexValue;
    let duplicateElements = []
    console.log(`dropFloaters()... 
    any blocks from {${filledSquareArr}} whose value is less than ${rowMinumum} needs to be  be dropped.`)
 

console.log(filledSquareArr)
console.log(duplicateElements)

console.log(filledSquareArr)
   
}

// render points 
const renderPoints = (level, lines) =>{
console.log(`current level: ${level},
number of lines: ${lines}
`)

let multiplier = level + 1;
console.log(multiplier)
let pointsCount = multiplier*pointsArr[lines - 1]
console.log(pointsCount)
pointsCountArr[0] += pointsCount
scoreEl.textContent = `SCORE: ${pointsCountArr[0]}`
}


// to render level
const renderLevel = (lineNumber) =>{
    levelCount = Math.floor(lineNumber/10)
    if(levelCount > 10){ // game complete
        clearInterval(shapeClock); // stop game
    console.log('EXCELLENT GAME: all 10 levels completed')
    gameOverArray.push('game over')
    statsForModal()
    }else if(levelCount < 10){ // log game levels appropriately
            levelEl.textContent = `LEVEL: 0${levelCount}`
        }else{ // game level must be 10
            levelEl.textContent = `LEVEL:${levelCount}`
        console.log('game almost complete COME ON!')
        }
        levelCountArr[0] = levelCount
        console.log(levelCountArr)
        console.log(tetriminoSpeedArr[levelCountArr[0]])
}



const clearRow = (rowList) =>{
    // rowList is an array containing the nth full rows

    // paly ANIMATION and appropriate SOUND CLIP for number of rows cleared
    for(j=0; j < shapeBody.children.length; j++){
        if(rowSelectArr.length > 3){// animate whole grid WITH STROBE EFFECT
        shapeBody.children[j].style.animation = "flash 0.1s 3";
        // play audio for a tetris hit
        TetrisBoomAudio.play();
    }else{ // animate whole grid with just singular flash of 0.2secs
        console.log(`row selector: ${rowSelectArr.length}`)
        shapeBody.children[j].style.animation = "flashb 0.2s 1";
        // play audio for a normal row hit
        LineCompleteAudio.play();
    }}




// to display the line count as 3 digits use the fullowing if/else conditions. 
count = lineRecordArr[0]
renderLevel(count)
if(count < 10){
    lineRecordEl.textContent = `LINE: 00${count}`
}else if(count < 100){
    lineRecordEl.textContent = `LINE: 0${count}`
}else{
    lineRecordEl.textContent = `LINE: ${count}`
}



    let rowListBase = rowList[0]*10
    let iSquare;
    let rowChildren;
    let increaseIndexValue;
    let duplicateElements = []
    // for each element of row blocks, delete the corresponding child in the grid div, drop all blocks above the empty row, and adjust the filledSquares array to reflect the dropped blocks new positions. 




// delete elements of the row
const deleteBlocks = (blocks) =>{
    console.log('deleting row....')
blocks.forEach(element => {
shapeBody.children[element].removeChild(shapeBody.children[element].firstChild)
iSquare = filledSquareArr.indexOf(element) // finds the index position block as it lies in filledSquareArr
filledSquareArr.splice(iSquare,1) // remove deleted parents from the array
})

// function to sort filledsquare into consecutive order
const compareNumbers = (a, b) => a - b;  
// apply consecutive order to array but reverse it
 filledSquareArr.reverse(filledSquareArr.sort(compareNumbers))


console.log('row deleted... updated filledSquareArr below')
console.log(filledSquareArr)




// check which blocks are above the emptied row
filledSquareArr.forEach(element =>{
  // just to see if the blocks are checked prior to the next row being deleted
    if(filledSquareArr.indexOf(element) === 0){
         console.log(`check blocks above ${blocks[0]},.. before moving to next row`);
            }
// make a record of all blocks which are above deleted row - floating blocks
        if(element < blocks[0]){
            console.log(element)
            duplicateElements.push(element)
            if(shapeBody.children[element].firstChild){
                shapeBody.children[element + 10].appendChild(shapeBody.children[element].firstChild) }

// once last element has been checked against to see if it is floating, then loop through the duplicate array and use those values to increase the value of filled squares array, where the duplicates are contained in filled squares.                 
                if(filledSquareArr.indexOf(element) === filledSquareArr.length - 1){
console.log(duplicateElements)

for(i=0; i < duplicateElements.length;i++){
    if(filledSquareArr.includes(duplicateElements[i]))
    {filledSquareArr[filledSquareArr.indexOf(duplicateElements[i])] += 10;
        if(i > duplicateElements.length - 2){
            duplicateElements = []
            console.log('adjustment for dropped block numbers below...')
            console.log(filledSquareArr) // to ensure numbers are correctly repositioned
            i=20;
        }}}}}

  
})

}
  

   // this logs the each row with its 10 elements, and they are logged separately so we might be able to run each one through a function
rowList.forEach(element => {
    console.log(`...forEach to pull out row number ${element}`)
    // NOTE: pulling out the wrong number sometimes... 
rowChildren = allRowsArr[element]// get actual row contents using row list number
    console.log(rowChildren) // log row contents
    console.log('send to delete row....')

  deleteBlocks(rowChildren)
  // once all rows are deleted; log row and now start function to descend floaters
  if(rowList.indexOf(element) === rowList.length - 1){
    console.log('deletion complete');
    rowSelectArr = []
    drawShape(permutationsArray, indexNumArray[0])
     }
});


}


// FIX THIS - the order of events
const checkRowStatus = (array, rowArray, obstacleType) =>{

       // ANIMATION REMOVE - TRYING HERE 
       for(j=0; j < shapeBody.children.length; j++){
        if(shapeBody.children[j].style.animation = "animation"){
        shapeBody.children[j].style.animation = "";}
    }

const checkRow = (array, rowArray)=>{
    let incompleteRows; // lists total number of incomplete rows
    let completeRows; // lists total number of complete rows
    rowDeleterArr = [] // holds full rows for deletion
    rowCompleteArray [0] = 0; // incremented each time an incomplete row is found
    rowCompleteArray [1] = 0; // incremented each time an complete row is found 

    // return true for rows (contained in rowArray) where all of row's element's numbers are contained in the array which stores all block filled elements. 
    for(i=0; i < rowArray.length; i++){
        console.log(`boolean check on row ${i}`)
        let rowX = rowArray[i]
    let rowchecker = rowX.every(rowX =>{
               return array.includes(rowX)
    })

if(i<19){
    if(rowchecker === true){rowDeleterArr.push(...rowX);
        rowSelectArr.push(i)
    rowCompleteArray[1] +=1;
    console.log(lineRecordArr[0])
    lineRecordArr[0] += 1;
    console.log(`position of COMPLETE row: ${i}`)
    }else{
        rowCompleteArray[0] +=1;
       }


}else{
    console.log('...row check complete')
    if(rowchecker === true){rowDeleterArr.push(...rowX);
        rowSelectArr.push(i);
        rowCompleteArray[1] +=1;
        console.log(lineRecordArr[0])
        lineRecordArr[0] += 1;
        console.log(`position of COMPLETE row: ${i}`)
        }else{
            rowCompleteArray[0] +=1;
           }
incompleteRows = rowCompleteArray[0]
completeRows = rowCompleteArray[1]


    console.log(`incomplete rows: ${rowCompleteArray[0]},
    complete rows: ${rowCompleteArray[1]}
    `)

    if(completeRows === 0){ // no rows are complete
        console.log('no complete rows, drop next tetrimino... drawShape()'); 
        drawShape(permutationsArray, indexNumArray[0])
    }else{ // one or more rows are complete
console.log('one or more rows complete... run clearRow()')  
   
rowCompleteArray [0] = 0; // incremented each time an incomplete row is found
rowCompleteArray [1] = 0; // incremented each time an complete row is found 
console.log(rowSelectArr) // make sure correct row numbers are sent to clear row
console.log(` sending ${levelCountArr[0]} and ${rowSelectArr.length} to render points...`)
renderPoints(levelCountArr[0],rowSelectArr.length)
clearRow(rowSelectArr)// this can have more than one value in it if there is more than one filled row

    }

}




}// end of forLoop
}// end of checkRow function

// switch obstacle type to log obstacle nature
    switch(obstacleType){
case 'floor':console.log('checking rows (FLOOR obstacle).. ')
checkRow(array, rowArray)
    break;
case 'tetrimino': console.log('checking rows (TETRIMINO obstacle).. ')
checkRow(array, rowArray)
    break;    


    } // end of SWITCH for obstacle type
}



// drop by one square
const tetriminoDrop = (a, b, c, d, color, letter, blockA, blockB, blockC, blockD) =>{
deliveredShapesArr.unshift(letter)
console.log(a, b, c, d, color, letter ,  blockA, blockB, blockC, blockD)
// these details are pushed to the below array so that there is a record of the position/orientation of the currently descending tetrimino at time of pause.  So when the game is unpuased, these details are recalled and used as arguments to tetriminoDrop, so that the tetrimino continues from the exact same location. 
tetrisBlockArr[5] = color;
tetrisBlockArr[4] = letter;
tetrisBlockArr[0] = blockA;
tetrisBlockArr[1] = blockB;
tetrisBlockArr[2] = blockC;
tetrisBlockArr[3] = blockD;

shapeBody.children[a].appendChild(blockA)
shapeBody.children[b].appendChild(blockB)
shapeBody.children[c].appendChild(blockC)
shapeBody.children[d].appendChild(blockD)

// navigation function for both keypresses and button clicks
const navigationListener = (identifyer) =>{

    // to check class of each block
    let aAttribute = blockA.getAttribute('class')
    let bAttribute = blockB.getAttribute('class')
    let cAttribute = blockC.getAttribute('class')
    let dAttribute = blockD.getAttribute('class')
    
    // if block has 'descending' class then allow move-right, move-left, and rotate
    if(aAttribute.includes('descending') && bAttribute.includes('descending') && cAttribute.includes('descending') && dAttribute.includes('descending')){
        
    
    const MoveRightLeft = (a, b, c, d, direction) =>{
    
    
    
    const movePiece = (a, b, c, d) =>{
        shapeBody.children[a].appendChild(blockA)
    shapeBody.children[b].appendChild(blockB)
    shapeBody.children[c].appendChild(blockC)
    shapeBody.children[d].appendChild(blockD)
    }
    
    // if piece is stopped,change a, b, c and d to original values and append children as normal
    movePiece(a,b,c,d)
    
    }
    
    
    const renderRotate = (a, b, c, d, letter, rotator) =>{
        rotationBlip.play()
        console.log(b, c, d, letter, rotator)
        shapeBody.children[a].appendChild(blockA)
        shapeBody.children[b].appendChild(blockB)
        shapeBody.children[c].appendChild(blockC)
        shapeBody.children[d].appendChild(blockD)
            }
    
        
    const preRenderRotate = (a, array, rotator) =>{
        b = a + array[rotator][0]
        c = a + array[rotator][1]
        d = a + array[rotator][2]  
        renderRotate(a, b, c, d, letter, rotator)}
    
     // b, c and d values are stored in 'rotation' arrays for each tetrimino type. Each array has 4 subarrays; each subarray representing  one of the 4 multiples of 90 degrees in a 360 degree revolution (0, 90, 180, 270). In a rotation 'a' is kept stationary while b, c and d take the values of the currently selected subarray, values which are relative to the current value of 'a'. Rotations are prevented if rotation will result in the tetrimino traversing left or right borders, or if a rotation will result in a collision with another tetrimino. 
    const rotateTetrimino = (a, array, letter) =>{
      console.log(a)
      array[4] += 1; // increase last array value so picker will choose next rotation
    rotator = array[4]% 4;// gives the index of array holding destination div numbers
    
    if(filledSquareArr.includes(a + array[rotator][0]) || filledSquareArr.includes(a + array[rotator][1]) || filledSquareArr.includes(a + array[rotator][2])){
        console.log('COLLISION')
    }else{
        // switch tetrimino type to define boundary collisions
        switch(letter){
               case 'I': if( a % 10 > 6){console.log('COLLISION')}else{
                preRenderRotate(a, array, rotator)}
            break;
           default: if(a % 10 == 9 || a % 10 == 0){console.log('COLLISION')}else{
                    preRenderRotate(a, array, rotator)}
               } // end of switch
            
    shapeBody.children[a].appendChild(blockA)
    shapeBody.children[b].appendChild(blockB)
    shapeBody.children[c].appendChild(blockC)
    shapeBody.children[d].appendChild(blockD)
    }}
    
    
    
    // switch target to see if button or associated font awesome icon is pressed
        switch(identifyer){
             // if detected element is right button
             case 'ArrowRight':
            case 'move-right':
            case 'right-arrow-img':
                 console.log('right arrow pressed');
    // if a, b, c or d is increased by 1 and the value results in a number that corresponds to a boundary square; do nothing - else, increase the value of the variables a, b, c and d,  by '1' and append blocks to grid square positions that correspond to the letter values. 
    if(leftBoundaryArr.includes(a+1)  || leftBoundaryArr.includes(b+1)  || leftBoundaryArr.includes(c+1)  || leftBoundaryArr.includes(d+1)  || pauseIntervalArr.length > 0){
    console.log('cannot move right: BOUNDARY')
    }else{
    
        // values contained in filledSquareArr cannot be used to append blocks to empty squares
        if(filledSquareArr.includes(a+1) || filledSquareArr.includes(b+1) || filledSquareArr.includes(c+1) || filledSquareArr.includes(d+1) || pauseIntervalArr.length > 0){console.log('collision detected: CANNOT MOVE PIECE')}else{
            a += 1;  b += 1;  c += 1;  d += 1;
            MoveRightLeft(a, b, c, d, identifyer)
    
        }
    
    }
     break;
    
     // if detected element is left button
     case 'ArrowLeft':
     case 'move-left':
     case 'left-arrow-img':   
     console.log('Left arrow pressed')
    // if a, b, c or d is decreased by 1 and the value results in a number that corresponds to a boundary square; do nothing - else, decrease the value of the variables a, b, c and d,  by '1' and append blocks to grid square positions that correspond to the letter values.
    
    if(rightBoundaryArr.includes(a-1)  || rightBoundaryArr.includes(b-1)  || rightBoundaryArr.includes(c-1)  || rightBoundaryArr.includes(d-1) || pauseIntervalArr.length > 0){
        console.log('cannot move left: BOUNDARY')
        }else{
    
                // values contained in filledSquareArr cannot be used to append blocks to  squares; because the squares associated with those numbers are already filled. 
            if(filledSquareArr.includes(a-1) || filledSquareArr.includes(b-1) || filledSquareArr.includes(c-1) || filledSquareArr.includes(d-1) || pauseIntervalArr.length > 0){console.log('collision detected: CANNOT MOVE PIECE')}else{
              
        a -= 1;  b -= 1;  c -= 1;  d -= 1;
        MoveRightLeft(a, b, c, d,identifyer)
                
            }
    
    }
            break;
    
            // if rotate button (between right and left buttons) is pressed
            // if pause button is pressed we will not allow rotation as it seems to cause a conflict if allowed - and is redundant anyway because it would be a means of cheating or is generally not required, especially if the pause it to allow row clearance and floating tetrimino drop
            case 'ArrowUp':
            case 'rotator':
            case 'rotate-tetrimino-img':    
            console.log('Up arrow pressed')
            if(letter == 'S'){ if(pauseIntervalArr.length < 1){rotateTetrimino(a, sRotateArr, letter)}
             }else if(letter == 'Z'){ if(pauseIntervalArr.length < 1){rotateTetrimino(a, zRotateArr, letter)} 
            }else if(letter == 'I'){ if(pauseIntervalArr.length < 1){rotateTetrimino(a, iRotateArr, letter)}
            
            }else if(letter == 'J'){ if(pauseIntervalArr.length < 1){rotateTetrimino(a, jRotateArr, letter)}
            
            }else if(letter == 'L'){ if(pauseIntervalArr.length < 1){rotateTetrimino(a, lRotateArr, letter)}
            
            }else if(letter == 'T'){ if(pauseIntervalArr.length < 1){rotateTetrimino(a, tRotateArr, letter)}
            
            }else if(letter == 'O'){ if(pauseIntervalArr.length < 1){ rotateTetrimino(a, oRotateArr, letter)} // no need since rotations are symetrical about center
                   }
    
            break;
            case 'ArrowDown': console.log('Down arrow pressed')
            break;
    
        }

    }


}

// event listener for keyboard tetrimino navigation
document.addEventListener('keydown', (e) =>{
    console.log(e.key)
    let identifyer = e.key;
    console.log(identifyer)
navigationListener(identifyer)
})

// event listener for button tetrimino navigation
navButtons.addEventListener('click', function(e){
    console.log(e.target)
    let identifyer = e.target.id
navigationListener(identifyer)
})

shapeClock =  setInterval(() => {
    
   
      // if d < 90 but the next square has a child in it - don't appened because it is a barrier beneath the current dropping tetrimino
if(d < 190){ //console.log(d)

    shapeBody.children[a].removeChild(shapeBody.children[a].firstChild)
    shapeBody.children[b].removeChild(shapeBody.children[b].firstChild)
    shapeBody.children[c].removeChild(shapeBody.children[c].firstChild)
    shapeBody.children[d].removeChild(shapeBody.children[d].firstChild)


    a += 10; arr[0] = a;
    b += 10; arr[1] = b;
    c += 10; arr[2] = c;
    d += 10; arr[3] = d;
console.log(arr)

 // TETRIMINO OBSTACLE below currently descending tetrimino - so if a div with the numbers a+10 (or b, c, d (+10)) already contains a block, descending a block to that div will cause a bottom conflict
 if(deliveredShapesArr.length > 1 && shapeBody.children[d].firstChild || shapeBody.children[c].firstChild || shapeBody.children[a].firstChild || shapeBody.children[b].firstChild){
let obstacleType = 'tetrimino'
obstacle(a, b, c, d, blockA, blockB, blockC, blockD, obstacleType)
//tetriminoObstacle(a, b, c, d,blockA, blockB, blockC, blockD, obstacleType)


   //console.log(blockA, blockB, blockC, blockD)


 }else{ // d still less than 190 so tetrimino gets appended on a + 10, b +10... etc
    shapeBody.children[a].appendChild(blockA)
    shapeBody.children[b].appendChild(blockB)
    shapeBody.children[c].appendChild(blockC)
    shapeBody.children[d].appendChild(blockD)

   
   // console.log(blockA, blockB, blockC, blockD)// check that these blocks have 'descending' class added
 }
        
    
}else{ // BOTTOM BOUNDRAY COLLISION when d <= 190
    let obstacleType = 'floor'
    obstacle(a, b, c, d, blockA, blockB, blockC, blockD, obstacleType)
// floorObstacle(a, b, c, d, blockA, blockB, blockC, blockD, obstacleType)
}
  },tetriminoSpeedArr[levelCountArr[0]]);

}

// creates tetrimino blocks x 4, given appropriate classes, color added and appended using the values a, b, c and d. Then passed to tetrimino drop funcion which descends the complete tetrimino at the given intervals in the timer function inside tetrimino drop. 
const createShape = (a, b, c, d, color, letter) =>{
    let blockA = document.createElement('div') 
    let blockB = document.createElement('div') 
    let blockC = document.createElement('div') 
    let blockD = document.createElement('div') 


    blockA.classList.add('descending')
    blockA.classList.add('block-dimensions')
    blockA.style.backgroundColor = `${color}`

    blockB.classList.add('descending')
    blockB.classList.add('block-dimensions')
    blockB.style.backgroundColor = `${color}`

    blockC.classList.add('descending')
    blockC.classList.add('block-dimensions')
    blockC.style.backgroundColor = `${color}`
    
    blockD.classList.add('descending')
    blockD.classList.add('block-dimensions')
    blockD.style.backgroundColor = `${color}`
    

    tetriminoDrop(a, b, c, d,color, letter, blockA, blockB, blockC, blockD)

}


// code for different shapes, each shape is created by a separate function

let a;
let b;
let c;
let d;
let letter;



// single function for ALL shapes
const shapeCreator = (master, slaves, color, letter) =>{
a = master;
b = master + slaves[0]
c = master + slaves[1]
d = master + slaves[2]
createShape(a,b,c,d,color,letter)
}


const displayShape = (shapeNumber) =>{
    let actualColor;
 // colorArray contains 6 colors which are cycled through
 // increase integer value in last position of array by 1
 colorArr[6] +=1; 

 actualColor = colorArr[colorArr[6] % 6]

// now switch the results and give each of the four numbers a color which will then be sent as a parameter to the below functions.

let a1 = 14


    switch(shapeNumber){
case 1:shapeCreator(a1, jRotateArr[0], actualColor, 'J')

break;
    case 2:shapeCreator(a1, lRotateArr[0], actualColor, 'L')
    break;

    case 3:shapeCreator(a1, sRotateArr[0], actualColor, 'S')
    break;

    case 4:shapeCreator(a1, zRotateArr[0], actualColor, 'Z')
    break;

    case 5:shapeCreator(a1, tRotateArr[0], actualColor, 'T')
    break;

    case 6:shapeCreator(a1, oRotateArr[0], actualColor, 'O')
    break;

    case 7:shapeCreator(a1, iRotateArr[0], actualColor, 'I')
    break;
    }}



    const displayNextTetrimino = (a, b, c, d, color, letter) =>{
console.log(`displaying next tetrimino: ${letter}`)

        // first of all clear all children if any exist
for(i=0; i < nextPieceEl.children.length; i++){
    
    if(nextPieceEl.children[i].firstChild){
        nextPieceEl.children[i].removeChild(nextPieceEl.children[i].firstChild)
    }
}

        // create blocks
        let nextBlockA = document.createElement('div') 
        let nextBlockB = document.createElement('div') 
        let nextBlockC = document.createElement('div') 
        let nextBlockD = document.createElement('div') 
        
        nextBlockA.classList.add('next-block-dimensions')
        nextBlockA.style.backgroundColor = `${color}`
    
        nextBlockB.classList.add('next-block-dimensions')
        nextBlockB.style.backgroundColor = `${color}`
    
        nextBlockC.classList.add('next-block-dimensions')
        nextBlockC.style.backgroundColor = `${color}`
        
        nextBlockD.classList.add('next-block-dimensions')
        nextBlockD.style.backgroundColor = `${color}`

        // append all blocks
        nextPieceEl.children[a].appendChild(nextBlockA)
        nextPieceEl.children[b].appendChild(nextBlockB)
        nextPieceEl.children[c].appendChild(nextBlockC)
        nextPieceEl.children[d].appendChild(nextBlockD)

    }



    // set other block positions relative to the pivot block 'master'
const formatNextTetrimino = (master, slaves, color, letter) =>{
    a = master;
    b = master + slaves[0]
    c = master + slaves[1]
    d = master + slaves[2]
    displayNextTetrimino(a, b, c, d, color, letter)
}



    // display next tetrimino in mini display. 
const nextTetrimino = (newIndex) =>{
    console.log(newIndex)
let a = 8; // master block position; all other block positions are relative to 'a'
let actualColor;
// colorArray contains 6 colors which are cycled through
// increase integer value in last position of array by 1

actualColor = colorArr[(colorArr[6]+2) % 6]


    switch(permutationsArray[newIndex]){ // index number are from 0 - 419, but the actual values at each index position ranges from 1-7 each of which is associated with a unique tetrimino. 
        case 1:formatNextTetrimino(a, jNextArr, actualColor, 'J')
        
        break;
            case 2:formatNextTetrimino(a, lNextArr, actualColor, 'L')
            break;
        
            case 3:formatNextTetrimino(a, sNextArr, actualColor, 'S')
            break;
        
            case 4:formatNextTetrimino(a, zNextArr, actualColor, 'Z')
            break;
        
            case 5:formatNextTetrimino(a, tNextArr, actualColor, 'T')
            break;
        
            case 6:formatNextTetrimino(a, oNextArr, actualColor, 'O')
            break;
        
            case 7:formatNextTetrimino(a, iNextArr, actualColor, 'I')
            break;
            }
}



// use array data to draw shape
const drawShape = (array, index) =>{
    let i;
    console.log(`index of new piece: ${index}`)
 i = index % 420
    // index of array of randomly generated tetrimino numbers
   let newIndex = (i + 1)%420; // increase index by '1' and assign it a variable
   indexNumArray.unshift(newIndex)// place new variable in array for retrieval of new index - next time drawShape is run, the index will be previous index + 1, so next shape will be generated. 


//  console.log(indexNumArray)
   console.log(`index number for next piece: ${newIndex}`)
  // we might be able to use this number for to display the following piece after the currently dropping tetrimino
  nextTetrimino(newIndex)
displayShape(array[i]) // send array[original index] to displayShape to get color
   }

// create random numbers from 1-7 that will be used to represent each of the 7 tetriminos. 
const buildShape = () =>{
selectedShape = Math.floor(Math.random()*7 + 1) // generate num 1<= num <= 7
if(shapeArr.length < 7){// if array has less than 7 unique numbers
if(shapeArr.includes(selectedShape)){// if array includes current number
buildShape()// re run number generation
    }else{// number is new so push to array
        shapeArr.push(selectedShape);
        //console.log(shapeArr)
              buildShape()// run number generation again until array is full
        }
       
   }else{ // shapeArr.length === 7
    permutationsArray.push(...shapeArr) // push spread 7 numbers of shapeArr to permutation arry
    shapeArr = [] // clear shapeArr and.. 
    if(permutationsArray.length < 420){ // if there are less than 60 permutations
buildShape() // create another 7 elements for shapeArr
    }else{ // permutations are now full
console.log(`permutation array contains ${permutationsArray.length/7} sets of jumbled tetriminos`)
console.log(permutationsArray)
       drawShape(permutationsArray, 0)
    }

    } // array has 7 numbers so start drawShape process with index '0' for first number, and the completed array
}



// function for dealing with activation of gamestate buttons, start pause refresh and kill game. Also added is pauseModal close and resume game after pause
const gameState = (identifyer) =>{
console.log(identifyer)
switch(identifyer){
    case 'close-pause':
pauseModalEl.style.cssText = 'display:none; z-index: -2;'
    break;
    case 'resume':
        pauseModalEl.style.cssText = 'display:none; z-index: -2;'
        pauseIntervalArr.pop()
        pauseEl.textContent = 'Pause'
        pauseEl.style.animation = ''
          tetriminoDrop(arr[0], arr[1], arr[2], arr[3],tetrisBlockArr[5], tetrisBlockArr[4],tetrisBlockArr[0], tetrisBlockArr[1], tetrisBlockArr[2], tetrisBlockArr[3])
                  
    break;
    case ' ':
    case 'pause':
    case 'pause-img':  
    if(startCommandArr.length > 0 && killArray.length < 1){// game started no kill yet
    if(pauseIntervalArr.length < 1){pauseIntervalArr.push('pause')
    pauseModalEl.style.cssText = 'display:block; z-index: 2;'
    pauseEl.style.cssText = 'animation: pause 0.4s 10000;' // flash animate button
    clearInterval(shapeClock) // stop tetrimino drop
   }else{ pauseIntervalArr.pop()
    pauseEl.style.animation = ''
      tetriminoDrop(arr[0], arr[1], arr[2], arr[3],tetrisBlockArr[5], tetrisBlockArr[4],tetrisBlockArr[0], tetrisBlockArr[1], tetrisBlockArr[2], tetrisBlockArr[3])
              }}else{console.log('start or refresh game to use pause button')}
    break;

    case 'Enter': 
    case 'start':
    case 'start-img':
       if(startCommandArr.length < 1){
        buildShape();
        startAudio.play()
        startCommandArr.unshift('start')
    }else{console.log('game already started')}
    break; 
    case 'refresh':
    case 'r':
    case 'recycle-img':
        if(gameOverArray.length > 0 || killArray.length > 0){
            location.reload()
        }else{console.log(' game must end in order to refresh')}
break;
case 'kill':
case'k':   
case'skull-crossbones-img': 

if(startCommandArr.length > 0 && gameOverArray.length < 1 && pauseIntervalArr.length < 1){
    pauseIntervalArr = []; // clear pause

    for(i=0; i < shapeBody.children.length; i++){
        clearInterval(shapeClock) // stop clock 
        killArray.push('game killed') // push to array so refresh can be executed
        shapeBody.children[i].style.animation = "flash 0.1s 20"; // apply animation
        killAudio.play() // play explosion audio

        // clear any tetriminoes in the grid
        if(shapeBody.children[i].firstChild){
            console.log(shapeBody.children[i].firstChild)
            shapeBody.children[i].removeChild(shapeBody.children[i].firstChild)
        }

        // clear any tetriminoes in the next piece grid
        for(j=0; j <nextPieceEl.children.length; j++){
            nextPieceEl.children[j].style.animation = "flash 0.1s 20"; // apply animation
        if(nextPieceEl.children[j].firstChild){
            console.log(nextPieceEl.children[j].firstChild)
            nextPieceEl.children[j].removeChild(nextPieceEl.children[j].firstChild)
        }}
        
    }

}else{console.log('game cannot be killed unless pause is inactive, game has started and is unfinished')}
   
break;}}


// event listener for modal elements
pauseModalEl.addEventListener('click', function(e){
let identifyer = e.target.id;
console.log(identifyer)
gameState(identifyer)

})


document.addEventListener('keypress', (e) =>{
let identifyer = e.key;
console.log(identifyer)
gameState(identifyer);
})



gamestateArr.forEach((element)=>{
    element.addEventListener('click', function(e){
        console.log(e.target.id)
        let identifyer = e.target.id;
gameState(identifyer);
    })
})