


// condisional code MERGE attempt

function dealStand(){console.log("hello");

// if player has 2, 3 or 4 cards
switch(playerArray.length){
case 2:
case 3: 
case 4:  
if (dealerArray.length < 3 && dealerScoreArray[0] < 20 && playerScore[0] <= 21){






	let cardPlus = Math.ceil(Math.random() * cardSuits.length);
			let sumPlus = Math.ceil(cardPlus/4) 
	
	if (sumPlus>10){sumPlus = 10} else if (sumPlus<2){sumPlus = 11}
	
			dealerArray.push(sumPlus)
					
	dealerScoreArray[0] = dealerArray.reduce((partialSum, a) => partialSum + a, 0);
	playerScore[0] = playerArray.reduce((partialSum, a) => partialSum + a, 0);
			
	
	audio.play(); 
	let chooseImagePlus = cardSuits[cardPlus -1]
	card8.src = chooseImagePlus
	//document.getElementById("dealer-sum-el").value = sumb
	dealerScoreEl.textContent = dealerScoreArray[0]
	
	// rules for outcomes
	// note* if you're hitting STAND, that means that it is not disabled,  it means dealer must be less than 20, because dealer being 20, 21 or either dealer or you being bust disables the stand card; so the only possible scenario is where neither of you are bust and dealer is under 20 and you could be on 20, 21, or less. this is the situation just before the final assessment is given; these are gven 'after' the calculation which is below. 
	
	
	if (dealerScoreArray[0] > 21){instructionEl.textContent = instruction9; audio9.play();  yourWinsEl.textContent ++;} // keep
	else if (dealerScoreArray[0] > playerScore[0]){instructionEl.textContent = instruction4; audio4.play(); dealerWinsEl.textContent ++;}
	else if (dealerScoreArray[0] < playerScore[0]){instructionEl.textContent = instruction9; audio9.play(); yourWinsEl.textContent ++;}
	else if (dealerScoreArray[0] < 21 && dealerScoreArray[0] === playerScore[0] ){instructionEl.textContent = instruction8; audio8.play();}// draw, disable STAND
	else if (dealerScoreArray[0] === 21 && dealerScoreArray[0] === playerScore[0] ){instructionEl.textContent = instruction10; audio10.play();}// super DRAW, disable STAND
	whoIsWinning()
	}
break;
default: // do nothing
}}





// might be able to significantly reduce the dealer stand function and send parameters here: 
// the LENGTH argument is the number of cards in the array and therefore, the number of cards already dealt by player, so the function can format and display the next card correctly positioned. 
const checkCard = (length) =>{
		
	let addedCard = tableArray[0];
	tableArray.shift()
	let addedCardTrueValue = Math.ceil(addedCard/4) 
	if (addedCardTrueValue>10){addedCardTrueValue = 10} else if (addedCardTrueValue<2){addedCardTrueValue = 11}
		audio.play(); 

		if(standArry.length > 0){
			// if the button activating this function was the player STAND BUTTON... then execute below code
			dealerArray.push(addedCardTrueValue)
			let addedCardImage = cardSuits[addedCard -1]
			document.getElementById(cardArray[length]).src = addedCardImage
			dealerScoreArray[0] =  dealerArray.reduce((partialSum, a) => partialSum + a, 0); // sum of values in player array
			dealerScoreEl.textContent = dealerScoreArray[0]
			nextMove(dealerScoreArray[0], playerScore[0])
		}else{ // function was executed by a player card flip
			playerArray.push(addedCardTrueValue)
		
			let addedCardImage = cardSuits[addedCard -1]
			document.getElementById(cardArray[length]).src = addedCardImage
			playerScore[0] =  playerArray.reduce((partialSum, a) => partialSum + a, 0); // sum of values in player array
			
			playerScoreEl.textContent = playerScore[0]
			document.getElementById(cardArray[length +1]).style.opacity = "100" // show next unrevealed card
			
		if(length > 3){ // 5-card trick win (<= 21) or bust
			if (playerScore[0] > 21){ instructionEl.textContent = instruction4; audio4.play(); dealerWinsEl.textContent ++;}
			else{instructionEl.textContent = instruction11; audio11.play(); yourWinsEl.textContent ++; }
				}else{
			let instructionNext = instruction6;
			let audioNext = audio6
			nextMove(dealerScoreArray[0], playerScore[0], instructionNext, audioNext)
					}

		}
	}












































const nextMove = (dealerScore, playerScore, instruction, audio) =>{
	if (dealerScore <= 19 && playerScore === 21 ){instructionEl.textContent = instruction3;audio3.play();} // dealer could match, 'STAND'is still available
	else if (dealerScore > 19 && playerScore <= 19){instructionEl.textContent = instruction; audio.play();} 
	else if (dealerScore === 20 && playerScore === 21){instructionEl.textContent = instruction9;audio9.play();yourWinsEl.textContent ++ } //  you win, disable STAND
	else if (dealerScore === 20 && playerScore === 20 ){instructionEl.textContent = instruction8; audio8.play();}// draw, disable STAND
	else if (dealerScore === 21 && playerScore === 20 || playerScore > 21){instructionEl.textContent = instruction4; audio4.play(); dealerWinsEl.textContent ++;}// you lose, disable STAND
	else if (dealerScore === 21 && playerScore === 21 ){instructionEl.textContent = instruction10; audio10.play();}// super DRAW, disable STAND
	else{instructionEl.textContent = instruction2;}

	}

// try a switch statement on nextMove(); it should work because the function can only execute if playerScore <= 21, so the cases that you can work with are 21, 20 and default, i.e. values of <= 19

switch(playerScore){
case 21: 
if(dealerscore === 21){instructionEl.textContent = instruction10; audio10.play();} // super draw
else if(dealerscore === 20){instructionEl.textContent = instruction9;audio9.play();yourWinsEl.textContent ++ } //  you win, disable STAND
else{instructionEl.textContent = instruction3;audio3.play();} // dealer could match, 'STAND'is still available
break;

case 20: 
if(dealerscore === 21){instructionEl.textContent = instruction4; audio4.play(); dealerWinsEl.textContent ++;}// you lose, disable STAND
else if(dealerscore === 20){instructionEl.textContent = instruction8; audio8.play();}// draw, disable STAND
else{instructionEl.textContent = instruction15;audio5.play();
if(dealerArray.length > 0){
	if(dealerscore > 21){
// dealer BUST
	}else{ // dealer didn't bust
		if(dealerscore > playerScore){
			// dealer wins
		}else if(dealerscore < playerScore){
			// player wins
		}else{
		// below 20 draw
		
		}
		

	}


}

}  // dealer < 20 - dealer could match or even win the game - STAND still available

break;


}

switch(dealerscore){


}