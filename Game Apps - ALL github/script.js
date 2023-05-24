// variables for game age stats
let blackJackOldAge = document.getElementById('blackjack_old_age');
let blackjacRevampAge = document.getElementById('blackJack_revamp_age')
let blackJackUpdatedAge = document.getElementById('blackjack_new_age');
let memoryAge = document.getElementById('memory_age');
let solitaireAge = document.getElementById('solitaire_age');
let puzzleAge = document.getElementById('15_piece_puzzle_age');
let tetrisDeskAge = document.getElementById('tetris_desktop_age');
let tetrisMobAge = document.getElementById('tetris_mobile_age');
let snakeDeskAge = document.getElementById('snake_desktop_age')

// get initial date of each game and assign a variable
let blackjackCreated = new Date('2022/04/30');
let blackjackRevampedCreated = new Date('2022/05/10');
let blackjackUpdated = new Date();
let memoryCreated = new Date();
let solitaireCreated = new Date();
let puzzleCreated = new Date();
let tetrisDeskCreated = new Date();
let tetrisMobCreated = new Date();
let snakeCreated = new Date(); 

console.log(blackjackCreated, blackjackRevampedCreated)



let blackjackOriginalEl = document.getElementById('game-1-thumbnail')
let blackjackRevampEl = document.getElementById('game-1b-thumbnail')
let blackjackNewEl = document.getElementById('game-2-thumbnail')
let memoryEl = document.getElementById('game-3-thumbnail')
let solitaireEl = document.getElementById('game-4-thumbnail')
let fifteenPuzzleEl = document.getElementById('game-5-thumbnail')
let tetrisDesktopEl = document.getElementById('game-6-thumbnail')
let tetrisMobileEl = document.getElementById('game-7-thumbnail')
let snakeEl = document.getElementById('game-8-thumbnail')

let gameElementsArr = [blackjackOriginalEl, blackjackRevampEl, blackjackNewEl, memoryEl, solitaireEl, fifteenPuzzleEl, tetrisDesktopEl, tetrisMobileEl, snakeEl]

let gifAddressArr = [
    './blackjack original.gif',
    './blackjack revamp.gif',
    './blackjack new.gif',
    './memory.gif',
    './solitaire.gif',
    './puzzle.gif',
    './tetris desktop.gif',
    './tetris mobile.gif',
    './snake.gif'
]


let imageAddressArr = [
    './games thumbnails/thumbnail blackjack original.png',
    './games thumbnails/thumbnail blackjack revamp 2.png',
    './games thumbnails/thumbnail blackjack.png',
    './games thumbnails/thumbnail memory.png',
    './games thumbnails/thumbnail solitaire.png',
    './games thumbnails/thumbnail 15 piece puzzle upgrade.png',
    './games thumbnails/thumbnail tetris desktop.png',
    './games thumbnails/thumbnail tetris mobile.png',
    './games thumbnails/thumbnail snake.png'
]

gameElementsArr.forEach(element =>{
    let imageIndex = gameElementsArr.indexOf(element)
 
    // on mouseover gif image of gample play replaces still image
    element.addEventListener('mouseover', function(){
        element.src = gifAddressArr[imageIndex]
    })

// on mouseout still image of game replaces gif
    element.addEventListener('mouseout', function(){
        element.src = imageAddressArr[imageIndex]
    })

})

