function revealOne(){
    if(tableArray.length > 51 ){
let numElOne = tableArrayIndex[0];

 // COPY THE BELOW to other functions and adjust as needed
if(flipArray.includes(numElOne) && numElOne === flipArray[0]){ flipArray.shift(); document.getElementById("card1").src="card back red.jpg"; playSound();} 
 else if(flipArray.includes(numElOne) && numElOne === flipArray[1]){ flipArray.pop();  document.getElementById("card1").src="card back red.jpg"; playSound();}
 else{revealCard()}
// COPY THE ABOVE function and adjust as needed

function revealCard(){
if (flipArray.length < 2 && !pairsArray.includes(numElOne) ){flipArray.push(numElOne); card1.src = cardSelect[numElOne - 1]; playSound();}
//console.log(flipArray);
 pairFound(); 
 }}}
   

// refactor so that one function deals with all cards



 function cardOne(){
    x = tableArrayIndex[0];
    y = document.getElementById("card1")
flipCard(x,y);
 }


function flipCard(valX,valY);
if(tableArray.length > 51 ){
 if (flipArray.includes(valX)){
if(valX === flipArray[0]){ flipArray.shift();} 
 else if(valX === flipArray[1]){ flipArray.pop();}
 valXY.src ="card back red.jpg"; playSound();}
 else{if (flipArray.length < 2 && !pairsArray.includes(valX) ){flipArray.push(valX); card1.src = cardSelect[valX - 1]; playSound();}
 if (flipArray.length === 2){pairFound()}; 
 }}

