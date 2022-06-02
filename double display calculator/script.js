var calcOpArrayb = []
var digitArray = []
var digitArray2 = []
var calcArray = []


var numbersArray = []




function input1(){
let numberEl = 1; 

if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}
// note - as long as calcOpArray length = 0, this will keep on adding digits to the display, AND, pushing entries to the first digit array (which we join and parse later), until the calcOpArray has an element in it; then the numbers start being pushed to the second digArray

}

function input2(){
let numberEl = 2;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input3(){
let numberEl = 3;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input4(){
let numberEl = 4;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input5(){
let numberEl = 5;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input6(){
let numberEl = 6;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input7(){
let numberEl = 7;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input8(){
let numberEl = 8;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input9(){
let numberEl = 9;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}

function input0(){
let numberEl = 0;
if (calcOpArrayb.length > 0){
    if (sumAddArray.length < 1 && sumSubArray.length < 1 && sumDivArray.length < 1 && sumTimesArray.length < 1)
    {document.getElementById('display6').textContent = "ERROR";}else{digitArray2.push(numberEl); document.getElementById('display3').textContent +=  + numberEl;}}
    else{digitArray.push(numberEl); document.getElementById('display3').textContent += numberEl;}

}


var sumAddArray = []
var sumSubArray = []
var sumDivArray = []
var sumTimesArray = []



function addNumCalc(){
    if (calcArray.length > 0){document.getElementById('display3').textContent = digitArray[0]; sumAddArray.push(digitArray[0]); document.getElementById('display3').textContent +=  " + "; console.log(digitArray);} else{
    var n1 = digitArray[0];
    sumAddArray.push(n1)// tells equals which op to process
    calcOpArrayb.push(n1)// tells numEl to push to digArray 2
     document.getElementById('display3').textContent +=  " + ";} // puts operation between parsed numbers of digArray 1 and 2 in calc display
    }
    
    
    function subNumCalc(){
        if (calcArray.length > 0){document.getElementById('display3').textContent = digitArray[0]; sumSubArray.push(digitArray[0]); document.getElementById('display3').textContent +=  " - "; console.log(digitArray);} else{
            var n1 = digitArray[0];
            sumSubArray.push(n1)
            calcOpArrayb.push(n1)
             document.getElementById('display3').textContent +=  " - ";}
    }
    
    function divNumCalc(){
        if (calcArray.length > 0){document.getElementById('display3').textContent = digitArray[0]; sumDivArray.push(digitArray[0]); document.getElementById('display3').textContent +=  " / "; console.log(digitArray);} else{
            var n1 = digitArray[0];
            sumDivArray.push(n1)
            calcOpArrayb.push(n1)
             document.getElementById('display3').textContent +=  " / ";}

    }
    
    
    function timesNumCalc(){
        if (calcArray.length > 0){document.getElementById('display3').textContent = digitArray[0]; sumTimesArray.push(digitArray[0]); document.getElementById('display3').textContent +=  " * "; console.log(digitArray);} else{
            var n1 = digitArray[0];
            sumTimesArray.push(n1)
            calcOpArrayb.push(n1)
             document.getElementById('display3').textContent +=  " * ";}


   
    }
    
  

// this is the equals functions - last bit runs clearDisp()which clears the displays after calculations are done
function equalsCalc(){

console.log(digitArray)
console.log(digitArray2)


if (sumAddArray.length > 0){


let leftSide = parseInt(digitArray.join('')); // first number or last answ
let rightSide = parseInt(digitArray2.join(''));
let sum = leftSide + rightSide
console.log(sum)
document.getElementById('display6').textContent = sum;
sumAddArray.length = 0
digitArray.length = 0
digitArray2.length = 0
digitArray.push(sum)
console.log(digitArray)
}

else if(sumSubArray.length > 0){


let leftSide = parseInt(digitArray.join(''));
let rightSide = parseInt(digitArray2.join(''));;
let sum = leftSide - rightSide
console.log(sum)
document.getElementById('display6').textContent = sum;
calcArray.push(sum)
sumSubArray.length = 0
digitArray.length = 0
digitArray2.length = 0
digitArray.push(sum)
console.log(sumAddArray)
console.log(digitArray)

}

else if(sumDivArray.length > 0){


let leftSide = parseInt(digitArray.join(''));
let rightSide = parseInt(digitArray2.join(''));
let sum = leftSide / rightSide
let sumEl = Math.floor(sum)
let sumReduce = sum.toFixed(3);
if (sum === sumEl){document.getElementById('display6').textContent = sum; calcArray.push(sum); }else{document.getElementById('display6').textContent = sumReduce; calcArray.push(sumReduce);}
sumDivArray.length = 0
digitArray.length = 0
digitArray2.length = 0
if (sum === sumEl){ digitArray.push(sum) ;}else{ digitArray.push(sumEl)}
}

else if(sumTimesArray.length > 0){


let leftSide = parseInt(digitArray.join(''));
let rightSide = parseInt(digitArray2.join(''));
let sum = leftSide * rightSide
document.getElementById('display6').textContent = sum;
calcArray.push(sum)
sumTimesArray.length = 0
digitArray.length = 0
digitArray2.length = 0
digitArray.push(sum)
}


}

function clearAll(){
//calcOpArrayb.length = 0
//sumAddArray.length = 0
//sumSubArray.length = 0
//sumDivArray.length = 0
//sumTimesArray.length = 0
//digitArray.length = 0
//digitArray2.length = 0
document.getElementById('display6').textContent = "0";
document.getElementById('display3').textContent = ""
}












//document.getElementById("calc-btn").addEventListener('click', calcNumber)


