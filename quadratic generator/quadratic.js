  


//let elementEl = document.getElementById("-el");



let coeffAaEl = document.getElementById("coeffa-el");
let coeffBbEl = document.getElementById("coeffb-el");
let coeffCcEl = document.getElementById("coeffc-el");


let xSquareEl = document.getElementById("squared-el")

let xEl = document.getElementById("x-el")
let constantEl = document.getElementById("constant-el") 




function squareX(){

 let xSquared = Math.floor(Math.random() * 99 +1)

 xSquareEl.textContent = xSquared 
 
 coeffAaEl.textContent = "a = " + xSquared
 
 
 }

function xCoefficient(){

 let xOne = Math.floor(Math.random() * 99 +1)

xEl.textContent = xOne 

 coeffBbEl.textContent = "b = " + xOne
 
   let bSquare = Math.pow(xOne,2)

 console.log(bSquare)
 
 }

 
function constantNum(){
 
 let cNumber = Math.floor(Math.random() * 99 +1)
 
 constantEl.textContent = cNumber
 
 
  coeffCcEl.textContent = "c = " + cNumber
 
}

function solveX(){
 

 
 
 
 }
 
 // practice object - function
 let person = {
  name: "Marvin",
  age: 49,
  country:" United Kingdom"
   }
   
   function logData(){
 console.log( person.name + " is " + person.age + " years old, and lives in the " + person.country)
     
   }
   
// practice if-else
 
 logData()
 
 let age = 67
 
let message = ""

if (age <= 5){ console.log("free") } else if (age <= 17){message = "child discount" }
 else if (age <= 26 ){ message = "student discount" }
 
else if (age <= 66){message = "full price" }
else {message = "senior citizen discount" }
 

 console.log(message)
 
 // practice loops and arrays
 
 
 let largeCountries = ["Tuvalu", "India", "USA", "Indonesia", "Monaco"]
 
 largeCountries.pop()
largeCountries.push("Pakistan")
largeCountries.shift()
largeCountries.unshift("China")
 // shift works at the opposite end of pop
 // unshift works at the opposite end of push
 
 for (let i = 0; i < largeCountries.length; i++){ console.log("-" + largeCountries[i])}
 


// practice logical AND operator
 
 let weekDay = "Wednesday"
 let monthDay = 13
 
 if (weekDay === "Friday" && monthDay === 13){ console.log( "oh oh" )}
 
 // practice rock paper scissors - quite an easy game
 
 let hands =["rock", "paper", "scissors"]
 
 function randomHands(){
    let randomHandShape = Math.floor(Math.random() * 3 );
return hands [randomHandShape]
}
console.log(randomHands())


// practice using arrays, for loops and if/else statements



 
 let fruit = ["apple","orange","apple","apple","orange"]
 let appleShelf = document.getElementById("apple-shelf-el")
  let orangeShelf = document.getElementById("orange-shelf-el")
  
  function fruitShelf(){
for ( i = 0; i < fruit.length; i ++){


 if(i<1){appleShelf.textContent = fruit[i] + " "}
 else if(i<2){orangeShelf.textContent += fruit[i] + " "}
 else if(i<4){appleShelf.textContent += fruit[i] + " "}
 else {orangeShelf.textContent += fruit[i]}
 }

  }
  
fruitShelf()

/* notes on if statements. Simba just used if fruit[i] === "apple" then he used appleshelf.textContent = "apple"  that way, you only need one 'if' with apples, and all other 'else if' will be orange and therefore the apples will go to appleshelf.textContent will contain all added apples. */
