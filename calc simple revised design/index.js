let num1 = " "
let num2 = " "
let sumEl = document.getElementById("sum-el")

let num1El = document.getElementById("a-el")
let num2El = document.getElementById("b-el")
document.getElementById("display-el").value = 0;


function genNum(){
   num1 = Math.floor((Math.random()*10 ))
   num2 = Math.floor((Math.random()*10 ))

   if (num1 === 0){ return 1}
   if (num2 === 0){ return 1}
  document.getElementById("display-el").value = num1 + "|" + num2;

}

function addition(){
   let add =  num1 + num2
 document.getElementById("display-el").value = add
}

function subtraction(){
   
   let subtract = num1 - num2
document.getElementById("display-el").value = subtract
}

function division(){
   
    let divide = num1 / num2
    let divideFixed = divide.toFixed(3)
 document.getElementById("display-el").value = divideFixed;
}

function division2(){
    
    let divide2 = num2 / num1
    let divide2Fixed = divide2.toFixed(3)
  document.getElementById("display-el").value =divide2Fixed;
}

function multiplication(){
  
    let multiply = num1 * num2
     document.getElementById("display-el").value = multiply;
}

function baseLog(){
   
    let logAb = Math.log(num2) / Math.log(num1)
    let logAbFixed = logAb.toFixed(3)
 document.getElementById("display-el").value = logAbFixed;
}

function baseLog2(){
  
    let logBa = Math.log(num1) / Math.log(num2)
    let logBaFixed = logBa.toFixed(3)
  document.getElementById("display-el").value = logBaFixed;
}


function resetSum(){   document.getElementById("display-el").value = 0; }


function pow1(){
  
let aPowerB = Math.pow(num1, num2)

 document.getElementById("display-el").value = aPowerB;
}

function pow2(){
   
let bPowerA  = Math.pow(num2, num1)

 document.getElementById("display-el").value = bPowerA;
}

function percent(){
let percentDiv = num1 % num2
document.getElementById("display-el").value = percentDiv;

}
