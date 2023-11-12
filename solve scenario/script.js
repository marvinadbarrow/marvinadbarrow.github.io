  let solveBtn = document.getElementById('solve-btn')
  
  
  // FETCHING EAMPLE SOLVE SITUATION FOR TESTING SOLVE BUTTON - 

  // variables for foundation trackers and drop pile trackers in solve scenario
  let dropPilesScenario = [];
  let foundationPilesScenario = [];
  
    fetch('/solve_scenario.json')
    .then(res => res.json())
    .then(data =>{

      dropPilesScenario.push(...data.drop_piles)
foundationPilesScenario.push(...data.foundations)
        getArrays(dropPilesScenario, foundationPilesScenario)
    })
let dropPileTracker = []
let foundationTracker = []
// this keeps a record of all card movements in the solve. 
let solutionMapArray = []







function getArrays(drop, foundation){



  dropPileTracker.push(...drop)
  foundationTracker.push(...foundation)
// variable for end card of foundation pile

// console.log('foundation piles all')
// console.log(foundationTracker)

// console.log('drop piles all')
// console.log(dropPileTracker)

let lastFoundationCardValue;

let totalCardsAdded = 0;



// AUTO-COMPLETE CHECK TO SEE IF ALL CARDS ARE FACE UP
function comparePileCard(pickedFoundation, index){
// variable for the number of empty drop pile trackeing arrays
let totalEmptyDropPiles = 0;
  // variable for end card in drop pile
  let lastDropPileCardValue;
  // drop pile's end card object
  let lastDropPileCardObject;
  // foundation pile's end card object
let lastFoundationCardObject

  // pickfoundation is the tracking array corresponding to the currently examined foundation pile; get the object that corresponds to the foundation's end card to see if any of the drop pile end cards meet the conditions for dropping onto the foundation end card (raw value of drop card is foundation end card raw value + 4)
  lastFoundationCardValue = pickedFoundation[pickedFoundation.length - 1].primary_card.card

  lastFoundationCardObject = pickedFoundation[pickedFoundation.length - 1] 

 

  // loop through the drop pile tracker for all piles
  dropPileTracker.forEach((dropPile, dropIndex) =>{
// only check non-empty drop piles;  if pile is empty, increment totalEmptyDropPiles variable in the else part of this condition - when this variable's value reaches 7 the solve is complete and the compile card function stops. 
    if(dropPile.length > 0){ 
  // get the raw value of the last card of the current drop pile 
      lastDropPileCardValue = dropPile[dropPile.length -1].primary_card.card
lastDropPileCardObject = dropPile[dropPile.length -1]

      // if the sum difference of the raw values of the last drop pile card and the foundation card is equal to 4 then the drop pile card is the only possible card that can be added to the currently examined foundation pile.
      if(lastDropPileCardValue - lastFoundationCardValue === 4){

        console.log('check move')
        console.log(`
        drop pile end card: ${lastDropPileCardValue}
        foundation pile end card: ${lastFoundationCardValue}
        sum difference: ${lastDropPileCardValue - lastFoundationCardValue} 
        `)
      //  console.log('drop pile card')
      //  console.log(dropPile[dropPile.length -1])
      //  console.log('last foundation card')
      //  console.log(pickedFoundation[pickedFoundation.length - 1])





// console.log('move details')
       let moveDetails = {
        'moved values': {
          "drop pile end card": lastDropPileCardValue,
          "foundation pile end card": lastFoundationCardValue,
          "sum difference": lastDropPileCardValue - lastFoundationCardValue 
        },
        'card object': dropPile[dropPile.length -1],
        'drop pile index': dropIndex,
        'foundation end card object':pickedFoundation[pickedFoundation.length - 1],
        'foundation pile index': index,
      }

      // console.log(moveDetails)

        // console.log(`
        // transferring card ${lastDropPileCardValue} to foundation pile...
        // `)

        // push the drop pile card's object to the trail array - but you need to record it's trail. The values you need are the current pile index (and name for readability), and the foundation index and name; and perhaps have an object such as the below one: 
        /*
        
      let solveMove = {
        cardObject: lastDropPileCardObject,
        dropPileIndex: dropIndex,
        foundationCardObject:lastFoundationCardObject,
        foundationPIleIndex: index,
      }
        
        */



// push move details to solution map array
      solutionMapArray.push(moveDetails)
        // push the  drop pile card's object to the foundation tracking array  
        foundationTracker[index].push(dropPile[dropPile.length -1])
        // pop the moved drop pile card's object from the current drop pile tracking array
        dropPileTracker[dropIndex].pop()



        // if, when examining the current foundation, one  of the drop pile card objects are added to the foundation's tracking array, the totalCardsAdded variable is incremented;  
        totalCardsAdded ++

        // this is useful because it means that, since the raw values of consecutive cards in the foundation array differ by 4. If the current foundation pile gets a new end card (which comes from one of the drop piles), then the value of the last card on the foundation pile increases by four;  then the next drop pile end card is assessed to see if it can be placed on this new card. The below variable will be recreated from scratch each time the function runs by actually checking the end card value in the foundations tracking array. 
        lastFoundationCardValue += 4;


          //   console.log('showing foundation array, which should contain the card shown above as the last entry')
          //   // each pile should contain 13 cards
          // console.log(pickedFoundation)

      }else{
// sum difference of the foundation card and drop pile card does not equal 4, so drop pile card is incompatible with end card of foundation pile so no array update is required
      }
    }else{
// currently checked drop pile is empty so increment variable holding the number of empty drop piles. 
totalEmptyDropPiles ++;
    }

// if the loop has reached the last drop pile tracking array
if(dropIndex === 6){
// if all drop piles are empty, all cards have been transferred from drop piles to foundation piles so the solve is complete
if(totalEmptyDropPiles > 6 ){

  // all drop pile cards have been re-located to foundation piles and the solve is complete. 
  console.log('SOLVE COMPLETE')

            console.log('all foundations array')
            // each pile should contain 13 cards
          console.log(foundationTracker)
        
          console.log('all drop piles array')
          // all drop piles should be empty
          console.log(dropPileTracker)

          console.log('solution map')
          console.log(solutionMapArray)
}else{ 
  // not all drop piles are empty,  so solve is not complete. 
// if one or more cards were added to foundation piles, this means that the cards added to the foundation pile, when moved, exposed new end cards on the drop piles; those cards now need to be checked against the current foundation pile with its new end card
  if(totalCardsAdded > 0){
  
    // cards have been added so reset the total added cards and loop through the drop pile arrays again to see if any cards (there will be at least one new drop pile end card among the drop piles) are compatible with the new end cards in the current foundation pile. 
    totalCardsAdded = 0;

    // DON'T RUN FUNCTION YET
    pickFoundation(index)
  }else{

    // no cards were added to the current foundation pile because none of the end cards in the drop piles were compatible.  increment the index and run pick foundation to select the next foundation, 

    // NOTE: the use of the '%4' operation is so that when the last foundation index is reached, the incremented new index will return to the first index number, and the first foundation tracking array will be examined again.  This occurs here because, since this the code in this 'else' condition runs because not all drop pile cards have been transferred to foundation piles so we need to check the foundation piles again until no more cards are left in the drop piles.  When that happens, the else part of the condition no longer holds, so the solve will be complete and the function will no loger num. 
      let newIndex = (index + 1)%4
      
      // DON'T RUN FUNCTION YET
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

// console.log('checking picked foundation')
// console.log(pickFoundation)

// send array and its index to the compare function
    comparePileCard(pickFoundation, newIndex)  
}





solveBtn.addEventListener('click', () =>{
  pickFoundation(0)
})



}


    

/*

console.log(variable)
console.log(variable)




*/