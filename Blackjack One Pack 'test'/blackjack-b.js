

let dealerArray =[]
let playerArray =[]

let message1 = "Draw!"
let message2 = "You Lose! "
let message3 = "You win! "
let message4 = "Hit Stand"
let message5 = "Five Card Trick!"
let finalMessage = " "

let instructionEl = document.getElementById('instructions-el')
let instruction1 = "Your turn: Deal your hand!"
let instruction2 = "If Dealer is HOLDING, you must pick a card, otherwise STAND if you wish (dealer will reveal)"
let instruction3 = "Got 21? Dealer can't beat that but could match you: Hit STAND"
let instruction4 = "Sorry! You lose this time!"
let instruction5 = "Dealer MUST hold; Can you pick a WINNING card? GO!" 
let instruction6 = "Keep trying"
let instruction7 = "You got LUCKY, try or STAND? If dealer HOLDS you must play though!"
let instruction8 = "GOOD; you got a DRAW!"
let instruction9 = "HOORAY! - you're a WINNER!"
let instruction10 = "WHOA!, the perfect DRAW!"
let instruction11 = "KABOOM! The FIVE card Trick; 'you SUPERSTAR' -- you WIN"


let cardSuits = [ 
"1.png","2.png","3.png","4.png",
"4.png","6.png","7.png","8.png",
"9.png","10.png","11.png","12.png",
"13.png","14.png","15.png","16.png",
"17.png","18.png","19.png","20.png",
"21.png","22.png","23.png","24.png",
"25.png","26.png","27.png","28.png",
"29.png","30.png","31.png","32.png",
"33.png","34.png","35.png","36.png",
"37.png","38.png","39.png","40.png",
"41.png","42.png","43.png","44.png",
"45.png","46.png","47.png","48.png",
"49.png","50.png","51.png","52.png",]



function dealGame(){
	if (dealerArray.length < 2){
let cardOne = Math.ceil(Math.random() * cardSuits.length);
let sum1 = Math.ceil(cardOne/4) 

let cardTwo = Math.ceil(Math.random() * cardSuits.length);
let sum2 = Math.ceil(cardTwo/4) 

if (sum1 === sum2) {dealGame()}
		else {

	if (sum1>10){sum1 = 10} else if (sum1<2){sum1 = 11}
	if (sum2>10){sum2 = 10} else if (sum2<2){sum2 = 11}
	console.log (sum1 + sum2)

	let chooseImage1 = cardSuits[cardOne -1]
	let chooseImage2 = cardSuits[cardTwo -1]
	card7.src = chooseImage1
	card8.src = chooseImage2
	dealerArray.push(sum1)
	dealerArray.push(sum2)
	console.log(dealerArray)
	sumb = dealerArray.reduce((partialSum, a) => partialSum + a, 0);

	document.getElementById("dealer-sum-el").value = sumb
	//document.getElementById("display-el").value += dealerArray
	document.getElementById("card9").style.opacity = "100"
	instructionEl.textContent = instruction1

if (sumb > 19){instructionEl.textContent = instruction5}

                    }

	}
}

function randomCardYou(){

if (dealerArray.length > 1 && playerArray < 3){
let cardOne = Math.ceil(Math.random() * cardSuits.length);
let sum1 = Math.ceil(cardOne/4) 
let cardTwo = Math.ceil(Math.random() * cardSuits.length);
let sum2 = Math.ceil(cardTwo/4) 
document.getElementById("card3").style.opacity = "0"

if (sum1>10){sum1 = 10} else if (sum1<2){sum1 = 11}
if (sum2>10){sum2 = 10} else if (sum2<2){sum2 = 11}

if (sum1 === sum2) {randomCardYou()}
else {
let chooseImage1 = cardSuits[cardOne -1]
let chooseImage2 = cardSuits[cardTwo -1]

card1.src = chooseImage1
card2.src = chooseImage2
document.getElementById("card3").style.opacity = "100"

playerArray.push(sum1)
playerArray.push(sum2)
console.log(playerArray)

sum =  playerArray.reduce((partialSum, a) => partialSum + a, 0);
//document.getElementById("display-yours-el").value = playerArray;
document.getElementById("your-sum-el").value = sum
sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);

if (sum === 21){console.log(message4); instructionEl.textContent = instruction3} else if (sum > 21){instructionEl.textContent = instruction2} else {instructionEl.textContent = instruction2} 

}
  }
			}







function nextCardYou3(){

if (dealerArray.length > 1 && playerArray.length > 1 && playerArray.length < 3 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}

playerArray.push(sumPlus)
console.log(playerArray)

let chooseImagePlus = cardSuits[cardPlus -1]
card3.src = chooseImagePlus
sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);

document.getElementById("your-sum-el").value = sumbAll
//document.getElementById("display-yours-el").value = playerArray;
document.getElementById("card4").style.opacity = "100"
if (sumbAll === 21){console.log(message4); instructionEl.textContent = instruction3} else if (sumbAll > 21){ instructionEl.textContent = instruction4} else {instructionEl.textContent = instruction2}
		}
			}






function nextCardYou4(){
  if (dealerArray.length > 1 && playerArray.length > 2 && playerArray.length < 4 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}
let chooseImagePlus = cardSuits[cardPlus -1]
card4.src = chooseImagePlus

playerArray.push(sumPlus)
console.log(playerArray)

sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);
//const sum = playerArray.reduce((partialSum, a) => partialSum + a, 0);
//console.log(sum)


document.getElementById("your-sum-el").value = sumbAll
//document.getElementById("display-yours-el").value = playerArray;
document.getElementById("card5").style.opacity = "100"


if (sumbAll === 21){console.log(message4); instructionEl.textContent = instruction3} else if (sumbAll > 21){ instructionEl.textContent = instruction4} else {instructionEl.textContent = instruction7}
}}









function nextCardYou5(){
  if (dealerArray.length > 1 && playerArray.length > 3 && playerArray.length < 5 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}
let chooseImagePlus = cardSuits[cardPlus -1]
card5.src = chooseImagePlus

playerArray.push(sumPlus)
//console.log(playerArray)

sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);
//const sum = playerArray.reduce((partialSum, a) => partialSum + a, 0);
//console.log(sum)

document.getElementById("your-sum-el").value = sumbAll
//document.getElementById("display-yours-el").value = playerArray;
document.getElementById("card6").style.opacity = "100"


if (sumbAll === 21){console.log(message4); instructionEl.textContent = instruction3} else if (sumbAll > 21){ instructionEl.textContent = instruction4} else {instructionEl.textContent = instruction2}
}}





function nextCardYou6(){
  if (dealerArray.length > 1 && playerArray.length > 4 && playerArray.length < 6 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}
let chooseImagePlus = cardSuits[cardPlus -1]
card6.src = chooseImagePlus

playerArray.push(sumPlus)
//console.log(playerArray)

sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);

//const sum = playerArray.reduce((partialSum, a) => partialSum + a, 0);
//console.log(sum)

document.getElementById("your-sum-el").value = sum
//document.getElementById("display-yours-el").value = playerArray;


if (sumbAll === 21){console.log(message4); instructionEl.textContent = instruction3} else if (sumbAll > 21){ instructionEl.textContent = instruction4} else {instructionEl.textContent = instruction2}
}}


function myTest(){console.log("hello")
if (playerArray.length > 1 && dealerArray.length >1 && sumb < 20 && sumbAll <22 && sum < 22){
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
		let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}
		dealerArray.push(sumPlus)
		console.log(dealerArray)		
sumb = dealerArray.reduce((partialSum, a) => partialSum + a, 0);
		console.log(sumb)

sumbAll = playerArray.reduce((partialSum, a) => partialSum + a, 0);
		console.log(sum)

let chooseImagePlus = cardSuits[cardPlus -1]
		card9.src = chooseImagePlus

document.getElementById("dealer-sum-el").value = sumb
		//document.getElementById("display-yours-el").value = finalMessage

// rules for outcomes
if (sumbAll === sumb){console.log(message1); instructionEl.textContent = instruction8} 

else if (sumb < 21 && sumbAll < sumb || sumbAll > 21){console.log(message2);  instructionEl.textContent = instruction4} 

else if (sumbAll < 21 && sumb < sumbAll || sumb >21) {console.log(message3);  instructionEl.textContent = instruction9} 

else if (sumb = 21 && sumbAll < 21){console.log(message2); cardPlus = 0; card9.src = "back.png";  instructionEl.textContent = instruction4} 


else if (playerArray.length >4  && sumbAll <22){console.log (message5); instructionEl.textContent = instruction11} 

if (sumb === 21 && sumbAll === 21){ instructionEl.textContent = instruction10}
}
}

function testFx(){
location.reload();
}