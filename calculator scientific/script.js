var opArr = []
var calcArray = []
var inArr = []
var inArrB = []
var numbersArray = []
var numbEl
var LHS;
var RHS;
var sum;
var calcEl = document.getElementById('display3')
var ansEl = document.getElementById('display6')
var calculatorBodyEl = document.getElementById('calculator')
var numEl // takes integer nubmer
var radians; // for trigonomic calculations

// INITIALLY WE WANT TO CALCULATOR TO BE OFF


// code for working out first prime numbers between 0 and 100
var primeArr = []
var primeCheckArr = []// zero position holds the number to be checked
primeCheckArr.unshift(6) // just running a test number

let mainArray;
let divisorArray = [];


let factorTest; // divides main by a number lower than main 
let factorTestFloor; // returns floor of the factor test
let factorCheck; // returns value of factor test - factor test floor
// factorCheck = 0, that implies that the factor floor is the same as the factor test division, so the division must be an integer, meaning the divisor is a factor of the main, so the main is composite, not prime; the function can stop here and move to the next main number (if you are checking several numbers for primes).  - if factorCheck != 0, that implies the floor of the division is not the same as the division so the division must be a fraction and therefore the divisor doesn't divide the main so the divisor is not a factor of the main; then move to the next nearest lower number and check again


// SHIFT ELEMENTS - THESE REGULAR BUTTONS WILL CHANGE STYLE ON CLICKING SHIFT
let shiftCos = document.getElementById('cos')
let shiftTan = document.getElementById('tan')
let shiftSin = document.getElementById('sin')
let shiftFracDec = document.getElementById('frac-dec')
let shiftLog = document.getElementById('log')
let shiftNcr = document.getElementById('ncr')
let shiftNfact = document.getElementById('nfact')
let shiftPrime = document.getElementById('prime')
let shiftNatLog = document.getElementById('natural-log')
let arrowLeftEl = document.getElementById('arrow-left')
let arrowRightEl = document.getElementById('arrow-right')
// shift button 
let shiftBtn = document.getElementById('shift')
let shiftArray = [] // USED TO TOGGLE SHIFT BUTTONS ON AND OFF

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
// and array with the 100 numbers 
let hundredArray = Array.from({length:99}, (v, i) => i)
let zeroToHundredPrimesArr = [];
let arrowDirectionArr = []
let logarithmArr = []

 










 const primeCalculator2 = (checkPrimeArr, main) =>{
 let i = checkPrimeArr.length -1;
 checkPrime = checkPrimeArr[i]
  if(checkPrime < 3){console.log('check finished - no divisor found - main is PRIME'); 
  calcEl.textContent = 'Prime Number'
  return }else{
  
   factorTest = main/checkPrime 
   factorTestFloor = Math.floor(factorTest)
  factorCheck = factorTest - factorTestFloor
  
    if(factorCheck === 0){
      // if integer found log 'found integer and show result and divisor   
  console.log(`found Divisor: ${checkPrime};
  ${main} divided by ${checkPrime} = ${main/checkPrime};
  ${main} is not prime`);
  calcEl.textContent = `NP: ${main/checkPrime}x${checkPrime} = ${main} `
}else{
    checkPrimeArr.pop()
    primeCalculator2(checkPrimeArr, main)}
       }
}


// DECIDE pushes numbers to main calculator. 
const primeTester2 = (main) =>{

  

// create an array of all numbers from zero to 'main'
mainArray =  Array.from({length: main + 1}, (v, i) => i);
// then on each element that's less than half of 'main' create an array of values that will be be checked against the main number to look for divisors. We'll unshift so that we start from the bigger numbers
mainArray.forEach( (element) =>{
if(element % 2  && (element < main/2)){divisorArray.push(element)}
})// note element % 2 must mean if element % 2 is a number... WOW

console.log(`${main}; numbers to check:`, divisorArray)


// use modular division to see if the remainder is 0 or 1; 0 = even, 1 = odd. 
let evenOrOdd = main % 2
// switch to check main is odd - if not primeCalculator2 will not be executed
if(main > 2){
switch(evenOrOdd){
  case 0:console.log('main is even: even numbers > 2 are not prime');
  calcEl.textContent = 'multiple of 2: NP!'
    break;
  default: console.log('main is odd:')
  checkPrime = (main -1)/2
 primeCalculator2(divisorArray, main)
}}


 


/*
hundredArray.forEach((element) =>{

  primeCalculator(element, element)
} )
*/
}











 // PUSH TO DISPLAYS
const inptNum = () =>{
  // this makes LHS and RHS decimals if inArr and/or inArrB include "." as an string
    LHS = parseFloat(inArr.join(''))
   RHS = parseFloat(inArrB.join(''))
let length = opArr.length; 


  if (length < 1){ // number is executed before an operation

    if(logarithmArr.length > 0){
      ansEl.innerHTML = `log<sub style="font-size:30px;">${LHS}</sub>`
    }else{
      
   
    switch(LHS){
      // special case to display 'pi' character
case Math.PI: ansEl.innerHTML = '&#960'
break;
default:
ansEl.textContent = LHS;
    } }
 
  }
 else{ // if operation executed before a number

  console.log(opArr[0])
  switch(opArr[0]){ // check contents of oppArr
case 'logaB': 
calcEl.innerHTML = `log<sub>${LHS}</sub>${RHS}`
ansEl.textContent = RHS
break; 
    // % modular division
    case "%":
      calcEl.innerHTML = `${LHS}${opArr[0]}${RHS}`
      ansEl.textContent = RHS
      break; 
// X^(1/n) - nth root of x
case "xpowreciprocal": 
calcEl.innerHTML = `<sup>${RHS}</sup>&#8730;${LHS}`
ansEl.textContent = RHS
break;
    case "epowx":
  calcEl.innerHTML = `e<sup>${RHS}</sup>`
  ansEl.textContent = RHS
  break;
  case "tenpowx":calcEl.innerHTML = `10<sup>${RHS}</sup>`
  ansEl.textContent = RHS
    break;
case"epownegx":
calcEl.innerHTML = `e<sup>${-RHS}</sup>`
ansEl.textContent = -RHS
break;

case "xpowa":
  calcEl.innerHTML = `${LHS}<sup>${RHS}</sup>`
  ansEl.textContent = RHS
  break;
case"xpownega":
calcEl.innerHTML = `${LHS}<sup>${-RHS}</sup>`
ansEl.textContent = -RHS
break;

case "log":calcEl.innerHTML = `log(${RHS})`
ansEl.textContent = `log(${RHS})`
    break;
case "sin":calcEl.innerHTML = `sin(${RHS})`
ansEl.textContent = `sin(${RHS})`
break;
case "cos":calcEl.innerHTML = `cos(${RHS})`
ansEl.textContent = `cos(${RHS})`
break;
case "tan":calcEl.innerHTML = `tan(${RHS})`
ansEl.textContent = `tan(${RHS})`
break;
case "natural-log":calcEl.innerHTML = `LN(${RHS})`
ansEl.textContent = `LN(${RHS})`
break;
case "sin inverse":calcEl.innerHTML = `sin<sup>-1</sup>(${RHS})`
ansEl.innerHTML = `sin<sup>-1</sup>(${RHS})`
break;
case "cos inverse":calcEl.innerHTML = `cos<sup>-1</sup>(${RHS})`
ansEl.innerHTML = `cos<sup>-1</sup>(${RHS})`
break;
case "tan inverse":calcEl.innerHTML = `tan<sup>-1</sup>(${RHS})`
ansEl.innerHTML = `tan<sup>-1</sup>(${RHS})`




default:
  // need condition for if RHS = 'pi'
  if(RHS === Math.PI){
    ansEl.innerHTML = '&#960'
   }else{ansEl.textContent = RHS}

  }   }




 if (length > 1)
 {calcEl.textContent = LHS + opArr[0];}
 
 
 }


 // chose RHS or LHS
 const chooseSide = (param) =>{
  // so here is where to look for if log is pressed, then from here push to a function that will add the LHS number to 'log<sub>number</sub> in the ansEl text content hopefully. 

 let length = opArr.length
switch(length){
case 0: inArr.push(param)
inptNum()
break;
default: inArrB.push(param);
  inptNum()
}

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
case "dot": convertedNumber = "."
break;
case "pi":
convertedNumber = Math.PI;
break;

  }
  numEl = convertedNumber;
  chooseSide(convertedNumber)
  //console.log(convertedNumber)
  }







// toggle between shift and normal functions
  const normalFunctions = () =>{
    shiftCos.textContent = "cos" 
    shiftTan.textContent = "tan" 
    shiftSin.textContent = "sin" 
    shiftFracDec.textContent = "S|D" 
    shiftLog.textContent = "log" 
    shiftNcr.textContent = "nCr" 
    shiftNfact.textContent = "n!" 
    shiftPrime.textContent = "prime" 
    shiftNatLog.textContent = "LN" 

  }


// toggle between shift and normal functions
const shiftFunctions = () =>{

  shiftCos.innerHTML = "cos<sup id='inverse-cos'>-1</sup>" 
  shiftTan.innerHTML = "tan<sup id='inverse-tan'>-1</sup>" 
  shiftSin.innerHTML = "sin<sup id='inverse-sin'>-1</sup>"
  shiftFracDec.textContent = "" 
  shiftLog.innerHTML = "10<sup id='inverse-log'>x</sup>" 
  shiftNcr.textContent = "nPr" 
  shiftNfact.innerHTML = "<sup id='inverse-n-fact'>3</sup>&#8730;" 
  shiftPrime.textContent = "%" 
  shiftNatLog.innerHTML = "<sup id='inverse-natural-log'>x</sup>&#8730;" 
  shiftFracDec.innerHTML = "log<sub id='inverse-frac-dec-sup'>a</sub><sup id='inverse-frac-dec'>b</sup>"
}




// change button colours
const shift = () =>{

if(shiftArray.length > 0){

  shiftBtn.style.cssText = 'background-color:white; color:orange;'
shiftCos.style.cssText = 'background-color:orange; color:white; font-size:15px;'
shiftTan.style.cssText = 'background-color:orange; color:white; font-size:16px;'
shiftSin.style.cssText = 'background-color:orange; color:white; font-size:16px;'
shiftFracDec.style.cssText = 'background-color:orange; color:white;font-size:16px'
shiftLog.style.cssText = 'background-color:orange; color:white;'
shiftNcr.style.cssText = 'background-color:orange; color:white;'
shiftNfact.style.cssText = 'background-color:orange; color:white;'
shiftPrime.style.cssText = 'background-color:orange; color:white; font-size:20px;'
shiftNatLog.style.cssText = 'background-color:orange; color:white;'
shiftFunctions()
}
else{
shiftCos.style.cssText = 'background-color:white; color:black;'
shiftTan.style.cssText = 'background-color:white; color:black;'
shiftSin.style.cssText = 'background-color:white; color:black;'
shiftFracDec.style.cssText = 'background-color:white; color:black;'
shiftLog.style.cssText = 'background-color:white; color:black;'
shiftNcr.style.cssText = 'background-color:white; color:black;'
shiftNfact.style.cssText = 'background-color:white; color:black;'
shiftPrime.style.cssText = 'background-color:white; color:black;'
shiftNatLog.style.cssText = 'background-color:white; color:black;'
shiftBtn.style.cssText = 'background-color:yellow; color:black;'
normalFunctions()
}
}




const logaBGetRight = (selected) =>{

if(logarithmArr.length > 0){
if(inArr.length > 0 && inArrB.length < 1){
  switch(opArr[0]){
    case 'logaB': console.log('arrow already pushed')
    break;
    default: opArr.unshift('logaB');
    calcEl.innerHTML = ansEl.innerHTML
    ansEl.innerHTML += 'B'
  }
console.log(opArr)
}}else{console.log('enter log a first')}
}


const logaB = () =>{
ansEl.innerHTML = 'log<sub>a</sub>'
logarithmArr.unshift('logaB')

}




  // conversion of decimal to fractions and vice versa
  const decimalConvert = (selected) =>{
    if(shiftArray.length < 1){
      console.log(selected)
      // set of simplify fraction function once you have the decimal in ansEl display. i.e. do simplifyFrac(calcArr[0]) we might actually need a pre selection though so that if the number in calcArr[0] is a proper fraction then we'll have to separate the integer from the number and add it back on later once the fractional part has been simplified. 

    }else{
console.log('log(a,B)')
logaB() // special function for log base a to the B
    }

}

const logTwoInput = () =>{
  logarithmArr = []
let calculation;
let answer;


  LHS = parseFloat(inArr.join(''))
  RHS = parseFloat(inArrB.join(''))
calculation = Math.log(RHS)/Math.log(LHS) // unfiltered calculation
switch(calculation % 1){ // to check if calculation is an integer or decimal, all integers divided by 1 have the remainder 'zero' decimals will have a decimal remaineder, i.e. not '1'
case 1: answer = calculation;
break;
default:
  answer = calculation.toFixed(4)
}

calcArray.unshift(answer)
ansEl.textContent = calcArray[0]
inArr=[]
inArrB=[]
inArr.push(parseFloat(calcArray[0]))
}


const naturalLog = () =>{
  let calculation
 let answer; // pre answer
  RHS = parseFloat(inArrB.join(''))
  console.log(opArr[0], RHS)
calculation = Math.log(RHS) // log base 'e' raised to RHS
console.log(calculation % 1) // excellent. This returns zero if the result is an integer and 'a decimal' if the result is a decimal.  so we can use this for ALL results to decide if toFixed() needs to be used on the result. 

// NOTE - when the calculation is a decimal, use trueNumber.toString and if string length > 7, then use toFixed(5). A number with 5 decimal places has 7 charachers, the 5 decimal places, and two other characters, the zero and the 'dot'.  So if the string has a length greater than 7, that means the number has greater than 5 decimal places; so the extra decimal places will get truncated. this also - ACTUALLY THIS STEP MIGHT NOT BE NEEDED - HOLD IT UNTIL FURTHER TESTS. ACTUALLY it IS needed because if the decimal has less than 5 places, the toFixed() method will tag trailing zeros onto the end of it, (maybe) so check for that also. 

switch(calculation % 1){
  case 0: console.log('integer')
  answer = calculation;
  break;
  default: console.log('decimal')
  answer = calculation.toFixed(5)
}
console.log(answer)
calcArray.unshift(answer)

//  load results and clear arrays containing integers to solve

ansEl.textContent = calcArray[0]
inArr=[]
inArrB=[]
inArr.push(parseFloat(calcArray[0]))


  }


  // easy to handle because only one input is required for natural log
const callNaturalLog = (selected) =>{
  switch(selected){
case 'natural-log':
  opArr.unshift(selected)
  ansEl.textContent = 'LN';
break;
default:
    opArr.unshift('xpowreciprocal')
  }

 
  }


// not needed, incorporated in the NCR function
const nPermuteR = (selected) =>{
}

// COMBINED FUNCTION FOR NPR AND NCR
  const nChooseR = (param) =>{
    let numerator;
    let denominator;
  let n; // number of elements
 let r; // number to be chosen
 let nFact; // n-factorial
 let rFact; // r-factorial
 let nMINUSrFact; // (n-r)!
 let nMINUSr; // n-r
 let j=1; // placeholder for n-factorial calculation
 let k=1; // placeholder for r-factorial calculation
 let l=1 // placeholder for (n-r)-factorial calculation
    let result;
       n = parseFloat(inArr.join('')) // LHS
      r = parseFloat(inArrB.join('')) // RHS
      nMINUSr = n - r // so we can get (n-r)!

      // arrays from n, r and n-r. 
      nArray =  Array.from({length: LHS + 1}, (v, i) => i);
      rArray =  Array.from({length: RHS + 1}, (v, i) => i); 
      nMinusRArray =  Array.from({length: nMINUSr + 1}, (v, i) => i);  
   
      //  get n factorial
      for(i =1; i < nArray.length; i++){
        j*= nArray[i]
        }
        nFact = j
      

        //  get r factorial
        for(i =1; i < rArray.length; i++){
          k*= rArray[i]
          }
          rFact = k
       


// get (n-r) factorial
 for(i =1; i < nMinusRArray.length; i++){
  l*= nMinusRArray[i]
  }
  nMINUSrFact = l

console.log(`${n}! / (${r}! x ${nMINUSr}!)`) // NCR
console.log(`${n}! / ${nMINUSr}!`) // NPR

calcEl.textContent += r; // second variable AFTER c. 
if(param == 'ncr'){
  numerator = nFact
  denominator = rFact*nMINUSrFact
  result = numerator/denominator    
  console.log(result)

}else{
  numerator = nFact
  denominator = nMINUSrFact
  result = numerator/denominator    
  console.log(result)
}




inArr=[] 
inArrB=[]
calcArray.unshift(result)
ansEl.innerHTML = calcArray[0]
inArr.unshift(calcArray[0])



  }


// just correctly displays first part of calculation
  const callNcr = (selected) =>{
    console.log('ncr')

    if(inArr.length > 0){
      calcEl.innerHTML = `${LHS}C`
          } opArr.unshift(selected)
  }
// just correctly displays first part of calculation
  const callNpr = (selected) =>{
    console.log('npr')
    if(inArr.length > 0){
      calcEl.innerHTML = `${LHS}P`
          }opArr.unshift('npr')
  }

// checks for SHIFT, then runs NPR or NCR call
  const callCombinatorics = (selected) =>{
    if(shiftArray.length > 0){
callNpr(selected)
    }else{
      callNcr(selected)
        } }





const callLogarithm = (selected) =>{
opArr.unshift(selected)
}



    

const primeCheck = () =>{
  if(inArr.length > 0){ 
    LHS = parseFloat(inArr.join(''))
    primeTester2(LHS)

}}

const callPrimeCheck = (selected) =>{
  if(shiftArray.length < 1){
    opArr.unshift(selected)
    primeCheck()

  }else{
    opArr.unshift("%")
  }

}
  //converts the input number to radians then calculates the result according to whichever trig function is in the zero'th position of the array
const trigFunctions = () =>{
  // THIS IS ACTIVATED BY THE EQUALS BUTTON - because opArr[0] is not a basic function. 
RHS = parseFloat(inArrB.join(''))
console.log(opArr[0], RHS)
 let radians = RHS*(Math.PI/180)
let result; 
 let resultString;
 let roundedResult;
 let zeroString;
console.log(opArr)
 switch(opArr[0]){
  case "sin": result = Math.sin(radians); 
  break;
  case "cos":result = Math.cos(radians); 
  break;
  case "sin inverse": result = Math.asin(RHS)*(180/Math.PI) 
  break;
  case "cos inverse":result = Math.acos(RHS)*(180/Math.PI)
  break;
case "tan inverse": result = Math.atan(RHS)*(180/Math.PI)
break;

  case "tan":if(RHS === 90){alert('tan 90deg NaN')// to deal with asymptote 
}else{
    result = Math.tan(radians)} 
    break;
 }    // END OF SWITCH





 // DEALING WITH TRAILING ZEROS AND DECIMAL LENGTH
 console.log(result)
 roundedResult = result.toFixed(4) // round result to 4.d.p
 resultString = roundedResult.toString()// convert to string
 console.log(resultString)// check conversion
 zeroString = resultString.indexOf('000')// create variable to check three zeros in a rows
 
if(zeroString > 0){
if(roundedResult < 0){
  roundedResult = result.toFixed(zeroString - 3)
  calcArray.unshift(roundedResult)
  // this is because if there are repeating zeros and the result is negative, you have the '-' character at the beginning of your number, adding an extra character to the string length.   
}else{
// round result > 0, because there are trailing zeros,  so that's has to be '1.' or '0.'  so this time we only need to take away 2 from zeroString
roundedResult = result.toFixed(zeroString - 2)
calcArray.unshift(roundedResult)
}}else{
// there are no zeroStrings in the rounded result so we can render it as is
calcArray.unshift(roundedResult)
}
  
ansEl.textContent = calcArray[0]
inArr=[]
inArrB=[]
inArr.push(parseFloat(calcArray[0]))

}

const callTrigInverse = (selected) =>{
  console.log(selected)
  switch(selected){ // check ID, and push inverse to opArr and inverse symbol to display
    case 'inverse-cos': ansEl.innerHTML = 'cos<sup>-1</sup>('; opArr.unshift('cos inverse')
    break;
    case 'inverse-sin': ansEl.innerHTML = 'sin<sup>-1</sup>('; opArr.unshift('sin inverse')
    break;
    case 'inverse-tan': ansEl.innerHTML = 'tan<sup>-1</sup>('; opArr.unshift('tan inverse')
    break;
  
    default: 
    console.log('no function')
    }

}



const callTrig = (selected) =>{
  // switch shiftArr[0] and, depending on the value, decide whether to push original or inverse function to


   switch(selected){
    case 'cos': opArr.unshift(selected)
    ansEl.innerHTML = 'cos'
    break;  
    case 'sin': opArr.unshift(selected)
    ansEl.innerHTML = 'sin'
      break;  
      case 'tan': opArr.unshift(selected)
      ansEl.innerHTML = 'tan'
    break;
        
   }}// end of switch 2 and else
 
  

   


const preCallTrig = (selected) =>{
 // console.log(shiftArray)

 switch(selected){
case 'sin':
case 'cos':
case 'tan':
callTrig(selected)
break;
default: 
callTrigInverse(selected)
 }
}


// activated by equals button taking the parameter of whatever was in opArr[0], i.e. the operation. 
  const exponential = (selected) =>{
    let expAnswer;
    let finalNumber
console.log(selected)
 
           switch(selected){
  
        // e^x
  case "epowx":
    expAnswer  = Math.exp(RHS)
       
   if(Math.floor(expAnswer) === expAnswer){console.log('integer'); finalNumber = expAnswer;
   calcArray.unshift(finalNumber) // make calculation
  }else{
   finalNumber = expAnswer.toFixed(4)
   calcArray.unshift(finalNumber) // make calculation
    console.log('decimal')}
    console.log(expAnswer)
     break;
  
  // e^-x
  case "epownegx":
    expAnswer  = Math.exp(-RHS)
    if(Math.floor(expAnswer) === expAnswer){console.log('integer');finalNumber = expAnswer;
    calcArray.unshift(finalNumber) // make calculation
  }else{
      finalNumber = expAnswer.toFixed(4)
      calcArray.unshift(finalNumber) // make calculation
      console.log('decimal')
      console.log(expAnswer)

}
break;
  // 10^x
  case "tenpowx": expAnswer  = Math.pow(10,RHS)
  if(Math.floor(expAnswer) === expAnswer){console.log('integer'); finalNumber = expAnswer;
  calcArray.unshift(finalNumber) // make calculation
 }else{
  finalNumber = expAnswer.toFixed(4)
  calcArray.unshift(finalNumber) // make calculation
   console.log('decimal')}
   console.log(expAnswer)
          break;

// log(x)
case "log": expAnswer  = Math.log(RHS)
if(Math.floor(expAnswer) === expAnswer){console.log('integer'); finalNumber = expAnswer;
calcArray.unshift(finalNumber) // make calculation
}else{
finalNumber = expAnswer.toFixed(4)
calcArray.unshift(finalNumber) // make calculation
 console.log('decimal')}
 console.log(expAnswer)
break; 



        }


        ansEl.textContent = calcArray[0]
        inArr=[]
        inArrB=[]
        inArr.push(parseFloat(calcArray[0]))
      
      }
     
        
  




  // for exponential function (negative and positive exponents)
  const callExponential = (selected) =>{
    console.log(selected)
    switch(selected){
case 'tenpowx':
  ansEl.innerHTML = '10<sup style="font-size:30px;">x</sup>'; 
  opArr.unshift('tenpowx')
  break;
  default:
  ansEl.innerHTML = 'log('; 
  opArr.unshift(selected) // push log as operation
      }
    
      }
  


  


  // variable EXPONENT of X; both X and exponent input needed) 
  // X^a or X^-a
const variableExponent = (selected) =>{

  let result;
  let trueNumber;
  console.log(selected)
  console.log(inArr, inArrB)

  
    LHS = parseFloat(inArr.join(''))
    RHS = parseFloat(inArrB.join(''))
    
    switch(selected){
// X^a
case "xpowa":
result = Math.pow(LHS,RHS)
trueNumber = result.toFixed(5)
calcEl.innerHTML = `${LHS}<sup>${RHS}</sup>`;
  break;
  // X^-a
case "xpownega":
  result = Math.pow(LHS,-RHS);
  trueNumber = result.toFixed(5)
  calcEl.innerHTML = `${LHS}<sup>${-RHS}</sup>`;
break;
// nth root of 'X' or X^(1/n)
case "xpowreciprocal": 
result = Math.pow(LHS, 1/RHS);
trueNumber = result.toFixed(5)
calcEl.innerHTML = `<sup>${RHS}</sup>&#8730;${LHS}`;
      }
 calcArray.unshift(trueNumber)
 console.log(calcArray[0])
 
      ansEl.textContent =  calcArray[0];
      inArr=[]
      inArrB=[]
      inArr.push(parseFloat(calcArray[0]))
}




const callVariableExponent = (selected) =>{
  opArr.unshift(selected)
  }


let result;
let trueNumber;

// fixed EXPONENT of X (or 'e') where only one varialbe, X or 'e', required
const  fixedExponent =(selected) =>{
  // try a switch statement again
console.log(selected)
  if(inArr.length > 0){ 
    LHS = parseFloat(inArr.join(''))
    switch(selected){

// x^(1/3)
case "xpowthird": console.log('cube root activated')
calcArray.unshift(Math.pow(LHS, 1/3))
calcEl.innerHTML = `<sup>3</sup>&#8730;${LHS}`
break;
      // x^3
case "xpow3": 
calcArray.unshift(Math.pow(LHS, 3))
calcEl.innerHTML = LHS + "<sup>3</sup>" 
break;

// x^2
case "xpow2": 
  calcArray.unshift(Math.pow(LHS, 2))
  calcEl.innerHTML = LHS + "<sup>2</sup>" 
break;

// x^-1
case "xpowneg1":
  calcArray.unshift((1 / LHS))
  calcEl.textContent = 1 + "/" + LHS
break;

// x^(1/2)
case "xpowhalf":
  calcArray.unshift(Math.sqrt(LHS))
  calcEl.innerHTML = `<sup>2</sup>&#8730;${LHS}`
break;

// including this here because it is essentially the same kind of operation - enter a number, hit the operation key and an answer immediately appears since only one variable is needed.       
case "nfact": 
  break;
      }




      // display decimals to 5.d.p, otherwise just integer
      console.log(calcArray[0])
result = parseFloat(calcArray[0]) // actual result
trueNumber = result % 1 // if trueNumber returns 0, result is an integer, since any integer % 1 gives zero as remainder.  Any non-integer result will return a decimal. So switch trueNumber and for 'case 0' ansel = result, and for defualt, ansel = result.toFixed(5)
switch(result % 1){
case 0: ansEl.textContent = result; console.log('integer')
break;
default:ansEl.textContent = result.toFixed(5);
console.log('decimal')
}
    
      inArr=[]   
      inArr.push(calcArray[0])
  }
   
}

// sends selected exponent button info to array
const callFixedExponent = (selected) =>{
  opArr.unshift(selected)
fixedExponent(opArr[0])

}



 // for exponential function (negative and positive exponents)
 const factorial = () =>{
  // WORKING FUNCTION
  
    if(inArr.length > 0){ 
      LHS = parseFloat(inArr.join(''))
  console.log(LHS)
  // CREATE AN ARRAY of consecutive numbers using LHS (starting at 1 and ascending consecutively to LHS)  with Array.from() method
    let factorialArray = Array.from({length:LHS + 1}, (a, i) => i)
  
  
  let j = 1; // use 'j' as our placeholder for calculations
  for(i =1; i < factorialArray.length; i++){
  j*= factorialArray[i] // j = j x factorialArray[i] - j updates each time
  }
  console.log(j)
   
  inArr=[] // inArr needs to be cleared because the previous LHS number will be in it, and since the new LHS comes from inArr.join, all items in inArr will be joined as the new LHS... So clear it before unshifing to it. 
  inArrB=[]
  calcEl.innerHTML = `${LHS}!`
  calcArray.unshift(j)
  ansEl.innerHTML = calcArray[0]
  inArr.unshift(calcArray[0])
  console.log(inArr)
    
      //inArr=[] // clears the last answer prior to current calculation
    //  inArr.push(parseFloat(calcArray[0])) // push answer to LHS array - might be able to use this for the 'ANS' key. So then we would push it to calcEl up to ready for the next operation maybe; we're already doing this with the basic operations. 
      } }
  
  
      // function for calling FACTORIAL, but also calls fixed exponent for 'root 3' calculations when shift button is active
  const callFactorial = (selected) =>{
    //console.log(shiftArray)
switch(selected){
case 'nfact': console.log('n!');
factorial()
break;
case'root 3': console.log('x^(1/3)')
opArr.unshift('xpowthird') // send cube root operation to opArr
fixedExponent('xpowthird') // run fixed exponent function
break;
}
  /*
      opArr.unshift('xpowthird') // send cube root operation to opArr
      fixedExponent('xpowthird') // run fixed exponent function
    */
       
    }
  




// if a second operation is pressed then this will trigger the equals function, ready for a next inputted number otherwise concatinate LHS number and operation and display in upper display (ready now ready for RHS number)
const operation = ()=>{
    if(opArr.length > 1 && inArrB.length > 0)
  {equalsCalc(); console.log('operation done')}
  else{ 
    // special case for 'pi'
    if(LHS === Math.PI){calcEl.innerHTML = '&#960' + opArr[0]}else{
      // all other numbers
      LHS = parseFloat(inArr.join(''))
      calcEl.textContent = LHS + opArr[0];
    }}
         }

         
var opEl
// SIMPLE OPERATIONS
const callOperation = (selected) =>{
  let convertedOperation
  switch(selected){

    case "division": convertedOperation = "/"
    break;
    case "multiplication": convertedOperation= "x"
    break
    case "subtraction": convertedOperation = "-"
    break;
    case "addition": convertedOperation = "+"
    break;
    case "division-mod": convertedOperation = "%"
    break;
          }
  opArr.unshift(convertedOperation)
   operation()
  }





  // BUTTON LISTENER

//check which element has been clicked. 
calculatorBodyEl.addEventListener('click', (e) =>{
let selected = e.target.id
let altSelected = e.target.outerHTML
// SOLUTION TO when selected element ID is 'null' - outer HTML shows for all elements, so, in case 
console.log(selected)
console.log(altSelected)

// if alt selected contains one of the below strings then a function will be run from the appropriate if condition; otherwise if no such string is found, then the target id will be switched and the appropriate function run
if(altSelected.includes('inverse-n-fact'))
{callFactorial('root 3')} // same function as n! for convenience of same button use
else if(altSelected.includes('inverse-n-fact')){
}else if(altSelected.includes('inverse-sin')){
  preCallTrig('inverse-sin') // trig inverse function
}else if(altSelected.includes('inverse-cos')){
  preCallTrig('inverse-cos') // trig inverse function
}else if(altSelected.includes('inverse-tan')){
  preCallTrig('inverse-tan') // trig inverse function
}else if(altSelected.includes('inverse-log')){
  callExponential('tenpowx') // same function as e^x and e^(-x)
}else if(altSelected.includes('inverse-natural-log')){
  callNaturalLog('xpowreciprocal') // nth root
}else if(altSelected.includes('inverse-frac-dec')){
  logaB(altSelected)
}else if(altSelected.includes('arrow-right')){
  console.log('arrow right clicked')
  logaBGetRight('arrow-right')
}else{





// INPUT SWITCH STATEMENTS

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
  //console.log('number:', selected)
  break; 
  case "del": // delete()
// if selected is an operation
case "addition": 
case "subtraction":
case "division":
case "multiplication":
case "division-m":
callOperation(selected)
  break;
// equals button 
case "equals":
 equalsCalc()
break;

// AC button
case "ac": 
clearAll();
break;

//--------------------------------------------------------------

// higher calculations 'one number' input - SCIENTIFIC row 1
case "xpow2": // power of 2
case "xpowneg1": // reciprocal
case "xpowhalf": // square root
callFixedExponent(selected)
  break;

//-----------------------------------------------------------

  // SCIENTIFIC row 2
case "xpow3": callFixedExponent(selected)
break;
case "epowx":
case "epownegx":
     callExponential(selected)
     ansEl.textContent = 'e' // since e isn't a digit it is bypassed by the number inputs so we need to show it in the display from here as it won't show up otherwise. 
break;

case "log": callExponential(selected)
break;
     // these require two numbers so maybe it's best to put them in their own categories
case "xpowa":
case "xpownega":
    console.log('scientific row 2:', selected)
    callVariableExponent(selected)
break;

//-----------------------------------------------------------

// trigonometry etc, SCIENTIFIC row 3
case "sin": 
case "cos":  
case "tan":  
 preCallTrig(selected)
break;
case "frac-dec": 
decimalConvert(selected)
break;



//-----------------------------------------------------------

// PI, FACTORIAL, N-choose-R  - SCIENTIFIC row 4
case "ncr": callCombinatorics(selected)
break;
case "nfact":
callFactorial(selected)
  break;
case "pi": callNumber(selected)
break;
case "shift": // shift row is duplicated

break; 


//-----------------------------------------------------------

// ON, brackets, equals  - FIANL row 4

case "natural-log": callNaturalLog(selected)
  break;
case "arrow-left":
  break;
case "arrow-right": 
break;
case "prime":callPrimeCheck(selected);
break;
case "equals":
console.log(`final row: ${selected}`)
break;
default: console.log('nothing read');

}

}// end of else condition where ID's are checked because no appropriate 'outerHTML' string was found

})







const scientificTwoNumbersCalc = () =>{
  LHS = parseFloat(inArr.join('')) // joins array items into one number
  RHS = parseFloat(inArrB.join('')) // joins array items into one number
var calculation; // takes results of LHS operation RHS
// operations computed only if inArrB has terms
if (inArrB.length > 0){

// switch the operation 
switch(opArr[0]){
  case "x<sup>a</sup>":
    calculation = Math.pow(LHS, RHS)
  break;

case "x<sup>-a</sup>":
  calculation = Math.pow(LHS, -RHS)
break;
}

calcArray.unshift(calculation)

 calcEl.textContent = LHS + opArr[0] + RHS;
  ansEl.textContent =  calcArray[0];
  inArr=[]
  inArrB=[]
  inArr.push(parseFloat(calcArray[0]))
}


}




// this is the equals functions - last bit runs clearDisp()which clears the displays after calculations are done
function equalsCalc(){
// this runs only if operations are basic

// realised it's better to use parseFloat because we always want the ability to use decimals.  
  LHS = parseFloat(inArr.join('')) // joins array items into one number
  RHS = parseFloat(inArrB.join('')) // joins array items into one number
let calculation; // takes results of LHS operation RHS
let formatAnswer; // limit digits to display size
let calcString; // stringify answer to check length
let length;

// calculations can only happen if a number exists (inside inArrB), which can only occur if an operation has been performed. 
if (inArrB.length > 0){

  const displayAndClear = (calculation) =>{
    calcArray.unshift(calculation)
if(LHS === Math.PI){calcEl.innerHTML = '&#960' + opArr[0] + RHS}
else if(RHS === Math.PI){calcEl.innerHTML = LHS + opArr[0] + '&#960'}
else{calcEl.textContent = LHS + opArr[0] + RHS;}
    // to limit the amount of digits in the display if decimal number is greater than 8
    calcString = calcArray[0].toString()
    length = calcString.length
    if(length > 8){formatAnswer = calcArray[0].toFixed(7)}
    else{formatAnswer = calcArray[0]}

    
   

ansEl.textContent =  formatAnswer;
inArr=[]
inArrB=[]
inArr.push(parseFloat(calcArray[0]))
// because the actual answer is pused to inArr, the correct answer will be calculated if the number is processed by a new operation; formatAnswer is just for display purposes. 
   
   }
// switch the operation 
switch(opArr[0]){
case "+": calculation = LHS + RHS
displayAndClear(calculation)
break;

case "-" :calculation = LHS - RHS
displayAndClear(calculation)
break;

case "/":  calculation = (LHS / RHS).toFixed(3)
displayAndClear(calculation)
break;

case "x": calculation = LHS * RHS
displayAndClear(calculation)
break;

case "%": calculation = LHS % RHS
displayAndClear(calculation)
break;
 // e^x or e^-x
  case "epowx":
  case "epownegx":
       exponential(opArr[0])
  break;
// X^a or X^-a
case "xpowa":
case "xpownega":
  variableExponent(opArr[0])
break;
// X^(1/n) - nth root of x
case "xpowreciprocal": 
variableExponent(opArr[0])
break;
// 10^x
case "tenpowx":
  exponential(opArr[0])
  break;
  // log(x)
  case "log": exponential(opArr[0])
break;
// trigonometric function
case "sin":
case "cos":
case "tan":
case "sin inverse":
case "cos inverse":
case "tan inverse":
trigFunctions()
break;
case 'logaB': logTwoInput()
  break;
case "natural-log":
naturalLog()
break;

case "ncr": 
nChooseR(opArr[0])
break;
case "npr": 
nChooseR(opArr[0])
break;

case "log":

break; 

default: 
console.log('something is wrong')
}





}}


// clearAll() is the AC Button and clears all functions & numbers
function clearAll(){
  inArr=[]
  inArrB=[]
  calcArray=[]
  opArr=[]
  calcEl.textContent = ""
  ansEl.textContent = "0"
}


shiftBtn.addEventListener('click', function(){
  if(shiftArray.length < 1){shiftArray.push("shift")}else{shiftArray.pop()}
//console.log(shiftArray)
// create a slight time delay to apply styles
shift()
clearAll()


})