let num1 = " "
let num2 = " "
let sumEl = document.getElementById("sum-el")

let num1El = document.getElementById("a-el")
let num2El = document.getElementById("b-el")

function generateNum(){
   num1 = Math.floor((Math.random()*10 ))
   num2 = Math.floor((Math.random()*10 ))
   if (num1 === 0){ return 1}
   if (num2 === 0){ return 1}
   num1El.textContent = num1
  num2El.textContent = num2
   //return num1
//return num2
}

function addition(){
    sumEl.textContent = "SUM: "
   let add =  num1 + num2
  // console.log(add)
   sumEl.textContent += add
}

function subtraction(){
    sumEl.textContent = "SUM: "
   let subtract = num1 - num2
 //  console.log(subtract)
    sumEl.textContent += subtract
}

function division(){
    sumEl.textContent = "SUM: "
    let divide = num1 / num2
    let divideFixed = divide.toFixed(3)
  // console.log(divide)
    sumEl.textContent += divideFixed
}

function division2(){
    sumEl.textContent = "SUM: "
    let divide2 = num2 / num1
    let divide2Fixed = divide2.toFixed(3)
  // console.log(divide)
    sumEl.textContent += divide2Fixed
}

function multiplication(){
   sumEl.textContent = "SUM: "
    let multiply = num1 * num2
  //  console.log(multiply)
     sumEl.textContent += multiply
}

function baseLog(){
   sumEl.textContent = "SUM: "
    let logAb = Math.log(num2) / Math.log(num1)
    let logAbFixed = logAb.toFixed(3)
  //  console.log(multiply)
     sumEl.textContent += logAbFixed
}

function baseLog2(){
   sumEl.textContent = "SUM: "
    let logBa = Math.log(num1) / Math.log(num2)
    let logBaFixed = logBa.toFixed(3)
  //  console.log(multiply)
     sumEl.textContent += logBaFixed
}


function resetSum(){ sumEl.textContent = "SUM: "}


function pow1(){
   sumEl.textContent = "SUM: "
let aPowerB = Math.pow(num1, num2)

 sumEl.textContent += aPowerB
}

function pow2(){
   sumEl.textContent = "SUM: "
let bPowerA  = Math.pow(num2, num1)

 sumEl.textContent += bPowerA
}

