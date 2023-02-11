// local storage
if(window.localStorage){
    console.log(window.localStorage)
}else{console.log('no scores stored yet')}

// array carrying snake head id
let headIdArr = ['snake-head']
let turnsArray = [] // records number of turns snake makes before getting next apple; the number of turns is then multiplied by a number, 20 for easy level, 15 for regular level, and 10 for hard level, and that total number is deducted from the points gained by eating the apple. 


// audio clips for game events
let startAudio = new Audio('Game Start.mp3')
let GameOverAudio = new Audio('Game Over.mp3')
let gameEndAudio = new Audio('Tetris Boom Tetris.mp3')
let killAudio = new Audio('Explosion.mp3')
let rotationBlip = new Audio('rotate blip.mp3')
let chompAudio = new Audio('apple chomp.mp3')

let gameDifficultyArr = [] // difficulty can be:
//  EASY - snake body grows when apple is eaten
// HARDER - like EASY stage, but snake speed increases as apples are eaten
// VERY HARD - like HARDER stage, but it takes two apples to get 150 points and, both increase snake speed - twice in one stage
// INSANE - like VERY HARD stage, but there are also obstacles to avoid. 
// the game difficulty is decided based on what is in the gameDifficultyArr when an apple is eaten - a switch statement is used on gameDifficultyArr[0] which will have the difficulty unshifted to it at game start. 


let hardObstacleEl = document.querySelectorAll('.block-dimensions-hard-obstacle')
let regularObstacleEl = document.querySelectorAll('.block-dimensions-regular-obstacle')
// positions for the REGULAR DIFFICULTY obstacles
let regularObstacleArr = [90, 110, 130, 150, 184, 185, 186, 187, 212, 213, 214, 215, 229, 249, 269, 289 ]
// positions for the HARD DIFFICULTY obstacles
let hardObstacleArr = [90, 110, 130, 150, 184, 185, 186, 187, 212, 213, 214, 215, 229, 249, 269, 289, 63, 64, 65, 74, 75, 76, 85, 96, 103, 105, 114, 116, 283, 285, 294, 296, 303, 316, 323, 324, 325, 334, 335, 336 ]
// NOTE* for the HARD difficulty I've combined the two arrays for easier reading of code and due to the fact that the execution will only need to read one array when the hard level is being assessed for obstacles





let breadCrumbArr = []  // ARRAY REGISTERING ALL POSITIONS SNAKE HEAD HAS PASSED THROUGH

let blockArray = [] // ARRAY HOLDING ALL SEGMENTS OF THE SNAKE --- 

let appleArray = [] // HOLDS position of newly created apple, just zero entry has the data as each time an apple is eaten by the snake the new apple position overwrites the old. 



// difficulty selector dive
let levelSelectEl = document.getElementById('level-div-container')

// ------------------------------------GAME STATE BUTTONS AND IMAGES ----- for pausing, playing, resetting the game
// buttons
let startBtn = document.getElementById('start')


// images nested inside buttons
let startImg = document.getElementById('start-img')





// ----------------------------------DIRECTION BUTTONS AND NESTED IMAGES -------------------------
// buttons
let moveLeftEl = document.getElementById('move-right')
let moveRightEl = document.getElementById('move-left')
let moveUpEl = document.getElementById('move-up')
let moveDownEl = document.getElementById('move-down')

// images nested inside buttons
let upImg = document.getElementById('up-arrow-img')
let leftImg = document.getElementById('left-arrow-img')
let rightImg = document.getElementById('right-arrow-img')
let downImg = document.getElementById('down-arrow-img')


// array for gamestate buttons
let gamestateArr = [startBtn, startImg]
// ALREADY EXISTING ELEMENTS
let shapeBody = document.getElementById('game-grid')

let scoreEl = document.getElementById('score-para')
let pointsCountArr = [0]

// CRASH VARIABLES AND END OF GAME RESULTS
let boundaryCrash = 'SNAKE hit a boundary - GAME OVER'
let snakeCrash = 'SNAKE crashed into itself - GAME OVER'
let obstacleCrash = 'SNAKE hit an OBSTACLE - GAME OVER'
let gameWindMsg;// message for winning player comparing winner score and high score
let gameLoseHighScoreMsg; // if game is lost but high score is attained, appropriate message given to player



let arr = [0, 0, 0, 0] // to hold changing a, b, c, d values
let shapeClock; // variable for TIMER
let rightBoundaryArr;// for right boundary
let leftBoundaryArr;// for left boundary
let topBoundaryArr; // for top boundary
let bottomBoundaryArr// for bottom boundary 
let gridChildrenArr;
let picker; // used to pick which rotation to render 90, 180, 270, or original
let rowCompleteArray = [0,0] // use positions index 0 and 1 to record incomplete and complete row amounts


// MODAL ELEMENTS
let modalEl = document.getElementById('simple-modal')
let endScoreEl = document.getElementById('end-score') // end game score display
let newGameEl = document.getElementById('new-game')
let highscoreMsg = document.getElementById('high-scores')

// PAUSE MODAL elements
let pauseModalEl = document.getElementById('modal-pause')
let levelModalEl = document.getElementById('level-modal')




// check we have all of the obstacles

regularObstacleArr.forEach(element =>{
    console.log(shapeBody.children[element-1])
})

hardObstacleArr.forEach(element =>{
    console.log(shapeBody.children[element-1])
})




// IF HARDER LEVELS ARE EVER MADE THIS ARRAY CAN BE USED TO DICTATE HIGHER SPEEDS FOR LATER LEVELS
let snakeSpeedArr = [250, 240, 230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50 ]
//array for next tetrimino display
let speedIndexArr = [0]; // used to choose index of snakeSpeedArr which dictates the speed at which the snake travels at
let applesEatenArr = [0]
let time = snakeSpeedArr[speedIndexArr[0]]; // use this variable in the setInerval


newGameEl.addEventListener('click', function(){
location.reload()

})

// select level and close modal
levelSelectEl.addEventListener('click', function(e){
    let difficulty = e.target.id
    console.log(difficulty)
    switch(difficulty){
case 'easy-btn': gameDifficultyArr.unshift(difficulty)
time = snakeSpeedArr[10];


break;
case 'regular-btn': gameDifficultyArr.unshift(difficulty)
time = snakeSpeedArr[10]
regularObstacleEl.forEach(element =>{
    element.style.display = 'block'
})
break;


case 'hard-btn': gameDifficultyArr.unshift(difficulty)
time = snakeSpeedArr[10]

hardObstacleEl.forEach(element =>{
    element.style.display = 'block'
})

regularObstacleEl.forEach(element =>{
    element.style.display = 'block'
})
break;

    }
    console.log(gameDifficultyArr)
levelModalEl.style.cssText = 'z-index: -3; display:none'

})

// set div numbers for boundaries left and right 
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// Generate numbers numbers for left  hand side boundary
leftBoundaryArr = range(0, 399, 20); // creates an array number beginning with '0' and ending with 400, where, for each number 'm', m % 10 = 0, i.e. [0, 10, 20......400]

// generate numbers for left hand boundary
rightBoundaryArr = range(19, 399, 20);  // creates an array of numbers from  9  to 400, where, for each number 'm', m % 10 = 9, i.e. [9, 19, 29......399]

// generate numbers for top boundary - which is just the first row of grid elements, which are children 0 -19 of the   grid
topBoundaryArr = range(0, 19, 1)


// generate numbers for bottom boundary - which is just the last row of grid elements, which are children 380 -399 of the   grid
bottomBoundaryArr = range(380, 399, 1)


// generate numbers from 0-399 to represent whole grid for when, at the end of the game, the snake is to be removed from the grid looping through the grid to check which divs have elements and deleting those elements (i.e. the snake body). 
gridChildrenArr = range(0, 399, 1)

console.log(`left boundary: ${leftBoundaryArr}, length = ${leftBoundaryArr.length}`)
console.log(`right boundary: ${rightBoundaryArr}, length = ${rightBoundaryArr.length}`)
console.log(`top boundaryL ${topBoundaryArr}, length = ${topBoundaryArr.length}`)
console.log(`bottom boundary ${bottomBoundaryArr}, length = ${bottomBoundaryArr.length}`)
console.log(`grid children total: ${gridChildrenArr}, length = ${gridChildrenArr.length}`)


let startCommandArr = [] //if array contains a value; 'start' cannot be operated - so start can only operate ONCE - until game is reset
let gameOverArray = []// will receive the string 'game over' once the game is over so the refresh page button can be executed if the modal is already closed and the 'new game' button is unavailable - we might even need a 'view stats again' button for the last game. 

let pauseIntervalArr = []
const obstacleObj = {floor:0, tetrimino:0} // object for obstacle strikes of floor or tetrimino
let obstacleCountArr = [obstacleObj]; // array to hold obstacle strikes data



// show modal with all stats including high scores and comparison
const showModal = () =>{
// OPEN modal with end of game stats
modalEl.style.cssText = 'z-index:1;';
modalEl.style.cssText = 'display:block;';

}

// receives sorted results
const displayResults = (message, score) =>{
    endScoreEl.textContent = `Your score: ${score}`
    highscoreMsg.textContent = message
    showModal()
}



// CURRENTLY DISPLAYING AS NAN - FIND OUT WHY
const displayCrashResults = (message, score) =>{
    if(!window.localStorage.high_score_snake){ // if no highscore is stored
        window.localStorage.setItem('high_score_snake', `${score}`); //set endgame score as highscore
gameLoseHighScoreMsg.textContent = `Your score, ${score}, is the only one recorded; so it's the highest`;
displayResults(gameLoseHighScoreMsg, score)
    }else{// if previous highscore is stored
        prevHighScore = window.localStorage.getItem("high_score_snake")
        if(score > prevHighScore){
        gameLoseHighScoreMsg.textContent = `you crashed but beat the high score${prevHighScore}, new high score is ${score}`;
        displayResults(gameLoseHighScoreMsg, score)
    }else{displayResults(message, score)}
    }
}


// store high scores in localStorage
const setHighScores = (score, endStatus) =>{

    switch(endStatus){

  
case 'win':
    if(!window.localStorage.high_score_snake){ // if no highscore is stored
        window.localStorage.setItem('high_score_snake', `${score}`) //set endgame score as highscore
       gameWindMsg = `you have the current high score: ${score} `;
       displayResults(gameWindMsg, score)
       }else{ // if previous highscore is stored
        prevHighScore = window.localStorage.getItem("high_score_snake")
        if(score < prevHighScore){
            gameWindMsg = `Your score is less than high score: ${prevHighScore}`;
            displayResults(gameWindMsg, score)
}else if(score === prevHighScore){gameWindMsg = `You matched high score: ${prevHighScore}`
displayResults(gameWindMsg, score)
}else{ gameWindMsg = `Congratulations! You beat the highscore, ${prevHighScore}: new high score: ${score} `
    window.localStorage.setItem('high_score_snake',`${score}` )    // update highscore in localstorage
    displayResults(gameWindMsg, score)
}}
break;


case 'snake crash':
displayCrashResults(snakeCrash, score)
break;

case 'boundary crash':
displayCrashResults(boundaryCrash, score)
break;

case 'regular obstacle': 
case 'hard obstacle': 
displayCrashResults(obstacleCrash,score)
}





}

// render points 
const renderPoints = (score, endStatus, bonus) =>{
    clearInterval(shapeClock)

    let finalScore = score + bonus

    // FOR KEEPING THE DISPLAY AS FIVE-DIGIT, EVALUATE SCORES FOR -  SCORE < 10000, SCORE < 1000 and SCORE < 100
    let finalScoreAdjust;
    if(finalScore < 100){finalScoreAdjust = `000${finalScore}`}
   else if(finalScore < 1000){finalScoreAdjust = `00${finalScore}`}
    else if(finalScore < 10000){finalScoreAdjust = `0${finalScore}`}
    else{finalScoreAdjust = finalScore}
scoreEl.textContent = finalScoreAdjust // render score formatted for 5 digits


// play flash animation across all grid divs
for(j=0; j < shapeBody.children.length; j++){
shapeBody.children[j].style.animation = "flash 0.1s 4";}

    // play game end audio
gameEndAudio.play();
startCommandArr = []
setHighScores(finalScore, endStatus)
}

//-------------------------------------- BLOCK MOVER -------------------------------------------


// variables for directions..
let left = -1;
let right = 1;
let up = -20;
let down = 20
// direction words are added to blockA class when a new direction is requested, previous direction word is removed.  The added class allows the function to know which iteration method to use (1, 20, -1, -20) to create values that are used to append blocks to the grid children. 
let goLeft = 'go-left'
let goRight = 'go-right'
let goUp = 'go-up'
let goDown = 'go-down'




/*

    let subtractor = turnsArray[0];  
    if(gameDifficultyArr[0] == 'easy-btn'){subtractor *= 20}
    else if(gameDifficultyArr[0] == 'easy-btn'){subtractor *= 15}
    else{subtractor *= 10}

*/








//DROP SNAKE
const babySnakeDrop = (a, b, c, blockA, blockB, blockC) =>{
console.log(a, b, c)
    shapeBody.children[a].appendChild(blockA)
   shapeBody.children[b].appendChild(blockB)
 shapeBody.children[c].appendChild(blockC)
   
// get snake info
let snakeHeadEl = document.getElementById('snake-head')
console.log(snakeHeadEl)


 const navigationListener = (identifyer, a) =>{


    // removal of previous direction words and updated with currently requested direction
const directionClass = (class1, class2, class3, class4) =>{
    // every time a turn is made, take approximately 10 percent of points off the player

    
    if(pointsCountArr[0] > 150){
// PENALTIES for each turn, amount dependent on how hard the game is
        switch(gameDifficultyArr[0]){
            case 'easy-btn':pointsCountArr[0] -= 20;
                break;
                case 'regular-btn':pointsCountArr[0] -= 15;
                    break;
                    case 'hard-btn':pointsCountArr[0] -= 10;
                        break;
                     
        }
        
    }

blockA.classList.remove(class1)
blockA.classList.remove(class2)
blockA.classList.remove(class3)
blockA.classList.add(class4)        
}

// identifyer contains direction words of either title case (keybord), or lower case (button elements/nested images)
if(identifyer.includes('Right') || identifyer.includes('right')){
    directionClass(goLeft, goUp, goDown, goRight) }
else if(identifyer.includes('Left') || identifyer.includes('left')){
    directionClass(goRight, goUp, goDown, goLeft)}
else if(identifyer.includes('Up') || identifyer.includes('up')){
    directionClass(goLeft, goRight, goDown, goUp)}
    else if(identifyer.includes('Down') || identifyer.includes('down')){
    directionClass(goLeft, goUp, goRight, goDown)}
}




    // event listener for keyboard tetrimino navigation
document.addEventListener('keydown', (e) =>{
    console.log(e.key)
           let identifyer = e.key;
    console.log(identifyer, arr[0]) // remember arr[0] contains the current value of 'a'
navigationListener(identifyer, arr[0])
})






// for adding segments to snake
const growSnake = () =>{
    // limit the number of segments in the entire snake to 19, otherwise alert. 
let difficulty;
let points;

const pointsAndSpeed = (points) =>{
    chompAudio.play()
pointsCountArr[0] += points;

// ADJUSTMENT FOR CURRENT SCORES TO DISPLAY AS 5-DIGIT
let currentScoreAdjust;
if(pointsCountArr[0] < 100){currentScoreAdjust = `000${pointsCountArr[0]}`}
else if(pointsCountArr[0] < 1000){currentScoreAdjust = `00${pointsCountArr[0]}`}
else if(pointsCountArr[0] < 10000){currentScoreAdjust = `0${pointsCountArr[0]}`}
else{currentScoreAdjust = pointsCountArr[0]}
scoreEl.textContent = currentScoreAdjust;


createApple()


}

        if(blockArray.length < 20){
        console.log('snake growing..... ')
       let blockNew = document.createElement('div') 
        blockNew.classList.add('block-dimensions')
        blockArray.push(blockNew);
        difficulty = gameDifficultyArr[0]
        switch(difficulty){

            case 'easy-btn': points = 150; pointsAndSpeed(points)
            break; 
            case 'regular-btn': points = 180; pointsAndSpeed(points)
            break;
            case 'hard-btn':points = 250; pointsAndSpeed(points)
            break;
                }        
    }else{
         
        let endStatus = 'win'
        let bonus; // FINISHING BONUS - easy:1000, regular:4000, hard: 8000
                switch(gameDifficultyArr[0]){
            case 'easy-btn': bonus = 1000;
            break; 
            case 'regular-btn': bonus = 4000;
            break;
            case 'hard-btn': bonus = 8000;
            break;

        }
        
          renderPoints(pointsCountArr[0], endStatus, bonus)
          startCommandArr = []
        }
      }



    shapeClock =  setInterval(() => {
    // actually, the game should only run if a doesn't belong to any of the boundaries, or rather, if the snake head is traveling in the direction of the boundary and is at the boundary... 
    
     shapeBody.children[a].removeChild(shapeBody.children[a].firstChild)

     
   //check blockA class to see which 'direction' word it contains
  let currentContents = blockA.getAttribute('class')
  
  // boundary conditions - if moving 
  if((currentContents.includes(goDown) && !bottomBoundaryArr.includes(a)) || (currentContents.includes(goUp) && !topBoundaryArr.includes(a)) || (currentContents.includes(goLeft) && !leftBoundaryArr.includes(a)) || (currentContents.includes(goRight) && !rightBoundaryArr.includes(a))){ 






// if 'a' happens to be the number of the grid position of the apple then we need to create a new apple and increase points. 


 const moveHead = (direction) =>{
    a += direction;
    arr[0] = a;

    if(pointsCountArr > 150){
turnsArray[0] +=1;
    }
    // PENALTIES FOR EACH TURN - only if initial points have been accumulated





        // OBSTACLE CRITERIA -REGULAR DIFFICULTY
if(gameDifficultyArr[0] == 'regular-btn'){
    if(regularObstacleArr.includes(breadCrumbArr[0])){
        console.log('obstacle obstacle')
        let endStatus = 'regular obstacle'
        let bonus = 0;
        renderPoints(Math.floor(pointsCountArr[0]*0.75) , endStatus, bonus)
          startCommandArr = []
    }
    
    }
    
    // OBSTACLE CRASH CRITERIA -HARD DIFFICULTY
    if(gameDifficultyArr[0] == 'hard-btn'){ // DIFFICULTY - HARD
        if(hardObstacleArr.includes(a)){
            console.log('obstacle obstacle')
            let endStatus = 'hard obstacle'
            let bonus = 0;
            renderPoints(Math.floor(pointsCountArr[0]*0.75) , endStatus, bonus)
              startCommandArr = []
        }
        
        }
    // if the snake body has a segment that's already in the new 'a' value then a collision happens
    if(!breadCrumbArr.includes(a)){ // then the snakebody and 'a' won't share the same square, hence no collision
        breadCrumbArr.unshift(a)
        breadCrumbArr.length = blockArray.length + 1; // this limits the breadcrumb length to just beyond the length of the snake body, which will be good for when we need to check which squares to avoid when creating a new apple for the enlarged snake to pursue. 
        console.log(breadCrumbArr)
        if(breadCrumbArr.includes(appleArray[0])){ // if the apple is at position 'a'
    shapeBody.children[appleArray[0]].removeChild(shapeBody.children[appleArray[0]].firstChild)
    
            growSnake()}

    }else{
       let  endStatus = 'snake crash' 
       let bonus = 0;
    renderPoints(Math.floor(pointsCountArr[0]*0.75) , endStatus, bonus) // half points for collisions
    // collision has happened and game is over
    }

  }


if(currentContents.includes('go-down')){
  moveHead(down);  snakeHeadEl.style.transform = 'rotate(0deg)'}
else if(currentContents.includes('go-up')){
    moveHead(up); snakeHeadEl.style.transform = 'rotate(180deg)' }
else if(currentContents.includes('go-right')){
        moveHead(right); snakeHeadEl.style.transform = 'rotate(270deg)'}
else {moveHead(left); snakeHeadEl.style.transform = 'rotate(90deg)'}
  
   // TETRIMINO OBSTACLE below currently descending tetrimino - so if a div with the numbers a+10 (or b, c, d (+10)) already contains a block, descending a block to that div will cause a bottom conflict
    // d still less than 190 so tetrimino gets appended on a + 10, b +10... etc
      shapeBody.children[a].appendChild(blockA)
     shapeBody.children[breadCrumbArr[1]].appendChild(blockArray[1])
     shapeBody.children[breadCrumbArr[2]].appendChild(blockArray[2])

     // loop through blockArray to see if a new block exists and if it does, use the associated index position value in breadCrumbArr to appened the new block - which will be the last segment of the snake's body
    for(i = 3; i < blockArray.length;i++){
        if(blockArray[i]){shapeBody.children[breadCrumbArr[i]].appendChild(blockArray[i])}
    }
     
             
      
  }else{ // BOUNDARY CRASH------------------------
    shapeBody.children[a].appendChild(blockA)
    let endStatus = 'boundary crash'
    let bonus = 0;
     renderPoints(Math.floor(pointsCountArr[0]*0.75) , endStatus, bonus)
    startCommandArr = []
   }
    },time);
}



const createApple = () =>{

    let newApple = document.createElement('img')

    newApple.src = "apple.png"
    newApple.style.cssText = 'position: relative; width: 90%'

// randomly generate a number between 0 and 399 inclusive (but excluding values contained in breadCrumbArr which are part of the snakes body or head, or regularObstacleArr, which contains the positions of regular obstacle blocks, or hardObstacleArr which contains the positions for hard obstacle blocks), that represents all of the possible positions where an apple can be dropped, which is used to append apple to the grid. Then we'll append the created apple to that position on the grid every time the snake finds the previous apple 
let applePosition = Math.ceil(Math.random()*399)
if(breadCrumbArr.includes(applePosition)|| regularObstacleArr.includes(applePosition) || hardObstacleArr.includes(applePosition)){
    createApple()
}else{
  appleArray.unshift(applePosition)
  console.log(`apple position: ${applePosition}`)
   shapeBody.children[applePosition].appendChild(newApple)
}

}


// CREATES BABY SNAKES FROM BLOCKS - Snake head 'blockA' and two body segments 'blockB and blockC'
const createShape = (a, b, c) =>{
    console.log(breadCrumbArr)
    let blockA = document.createElement('img') 
    let blockB = document.createElement('div') 
    let blockC = document.createElement('div') 
 
    blockA.setAttribute('id', 'snake-head')
    blockA.classList.add('go-down')
    blockA.classList.add('head-dimensions')
    blockA.src = 'snake head.png';
    console.log(blockA)
    blockB.classList.add('block-dimensions')
    blockC.classList.add('block-dimensions')
    blockArray.push(blockA, blockB, blockC)
    createApple()
    babySnakeDrop(a, b, c, blockA, blockB, blockC)

}


// code for different shapes, each shape is created by a separate function

let a;
let b;
let c;

const buildShape = () =>{
  a = 49
  b = 29
  c = 9 
  // push these three values to breadcrumb array
  breadCrumbArr.push(a, b, c)
createShape(a, b, c)
    console.log('building shape... ')
}



// function for dealing with activation of gamestate buttons, start pause refresh and kill game. Also added is pauseModal close and resume game after pause
const gameState = (identifyer) =>{
console.log(identifyer)
switch(identifyer){
   
   case 'Enter': 
    case 'start':
    case 'start-img':
               
       if(startCommandArr.length < 1){
        startBtn.style.backgroundColor = 'red'
        buildShape();
        startAudio.play()
        startCommandArr.unshift('start')
    }else{console.log('game already started')}

    break; 
    case 'refresh':
    case 'r':
    case 'refresh-img':
        if(startCommandArr.length < 1){
            location.reload()
        }else{console.log(' game must end in order to refresh')}
break;
}}




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