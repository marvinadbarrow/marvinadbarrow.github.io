

let dealerArray =[]
let playerArray =[]



// in game screen prompts and outcome readout
let instructionEl = document.getElementById('instructions-el')
let instruction1 = "Your turn: Deal your hand!"
let instruction2 = "If Dealer is HOLDING, you must pick a card, otherwise STAND if you wish (dealer will reveal)"
let instruction3 = "Got 21? Dealer can't beat that but could match you: Hit STAND"
let instruction4 = "Sorry! You lose this time!"
let instruction5 = "Dealer MUST hold; Can you pick a WINNING card? GO!" 
let instruction5b = " 'Still alive'. Pick ANOTHER card"
let instruction6 = " 'Keep trying'. You still have a CHANCE "
let instruction7 = "You got LUCKY, try or STAND? If dealer HOLDS you must play though!"
let instruction8 = "GOOD; you got a DRAW!"
let instruction9 = "HOORAY! - you're a WINNER!"
let instruction10 = "WHOA!, the perfect '21' DRAW!"
let instruction11 = "KABOOM! The FIVE card Trick; 'you SUPERSTAR' -- you WIN"
let instruction12 = " 'STALEMATE - GAMEOVER' "

// in game sounds
let audio = new Audio("cardflip.mp3"); // card flip 
var audio2 = new Audio("boopstart.mp3"); // stand 
var audio3 = new Audio("twentyonewait.mp3"); // player gets 21 - awaits dealer reveal 
var audio4 = new Audio("youlose.mp3"); // lose 
var audio5 = new Audio("dealerovernineteen.mp3"); // dealer gets 20 or 21
var audio5b = new Audio("firsttry5b.mp3") // after first attempt on dealer hold
let audio6 = new Audio("keeptrying6.mp3"); // after second attmpt on dealer hold
let audio7 = new Audio("yougotlucky7.mp3"); // after third attempt on dealer hold
var audio8 = new Audio("normaldrawclapping.mp3") // both get same number
var audio9 = new Audio("tadaa.mp3"); // win 
var audio10 = new Audio("perfectdraw.mp3")// both DRAW on 21
var audio11 = new Audio("fivecardtrick.mp3") // five card trick


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
	audio.play()
	let chooseImage1 = cardSuits[cardOne -1]
	let chooseImage2 = cardSuits[cardTwo -1]
	card7.src = chooseImage1
	card8.src = chooseImage2
	dealerArray.push(sum1)
	dealerArray.push(sum2)
	console.log(dealerArray)
	sumb = dealerArray.reduce((partialSum, a) => partialSum + a, 0);

	document.getElementById("dealer-sum-el").value = sumb
		document.getElementById("card9").style.opacity = "100"
	instructionEl.textContent = instruction1

if (sumb > 19){instructionEl.textContent = instruction5; audio5.play();}

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

audio.play(); 
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
document.getElementById("your-sum-el").value = sum
sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);

if (sum === 21){instructionEl.textContent = instruction3;audio3.play();} 
else if (sumb > 19){instructionEl.textContent = instruction5b; audio5b.play();} 
else if (sumb === 21 && sum > 19){instructionEl.textContent = instruction9; audio9.play();}
 else if (sumb === 20 && sum > 19){instructionEl.textContent = instruction12; audio2.play();}
else {instructionEl.textContent = instruction2}

}
  }
			}







function nextCardYou3(){

if (dealerArray.length > 1 && playerArray.length > 1 && playerArray.length < 3 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}

audio.play(); 
playerArray.push(sumPlus)
console.log(playerArray)

let chooseImagePlus = cardSuits[cardPlus -1]
card3.src = chooseImagePlus
sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);

document.getElementById("your-sum-el").value = sumbAll
//document.getElementById("display-yours-el").value = playerArray;
document.getElementById("card4").style.opacity = "100"

if (sumbAll === 21 && sumb < sumbAll){instructionEl.textContent = instruction3;audio3.play();} // hit stand instruction
else if (sumbAll === 21 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if (sumbAll === 20 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if(sumbAll>21){ instructionEl.textContent = instruction4; audio4.play();}
else if (sumb > 19 && sumbAll < 21){instructionEl.textContent = instruction6; audio6.play();}
else if(sumb > 19 && sumbAll > 21){ instructionEl.textContent = instruction4; audio4.play();} 
else {instructionEl.textContent = instruction2} 
		}
			}






function nextCardYou4(){
  if (dealerArray.length > 1 && playerArray.length > 2 && playerArray.length < 4 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}

audio.play(); 
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


if (sumbAll === 21 && sumb < sumbAll){instructionEl.textContent = instruction3;audio3.play();} // hit stand instruction
else if (sumbAll === 21 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if (sumbAll === 20 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if(sumbAll>21){ instructionEl.textContent = instruction4; audio4.play();}
else if (sumb > 19 && sumbAll < 21){instructionEl.textContent = instruction7; audio7.play();}
else if(sumb > 19 && sumbAll > 21){ instructionEl.textContent = instruction4; audio4.play();} 
else {instructionEl.textContent = instruction2} 

}}









function nextCardYou5(){
  if (dealerArray.length > 1 && playerArray.length > 3 && playerArray.length < 5 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}

audio.play(); 
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


if (sumbAll === 21 && sumb < sumbAll){instructionEl.textContent = instruction3;audio3.play();} // hit stand instruction
else if (sumbAll === 21 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if (sumbAll === 20 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if(sumbAll > 21){ instructionEl.textContent = instruction4; audio4.play()} 
else {instructionEl.textContent = instruction2}
}}





function nextCardYou6(){
  if (dealerArray.length > 1 && playerArray.length > 4 && playerArray.length < 6 && sumbAll < 21) {
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
let sumPlus = Math.ceil(cardPlus/4) 
if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}

audio.play(); 
let chooseImagePlus = cardSuits[cardPlus -1]
card6.src = chooseImagePlus

playerArray.push(sumPlus)
//console.log(playerArray)

sumbAll =  playerArray.reduce((partialSum, a) => partialSum + a, 0);

//const sum = playerArray.reduce((partialSum, a) => partialSum + a, 0);
//console.log(sum)

document.getElementById("your-sum-el").value = sum
//document.getElementById("display-yours-el").value = playerArray;


if (sumbAll === 21 && sumb < sumbAll){instructionEl.textContent = instruction3;audio3.play();} // hit stand instruction
else if (sumbAll === 21 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if (sumbAll === 20 && sumb === sumbAll){instructionEl.textContent = instruction8;audio8.play();} // stand disabled
else if(sumbAll > 21){ instructionEl.textContent = instruction4; audio4.play()} 
else {instructionEl.textContent = instruction2}
}}

/* if (sumb === 20 && sumbAll === 20 || sumb === 21 && sumbAll === 21){draw} else if (sumb === 20 and sumb<sumbAll){ you win} else if (sumb === 21 and sumb > sumbAll) */







function dealStand(){console.log("hello");
if (playerArray.length > 1 && dealerArray.length >1 && sumb < 20 && sumbAll < 22){
let cardPlus = Math.ceil(Math.random() * cardSuits.length);
		let sumPlus = Math.ceil(cardPlus/4) 

if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}

		dealerArray.push(sumPlus)
		console.log(dealerArray)		
sumb = dealerArray.reduce((partialSum, a) => partialSum + a, 0);
		console.log(sumb)

sumbAll = playerArray.reduce((partialSum, a) => partialSum + a, 0);
		console.log(sum)

audio.play(); 
let chooseImagePlus = cardSuits[cardPlus -1]
		card9.src = chooseImagePlus
if (sumPlus > 19){sumplus = 0; card.src = back.jpg}
document.getElementById("dealer-sum-el").value = sumb
		

// rules for outcomes

if (sumb > 21){instructionEl.textContent = instruction9; audio9.play();}

else if (sumb <= 21 && sumbAll < sumb){console.log("lose"); instructionEl.textContent = instruction4; audio4.play();}

else if (sumb === sumbAll &&  sumb < 21 && sumbAll < 21){console.log("normaldraw"); instructionEl.textContent = instruction8; audio8.play();} 

else if (sumb < sumbAll){instructionEl.textContent = instruction9; audio9.play();}

// below not working - esps where sumbAll <= 21 and sumb < sumbAll

if (sumb === 21 && sumbAll === 21){ console.log("SUPER draw"); instructionEl.textContent = instruction10; audio10.play();}

if (playerArray.length > 4  && sumbAll === 21){console.log("win"); instructionEl.textContent = instruction11; audio11.play(); } 


}
}


function testFx(){
 
location.reload();
}


// code for MODAL BOX 

let modal = document.getElementById('simple-modal')
var audio15 = new Audio("rules-sound.mp3");
function openModal(){
closeModalTwo()
audio15.play();
modal.style.display = 'block';
console.log('hi')

}


function closeModal(){
modal.style.display = 'none';
console.log('hi')}



// code for MODAL BOX NUMBER 2

let modalTwo = document.getElementById('simple-modalTwo')
function openModalTwo(){
closeModalThree()
closeModal()
audio15.play();
modalTwo.style.display = 'block';


}


function closeModalTwo(){
modalTwo.style.display = 'none';
console.log('hi')}





// code for MODAL BOX NUMBER 3
let modalThree = document.getElementById('simple-modalThree')


function openModalThree(){
modalThree.style.display = 'block';
closeModalTwo()
audio15.play();
}


function closeModalThree(){
modalThree.style.display = 'none';
console.log('hi')}
