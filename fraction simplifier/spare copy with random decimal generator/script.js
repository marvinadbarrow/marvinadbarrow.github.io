
let convertBtn = document.getElementById('convert-btn')
let numeratorInputEl = document.getElementById('numerator-input')
let denominatorInputEl = document.getElementById('denominator-input')
let numeratorEl = document.getElementById('numerator-div')
let denominatorEl = document.getElementById('denominator-div')
let keypadEl = document.getElementById('keypad')
let numeratorContents;
let denominatorContents;
let displayArr = []; // whichever display gets clicked, its identity will be unshifted to this arry so the zero'th index can indicate which of the two displays to display the keyed numbers in


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









 // PUSH TO DISPLAYS
 const inptNum = (key) =>{
  let value; 
console.log(key)
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
console.log(selected)


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

}

})






  
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
let hundredArrayReversed = [];
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






// PRIME CHECKER
// so this function targets and finds prime number of any number

// actually creating the lsit of PRIME NUMBERS by checking through main number downward and looking for prime numbers in each example... they are checked against odd numbers if no divisor is found for a particular main number, then the main is prime and is pushesd to primeListArr. 
const primeCalculator = (checkPrimeArr, main) =>{
// checkPrimeArr is the array with half of the primes of main (which is the hundred array)

  let i = checkPrimeArr.length -1; // length of checkPrime
 checkPrime = checkPrimeArr[i] // check prime is the value of the last array item
 


 // if the check number gets to 2 log no prime found, main is prime, and show number. then push that number to the array for discovered primes, pop the last item out of hundredArray, and resend the hundredArray to primeTester to start the process again - ONLY DO THIS ONCE A PRIME HAS BEEN DISCOVERED. 
  if(checkPrime < 3){
  primeListArr.unshift(main)
 // console.log(`end of ${main} check. No FACTORS found.   ${main} is Prime`); 
  //zeroToHundredPrimesArr.push(main)
// console.log(zeroToHundredPrimesArr)
//console.log(checkPrimeArr)
hundredArray.pop()
primeTester(hundredArray)
  return }
   
  // if checkPrime is greater than 2 run the divisor test and if an integer is found  pop the last item out of hundredArray, and resend the hundredArray (if it still contains items: we can deal with that case inside primeTester anyway) to primeTester to start the process again - ONLY DO THIS WHEN A FACTOR HAS BEEN IDENTIFIED, BECAUSE THERE'S NO NEED TO SEARCH FOR OTHER FACTORS - THE EXAMINED NUMBER IS NOT PRIME. 
  else{
     factorTest = main/checkPrime 
   factorTestFloor = Math.floor(factorTest)
  factorCheck = factorTest - factorTestFloor
      if(factorCheck === 0){
        
      
      // if integer found log 'found integer and show result and divisor   
/*

  console.log(`found FACTOR: ${checkPrime};
${checkPrime} x ${main/checkPrime} = ${main} 
${checkPrime} > 1 and is a FACTOR of ${main} so
${main} is not prime`);
*/


checkPrimeArr = ""
hundredArray.pop()
primeTester(hundredArray)
  return;
   // then after number has been excluded, pop last element
      }
     else{
    checkPrimeArr.pop()
    primeCalculator(checkPrimeArr, main)}
       } }




// FUNCTION FINDING MATCHING PAIRS OF PRIME FACTORS ACROSS TWO ARRAYS WHICH REPRESENT PRIME FACTORS OF NUMERATOR AND DENOMINATOR. Values of the two arrays are compred and. if any matching pairs of values are found, the numerical value which both of the pair hold will be sent to a third array. So if three pairs are found, then the numerical value that they both have will be sent as three separate items to the third array (because three pairs were found).  Once all matching pairs are found, a multiplication will be performed on all values in the third array; the result is the highest common factor of the numerator and denominator of the converted fraction; so we can divide denominator and numerator by that result and get our simplified fraction.  If the array for numerator prime factors is empty, it means that none of its prime factors are the same as any of the denominator's prime factors, (the prime factors of the numerator are all higher than the prime factors of the denominator) then there is no shared factor, and therefore no highest common factor with which to divide both numerator and denominator.  The fraction cannot be simplified and stays as is. 


const findHCF = (denominator, numerator) =>{
  let denomString = denominator.toString()
  let numerString = numerator.toString()
  let hcfArray = []
  // if no common factors exist log 'no common factors' else, denominator prime factors and any matching numerator prime factors


  if(numerator.length < 1 || !numerator.includes(2) && !numerator.includes(5)){console.log('numerator and denominator share no common prime factors')
console.log(primeDivisorDenominatorArr)
console.log(primeDivisorNumeratorArr)
}else{
    
    console.log(`numerator primes: ${numerString}

denominator primes: ${denomString}`)

// looping through denominator primes array
for(i=0; i < primeDivisorDenominatorArr.length; i++){
  // if numerator prime factor array contains the current item of the denominator arry, 
  if(primeDivisorNumeratorArr.includes(primeDivisorDenominatorArr[i])){
// get the index of the matching item
let valueOfIndex = primeDivisorNumeratorArr.indexOf(primeDivisorDenominatorArr[i])
  // push the contents of that index to the hcf array
  hcfArray.push(primeDivisorNumeratorArr[valueOfIndex])
  // then delete the content of that index from the numerator array, so for the next item in the loop of denominator arry, this number will no longer be there, so it will be looking for any other item as a match. 
  delete primeDivisorNumeratorArr[valueOfIndex]
  }}

    // check contents of hcf array
    console.log(hcfArray)
    // this is working properly. and once we have completed the loop then we multiply all of the elements of the hcf array and then divide both numerator and denominator by that value which will give the simplified fraction
  
// now the looop through hcf array and multiply all entries
let j = 1; // this is the IDENTITY for multiplication and our starting point. 
let simplifiedFraction;
let originalFraction;
for(i=0; i < hcfArray.length; i++){
  j *= hcfArray[i] // multiplies each entry by the last
}
console.log(j, numeratorArr, denominatorArr) // which should be the multiple of all hcf arrays. 
originalFraction = `${numeratorArr[0]} / ${denominatorArr[0]}`
simplifiedFraction = `${numeratorArr[0]/j} / ${denominatorArr[0]/j}`
console.log(`original fraction: ${originalFraction}`)
console.log(`simplified fraction:${simplifiedFraction}`)

  } // END of 'else' condition 
  

// GOT IT: the reason why the HCF has not been sent anywhere is because I was just showing the results in the console.  When these functions are put into the calculator application, these values above will be put into the display, for instance, calcArray.unshift(j) will put 'j' into the zeroth position in order to pull it into the ansEl display etc. 



}


const numeratorFactors  = (mainNum, index, denominatorIndex) =>{
  // denominator index is highest item value in denominator array, which is the represents the highest prime factor in the denominator - this function tests all primes less than and up to this value to see whether they are prime factors in the numerator; and if any are, a record of them is kept for later comparison with equivalent prime factors of the denominator. 
if(primeListArr[index] <  denominatorIndex + 1){
  x  =  mainNum;
  let divCalc = x % primeListArr[index]

  switch(divCalc){
case 0:
 // console.log(`${primeListArr[index]} divides ${x}`)
  x = x/primeListArr[index];
//  console.log(x)
  primeDivisorNumeratorArr.push(primeListArr[index])
 
  numeratorFactors(x,index,denominatorIndex)
break;
default:
 // console.log(`${primeListArr[index]} does not divide ${x}`);
  index += 1;
  if(primeListArr[index] > denominatorIndex){
    console.log('numerator search complete');
    console.log(primeDivisorDenominatorArr)
    console.log(primeDivisorNumeratorArr)
        findHCF(primeDivisorDenominatorArr, primeDivisorNumeratorArr)
        primeDivisorDenominatorArr = []
    primeDivisorNumeratorArr = []
    return 'throw'}else{numeratorFactors(x,index,denominatorIndex)}
}}
else{ console.log('numerator search complete')}
}



let x;
let i;

    const denominatorFactors = (mainNum, index) =>{
      if(mainNum > 1){
       
x  =  mainNum;


let divCalc = x % primeListArr[index]
if(divCalc  < 1){ // if divCalc === 0 that means that the main number is divisible by a number in the primeListArray (which is prime)
 
  x = x/primeListArr[index]; // so 'x' becomes the new number to attempt to divide. Keep on dividing by the specific prime until you can't do any more and every time it happens, push the prime value to the primedivisorarray for denominators. 
  primeDivisorDenominatorArr.push(primeListArr[index])
 
  denominatorFactors(x,index) // after division run the function again with the new value of 'x' but with the same prime number. 
}else{
  // prime factor no longer divides main number so go to next prime
  //console.log(`${primeListArr[index]} does not ${x}`);
index += 1;
//console.log(x)
//console.log(primeListArr[index])
denominatorFactors(x,index)
}

}else{
  let j= primeDivisorDenominatorArr[primeDivisorDenominatorArr.length - 1];
console.log(j) // highest value in the array will always be the last few primes so obviously the last item will always have that value

console.log('denominator factors complete');
// console.log(primeDivisorDenominatorArr) - logged again when the numerator is logged so no need to log it here; can undo if it helps with debugging/troubleshooting. 
numeratorFactors(numeratorArr[0], 0, j + 1)
}// end of if main number is greater than 1 so we've reached 1 here
}





const simplifyFrac = () =>{
// we need to run two functions from here - one for the numerator and one for the denominator 

let b;
let index;
if(primeListArr.length > 0){

  if(numeratorArr.length > 0 && denominatorArr.length > 0){
      b  =  denominatorArr[0];
    index = 0;
denominatorFactors(b, index)

  }else{
console.log('nothing to simplify, generate decimal and/o convert decimal')

  }


}else{console.log(`hit "create Primes" button first`)}
} 


const convertToFrac = () =>{

  let x;
  let calcString; // to stringify displayed calculation
  let length; // to check its length
  let multiplier;//to multiply decimal by 10 to the power of; number of decimal places
  let xMultiplied; // decimal * multiplier converts fraction to a whole number
let numerator;
let denominator;
    x = decimalArr[0]
 //   console.log(x)
    calcString = decimalArr[0]
    length = calcString.length -2
  //  console.log(length)
    multiplier = Math.pow(10,length)
  xMultiplied = x*multiplier // so x = xMultiplied/multiplier
 // console.log(xMultiplied)

  console.log(
          `converted decimal: ${xMultiplied} / ${multiplier}`)
  // now we need to programatically find the HCF of two different numbers. 
  // so we need to first figure out how to get prime numbers
  numerator = xMultiplied;
  denominator = multiplier;
  numeratorArr.push(numerator)
  denominatorArr.push(denominator)
  
// console.log(denominatorArr, numeratorArr)

simplifyFrac()
} 

const generateDecimal = () =>{
  numeratorArr = []
  denominatorArr = []
  decimalArr = []
  primeDivisorDenominatorArr =[]
  primeDivisorNumeratorArr = []
randomNum = Math.random()
randomFixed = randomNum.toFixed(5)
decimalArr.push(randomFixed)
console.log(randomNum)//  show original number
console.log(decimalArr, ' : is the decimal') // show fixed number

// then convert it
if(decimalArr.length > 0){convertToFrac()  }
else{console.log('no decimal available for conversion')}
}

/*
    randomBtn.addEventListener('click', () =>{
  generateDecimal()
    })
    
*/


// CUT OUT THE UPPER HALF OF THE ODD NUMBERS. 
const primeTester = (array) =>{ // take hundredsArry
  divisorArray = [];
if(array.length > 1){
let length = array.length - 1
// take out the redundant upper half of array values and put them into divisor array
array.forEach((element) =>{
if(element < array[length]/2 ){
divisorArray.push(element)
}
})
// after divisor array has been created, i.e. containing  half of the prime numbers of hundred array, sned the array as a parameter (along with the length of hundred array) to prime calculator. This is done 'before' generateDecimal which is in the 'else' section of this condition. The two parameters are used to produce all primes lower than the original number used to create the hundred array.  The odd numbers that are half of the biggest value in the hundred array is used to loop through the hundred array numbers to find out if any of them divide any of the larger group's numbers.  If no divisor is found, the item in the hundred array is a prime number. if a divisor IS found, then that divisor is a factor of the main number and therefore the main number is not a prime number.  The primes are pushed to primeListArr, and then looping through that array, a check will be made to see if any of the itmes in the array are divisors to numerator and denominator of the converted decimal.... which implies that that item is a prime factor of numerator or denominator, depending on which of the two you are testing.  


console.log(divisorArray)
  primeCalculator(divisorArray, array[length])
  }else{
    primeListArr.unshift(2)
    console.log(primeListArr)
    generateDecimal()
  }


    
} 
  

// create odd numbers from main number downward. 
const createPrimes = () =>{

// and array with the 100 numbers 
let mainSearchyArray = Array.from({length:100}, (v, i) => i)
// removing even numbers from the array
 mainSearchyArray.forEach( (element) =>{ // on each item
  // extract filter odd numbers and push to hundredArray
  if(element % 2){hundredArray.push(element)}
  })// note element % 2 must mean if element % 2 is a number... WOW
  console.log(hundredArray)
// now the array contains only odd numbers so we can search it without the problem of even numbers
primeTester(hundredArray)
}

convertBtn.addEventListener('click',function(){
numeratorContents = parseInt(numeratorInputEl.textContent)
denominatorContents = parseInt(denominatorInputEl.textContent)

console.log(`${numeratorContents} / ${denominatorContents}`)
if(numeratorContents < denominatorContents){createPrimes()}
else{console.log('PROPER FRACTIONS ONLY; denominator must be greater than numerator. Check Converting improper fractions for alternative method of simplification')}
 // createPrimes()
})



















 
 



























