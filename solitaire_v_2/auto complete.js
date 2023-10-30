
var solveBtn = document.getElementById('solve-btn')





let shuffledArray = []


let allFoundationPilesArray = [[4, 8, 12], [3, 7, 11, 15], [1, 5, 9, 13], [2, 6, 10]]

let allCurrentPilesArray = [[50, 45, 42, 37, 34, 29, 26, 24, 19, 16,], [49, 47, 44, 39, 36, 31, 28, 22, 17, 14], [40, 35, 32, 27, 21], [33, 30, 25, 23, 20], [18], [52, 46, 41, 38], [51, 48, 43]]

/*
foundation 0:
4, 8, 12,
drop pile 0 has 16 - foundation 0 becomes
4, 8, 12, 16
drop pile 0 becomes:
50, 45, 42, 37, 34, 29, 26, 24, 19

check for 16 + 4 = 20

drop pile 3 has 20 - foundation 1 becomes
4, 8, 12, 16, 20 
drop pile 3 becomes:
50, 45, 42, 37, 34, 29, 26, 23,

check for 20 + 4 = 24
other drop piles do not contain 24
CHECK COMPLETE


foundation 1: 
3, 7, 11, 15
drop pile 0 has 19 - foundation 1 becomes
3, 7, 11, 15, 19
drop pile 0 becomes:
50, 45, 42, 37, 34, 29, 26, 24

check for 19 + 4 = 23

drop pile 3 has 23 - foundation 1 becomes
3, 7, 11, 15, 19, 23
drop pile 3 becomes:
50, 45, 42, 37, 34, 29, 26

check for 23 + 4 = 27
other drop piles do not contain 27
CHECK COMPLETE



foundation 2:
1, 5, 9, 13
17 is covered up in drop pile 1 by the number 14
no card drop possible
CHECK COMPLETE


foundation 3:
2, 6
10 is covered up in drop pile 4 by the number 18
no card drop possible
CHECK COMPLETE

foundation


*/

let lastFoundationCard;
let totalCardsAdded = 0;

function comparePileCard(fPile, index){
// CHECK how many drop piles are empty, when this reaches 7 this function will not execute again. 

let totalEmptyDropPiles = 0;

  // get endcard in foundation pile
  lastFoundationCard = fPile[fPile.length - 1]
  // variable for end card in drop pile
  let lastDropPileCard;
  allCurrentPilesArray.forEach((dropPile, dropIndex) =>{

    if(dropPile.length > 0){ // only compare if the dropPile is non empty

  
      lastDropPileCard = dropPile[dropPile.length -1]

      if(lastDropPileCard - lastFoundationCard === 4){
        allFoundationPilesArray[index].push(lastDropPileCard)
        totalCardsAdded ++
        lastFoundationCard += 4;
        allCurrentPilesArray[dropIndex].pop()
      }else{

      }
    }else{

totalEmptyDropPiles ++;
    }


if(dropIndex === 6){

if(totalEmptyDropPiles > 6 ){
  // do nothing
  console.log('SOLVE COMPLETE')

            console.log('all foundations array')
          console.log(allFoundationPilesArray)
        
          console.log('all drop piles array')
          console.log(allCurrentPilesArray)
}else{

  if(totalCardsAdded > 0){
    totalCardsAdded = 0;
    pickFoundation(index)
  }else{
      let newIndex = (index + 1)%4
      pickFoundation(newIndex)
      }


}


}
 
//     if(index === 3){ // the last foundation pile has been processed
// pickFoundation()
//     }
  })

}

function pickFoundation(foundationIndex){
  let newIndex = foundationIndex

let pickFoundation = allFoundationPilesArray[newIndex]

    comparePileCard(pickFoundation, newIndex)

}









// function moveToFoundation(empties){





    
//   console.log(empties)
//     let emptyDropPiles = empties
//     // if 'empties' = 7 the function won't execute
//         allFoundationPilesArray.forEach((fndSubarray, index) =>{
//     console.log('foundation array index: ' + index)

//     allCurrentPilesArray.forEach((droparray, dropIndex) =>{
//         if(droparray[droparray.length - 1] === fndSubarray[fndSubarray.length - 1] + 4){
//             fndSubarray.push(droparray[droparray.length - 1])
//         }
//     })
//           if(dropIndex < allCurrentPilesArray.length){

//             if(dropPile.length < 1){ // increse empty drop pile number
//               emptyDropPiles ++;
//               console.log('emptyDropPiles')
//               console.log(emptyDropPiles)
//          }else{ // otherwise loop through drop pile array
//             console.log('drop pile length')
//             console.log(dropPile.length)
//             let dropEndCard = dropPile[dropPile.length - 1]
//             console.log('dropEndCard')
//             console.log(dropEndCard)

//             allFoundationPilesArray.forEach((foundationPile, foundationIndex) =>{
//               let FndEndCard = foundationPile[foundationPile.length - 1]
//               console.log('foundationPile: ' + foundationIndex)
//               console.log(foundationPile)

//               console.log('dropPile')
//               console.log(dropPile)

//               console.log('dropEndCard')
//               console.log(dropEndCard)

//               console.log('foundation end card')
//               console.log(FndEndCard)


//               if(dropEndCard == FndEndCard + 4 ){
//                 console.log('is drop end card valid?')
//                 console.log(dropEndCard == FndEndCard + 4)
//                 console.log('dropthis card')
//                 console.log(dropEndCard)
//                 foundationPile.push(dropEndCard)
//                 console.log('new updated foundation pile')
//                 console.log(foundationPile)
//                 console.log('popping drop pile')
//                 dropPile.filter(value !== dropEndCard)
//                 return
//               }
//             })
    
//           }
//           }
//           else{
//             // the drop pile index is the same value as the main array length which means the last drop pile has been examined so run the solveGame function again with the empty drop piles number
    
//             solveGame(emptyDropPiles)
//           }
    
      
        
      
//         })
    
//         // hopefully this occurs at the end of the loop
//         solveGame(emptyDropPiles)
//       }
    
    
//     function solveGame(empties){
    
//     if(empties < 7){
//     moveToFoundation(empties)
//     }
//     }
    
    
    
      // add an event listener to solve button
      solveBtn.addEventListener('click', () =>{

        // let dropArray = [[4, 8, 12], [3, 7, 11, 15], [1, 5, 9, 13], [2, 6]]

        // let Foundationarray = [[50, 45, 42, 37, 34, 29, 26, 24, 19, 16,], [49, 47, 44, 39, 36, 31, 28, 22, 17, 14], [40, 35, 32, 27, 21], [33, 30, 25, 23, 20], [], [52, 46, 41, 38], [51, 48, 43]]
        pickFoundation(0) // start solve process
      })


      /*
      
      function moveToFoundation(empties){
    let allFoundationPilesArray = [[4, 8, 12], [3, 7, 11, 15], [1, 5, 9, 13], [2, 6]]

    let allCurrentPilesArray = [[50, 45, 42, 37, 34, 29, 26, 24, 19, 16,], [49, 47, 44, 39, 36, 31, 28, 22, 17, 14], [40, 35, 32, 27, 21], [33, 30, 25, 23, 20], [], [52, 46, 41, 38], [51, 48, 43]]




    
  console.log(empties)
    let emptyDropPiles = empties
    // if 'empties' = 7 the function won't execute
        allCurrentPilesArray.forEach((dropPile, dropIndex) =>{
    console.log('dropPile index: ' + dropIndex)
          if(dropIndex < allCurrentPilesArray.length){

            if(dropPile.length < 1){ // increse empty drop pile number
              emptyDropPiles ++;
              console.log('emptyDropPiles')
              console.log(emptyDropPiles)
         }else{ // otherwise loop through drop pile array
            console.log('drop pile length')
            console.log(dropPile.length)
            let dropEndCard = dropPile[dropPile.length - 1]
            console.log('dropEndCard')
            console.log(dropEndCard)

            allFoundationPilesArray.forEach((foundationPile, foundationIndex) =>{
              let FndEndCard = foundationPile[foundationPile.length - 1]
              console.log('foundationPile: ' + foundationIndex)
              console.log(foundationPile)

              console.log('dropPile')
              console.log(dropPile)

              console.log('dropEndCard')
              console.log(dropEndCard)

              console.log('foundation end card')
              console.log(FndEndCard)


              if(dropEndCard == FndEndCard + 4 ){
                console.log('is drop end card valid?')
                console.log(dropEndCard == FndEndCard + 4)
                console.log('dropthis card')
                console.log(dropEndCard)
                foundationPile.push(dropEndCard)
                console.log('new updated foundation pile')
                console.log(foundationPile)
                console.log('popping drop pile')
                dropPile.filter(value !== dropEndCard)
              }
            })
    
          }
          }
          else{
            // the drop pile index is the same value as the main array length which means the last drop pile has been examined so run the solveGame function again with the empty drop piles number
    
            solveGame(emptyDropPiles)
          }
    
      
        
      
        })
    
        // hopefully this occurs at the end of the loop
        solveGame(emptyDropPiles)
      }
    
      
      */



























// SPARE FUNCTION WITH CONSOLE LOGS

      
      // function comparePileCard(fPile, index){
        // // CHECK how many drop piles are empty, when this reaches 7 this function will not execute again. 
        
        // console.log('index')
        // console.log(index)
        // let totalEmptyDropPiles = 0;
        
        //   // get endcard in foundation pile
        //   lastFoundationCard = fPile[fPile.length - 1]
        //   // variable for end card in drop pile
        //   let lastDropPileCard;
        //   allCurrentPilesArray.forEach((dropPile, dropIndex) =>{
        
        //     if(dropPile.length > 0){ // only compare if the dropPile is non empty
        
        //       console.log('compare below drop pile to foundation')
        //       console.log(dropPile)
        //       lastDropPileCard = dropPile[dropPile.length -1]
        //       console.log('lastDropPileCard')
        //       console.log(lastDropPileCard)
        //       console.log('foundation pile last card')
        //       console.log(lastFoundationCard)
        //       if(lastDropPileCard - lastFoundationCard === 4){
        //         allFoundationPilesArray[index].push(lastDropPileCard)
        //         totalCardsAdded ++
        //         console.log('total cards added')
        //         console.log(totalCardsAdded)
        //         console.log('card added to foundation')
        //         console.log(allFoundationPilesArray[index])
        //         lastFoundationCard += 4;
        //         allCurrentPilesArray[dropIndex].pop()
        //         console.log('card removed from drop pile')
        //         console.log(allCurrentPilesArray[dropIndex])
        //       }else{
        //   console.log('no card added to FOUNDATION PILE')
        //   console.log(allFoundationPilesArray[index])
          
        //   console.log('no card removed from DROP PILE')
        //   console.log(allCurrentPilesArray[dropIndex])
        //       }
        //     }else{
        //       console.log(`drop pile at index: ${dropIndex} is empty
        //   NO CHECKS MADE
        //       `)
        // totalEmptyDropPiles ++;
        //     }
        
        
        
        // console.log('CHECK COMPLETE')
        // console.log('total added')
        // console.log(totalCardsAdded)
        // if(dropIndex === 6){
        // console.log('final drop pile checked')
        // console.log('total empty piles')
        // console.log(totalEmptyDropPiles)
        
        
        // console.log('FINAL CHECK COMPLETE')
        
        
        //   console.log('all foundations array')
        //   console.log(allFoundationPilesArray)
        
        //   console.log('all drop piles array')
        //   console.log(allCurrentPilesArray)
        
        
        //   console.log('total added')
        //   console.log(totalCardsAdded)
        // if(totalEmptyDropPiles > 6 ){
        //   // do nothing
        // }else{
        
        //   if(totalCardsAdded > 0){
        //     totalCardsAdded = 0;
        //     console.log('clear total added')
        //     console.log(totalCardsAdded)
        // console.log(`added was greater than zero re-pick with index ${index}`)
        //     pickFoundation(index)
        //   }else{
        //       console.log('index')
        //       console.log(index)
        //       let newIndex = (index + 1)%4
        //       console.log('newIndex')
        //       console.log(newIndex)
        //       pickFoundation(newIndex)
        //       }
        
        
        // }
        
        
        
        
        
        //   // if(totalEmptyDropPiles < 7){
        
        //   //   comparePileCard(allFoundationPilesArray[index], index)
        //   // }else{
        
        //   //   console.log('CHECK COMPLETE')
        //   // }
        
        
        
        
        
        // //   if(totalEmptyDropPiles < 7){
        // // console.log(totalEmptyDropPiles)
        // //     pickFoundation()
            
        // //   }else{
        // //     console.log('SOLVE COMPLETE')
        // //     // pickFoundation()
        // //   }
        
        
        // }
         
        // //     if(index === 3){ // the last foundation pile has been processed
        // // pickFoundation()
        // //     }
        //   })
        
        // }
        