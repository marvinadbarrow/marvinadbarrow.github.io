let decimalOutput;
let numerator;
let denominator;
let factor;
let messageEl = document.getElementById('message-para')
let convertBtn = document.getElementById('convert-btn')
let numeratorInputEl = document.getElementById('numerator-input')
let denominatorInputEl = document.getElementById('denominator-input')
let numeratorEl = document.getElementById('numerator-div')
let denominatorEl = document.getElementById('denominator-div')
let keypadEl = document.getElementById('keypad')
let decimalEl = document.getElementById('decimal-output')
let numeratorContents;
let denominatorContents;
let displayArr = []; // whichever display gets clicked, its identity will be unshifted to this arry so the zero'th index can indicate which of the two displays to display the keyed numbers in






var primeArr = []
var primeCheckArr = []// zero position holds the number to be checked
primeCheckArr.unshift(6) // just running a test number

let divisorArray = [];
let hundredArray = []

let factorTest; // divides main by a number lower than main 
let factorTestFloor; // returns floor of the factor test
let factorCheck; // returns value of factor test - factor test floor
// factorCheck = 0, that implies that the factor floor is the same as the factor test division, so the division must be an integer, meaning the divisor is a factor of the main, so the main is composite, not prime; the function can stop here and move to the next main number (if you are checking several numbers for primes).  - if factorCheck != 0, that implies the floor of the division is not the same as the division so the division must be a fraction and therefore the divisor doesn't divide the main so the divisor is not a factor of the main; then move to the next nearest lower number and check again


let checkPrime;
let testNumber;
let testDivided;
let filterInteger;
let checkNum;
let checkFloor;
let newArr;
// set up an array for prime numbers
let primeArray = []


let primeListArr = [];

    // variables for number generation, conversion to fraction and simplification. 
    let randomNum; // generates random decimal
    let randomFixed; // random number to 5.d.p
    let decimalToFrac; // converts decimal to fraction
    let simplify; // variable to hold simplified fraction
let decimalArr = [] // holds generated decimal in zero'th position
let fractionArr = []// holds fraction in zero'th position
let numeratorArr = []// holds numerator converted from decimal
let denominatorArr = []// holds denominator converted from decimal
let primeDivisorNumeratorArr = [] // holds all numerator prime factors
let primeDivisorDenominatorArr = [] // holds denominator prime factors
let integerArr = []// if the fraction is improper this array holds the integer part while the decimal part is processed. 
let numeratorFactorsArray = []// holds all numerator's factors
let denominatorFactorsArray=  [] // holds all denominator's factors
let testArrayEven = []



// when input is focus highlight background and align text right
const highlightDisplay = (display, id) =>{

  display.style.cssText = "text-align: right; background-color:rgb(199, 220, 252); color:black;"
  displayArr.shift();
displayArr.unshift(`${id}`);
}


// on click on input clear placeholder and push cursor to right; but only if the word numerator is in the display - otherwise it will keep its values if you leave but then click back in
numeratorInputEl.addEventListener('click', (e) =>{
  let displayId = 'numerator-input'
if(numeratorInputEl.textContent == "numerator"){e.target.textContent = ""; 
highlightDisplay(e.target, displayId)
}else{
highlightDisplay(e.target, displayId)
}
})



// on click on input clear placeholder and push cursor to right
denominatorInputEl.addEventListener('click', (e) =>{
  let displayId = 'denominator-input'
if(denominatorInputEl.textContent == "denominator"){e.target.textContent = ""; 
highlightDisplay(e.target, displayId)
}else{
highlightDisplay(e.target, displayId)
}
  })


 // PUSH  numnbers TO DISPLAYS
 const inptNum = (key) =>{
  if(displayArr.length > 0){
  switch(displayArr[0]){ // check contents of oppArr
        case 'numerator-input':
            numeratorInputEl.textContent += key
  numeratorInputEl.style.color = "black"
     
      break;
      default:
        denominatorInputEl.textContent += key
        denominatorInputEl.style.color = "black"
   }}   }


// ALL CLEAR BUTTON
const clearAll = () =>{
numeratorArr = []
denominatorArr = []
numeratorInputEl.textContent = 'numerator'
numeratorInputEl.style.cssText = ' color: rgba(128, 128, 128, 0.505); text-align:center; background-color:white;'
denominatorInputEl.textContent = 'denominator'
denominatorInputEl.style.cssText = ' color: rgba(128, 128, 128, 0.505); text-align:center; background-color:white;'
numeratorEl.textContent = '0'
denominatorEl.textContent = '0'
messageEl.textContent = ""
primeArr = []
primeCheckArr = []
divisorArray = [];
hundredArray = []
primeListArr = []
displayArr = []
decimalArr = [] 
fractionArr = []
numeratorArr = []
denominatorArr = []
primeDivisorNumeratorArr = []
primeDivisorDenominatorArr = [] 
integerArr = []
numeratorFactorsArray = []
denominatorFactorsArray = []
testArrayEven = []
combinedPrimes =  []
decimalEl.textContent = "decimal";
decimalEl.style.cssText = "background-color: rgb(245, 218, 218); color: rgba(128, 128, 128, 0.505);"
}






const renderDecmal = (num, den) =>{
  let unFixed;
if(numeratorFactorsArray.length  > 0 || denominatorFactorsArray.length > 0){
  unFixed = num/den
decimalOutput = unFixed.toFixed(4)}else{
// if both are prime numbers factors won't show in either array
if(numeratorArr[2] == 'prime' && denominatorArr[2] == 'prime'){
  unFixed = num/den
  decimalOutput = unFixed.toFixed(4)
}}





let decimalString = decimalOutput.toString()
console.log(decimalString)
let dot = decimalString.indexOf('.')
console.log(dot) // this shows where the decimal point is in the string so that, beyond that point, if there are any trailing zeros, the zeros will be truncated from their start point to give a shorter decimal readout. 
let zeros = decimalString.indexOf('00', dot) // index position of the beginning of any existing trailing zeros AFTER the 'dot'
if(zeros > 0){ // if trailing zeros exist
  let truncateIndex = zeros - dot - 1 // get position just before trailing zeros
  console.log(`zeros exist after: ${zeros - dot - 1} decimal places`);
decimalEl.textContent = unFixed.toFixed(truncateIndex); // truncate zeros
decimalEl.style.cssText = "background-color:white; color:black;" // style output
}
else{ decimalEl.textContent = decimalOutput; // no trailing zeros exist - render decimal to 5.d.p
  decimalEl.style.cssText = "background-color:white; color:black;"} // style output


 
  // need to remove trailing decimals. 


}






// conversion of words to numbers
const callNumber = (selected) =>{
  let convertedNumber;
  // convert word numbers to digits
  switch(selected){

case "one": convertedNumber = 1
break;
case "two": convertedNumber= 2
break
case "three": convertedNumber = 3
break;
case "four": convertedNumber = 4
break;
case "five": convertedNumber = 5
break;
case "six": convertedNumber = 6
break;
case "seven": convertedNumber = 7
break;
case "eight": convertedNumber = 8
break;
case "nine": convertedNumber = 9
break;
case "zero": convertedNumber = 0
break;

  }
// send number to be inputted
  inptNum(convertedNumber)
  }

// listen to keypad buttons for number presses
keypadEl.addEventListener('click', (e) =>{
  let selected = e.target.getAttribute('id')

switch(selected){
  // if selected is a number
  case "one":
  case "two":
  case "three":
  case "four":
  case "five":
  case "six":
  case "seven":
  case "eight":
  case "nine":
  case "zero":
  case "dot":
   callNumber(selected)
   break;
   case 'del': clearAll()
   break;
   case "decimal": renderDecmal(numeratorContents, denominatorContents)
   break;
}

})

  




const equality = () =>{
  numeratorEl.textContent = numeratorContents / denominatorContents 
  denominatorEl.textContent = ""
  messageEl.textContent = 'numerator and denominator are the same'

}




const reciprocal = () =>{

  console.log('numerator is a factor of denominator - divide both by numerator')
  numeratorEl.textContent = '1';
denominatorEl.textContent = denominatorContents/numeratorContents;
}


const noCommonFactors = () =>{

  numeratorEl.textContent = numeratorContents;
denominatorEl.textContent = denominatorContents;
messageEl.textContent = ' numerator and denominator have no common factors; fraction is already in its simplest form';
}


const wholeNumber = () =>{
  console.log(numeratorContents, denominatorContents)
  numeratorEl.textContent = numeratorContents / denominatorContents 
  denominatorEl.textContent = ""
  messageEl.textContent = 'denominator is a factor of numerator - fraction is a whole number'

}

convertBtn.addEventListener('click',function(){

let testArray = [];
 numeratorContents = parseInt(numeratorInputEl.textContent)
denominatorContents = parseInt(denominatorInputEl.textContent)



let numWord = 'numerator'
let denWord = 'denominator'
let primesN = []
let primesD = []
let commonPrimes = [];

let numTestNumerator = []



const compareFactors = (numeratorPrimes, denominatorPrimes ) =>{


// get the product of all of the entries in commonPrimes array: this is the HCF. Then divide numerator and denominator by both for simplified fraction. 

  const getHcF = (primes) =>{

    console.log(primes)
const hCF = primes.reduce((accumulator, currentValue) => accumulator*currentValue)
console.log(`HCF: ${hCF}`)
numeratorEl.textContent = numeratorContents/hCF
denominatorEl.textContent = denominatorContents/hCF // now working
  }

// find commong prime factors of numerator and denominator, and for each pair found push the prime value tha they both hold to the commonPrimes arrayh
  const getCommonPrimes = () =>{
        for(i=0; i < numeratorPrimes.length; i++){ // loop through numerator primes
      if(!denominatorPrimes.includes(numeratorPrimes[i])){ console.log('no matching factor found')
       }else{
      let foundPrime = denominatorPrimes.indexOf(numeratorPrimes[i])
      console.log(`index of prime in denominator primes array ${foundPrime}`)
  delete denominatorPrimes[foundPrime] // so that prime is eliminated
  console.log(denominatorPrimes) // check elemination
  commonPrimes.push(numeratorPrimes[i])
    }
         }
       console.log(`prime factors complete: ${commonPrimes}`)
       getHcF(commonPrimes)// after loop is complete, send result to commonPrimes
  }




// if any of the denominator prime factors are in the unique numerator primes, then we know that they have matching primes, otherwise there are no common prime factors between numberater and denominator. 
const checkDuplicates = (array) =>{
  console.log(`numerator UNIQUE primes: ${array}`) // denominator primes
  console.log(`denominator primes: ${denominatorPrimes}`)
  console.log(`numerator primes: ${numeratorPrimes}`)

for(i=0; i < denominatorPrimes.length; i++){// loop through denominator primes
  if(array.includes(denominatorPrimes[i])){ // if any of the UNIQUE numerator prime factors in 'array' is included in the denominator primes, then it is a common factor to numerator and denominator; EXAMPLE: 64 = 2*2*2*2*2*2 AND 86 = 2*43; 2 and 43 happen to be unique, and since 64 has 2 as a prime factor, both 64 and 86 share at least one common factor. We can do it the other way around also; where 2 is the only UNIQUE factor of 64, but 86 obviously contains 2; It doesn't matter which of the two numbers you choose to create UNIQUE factors out of; you'll still get the same result. 
    console.log(` HCF exists`)
    getCommonPrimes()
return;
  }else{console.log('no HFC exists');
  noCommonFactors()  // because no prime factors of the numerator is found to match any of the UNIQUE numerator factors, then there is no common factor and therefore no HCF
}
}

}

// push non duplicates of numerator prime factors to a separate array
  const duplicateTestNumerator = (array) =>{
            for(i=0; i < array.length; i++){
  if(numTestNumerator.includes(array[i])){
    console.log('already included')
  }else{numTestNumerator.push(array[i])}
      }  
      console.log(numTestNumerator)
           checkDuplicates(numTestNumerator)// send for comparison with denominator prime factors - if they share any value then there are common prime factors and a HCF exists, if not, they share none so fraction stays in original format
        }




console.log(numeratorPrimes, denominatorPrimes)

duplicateTestNumerator(numeratorPrimes) // send numerator primes to the above function where it will be stripped of duplicates, leaving only unique primes
}



// DENOMINATOR IS SQUARE OF A PRIME SO THERE IS ONLY '1' FACTOR LISTED IN denFactArr. 
const denSingleDivisor = (mainDen, index, denFactArr) =>{
  console.log(mainDen, index, denFactArr)



  if(mainDen > 1){
    mainDen = mainDen/denFactArr[index] // main == divided result
               primesD.push(denFactArr[index])// push divisor to primes
               denSingleDivisor(mainDen, index, denFactArr)// re-run with new main
  }else{
    console.log(primesD, primesN)
    compareFactors(primesN, primesD)
  }

  


} 

 // recursion to find prime factors of denominator 
const mainDivisorDen = (mainDen, index, denFactArr) =>{
  console.log(denFactArr)
if(denFactArr.length > 1 ){
  if(mainDen % denFactArr[index] == 0){
primesD.push(denFactArr[index])
mainDen /= denFactArr[index]
mainDivisorDen(mainDen, index, denFactArr)
  }else{if(mainDen > 1){
    if(index < denFactArr.length - 1){mainDivisorDen(mainDen, index + 1, denFactArr)}}
  else{
    console.log(`denominator PRIME factors: ${primesD}`);
  // and now we can run the function to compare prime factors to come up with the HCF of both numbers. 
  compareFactors(primesN, primesD)
  }
  }
}else{
// where denfactor array isn't greater than 1, i.e. it's just 1 long and is the prime root of the denominator
denSingleDivisor(mainDen, index, denFactArr)
}
}



// NUMERATOR IS SQUARE OF A PRIME SO THERE IS ONLY '1' FACTOR LISTED IN numFactArr. 
const numSingleDivisor = (mainNum, index, numFactArr) =>{
  console.log(mainNum, index, numFactArr)


if(mainNum > 1){
  mainNum = mainNum/numFactArr[index] // main == divided result
             primesN.push(numFactArr[index])// push divisor to primes
             numSingleDivisor(mainNum, index, numFactArr)// re-run with new main
}else{
  let index = 0; // index to loop through factors array position '1'
  mainDen = denominatorContents
  console.log(mainDen)
  mainDivisorDen(mainDen, index, denominatorFactorsArray) //  send numerator, index, and prime factors array for denominator
}



}
 
 // recursion to find prime factors of numerator 
  const mainDivisorNum = (mainNum, index, numFactArr) =>{
    if(numFactArr.length > 1){
      if(mainNum > 1){
        if(mainNum % numFactArr[index] == 0){// main, or divided main is divisible  by prime number element of numFactArr 
             mainNum = mainNum/numFactArr[index] // main == divided result
             primesN.push(numFactArr[index])// push divisor to primes
             mainDivisorNum(mainNum, index, numFactArr)// re-run with new main
        }else{ if( index < numFactArr.length - 1){// otherwise if index < last item position - add '1' to index and re-run
          mainDivisorNum(mainNum, index + 1, numFactArr)
        }else{console.log('stop cycle')}}

      
       
             
      }else{ // main === 1
        let index = 0; // index to loop through factors array position '1'
        mainDen = denominatorContents
        console.log(mainDen)
        mainDivisorDen(mainDen, index, denominatorFactorsArray) //  send numerator, index, and prime factors array for denominator
           }

       
             
                   }else{
numSingleDivisor(mainNum, index, numFactArr)
                    // where numFactArr array isn't greater than 1, i.e. it's just 1 long and is the prime root of the numerator
                   }
    

  }

  // recursion to find prime factors of numerator
const mainArr = () =>{
console.log(`numerator factors: ${numeratorFactorsArray},
denominator factors: ${denominatorFactorsArray}
`)
let index = 0; // index to loop through factors array position '1'
let mainNum = numeratorContents // numerator
mainDivisorNum(mainNum, index, numeratorFactorsArray)// send numerator, index, and prime factors array for numerator
}






// MAIN FUNCTIONS for fractions where numerator and denominators are neither prime, nor are factors of the bigger numbers. 


// code for finding primes
const primeCheck = (word, value) =>{
console.log(`${word} is prime`)
console.log(word, value)
// value of first two array items in numeratorArr and denominatorArr will be used to decide how to deal with each number depending on whether they are the bigger of the two or smaller of the two and whether they are prime or not. 
switch(word){
  case 'numerator':numeratorArr.push(value, word, 'prime')
  break;
case 'denominator':denominatorArr.push(value, word, 'prime')

break;
}




//IMPROPER FRACTION
if(numeratorContents > denominatorContents){ // IMPROPER FRACTION
  console.log('mixed number')
   switch(numeratorArr[2]){ // NUMERATOR IS PRIME
case 'prime': 
noCommonFactors() // lower numbers cannot be factors of a prime so denominator cannot be a factor of the numerator which is a larger number. 
break;


case 'not prime': // NUMERATOR NOT PRIME - several scenarios
switch(denominatorArr[2]){ // check if denominator is prime
case 'prime': factorCheck = numeratorContents % denominatorContents;

if(factorCheck == 0){
  wholeNumber()
}else{
  noCommonFactors()
}
break;



case 'not prime': // DENOMINATOR NOR PRIME NOR A FACTOR
 if(numeratorContents % denominatorContents == 0){
  wholeNumber()
 }else{console.log('send to MAIN')} // DENOMINATOR NOT PRIME AND IS NOT FACTOR
// so here is where you need to deal with the two numbers and find their factors. 
//   createPrimes() 
mainArr()
console.log(`numerator factors: ${numeratorFactorsArray}, 
denominator factors: ${denominatorFactorsArray}`); 
  break;
}
    }}
    
   
    // PROPER FRACTION
    else if(numeratorContents < denominatorContents){
      switch(denominatorArr[2]){
case 'prime': // DENOMINATOR IS PRIME
noCommonFactors() // since it is greater than the numerator, the smaller number cannot be a factor of the prime, so they share no common factors. 
break;
case 'not prime': // DENOMINATOR IS NOT PRIME
  console.log(numeratorArr[2])
    switch(numeratorArr[2]){ // check if numerator is prime
case 'prime': factorCheck = denominatorContents % numeratorContents;
if(factorCheck == 0){
reciprocal()}else{
noCommonFactors()
}
break;




case 'not prime':// NUMERATOR NOT PRIME
  if(denominatorContents % numeratorContents  == 0){
 // numerator must be a factor of denominator so fraction is reciprocal
    reciprocal() // NUMERATOR NOT PRIME BUT 'IS' A FACTOR
    console.log('reciprocal')
  }else{console.log('send to MAIN')  } // NUMERATOR NEITHER PRIME NOR A FACTOR
     console.log(`numerator factors: ${numeratorFactorsArray}, 
     denominator factors: ${denominatorFactorsArray}`)
     mainArr()
   // this shows the factors of numerator or denominator
    break; 

  }
}}else{console.log('numerator = denominator');
equality()
}



 }

// FIND FACTORS - IF element is not even
const findFactors = (array, word, value) =>{

 console.log(array, word, value)
 // ODD NUMBERED FACTORS
if(array[array.length-1] % 2 === 1){ // if either number is odd
 // each array element (either numerator array or denominator array)

array.forEach((element) =>{
 if(element > 1 && element < array[array.length - 1]/2){testArray.push(array[array.length-1] % element);
if(array[array.length-1] % element === 0){
if(word == 'numerator'){numeratorFactorsArray.push(element)
  console.log(numeratorFactorsArray)
}else{denominatorFactorsArray.push(element); console.log(denominatorFactorsArray)}
} // for factors of numerator or denominator if property is odd. 
}// end of function pushing remainders of number % descendents, where zero means the descendent is a factor - which the code below searches for. 
})

testArray.unshift(word) // to show which number is being evaluated
console.log(testArray)

// if zero is in array the evaluated element divides the main number, indicating that the number is NOT prime. - Then check which word is associated with the number (numerator or denominator) and push its details  to numeratorArr
if(testArray.includes(0)){console.log(`${word} is not prime`);
switch(word){
  case 'numerator':numeratorArr.push(numeratorContents, word, 'not prime')
  console.log(numeratorArr, denominatorArr); primeCheck()
  break;
case 'denominator':denominatorArr.push(denominatorContents, word, 'not prime')
console.log(numeratorArr, denominatorArr);primeCheck()
break;
} // end of factor finder

}else{
  // if no zero exists in factor array - so this number is prime. AND that's why it gets pushed to primeCheck()
  primeCheck(word, array, value)
}}


// if numerator or denominator is even which means array[array.length -1]/ 2 === 0, and therefore the evaluated number is even 
// EVEN NUMBERED FACTORS
else{
console.log(numeratorContents, denominatorContents)
console.log(array, word, value)
array.forEach((element) =>{
  if(element > 1 && element <= array[array.length -1]/2){testArrayEven.push(array[array.length-1] % element);
     if(array[array.length - 1] % element == 0){factor = element; console.log(`factor:${element}`);
    if(word == 'numerator'){numeratorFactorsArray.push(factor)}else{denominatorFactorsArray.push(factor)}
    }// note if any of the numbers are prime then the factors won't display, but they don't need to because either the fraction can't be simplified, or the result is reciprocal or a whole number. 
  } 
})
console.log(word, testArrayEven)


console.log(`even numbers > 2 are not prime: ${word} not prime`)
switch(word){
  case 'numerator':numeratorArr.push(numeratorContents, word, 'not prime');
  primeCheck()
  break;
case 'denominator':denominatorArr.push(denominatorContents, word, 'not prime');
primeCheck()
break;
}
// puts the main number in the first position so we can loop through all other position values and divide them by their primes (once we extract the primes)
console.log(numeratorArr, denominatorArr)

}


}


// CREATE ARRAY FROM NUMERATOR
const createArray = (array, word) =>{
array = Array.from({length:array + 1}, (v, i) => i)
findFactors(array, word, array[array.length - 1])
}


// check numerator for property PRIME OR NOT
createArray(numeratorContents, numWord)

// check denominator for property  PRIME OR NOT
setTimeout(() => {
  testArray = [] // testArray needs to be cleared because findFactors unshifts values to it; if test numbers for numerator resulted in a zero, meaning the numerator is not prime, that zero would still be in the testArray when denominator test number results are pushed to the array - and the zero would be read again; causing the program to assume it is part of the denominator results, which it is not. 
  createArray(denominatorContents, denWord)
}, 500);



})



















 
 



























