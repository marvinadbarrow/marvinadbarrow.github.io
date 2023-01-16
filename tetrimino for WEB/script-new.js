//GAME OPERATION BUTTONS
let startEl = document.getElementById('start')
let pauseEl = document.getElementById('pause')
let refreshEl = document.getElementById('refresh')

// TETRIMINO MANIPULATION BUTTONS
let moveLeftEl = document.getElementById('move-right')
let moveRightEl = document.getElementById('move-left')
let rotateEl = document.getElementById('rotate')


let shapeCreatorEl = document.getElementById('create-shapes')
let shapeBody = document.getElementById('shape-grid')
let pauseBtn = document.getElementById('pause-game')
arr = [0, 0, 0, 0] // to hold changing a, b, c, d values
let shapeClock; // variable for TIMER
let rightBoundaryArr;// for right boundary
let leftBoundaryArr;// for left boundary
let picker; // used to pick which rotation to render 90, 180, 270, or original


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
let iRotateArr = [[10, 20, 30], [1, 2, 3], [10, 20, 30], [1, 2, 3], 0]
//
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
let mergedArray = [] // contains merged version of all completed rows
let pauseIntervalArr = []
let tetrisBlockArr = []
let elementNum;
let rowNum;
let selectedShape;
let shapesPermutation;

// variables for rotated blocks
let rotateB;
let rotateC;
let rotateD;


// FLOOR LEVEL OBSTACLE
const floorObstacle = (a, b, c, d, blockA, blockB, blockC, blockD) =>{
    clearInterval(shapeClock) // stop clock and append tetrimino and remove 'descending' class
    console.log('FLOOR OBSTACLE')
    blockA.classList.remove('descending') // remove descending 'class'
    blockB.classList.remove('descending')
    blockC.classList.remove('descending')
    blockD.classList.remove('descending')
    rowDeleterArr = [] // contains all elements of complete rows cleared every time a tetrimino's fall is broken

    arr[0] = a; arr[1] = b; arr[2] = c; arr[3] = d;
    filledSquareArr.push(arr[0], arr[1], arr[2], arr[3])
    console.log(`filled squares: ${arr}`)
    console.log(filledSquareArr)
// if all rows are incomplete then drop the next shape

checkRowStatusFloor(filledSquareArr, allRowsArr)
}





// TETRIMINO OBSTACLE
const tetriminoObstacle = (a, b, c, d, blockA, blockB, blockC, blockD) =>{
    clearInterval(shapeClock) // stop clock and append tetrimino and remove 'descending' class
        console.log('TETRIMINO OBSTACLE')
    shapeBody.children[a-10].appendChild(blockA)
shapeBody.children[b-10].appendChild(blockB)
shapeBody.children[c-10].appendChild(blockC)
shapeBody.children[d-10].appendChild(blockD)


// looks like these still contain the 'descending' class so we probably have to remove them from here but let's just check by logging these. 
blockA.classList.remove('descending')
blockB.classList.remove('descending')
blockC.classList.remove('descending')
blockD.classList.remove('descending')

// after pieces are appended to final position - send containing div number to file squaresArr; values found in this array cannot be used as a, b, c, d values to append  to divs because the values correspond to divs that already have a block appeneded to them.  
arr[0] = a-10; arr[1] = b-10; arr[2] = c-10; arr[3] = d-10;
filledSquareArr.push(arr[0], arr[1], arr[2], arr[3])
console.log(`filled squares: ${arr}`)
console.log(filledSquareArr)

rowDeleterArr = []// contains all elements of complete rows cleared every time a tetrimino's fall is broken
checkRowStatusTetrimino(filledSquareArr, allRowsArr) // check row status
}




const dropFloaters = (array, rowMinumum, rowTotal) =>{
    console.log(rowTotal)
    console.log(array)
    // use row mini
    console.log(rowMinumum)
for(i=0; i <array.length; i++){if(array[i] < rowMinumum){
    if(shapeBody.children[array[i]].firstChild){
        shapeBody.children[array[i] + 10*rowTotal].appendChild(shapeBody.children[array[i]].firstChild);
        array[i] += 10*rowTotal;
        if(i > array.length - 2){
            console.log(array)
        }
    }


    if(i > array.length - 2){
        drawShape(shapeArr, indexNumArray[0])
    }    
}

}

}





let spliceArray = []
const clearRow = (rowElements, rowTotal) =>{

// check correct full row displays
let splicedElements;
let arrayLength = rowElements.length
console.log(rowElements)



for(i=0; i < rowElements.length; i++){
    if(shapeBody.children[rowElements[i]].firstChild){
    shapeBody.children[rowElements[i]].removeChild(shapeBody.children[rowElements[i]].firstChild) // remove all children from divs matching rowElement number
    let iSquare = filledSquareArr.indexOf(rowElements[i]) // find index of specific value in filled square
filledSquareArr.splice(iSquare,1) // remove that value from the array
}

}

// only drop elements once ALL row blocks have been cleared and all elements are removed from filledSquareArr array. 
if( i > rowElements.length - 2){
    console.log(filledSquareArr)
    dropFloaters(filledSquareArr, rowElements[0], rowTotal)
}

}



// CHECK IF ANY FILLED ROWS EXIST (from tetrimino obstacle or floor obstacle)
const checkRowStatusTetrimino = (array, rowArray) =>{

    let completeTrue = 0; 
    let completeFalse = 0;
    // array is the array of filled squares, and row array is the entire set of divs separated by rows of 10 elements - 
// use array.every to check if all rows to see if filledsquaresArray contains all numbers of any of the checked rows. It it does that means that the entire row is filled with blocks, so the specific row needs the blocks cleared and the blocks need to descend to the next row (unless the blocks are on the bottom row)
    for(i=0; i < rowArray.length; i++){
        let rowX = rowArray[i]
    let rowchecker = rowX.every(rowX =>{
               return array.includes(rowX)
    })
    if(rowchecker === true){rowDeleterArr.push(...rowX);
        console.log(rowDeleterArr, rowDeleterArr.length) // check that 'unique' full rows are contained in row delete array so that 'ALL' rows can be deleted within the one function (clearRow())
        completeFalse +=1;
      
   
        if(i > rowArray.length - 1){
            if(completeTrue > 0){
         clearRow(rowDeleterArr, completeTrue) // complete true will be used for drop floaters; if number os rows cleared is 'x' then then all floating blocks will be appended to (a, b, c or d) + 10*x
         console.log(completeTrue)
        }
        }
         

    }else{completeFalse += 1; if(completeFalse ===20){
console.log(`non full rows: ${completeFalse}`); 
if(indexNumArray[0] < 7){
    drawShape(shapeArr, indexNumArray[0]) // eventually, indesNumArray[0] will have the value '6' which is the value associated with the final tetrimino shape. Somewhere along the lines there must be a condition that stops the process if index < 7 is no longer true - FIND THAT CONDITION. 
    }else{
        shapeArr = []
        allShapesArr = []
    indexNumArray = []
    shapeContainerArr = []
        buildShape()}
}} 
console.log(rowchecker)
//if(rowchecker === true){clearRow(rowX, array)}
}

}









// CHECK IF ANY FILLED ROWS EXIST (from tetrimino obstacle or floor obstacle)
const checkRowStatusFloor = (array, rowArray) =>{

    let completeTrue = 0; 
    let completeFalse = 0;
    // array is the array of filled squares, and row array is the entire set of divs separated by rows of 10 elements - 
// use array.every to check if all rows to see if filledsquaresArray contains all numbers of any of the checked rows. It it does that means that the entire row is filled with blocks, so the specific row needs the blocks cleared and the blocks need to descend to the next row (unless the blocks are on the bottom row)
    for(i=0; i < rowArray.length; i++){
        let rowX = rowArray[i]
    let rowchecker = rowX.every(rowX =>{
               return array.includes(rowX)
    })
    if(rowchecker === true){rowDeleterArr.push(...rowX);
        console.log(rowDeleterArr, rowDeleterArr.length) // check that 'unique' full rows are contained in row delete array so that 'ALL' rows can be deleted within the one function (clearRow())
        completeTrue +=1;
      
   
        if(i === rowArray.length - 1){
            console.log(rowArray.length, i)
            console.log(`filled rows: ${completeTrue}`)
         clearRow(rowDeleterArr, completeTrue)
         
        }
         

    }else{completeFalse += 1; console.log(`unfilled rows: ${completeFalse}`)
    if(completeFalse  === 20){
console.log('no full rows, drop next piece')
if(indexNumArray[0] < 7){
    drawShape(shapeArr, indexNumArray[0]) // eventually, indesNumArray[0] will have the value '6' which is the value associated with the final tetrimino shape. Somewhere along the lines there must be a condition that stops the process if index < 7 is no longer true - FIND THAT CONDITION. 
    }else{
        shapeArr = []
        allShapesArr = []
    indexNumArray = []
    shapeContainerArr = []
        buildShape()}
    }} 
console.log(rowchecker)
//if(rowchecker === true){clearRow(rowX, array)}
}

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


console.log(tetrisBlockArr)


document.addEventListener('click', function(e){



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




    // if an arrow key is pressed change the value of a, b, c and d. And use those new values to dictate which grid child(square) is appended to 
    switch(e.target.id){
        case 'move-right': console.log('right arrow pressed');
// if a, b, c or d is increased by 1 and the value results in a number that corresponds to a boundary square; do nothing - else, increase the value of the variables a, b, c and d,  by '1' and append blocks to grid square positions that correspond to the letter values. 
if(leftBoundaryArr.includes(a+1)  || leftBoundaryArr.includes(b+1)  || leftBoundaryArr.includes(c+1)  || leftBoundaryArr.includes(d+1)  || pauseIntervalArr.length > 0){
console.log('cannot move right: BOUNDARY')
}else{

    // values contained in filledSquareArr cannot be used to append blocks to empty squares
    if(filledSquareArr.includes(a+1) || filledSquareArr.includes(b+1) || filledSquareArr.includes(c+1) || filledSquareArr.includes(d+1) || pauseIntervalArr.length > 0){console.log('collision detected: CANNOT MOVE PIECE')}else{
        a += 1;  b += 1;  c += 1;  d += 1;
        MoveRightLeft(a, b, c, d, e.key)

    }

}
 break;
 case 'move-left': console.log('Left arrow pressed')
// if a, b, c or d is decreased by 1 and the value results in a number that corresponds to a boundary square; do nothing - else, decrease the value of the variables a, b, c and d,  by '1' and append blocks to grid square positions that correspond to the letter values.

if(rightBoundaryArr.includes(a-1)  || rightBoundaryArr.includes(b-1)  || rightBoundaryArr.includes(c-1)  || rightBoundaryArr.includes(d-1) || pauseIntervalArr.length > 0){
    console.log('cannot move left: BOUNDARY')
    }else{

            // values contained in filledSquareArr cannot be used to append blocks to  squares; because the squares associated with those numbers are already filled. 
        if(filledSquareArr.includes(a-1) || filledSquareArr.includes(b-1) || filledSquareArr.includes(c-1) || filledSquareArr.includes(d-1) || pauseIntervalArr.length > 0){console.log('collision detected: CANNOT MOVE PIECE')}else{
          
    a -= 1;  b -= 1;  c -= 1;  d -= 1;
    MoveRightLeft(a, b, c, d, e.key)
            
        }

}





        break;
        // UP ARROW rotates tetriminos
        // if pause button is pressed we will not allow rotation as it seems to cause a conflict if allowed - and is redundant anyway because it would be a means of cheating or is generally not required, especially if the pause it to allow row clearance and floating tetrimino drop
        case 'rotator': console.log('Up arrow pressed')
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
    // end of switch and descending requirements this seems to be working. 



console.log(e.target.id)
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

tetriminoObstacle(a, b, c, d,blockA, blockB, blockC, blockD)


   //console.log(blockA, blockB, blockC, blockD)


 }else{ // d still less than 190 so tetrimino gets appended on a + 10, b +10... etc
    shapeBody.children[a].appendChild(blockA)
    shapeBody.children[b].appendChild(blockB)
    shapeBody.children[c].appendChild(blockC)
    shapeBody.children[d].appendChild(blockD)

   
   // console.log(blockA, blockB, blockC, blockD)// check that these blocks have 'descending' class added
 }
        
    
}else{ // BOTTOM BOUNDRAY COLLISION when d <= 190
floorObstacle(a, b, c, d, blockA, blockB, blockC, blockD)
}
  },500);

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

let a1 = 24
let a2 = 4

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

    case 7:shapeCreator(a2, iRotateArr[0], actualColor, 'I')
    break;
    }

}


// use array data to draw shape
const drawShape = (array, index) =>{
    let i;
    console.log(`index: ${index}`)
 i = index % 7
    // index of array of randomly generated tetrimino numbers
   let newIndex = i + 1; // increase index by '1' and assign it a variable
   indexNumArray.unshift(newIndex)// place new variable in array for retrieval of new index - next time drawShape is run, the index will be previous index + 1, so next shape will be generated. 
   console.log(newIndex)
  //  console.log(indexNumArray)
displayShape(array[i]) // send array[original index] to displayShape to get color

   }

// MATHEMATICALLY create shapes
const buildShape = () =>{
selectedShape = Math.floor(Math.random()*7 + 1) // generate num 1<= num <= 7
if(shapeArr.length < 7){// if array has less than 7 unique numbers
if(shapeArr.includes(selectedShape)){// if array includes current number
buildShape()// re run number generation
    }else{// number is new so push to array
        shapeArr.push(selectedShape);
        buildShape()// run number generation again until array is full
        }
       
   }else{drawShape(shapeArr, 0)} // array has 7 numbers so start drawShape process with index '0' for first number, and the completed array
}

// START RANDOM TETRIMINO CREATION











startEl.addEventListener('click', function(){
    if(startCommandArr.length < 1){
        buildShape();
        startCommandArr.unshift('start')
    }else{console.log('game already started')}


})


pauseEl.addEventListener('click', function(){
if(pauseIntervalArr.length < 1){pauseIntervalArr.push('pause')
     clearInterval(shapeClock)
    }else{ pauseIntervalArr.pop()
        tetriminoDrop(arr[0], arr[1], arr[2], arr[3],tetrisBlockArr[5], tetrisBlockArr[4],tetrisBlockArr[0], tetrisBlockArr[1], tetrisBlockArr[2], tetrisBlockArr[3])
            // this works - all the details popped back into tetriminoDrop(a, b, c, d, letter, blockA, blockB, blockC, blockD) allows the tetrimino to continue dropping.  Maybe we can use this to 'pause' the tetrimino drop while the complete rows are deleted and the floating tetrimino blocks are dropped.  Then we can 'unpause' the drop, making sure new blocks are already created. 

    }


})