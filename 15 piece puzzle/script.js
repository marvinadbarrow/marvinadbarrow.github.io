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
let progressEl = document.getElementById('progress-bar')
let emptyDiv = []
var orderArray = []
var permutedArray = []
var permutedArraySpread = []
var mixArray = []
var mixStatusArr = []


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

// mix button
let mixBtn = document.getElementById('mix-btn')

var buttonArray = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10, btn11, btn12, btn13, btn14, btn15]




const loadButtons = () =>{
    for(i=0; i < mixArray.length; i++){
               puzzleEl.children[mixArray[i]].appendChild(buttonArray[i])
            
}

}

const mixButtons = () =>{
    if(mixArray.length > 14){loadButtons(mixArray)}
    let numbers = Math.ceil(Math.random()*15)
    if(mixArray.length < 15){
if(!mixArray.includes(numbers)){mixArray.push(numbers);mixButtons()}else{mixButtons()}
}

}


mixBtn.addEventListener('click', function(){
    if(mixStatusArr.length < 1){
        mixStatusArr.push('MIX BUTTONS')
        mixButtons()
    }else{messageEl.textContent = "refresh page for new game"}


})


// object containing all of the neighbours of each div.  The neighbours will be evalueated and if empty, the clicked button will move either x, -x, y or -y, to move into the empty div element. 
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



const indicator = (button) => {

let index = button.innerHTML -1;

// we're seeing if the clicked button's innerHTML number matches the button number inside the puzzle div with the same index number.  If there is a match it means that the button is in the correct div. 
let indexChild = puzzleEl.children[index].firstChild

if(indexChild == button){
    console.log('button is in correct place')
    progressEl.children[index].style.cssText = 'background-color:blue;'
}else{
    console.log('button in wrong place');
     console.log(progressEl.children[index])
     progressEl.children[index].style.backgroundColor = 'yellow'
        }
    // GREAT - APPLICATION IS FINISHED. 

}




const gameState = (array) =>{
   
    // function to test if previous value current value is greater than previous value in an arraya
    const gameStateCheck = (currentValue, previousValue) => currentValue > previousValue;

    let isGameOver = array.every(gameStateCheck)
    switch(isGameOver){
case true:
messageEl.textContent = 'puzzle complete'
break;
default:
    messageEl.textContent = 'not there yet'

    }

   
    }// end of for loop





// create permutation array so consecutive numbers can be color matched. 
const getPermutation = (array) =>{
  permutedArray = [] // clear permuted array to display new permutation
array.forEach(element => {

// extract integers from id's and push to permuted arrays in position order
    if(element){
       let numberExtract = element.id
       let reg = /\d+/g;
       let result = numberExtract.match(reg)
       permutedArray.push(result)
    }
});
// spread permuted valuies into one array
permutedArraySpread = [].concat(...permutedArray)
gameState(permutedArraySpread)
    }



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
}




// AMAZING, THIS ACTUALLY WORKS. WOW. 
const moveSquare = (square) =>{
 let divId = square.parentNode.id // id of div is also a key in the object
 let objIndex = neighboursObj[`${divId}`] // get key value (which is an array)
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
    }
      }
      
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










