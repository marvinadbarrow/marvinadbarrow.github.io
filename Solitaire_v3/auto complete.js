  // FETCHING EAMPLE SOLVE SITUATION FOR TESTING SOLVE BUTTON - 

  // variables for foundation trackers and drop pile trackers in solve scenario
  let dropPilesScenario;
  let foundationPilesScenario;
  
    fetch('/solve_scenario.json')
    .then(res => res.json())
    .then(data =>{
      dropPilesScenario = data.drop_piles
      foundationPilesScenario = data.foundations

    })


    console.log(dropPilesScenario)
    console.log(foundationPilesScenario)


    
// variable for end card of foundation pile
let lastFoundationCard;

let totalCardsAdded = 0;



// AUTO-COMPLETE CHECK TO SEE IF ALL CARDS ARE FACE UP
function comparePileCard(fPile, index){
// variable for the number of empty drop pile trackers
let totalEmptyDropPiles = 0;

  // get endcard in foundation pile
  lastFoundationCard = fPile[fPile.length - 1].primary_card.card
  // variable for end card in drop pile
  let lastDropPileCard;

  // loop through the drop pile tracker
  dropPileTracker.forEach((dropPile, dropIndex) =>{
// only check non-empty drop piles;  if pile is empty, increment totalEmptyDropPiles variable in else part of this condition
    if(dropPile.length > 0){ 
  // get the raw value of the last card of the current drop pile 
      lastDropPileCard = dropPile[dropPile.length -1].primary_card.card

      // if the absolute value fo the sum difference of both cards id 4
      if(lastDropPileCard - lastFoundationCard === 4){

        // push the drop pile card object to the foundation tracker
        foundationTracker[index].push(lastDropPileCard)
        // if total cards added is incremented (as they are when a compatible card is found), the greater than zero value indicates that the card was removed from the tracking subarray for drop piles and a new end card exists; the new card can be used to check the other foundation arrays to see if it is compatible with any of the end cards. 
        totalCardsAdded ++

        // this is useful because it means that, since the raw values of consecutive cards in the foundation array differ by 4. If the current foundation pile takes the end card of the currently assessed drop pile end card, then the value of the last card on the foundation pile increases by four; the next drop pile end card can then be compared to THAT to see if another card can be dropped onto the new foundation end card. When the last drop pile tracker is assessed, the function will run again, either using the current foundation tracking array as the array to be checked or the next foundation array.  Either way, this last foundation card value will be rewritten using the raw value of whichever foundation tracking array is next examined. 
        lastFoundationCard += 4;
        // pop the moved card's object from the current drop pile tracking array
        dropPileTracker[dropIndex].pop()
      }else{
// drop pile card is incompatible with end card of foundation pile so do nothing. 
      }
    }else{
// drop pile tracker subarray is empty so increment variable holding the number of empty drop pile tracking arrays. 
totalEmptyDropPiles ++;
    }

// if the loop has reached the last subarray
if(dropIndex === 6){
// if all drop piles are empty
if(totalEmptyDropPiles > 6 ){

  // all drop piles have been re-located to foundation piles and the solve is complete
  console.log('SOLVE COMPLETE')

            console.log('all foundations array')
            // each pile should contain 13 cards
          console.log(foundationTracker)
        
          console.log('all drop piles array')
          // all drop piles should be empty
          console.log(dropPileTracker)
}else{ 
  // there are still populated drop pile tracking arrays so solve is not complete. 
// if one or more cards were added to foundation piles, this means that the cards added to the foundation pile, when moved, exposed new end cards on the drop piles; those cards now need to be checked against the current foundation pile 
  if(totalCardsAdded > 0){
  
    // cards have been added so reset the total added cards and loop through the drop pile arrays again to see if any cards (some of which will be new) are compatible with the new end cards in the current foundation pile. 
    totalCardsAdded = 0;
    pickFoundation(index)
  }else{

    // no cards were added to the current pile because none of the end cards in the drop piles were compatible.  increment the index and run pick foundation to select the next foundation tracking array, 

    // NOTE: the use of the '%' operation is so that when the last foundation index is reached, the incremented new index will return to the first index number, and the first foundation tracking array will be examined again.  This will continue to happen until all drop pile triacking arrays are empty. 
      let newIndex = (index + 1)%4
      pickFoundation(newIndex)
      }


}


}
 
  })

// eventually there will be the scenario where the index of the looped drop pile will be 6, AND, the number of empty drop pile tracking arrays will be seven, which indicates that the there are no more cards in drop pile tracking subarrays and hence all cards have been transferred to foundation piles. This will execute the 'solve complete' part of this function, so that there will be no further calls of the pickFoundation function below and the solve is complete. 

}

function pickFoundation(foundationIndex){
  let newIndex = foundationIndex  
  // select foundation tracking subarray 
let pickFoundation = foundationTracker[newIndex]  
// send array and its index to the compare function
    comparePileCard(pickFoundation, newIndex)  
}
