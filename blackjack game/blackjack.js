  

let cards = []; // array;
let sum = 0;
    

let hasBlackJack = false;
let isAlive = false;
let message = "";

let messageEl = document.getElementById("message-el");
let sumElB = document.getElementById("sum-el-b");
let cardsEl = document.getElementById("cards-el");

let player ={
 
 name: "Marvin",
chips: 180
 
};


let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

// creating random numbers

function randomCardGenerator(){

//let randomNumber = Math.random() * 11 +1
 let randomCard = Math.floor(Math.random() * 13 +1);
 
if (randomCard <2){return 11} else if (randomCard > 10){return 10}

 return randomCard ;}

// no need for else {return randomNUmber}, because that's happens anyway with all the rest of the number. 
// realized my mistake, I was supposed to use triple equals sign for exact numbers i.e. if (randonCard === 1) 
/*excellent.... this piece of code above means that if you get a 1 it is treated as an 11,  or else if you get anything above above 10, i.e. jack, queen or king which are 11, 12 and 13 respectively, it will be treated as a 10. So either you get a 1(which will be treated as 11) or you will get 11, 12, or 13 which will be treated as 10, or else, the remaining option is that for any random number 'x' you must have '1 < x < 11', and those numbers will be unaltered*/
 



function startGame(){
 
     let firstCard = randomCardGenerator()
let secondCard = randomCardGenerator()
cards = [firstCard,secondCard]
     // array
 sum = firstCard + secondCard 
 
 renderGame()
 }

   function renderGame(){
     let isAlive = true

    cardsEl.textContent = "Cards: "
    for ( let i = 0; i < cards.length; i++){
          cardsEl.textContent += cards[i] + " "
      sumElB.textContent = "sum: " + sum;
    
    }
    
   
     
    if (sum <= 20){ message ="do you want to draw another card?" }
else if (sum === 21){message = "You've won this round."
hasBlackJack = true}

else { message ="You lose!"
isAlive = false
}
messageEl.textContent = message
   }
   

   
   /* */
 function newCard(){
 if(sum <= 21 && hasBlackJack === false){
  
 let card = randomCardGenerator();
 cards.push(card);
sum = sum + card;
renderGame() ;
 }

      }











// returning values using a function and then accessing the value
let player1Time = 102
let player2Time = 107

function getTotalRaceTime(){
 
 return player1Time + player2Time
 
}

let totalRaceTime = getTotalRaceTime()

console.log(totalRaceTime)

function getRandomCard(){
 
 return 5
}






// LOGICAL 'and OPERATOR practice - the person performing the challenge is stuck at the moment
// she has a number of hints, but if the hints are over and she is still stuck
// then the solution ill be displayed ---- code:
let hasSolvedChallenge = false
let hasHintsLeft = false

if (hasSolvedChallenge === false && hasHintsLeft === false){
 
 showSolution()
}

function showSolution(){
 
 console.log("Showing the solution....")
}

/* so for the card game the logic we need is two fold... the new card function needs to stop if a) we get Blackjack, or b) our a new card takes us over 21 which means that 'isAlive' = false. so maybe we use if(isAlive === false or hasBlackJack === true) { disable new button - don't know how to do that} the actual sign for 'or' is ||
 */
// example of the logical 'or' operator in use

let likesDocumentaries = true
let likesStartups = true

function recommendMovie(){
 
 console.log("hey, check out this new film we think you will like!")
 
}

if (likesDocumentaries === true || likesStartups === true){
 
 recommendMovie()
 
}

/* in order to use the logical and/or operator to stop the new card function, you can do the converse which is use it to activate the operations inside the newCard() function. in other words inside the function we would write.... if (isAlive = true && hasBlackJack = false){ then run these operations.. which are alerady inside the function, just cut and paste them inside the curly brackets of the if statement} */