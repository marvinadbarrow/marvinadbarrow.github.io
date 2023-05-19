


let blackjackOriginalEl = document.getElementById('game-1-thumbnail')
let blackjackNewEl = document.getElementById('game-2-thumbnail')
let memoryEl = document.getElementById('game-3-thumbnail')
let solitaireEl = document.getElementById('game-4-thumbnail')
let fifteenPuzzleEl = document.getElementById('game-5-thumbnail')
let tetrisDesktopEl = document.getElementById('game-6-thumbnail')
let tetrisMobileEl = document.getElementById('game-7-thumbnail')
let snakeEl = document.getElementById('game-8-thumbnail')

let gameElementsArr = [blackjackOriginalEl, blackjackNewEl, memoryEl, solitaireEl, fifteenPuzzleEl, tetrisDesktopEl, tetrisMobileEl, snakeEl]

let gifAddressArr = [
    './games thumbnails/vids for GIF conversion/blackjack original.gif',
    './games thumbnails/vids for GIF conversion/blackjack revamp.gif',
    './games thumbnails/vids for GIF conversion/memory.gif',
    './games thumbnails/vids for GIF conversion/solitaire.gif',
    './games thumbnails/vids for GIF conversion/puzzle.gif',
    './games thumbnails/vids for GIF conversion/tetris desktop.gif',
    './games thumbnails/vids for GIF conversion/tetris mobile.gif',
    './games thumbnails/vids for GIF conversion/snake.gif'
]


let imageAddressArr = [
    './games thumbnails/thumbnail blackjack original.png',
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

