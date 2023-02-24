

var cardContainerEl = document.querySelectorAll('.cards-container');
var cardContainer1 = document.getElementById('cards-container-1')
var cardContainer2 = document.getElementById('cards-container-2')
var cardContainer3 = document.getElementById('cards-container-3')
var cardContainer4 = document.getElementById('cards-container-4')
var cardContainer5 = document.getElementById('cards-container-5')
var cardContainer6 = document.getElementById('cards-container-6')
var cardContainer7 = document.getElementById('cards-container-7')
var cardContainer8 = document.getElementById('cards-container-8')

// make an array containing all of the card containers
var cardContainerArr = [cardContainer3, cardContainer4, cardContainer5, cardContainer8]

// NOTE* better to add the event listener for flipping cards inside the checkCard function when the card back is revealed.  It will only be flippable then, and then we could remove the event listener after it has been revealed (no need to remove the event listener if you use 'click' instead of toggle because then, the class will never be removed so the container will stay in the 'flipped' position leaving the upturned card in place). 

// NOTE* when table is cleared, we'll need to unflip any cards that are in the flipped state so that they return to their original orientation - AND, during a deal/play to prevent flippable cards being flipped after they are face up, you'll need to do the method, remove the eventLister (which I think exists) from the parent of the card so it can no longer be flipped (because flipping is useless once a card has been revealed).  It might even be a good idea to remove the sources from the face down cards when the table is cleared, although it's probably not necessary because, once it's face down the card is invisible anyway so it will not matter to the user who won't see a card, even if it has a source (think about that)


document.getElementById("player-score").value = 0;
document.getElementById("dealer-score").value = 0;

let playerScoreEl = document.getElementById('player-score')
let dealerScoreEl = document.getElementById('dealer-score')

let playerScore = []
let dealerScore;
let yourWinsEl = document.getElementById('num-of-wins-player')
let dealerWinsEl = document.getElementById('num-of-wins-dealer')
let dealerScoreArray = [] // holds summed score of dealer hand


let standArry = [] // holds only one 'string' value to indicate that cardCheck was executed by the STAND button
let tableArray = []
let dealerArray =[]
let playerArray =[]
document.getElementById('mute-btn2').style.margin = "-100px";

let cardStyleOne = document.getElementById('card1')
let cardStyleTwo = document.getElementById('card2')
let cardStyleSix = document.getElementById('card6')
let cardStyleSeven = document.getElementById('card7')
let cardStyleThree = document.getElementById('card3')
let cardStyleFour = document.getElementById('card4')
let cardStyleFive = document.getElementById('card5')
let cardStyleEight = document.getElementById('card8')

let cardStyleOneBack = document.getElementById('card1-back')
let cardStyleTwoBack = document.getElementById('card2-back')
let cardStyleSixBack = document.getElementById('card6-back')
let cardStyleSevenBack = document.getElementById('card7-back')
let cardStyleThreeBack = document.getElementById('card3-back')
let cardStyleFourBack = document.getElementById('card4-back')
let cardStyleFiveBack = document.getElementById('card5-back')
let cardStyleEightBack = document.getElementById('card8-back')


let cardsStyleDefaults = [cardStyleOne, cardStyleTwo, cardStyleSix, cardStyleSeven]
let cardStyleAdded = [cardStyleThree, cardStyleFour, cardStyleFive, cardStyleEight]
console.log(cardStyleAdded)
console.log(cardStyleAdded)



// TABLE SETUP with initial card positions - showing card backs
const tableSetup = () =>{
// dealer and player first two cards show card backs on game start
cardsStyleDefaults.forEach(element =>{
	element.src = "backgnd.jpg"
})


// dealer final card player's 3 added cards start invisible
cardStyleAdded.forEach(element =>{
	element.src = "backgnd.jpg"
	element.style.opacity = "0"
}
)




}

// SET TABLE
tableSetup()




// in game screen prompts and outcome readout
let instructionEl = document.getElementById('instructions-el')
let instruction1 = "Your turn: Hit 'PLAYER DROP'!"
let instruction2 = "Pick card, or STAND"
let instruction3 = "Got 21! Dealer can draw at best: Hit STAND"
let instruction4 = "Sorry! You lose this time!"
let instruction5 = "Dealer HOLDS; pick a WINNER? GO!" 
let instruction5b = " 'Still alive'. Pick ANOTHER card"
let instruction6 = " 'Keep trying'. You still have a CHANCE "
let instruction7 = "Very LUCKY, ONE more chance"
let instruction8 = "GREAT; you got a DRAW!"
let instruction9 = "HOORAY! - you're a WINNER!"
let instruction10 = "WHOA!, the perfect '21' DRAW!"
let instruction11 = "KABOOM! The FIVE card Trick; 'SUPERSTAR-WIN' "
let instruction12 = "The HOUSE WINS: feel the 'PAIN'"
let instruction13 = "YAY! You BEAT the house! "
let instruction14 = "Game refreshes in '5 seconds'"
let instruction15 = "hit 'STAND' dealer could still draw or win"


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
var audio15 = new Audio("rules-sound.mp3");
var audio12 = new Audio("sad-ending-2.mp3");
var audio13 = new Audio("heavenly-evil-laugh.mp3");


let cardSuits = [ 
"1.png","2.png","3.png","4.png", "5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png","17.png","18.png","19.png","20.png","21.png","22.png","23.png","24.png","25.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png","33.png","34.png","35.png","36.png","37.png","38.png","39.png","40.png","41.png","42.png","43.png","44.png","45.png","46.png","47.png","48.png","49.png","50.png","51.png","52.png",]

let cardArray = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8']

let cardDownArray = ['card1-back', 'card2-back', 'card3-back', 'card4-back', 'card5-back', 'card6-back', 'card7-back', 'card8-back']

// SHUFFLING CARDS FROM WHICH TO PICK.  EACH CARD WILL BE PICKED FROM SHUFFLEDARRAY[0] AND THEN THE CARD WILL BE SHIFTED OUT LEAVING ONLY UN-PICKED CARDS IN THE DECK
function pickCard(){
     if(tableArray.length < 52){ 
	 let randomCardNum = Math.ceil(Math.random()*cardSuits.length) // card value generated between 1 and 52
if(tableArray.includes(randomCardNum)){pickCard();} // prevent duplicate card generation
else{
tableArray.push(randomCardNum) // card pushed to table
pickCard()

}
}else{console.log(tableArray);} 


}

pickCard()


// combined function for dealing DEALER'S FIRST TWO CARDS AND PLAYER'S FIRST TWO CARDS
const gameStartCards = (index, playerOrDealer) =>{
	let startIndex = index -1;
	
	// collect two cards
	let cardOne = tableArray[0];
	tableArray.shift()
	let cardOneTrueValue = Math.ceil(cardOne/4) 
	let cardTwo = tableArray[0];
	tableArray.shift()
	let cardTwoTrueValue = Math.ceil(cardTwo/4)
	
	console.log(tableArray)
	if (cardOneTrueValue>10){cardOneTrueValue = 10} else if (cardOneTrueValue<2){cardOneTrueValue = 11}
	if (cardTwoTrueValue>10){cardTwoTrueValue = 10} else if (cardTwoTrueValue<2){cardTwoTrueValue = 11}
	audio.play()


	let chooseImage1 = cardSuits[cardOne -1]
	let chooseImage2 = cardSuits[cardTwo -1]
	
	document.getElementById(cardDownArray[startIndex]).src = chooseImage1  // FIRST CARD
// add the .is-flipped class to the parent node of the above card, then the parent, which holds face up and face down cards, will flip turning the face down card (which has our source image) upward, revealing it in an flip animation
	document.getElementById(cardDownArray[startIndex]).parentNode.classList.add('is-flipped')


	document.getElementById(cardDownArray[startIndex + 1]).src = chooseImage2 // SECOND CARD
	document.getElementById(cardDownArray[startIndex + 1]).parentNode.classList.add('is-flipped') // flip card


	document.getElementById(cardArray[startIndex + 2]).style.opacity = "100" // reveal next card back and make flippable

	if(playerOrDealer == 'player'){ // event listener needed for CARD 3 so it flips when clicked
	document.getElementById(cardArray[startIndex + 2]).parentNode.addEventListener('click', function(){
		document.getElementById(cardArray[startIndex + 2]).parentNode.classList.add('is-flipped')	
	}) }else{ // event listener not needed for dealer last card because it is activated by the STAND button

	}
	
	switch(playerOrDealer){
	case 'dealer': 
	dealerArray.push(cardOneTrueValue, cardTwoTrueValue)
	dealerScoreArray[0] = dealerArray.reduce((partialSum, a) => partialSum + a, 0);
	dealerScoreEl.textContent = dealerScoreArray[0]
	instructionEl.textContent = instruction1
	if (dealerScoreArray[0] > 19){instructionEl.textContent = instruction5; audio5.play();}
	break;
	
	// this only other option is 'player'
	default:
		playerArray.push(cardOneTrueValue, cardTwoTrueValue)
		playerScore[0] =  playerArray.reduce((partialSum, a) => partialSum + a, 0);
		playerScoreEl.textContent = playerScore[0]
		nextMove(dealerScoreArray[0], playerScore[0])
	}}



// DEALER'S MAIN CARDS DROP
function dealerCardsFirst2(){
	// make sure card containers are visible after hiding when stand button was hit
	cardContainer3.style.opacity = '1'
	cardContainer4.style.opacity = '1'
	cardContainer5.style.opacity = '1'

	if (dealerArray.length < 2){
		let index = 6;
		let whoPlays = 'dealer';
		document.getElementById('dealer-btn').style.display = "none";
		document.getElementById('player-btn').style.display = "block";

	gameStartCards(index, whoPlays)
	}
}


// PLAYER'S FIRST TWO CARDS DROP
function playerCardsFirst2(){
console.log(dealerArray)
if (dealerArray.length > 1 && playerArray < 3){
	let index = 1;
	let whoPlays = 'player';
	document.getElementById('player-btn').style.display = "none";
		document.getElementById('stand-btn').style.display = "block";
		gameStartCards(index, whoPlays)

}}





	// function for pushing next card back and making it flippable; executed when win/lose scenrious don't result from a card reveal. 

	const showNextCard =(getLength) =>{
		if(playerArray.length > 2){
		console.log(getLength)
		document.getElementById(cardArray[getLength]).style.opacity = "100" ;
		// then add .is-flipped class to the card so that when clicked the card will have the class added and will be flippable only once (the flip class is not toggled)
			document.getElementById(cardArray[getLength]).parentNode.addEventListener('click', function(){
				document.getElementById(cardArray[getLength]).parentNode.classList.add('is-flipped')	
			}) 

		}
	}


	// function for disabling cardflips 
	const standDisable = () =>{
		document.getElementById('stand-btn').style.display = "none";
		document.getElementById('reset-btn').style.display = "block";


	}

	// this removes any eventListers still attached to cards. Hopefully the class that was added by the event listener still remains in place because the flipped cards need to remain flipped. 
		const flipDisable = () =>{
let flippedCards = playerArray.length;
let flippableCards = flippedCards +1 // position at which to hide future cards
console.log(flippedCards, flippableCards)
switch(flippableCards){
case 3:
	document.getElementById(`cards-container-${flippableCards}`).style.opacity = '0'
	document.getElementById(`cards-container-${flippableCards + 1}`).style.opacity = '0'
	document.getElementById(`cards-container-${flippableCards + 2}`).style.opacity = '0'
break;

case 4:
	document.getElementById(`cards-container-${flippableCards}`).style.opacity = '0'
	document.getElementById(`cards-container-${flippableCards + 1}`).style.opacity = '0'
break;

case 5:
	document.getElementById(`cards-container-${flippableCards}`).style.opacity = '0'
}

document.getElementById(`cards-container-${flippableCards}`).style.opacity = '0'
	}



const nextMove = (dealerScore, playerScore, selector) =>{
	
	if(standArry.length >0){
		if(dealerScore > 21){instructionEl.textContent = instruction9;audio9.play();yourWinsEl.textContent ++;
		standDisable(); flipDisable()
		} // dealer loses you win, disable STAND AND CARDFLIP
		else if(playerScore > dealerScore){instructionEl.textContent = instruction9;audio9.play();yourWinsEl.textContent ++; 
		standDisable(); flipDisable()
		} //  you win, disable STAND AND CARDFLIP
		else if(playerScore === dealerScore){instructionEl.textContent = instruction8; audio8.play();yourWinsEl.textContent ++; dealerWinsEl.textContent ++;
		standDisable(); flipDisable()
		} // draw  //  you win, disable STAND AND CARDFLIP
		else if(playerScore < dealerScore){instructionEl.textContent = instruction4; audio4.play(); dealerWinsEl.textContent ++;
		standDisable(); flipDisable()
		}// you lose, disable STAND AND CARDFLIP
	}else{
	switch(playerScore){
		case 21: 
		
		 if(dealerScore === 21){instructionEl.textContent = instruction10; audio10.play();yourWinsEl.textContent ++; dealerWinsEl.textContent ++;
		standDisable(); flipDisable()
		} // super draw - stand button not activated or needed so it can disappear and reset button appear disable STAND and CARDFLIP
		else if(dealerScore === 20){instructionEl.textContent = instruction9;audio9.play();yourWinsEl.textContent ++;  
		standDisable(); flipDisable()
		} //  you win, disable STAND, and DISABLE CARD FLIP
		else{instructionEl.textContent = instruction3;audio3.play(); flipDisable()} // dealer could match, 'STAND'is still available - BUT DISABLE FLIPCARD
		break;
		
		case 20:
			if(dealerScore === 21){instructionEl.textContent = instruction4; audio4.play(); dealerWinsEl.textContent ++;
		standDisable(); flipDisable()}// you lose, disable STAND AND CARDFLIP
		else if(dealerScore === 20){instructionEl.textContent = instruction8; audio8.play();
		standDisable(); flipDisable()
		}// draw, disable STAND, and DISABLE CARDFLIP
		else{instructionEl.textContent = instruction3;audio3.play(); flipDisable()} // dealer could match, 'STAND'is still available
		break;
		default: // player score either > 21 or <=19

		if(playerScore > 21){ instructionEl.textContent = instruction4; 
			audio4.play();dealerWinsEl.textContent ++;
		standDisable(); flipDisable()
		}// you lose, disable STAND and DISABLE CARDFLIP
			else{ // player score <=19
		if(dealerScore > 19){
// conditions for when dealer holds on 20pts (ice hockey sounds)
if(playerArray.length === 2){instructionEl.textContent = instruction5b; audio5b.play(); showNextCard(selector)} // first two cards
if(playerArray.length === 3){instructionEl.textContent = instruction6; audio6.play(); showNextCard(selector)} // third card - still alive
if(playerArray.length === 4){instructionEl.textContent = instruction7; audio7.play(); showNextCard(selector)}// fourth card - still alive
// if fifth card dropped and player still alive, player wins irrespective of score; otherwise player obviously busts. 


		}else{instructionEl.textContent = instruction2; audio2.play(); showNextCard(selector)}
			}

	}

}}
		


// the LENGTH argument is the number of cards in the array and therefore, the number of cards already dealt by player, so the function can format and display the next card correctly positioned. 
const checkCard = (length) =>{
		
	let addedCard = tableArray[0];
	tableArray.shift()
	let addedCardTrueValue = Math.ceil(addedCard/4) 
	if (addedCardTrueValue>10){addedCardTrueValue = 10} else if (addedCardTrueValue<2){addedCardTrueValue = 11}
		audio.play(); 

		if(standArry.length > 0){
			console.log('player STANDS...')
			// if the button activating this function was the player STAND BUTTON... then execute below code
			dealerArray.push(addedCardTrueValue)
			let addedCardImage = cardSuits[addedCard -1]
			document.getElementById(cardDownArray[length -1]).src = addedCardImage// give card source image
			document.getElementById(cardDownArray[length -1]).parentNode.classList.add('is-flipped') // flip card
			dealerScoreArray[0] =  dealerArray.reduce((partialSum, a) => partialSum + a, 0); // sum of values in player array
			dealerScoreEl.textContent = dealerScoreArray[0]
			nextMove(dealerScoreArray[0], playerScore[0])
		}else{ // function was executed by a player card flip
			console.log('player picking card....')
			playerArray.push(addedCardTrueValue)
		
			let addedCardImage = cardSuits[addedCard -1]
			document.getElementById(cardDownArray[length]).src = addedCardImage
			playerScore[0] =  playerArray.reduce((partialSum, a) => partialSum + a, 0); // sum of values in player array
			
			playerScoreEl.textContent = playerScore[0]

		



		if(length > 3){ // 5-card trick win (<= 21) or bust
			if (playerScore[0] > 21){ instructionEl.textContent = instruction4; audio4.play(); dealerWinsEl.textContent ++;
standDisable()
			}
			else{instructionEl.textContent = instruction11; audio11.play(); yourWinsEl.textContent ++;
standDisable()
			}
				}else{
console.log(playerArray.length)
			nextMove(dealerScoreArray[0], playerScore[0], playerArray.length)
					}

		}
	}



// NOTE* in the conditions below for execution of card flips, for cards 3, 4 and 5, it is specified that if player score is < 20 and dealer score is  < 22 then the card can be played.  The value is below 20 for player score because if the player scores 20 or 21, then playing another card will cause player to bust; so this is eliminated from the choices since playing on makes no sense given that condition.  The value is below 22 for dealer because in somes cases the dealer will have the value of 20 or 21 and will be holding, waiting for the player to make moves in order to either draw with the dealer or bust; so obviously if the dealer has 20 or 21 the player MUST still turn cards until winning, busting or drawing. 


// PLAYER THIRD CARD DROP
function playerCard3(){
if (dealerArray.length > 1){

	// prevent execution is 'STAND' has been executed
	if(standArry.length < 1){
switch(playerArray.length){
case 2: if(playerScore[0] < 20 && dealerScoreArray[0] < 22){
	let nextCardIndex = playerArray.length
	checkCard(nextCardIndex)
		whoIsWinning()}
	break;
default: // do nothing

}}
}
}


// PLAYER FOURTH CARD DROP
function playerCard4(){

	if (dealerArray.length > 1){
		// prevent execution is 'STAND' has been executed
	if(standArry.length < 1){
		switch(playerArray.length){
		case 3: if(playerScore[0] < 20 && dealerScoreArray[0] < 22){
			let nextCardIndex = playerArray.length
			checkCard(nextCardIndex)
				whoIsWinning()}
			break;
		default: // do nothing
		
		}}}}


// PLAYER FIFTH CARD DROP - result will either be a 5-card trick or BUST
function playerCard5(){

	if (dealerArray.length > 1){
		// prevent execution is 'STAND' has been executed
	if(standArry.length < 1){
		switch(playerArray.length){
		case 4: if(playerScore[0] < 20 && dealerScoreArray[0] < 22){
			let nextCardIndex = playerArray.length
			checkCard(nextCardIndex)
			whoIsWinning()}else{// remove event listener from the parent of this card. 
				
			}
		break;
	default: // do nothing
	
	}}}}

// DEALER'S LAST CARD DROP
function playerStand(){console.log("hello");

// if player has 2, 3 or 4 cards
switch(playerArray.length){
case 2:
case 3: 
case 4:  
if (dealerArray.length < 3 && dealerScoreArray[0] < 20 && playerScore[0] <= 22){
let nextCardIndex = 8;
standArry.push('stand')
checkCard(nextCardIndex)
document.getElementById('reset-btn').style.display = "block"; // since table is to be cleared after decision is made when player stands, the reset/clear table button can appear at this stage 
document.getElementById('stand-btn').style.display = "none"; // and hide stand button since it is no longer useful or needed

whoIsWinning()
	}
break;
default: // do nothing
}}


// below dictates the overall winner of the game

function whoIsWinning(){
if (yourWinsEl.textContent > 19){instructionEl.textContent = instruction13; audio13.play();

function resetGamePrep(){
//location.reload();
instructionEl.textContent = instruction14;}
setTimeout(function(){resetGamePrep()},8000);

function resetGameAll(){
location.reload();
}
setTimeout(function(){resetGameAll()},14000);

}



if (dealerWinsEl.textContent > 19){instructionEl.textContent = instruction12; audio12.play();
function resetGamePrep(){
//location.reload();
instructionEl.textContent = instruction14;}
setTimeout(function(){resetGamePrep()},8000);

function resetGameAll(){
location.reload();
}
setTimeout(function(){resetGameAll()},14000);


}}


// MODAL PAGES

// code for MODAL BOX 

let modal = document.getElementById('simple-modal')

function openModal(){
closeModalTwo()
audio15.play();
modal.style.display = 'block';

}


function closeModal(){
modal.style.display = 'none';}



// code for MODAL BOX NUMBER 2

let modalTwo = document.getElementById('simple-modalTwo')
function openModalTwo(){
closeModalThree()
closeModal()
audio15.play();
modalTwo.style.display = 'block';
card1.src = "backgnd.jpg"
card2.src = "backgnd.jpg"
card6.src = "backgnd.jpg"
card7.src = "backgnd.jpg"

}


function closeModalTwo(){
modalTwo.style.display = 'none';}


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


function clearTable(){
	standArry = []
	dealerArray = []
	playerArray = []
	playerScoreEl.textContent = "0"
	dealerScoreEl.textContent = "0"
	
	document.getElementById('instructions-el').innerHTML = "Hit: <span id='dealer-hold'>'DEALER DROP'</span>"
	document.getElementById('card1').src = "backgnd.jpg";
	document.getElementById('card2').src = "backgnd.jpg";
	document.getElementById('card6').src = "backgnd.jpg";
	document.getElementById('card7').src = "backgnd.jpg";
	// make 'further' cards invisible
	document.getElementById('card3').style.opacity = "0";
	document.getElementById('card4').style.opacity = "0";
	document.getElementById('card5').style.opacity = "0";
	document.getElementById('card8').style.opacity = "0";
// make 'further' cards face down
	document.getElementById('card3').src = "backgnd.jpg";
	document.getElementById('card4').src = "backgnd.jpg";
	document.getElementById('card5').src = "backgnd.jpg";
	document.getElementById('card8').src = "backgnd.jpg";

	document.getElementById("player-score").value = 0;
	document.getElementById("dealer-score").value = 0;

	// return game buttons to default configuration

	document.getElementById('dealer-btn').style.display = "block";
	document.getElementById('stand-btn').style.display = "none";
	document.getElementById('player-btn').style.display = "none";
	document.getElementById('reset-btn').style.display = "none";

	// make all invisible card holders visible again, the flippable cards that is. 


	// unflip all flipped cards ready for cardback view
	cardDownArray.forEach(element =>{
	document.getElementById(element).parentNode.classList.remove('is-flipped')
	})

	pickCard()

}