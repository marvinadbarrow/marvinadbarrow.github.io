  
function resetBtn(){
 
location.reload();

genCoefAllSol() = 0;
genCoefSomeSol() = 0



}

let quadArray = []

let aEl = document.getElementById("coeffa-el");
let bEl = document.getElementById("coeffb-el");
let cEl = document.getElementById("coeffc-el");

let xSquareEl = document.getElementById("x-squared-el")
let xEl = document.getElementById("x-el")
let constantEl = document.getElementById("constant-el") 
let polarityOne = document.getElementById("polarity1-el")
let polarityTwo = document.getElementById("polarity2-el")




function genCoefAllSol(){

let coefA = Math.floor(Math.random()*3 +1);
let coefB = Math.floor(Math.random()*10 +1);
let coefC = Math.floor(Math.random()*5 +1);

// polarities 
let polarityGenOne = Math.floor(Math.random()*99 +1);
let polarityGenTwo = Math.floor(Math.random()*99 +1);
if (polarityGenOne >50){polarityOne.textContent = "+";} else {polarityOne.textContent = "-";}
if (polarityGenTwo >50){polarityTwo.textContent = "+";} else {polarityTwo.textContent = "-";}


let aN = coefA 
let bN = coefB 
let cN = coefC 

quadArray.push(aN)
quadArray.push(bN)
quadArray.push(cN)


xSquareEl.textContent = aN + "x^2" 
xEl.textContent =  bN + "x"
constantEl.textContent = cN 

aEl.textContent += aN 
bEl.textContent += bN 
cEl.textContent += cN 


let discEl = bN*bN - 4*aN*cN
let oneSolution = -bN/2*aN
console.log(discEl)

}










function genCoefSomeSol() {

let coefA = Math.floor(Math.random()*3 +1);
let coefB = Math.floor(Math.random()*10 +1);
let coefC = Math.floor(Math.random()*5 +1);

// polarities 
let polarityGenOne = Math.floor(Math.random()*99 +1);
let polarityGenTwo = Math.floor(Math.random()*99 +1);
if (polarityGenOne >50){polarityOne.textContent = "+";} else {polarityOne.textContent = "-";}
if (polarityGenTwo >50){polarityTwo.textContent = "+";} else {polarityTwo.textContent = "-";}

let aN = coefA 
let bN = coefB 
let cN = coefC 

quadArray.push(aN)
quadArray.push(bN)
quadArray.push(cN)

xSquareEl.textContent = aN + "x^2" 
xEl.textContent =  bN + "x"
constantEl.textContent = cN 

aEl.textContent += aN 
bEl.textContent += bN 
cEl.textContent += cN 

let discEl = bN*bN - 4*aN*cN
if (discEl < 0){ discEl = -discEl}
 console.log(discEl)

}








function solveX(){
 
// now we express the solutions
if(discEl < 0){document.getElementById("solution-el").value = "x has No solution"}

else if(discEl = 0){document.getElementById("solution-el").value = "x = " + oneSolution}

else {  let xSol = (Math.sqrt(discEl) - bN)/(2*aN); document.getElementById("solution-el").value = "x = " + xSol; console.log(xSol)}

return discEl
 
 
 
 }
 
