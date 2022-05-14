  
let audio1 = new Audio("mouseclickcut.mp3")
let audio2 = new Audio("mouseclickcut.mp3")
let audio3 = new Audio("boop-start.mp3")
let audio4 = new Audio("mouseclickcut.mp3")

let allArray = []
let someArray = []

let aEl = document.getElementById("coeffa-el");
let bEl = document.getElementById("coeffb-el");
let cEl = document.getElementById("coeffc-el");

let xSquareEl = document.getElementById("x-squared-el")
let xEl = document.getElementById("x-el")
let constantEl = document.getElementById("constant-el") 


//let solutionOpac = document.getElementById("solution-el")
//solutionOpac.style.color = '#000'



function genCoefAllSol(){

document.getElementById("solution-el").style.color = "rgb(220, 243, 247)";

audio1.play();


var aN = Math.floor(Math.random()*5 +1);
var bN = Math.floor(Math.random()*10 +1);
var cN = Math.floor(Math.random()*5 +1);


// polarities 
let polarityGenZero = Math.floor(Math.random()*99 +1);
let polarityGenOne = Math.floor(Math.random()*99 +1);
let polarityGenTwo = Math.floor(Math.random()*99 +1);


if (polarityGenZero <50){ aN = -aN; xSquareEl.textContent = aN + "x^2";} else{ aN = aN; }
if (polarityGenOne <50){ bN = -bN; xEl.textContent =  bN + "x";} else{bN = bN; xEl.textContent = "+" +  bN + "x"}
if (polarityGenTwo <50){ cN = -cN; constantEl.textContent = cN ;} else{ cN = cN; constantEl.textContent = "+" + cN; }


aEl.textContent = "a = " + aN 
bEl.textContent = "b = " + bN 
cEl.textContent = "c = " + cN 

let oneSolution = -bN/(2*aN)
discAllEl = bN*bN - 4*aN*cN

// quadratic formula
let xSol = (Math.sqrt(discAllEl) - bN)/(2*aN)
let xSolFixed = xSol.toFixed(3)

xSolTwo = ((-1*Math.sqrt(discAllEl)) - bN)/(2*aN)
let xSolTwoFixed = xSolTwo.toFixed(3)

// shows, in the solutions input, how many solutions exist for the quadratic based on the value of the discriminant ----
if(discAllEl < 0){document.getElementById("avail-solutions-el").value = "No solution"; document.getElementById("solution-el").value = "no real number solution"}

else if(discAllEl === 0){document.getElementById("avail-solutions-el").value = "One solution"; document.getElementById("solution-el").value = "x = " + oneSolution;} 

else{document.getElementById("avail-solutions-el").value = "Two solutions"; document.getElementById("solution-el").value = "x = " + xSolFixed + ", " + xSolTwoFixed;}

console.log(discAllEl)

}
// END OF FUNCTION














function genCoefSomeSol() {

document.getElementById("solution-el").style.color = "rgb(220, 243, 247)";
audio2.play(); 

// coefficients generated (for a, b and c); 
let aN = Math.floor(Math.random()*4 +1);
let bN = Math.floor(Math.random()*10 +1);
let cN = Math.floor(Math.random()*5 +1);


// polarities for the quadratic equasion sum, (example x^2 '+' x '-' 2; polarities are (+,-))
let polarityGenZero = Math.floor(Math.random()*99 +1);
let polarityGenOne = Math.floor(Math.random()*99 +1);
let polarityGenTwo = Math.floor(Math.random()*99 +1);


if (polarityGenZero <50){ aN = -aN;} else{ aN = aN; }
if (polarityGenOne <50){ bN = -bN;} else{bN = bN;}
if (polarityGenTwo <50){ cN = -cN;} else{ cN = cN;}

discSomeEl = bN*bN - 4*aN*cN



if (discSomeEl < 0) {genCoefSomeSol()}
else {

let oneSolution = -bN/(2*aN)


xSquareEl.textContent = aN + "x^2";
if (bN < 0){xEl.textContent =  bN + "x";} else{xEl.textContent = "+" +  bN + "x"}
if (cN < 0){constantEl.textContent = cN ;} else{constantEl.textContent = "+" + cN;}


// gets coefficient to paragraph element showing a=, b= and c= (for manual calculation entering those details into formula
aEl.textContent = "a = " + aN 
bEl.textContent = "b = " + bN 
cEl.textContent = "c = " + cN 



// quadratic formula
let xSol = (Math.sqrt(discSomeEl) - bN)/(2*aN) 
let xSolFixed = xSol.toFixed(3)

xSolTwo = ((-1*Math.sqrt(discSomeEl)) - bN)/(2*aN)
let xSolTwoFixed = xSolTwo.toFixed(3)



// shows, in the solutions input, how many solutions exist for the quadratic based on the value of the discriminant ----
if(discSomeEl === 0){document.getElementById("avail-solutions-el").value = "One solution"; document.getElementById("solution-el").value = "x = " + oneSolution;} 

else{document.getElementById("avail-solutions-el").value = "Two solutions"; document.getElementById("solution-el").value = "x = " + xSolFixed + ", " + xSolTwoFixed;}
console.log(discSomeEl)
}  }
// END OF FUNCTION



 // case for single solutions generator


function genCoefOneSol(){

document.getElementById("solution-el").style.color = "rgb(220, 243, 247)";
audio4.play(); 

// coefficients generated (for a, b and c); 
let aN = Math.floor(Math.random()*7 +1);
let bN = Math.floor(Math.random()*20 +1);
let cN = Math.floor(Math.random()*15 +1);

// polarities for the quadratic equasion sum, (example x^2 '+' x '-' 2; polarities are (+,-))
let polarityGenZero = Math.floor(Math.random()*99 +1);
let polarityGenOne = Math.floor(Math.random()*99 +1);
let polarityGenTwo = Math.floor(Math.random()*99 +1);


if (polarityGenZero <50){ aN = -aN;} else{ aN = aN; }
if (polarityGenOne <50){ bN = -bN;} else{bN = bN;}
if (polarityGenTwo <50){ cN = -cN;} else{ cN = cN;}

discOneEl = bN*bN - 4*aN*cN

if ( discOneEl < 0 || discOneEl > 0 ){ genCoefOneSol() } else{

let oneSolution = -bN/(2*aN)

xSquareEl.textContent = aN + "x^2";
if (bN < 0){xEl.textContent =  bN + "x";} else{xEl.textContent = "+" +  bN + "x"}
if (cN < 0){constantEl.textContent = cN ;} else{constantEl.textContent = "+" + cN;}

// gets coefficient to paragraph element showing a=, b= and c= (for manual calculation entering those details into formula
aEl.textContent = "a = " + aN 
bEl.textContent = "b = " + bN 
cEl.textContent = "c = " + cN 

let oneSolFixed = oneSolution.toFixed(3)

document.getElementById("avail-solutions-el").value = "One solution"; document.getElementById("solution-el").value = "x = " + oneSolution;
console.log(oneSolution)
} }
// END OF FUNCTION




 function revealSol(){
audio3.play();
document.getElementById("solution-el").style.color = "black";

} 
// END OF FUNCTION





 function resetBtn(){
 
location.reload();

}
