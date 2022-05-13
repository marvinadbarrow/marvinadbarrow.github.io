  
let audio1 = new Audio("mouseclickcut.mp3")
let audio2 = new Audio("mouseclickcut.mp3")
let audio3 = new Audio("boop-start.mp3")

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

let oneSolution = -bN/2*aN
discAllEl = bN*bN - 4*aN*cN

// quadratic formula
let xSol = (Math.sqrt(discAllEl) - bN)/(2*aN)
let xSolFixed = xSol.toFixed(3)

xSolTwo = ((-1*Math.sqrt(discAllEl)) - bN)/(2*aN)
let xSolTwoFixed = xSolTwo.toFixed(3)

console.log(xSolTwoFixed)

// shows, in the solutions input, how many solutions exist for the quadratic based on the value of the discriminant ----
if(discAllEl < 0){document.getElementById("avail-solutions-el").value = "No solution"; document.getElementById("solution-el").value = "no real number solution"}

else if(discAllEl === 0){document.getElementById("avail-solutions-el").value = "One solution"; document.getElementById("solution-el").value = "x = " + oneSolution;} 

else{document.getElementById("avail-solutions-el").value = "Two solutions"; document.getElementById("solution-el").value = "x = " + xSolFixed + ", " + xSolTwoFixed;}

console.log(xSol)}







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

let oneSolution = -bN/2*aN


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

console.log(xSolTwoFixed)

// shows, in the solutions input, how many solutions exist for the quadratic based on the value of the discriminant ----


if(discSomeEl === 0){document.getElementById("avail-solutions-el").value = "One solution"; document.getElementById("solution-el").value = "x = " + oneSolution;} 

else{document.getElementById("avail-solutions-el").value = "Two solutions"; document.getElementById("solution-el").value = "x = " + xSolFixed + ", " + xSolTwoFixed;}


console.log(xSolFixed)}
}

// actually what was done was to make the background color of the input and the text the same color, and then changed the color back to black here so the text (which) was already there, but undetected, appear in the input text area 





let warningEl = document.getElementById("reset-alert");


// this activates the timer before the delayed function activates; so the text element displays its message when the revealSol button is clicked and a timer stsarts running; after the timer elapses the myMessage function will be activated and whatever command is inside that function will run; i.e. 'reload the browser'.  






 function revealSol(){
audio3.play();
document.getElementById("solution-el").style.color = "black";
warningEl.textContent = "WARNING! Page Will Refresh in a short time: Hit reset button to refresh earlier";
function myMessage() {
location.reload();
}
setTimeout(myMessage, 20000);
}





 function resetBtn(){
 
location.reload();

}
