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


// displays numbers
function inptNum(){
   // this makes LHS and RHS decimals if inArr and/or inArrB include "." as an string
  
    LHS = parseFloat(inArr.join(''))
    RHS = parseFloat(inArrB.join(''))

  if (opArr.length < 1){ansEl.textContent = LHS;}
  else{ansEl.textContent = RHS}
  if (opArr.length > 1)
  {calcEl.textContent = LHS + opArr[0];}
  
  
  }

// basic math functions
function doOperation(){
  if(opArr.length > 1 && inArrB.length > 0)
  {equalsCalc();}
  else{ LHS = parseFloat(inArr.join(''))
  calcEl.textContent = LHS + opArr[0];}
       
    
   }

// higher math functions - we don't need equals operation here
function doHigherOperation(){
  
  if(inArr.length > 0)
  { LHS = parseFloat(inArr.join(''))

  if (opArr[0] === " x^2 "){
    calcArray.unshift(Math.pow(LHS, 2).toFixed(3))
    calcEl.innerHTML = LHS + "<sup>2</sup>" }
    
    if (opArr[0] === " 1/x "){
    calcArray.unshift((1 / LHS).toFixed(3))
    calcEl.textContent = 1 + "/" + LHS}
    
    
    if (opArr[0] === " sqt "){
    calcArray.unshift(Math.sqrt(LHS).toFixed(3))
    calcEl.innerHTML = '&#8730;' +2; }

    inArr=[]   
    ansEl.textContent =  calcArray[0];   
    inArr.push(calcArray[0])
   
    
  }}





// numerical inputs
function input1(){
numbEl = 1; 
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input2(){
numbEl = 2;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input3(){
numbEl = 3;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input4(){
numbEl = 4;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input5(){
numbEl = 5;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input6(){
numbEl = 6;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input7(){
numbEl = 7;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input8(){
numbEl = 8;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input9(){
numbEl = 9;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}


function input0(){
numbEl = 0;
if(opArr.length < 1){inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}

function inputDecimal(){
numbEl = "."
if(opArr.length < 1 )
{inArr.push(numbEl)}
else{inArrB.push(numbEl)};
inptNum()}



     

// basic operations
function addNumCalc(){
opArr.unshift(" + ")
doOperation()
}
    
function subNumCalc(){
opArr.unshift(" - ")
doOperation()
    }
    
function divNumCalc(){
opArr.unshift(" / ")
doOperation()
}
    
function timesNumCalc(){
opArr.unshift(" * ")
doOperation()

}

function percentNumCalc(){
  opArr.unshift(" % ")
  doOperation()
  console.log(opArr)
  }



// higher operation
function squareNumCalc(){
  opArr.unshift(" x^2 ")
  doHigherOperation()
  
  }
  /*
 function inverseNumCalc(){
  opArr.unshift(" 1/x ")
  doHigherOperation()
 }
*/

 function sqrtNumCalc(){
     opArr.unshift(" sqt ")
  doHigherOperation()
 }

  

// this is the equals functions - last bit runs clearDisp()which clears the displays after calculations are done
function equalsCalc(){
// realised it's better to use parseFloat because we always want the ability to use decimals.  
  LHS = parseFloat(inArr.join(''))
  RHS = parseFloat(inArrB.join(''))

// this prevets equals function being activated if RHS is NaN
if (inArrB.length > 0){

  // basic operations
if (opArr[0] === " + "){
  calcArray.unshift(LHS + RHS)
  }
  
  if (opArr[0] === " - "){
  calcArray.unshift(LHS - RHS)
  }
  
  if (opArr[0] === " / "){
  calcArray.unshift((LHS / RHS).toFixed(3))
  }
  
  if (opArr[0] === " * "){
  calcArray.unshift(LHS * RHS)
  }

  if (opArr[0] === " % "){
    calcArray.unshift((RHS % LHS).toFixed(3))
  }
  
  calcEl.textContent = LHS + opArr[0] + RHS;
  ansEl.textContent =  calcArray[0];
  inArr=[]
  inArrB=[]
  inArr.push(parseFloat(calcArray[0]))
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














//document.getElementById("calc-btn").addEventListener('click', calcNumber)


