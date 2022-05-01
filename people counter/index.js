
let countEl =  document.getElementById("count-el")
let count = 0
let saveEl = document.getElementById("save-el")

function increment(){
  count += 1;
  countEl.textContent = count
   // console.log("button clicked")
    //console.log(count)
}

 function save(){
    //saveEl.textContent = count;
    if (count > 0){
    console.log("saved")
    saveEl.textContent += " "+count + "-";
    count = 0
    countEl.textContent = 0
    }
}

// notes on the save() function. I've used the 'if else' command to decide whether the save function works or not. At the end of the save function we return the cont to zero; to prevent zero being registered and get a complete reset I used the if (count > 0) {then run the requests of the save() function}. So when you save and the count returns to zero, hitting the save button again will do nothing (i.e. not register zero), it will only respond once you start using the increment button again. (find out how to register zero if you need to)
let welcomeEl = document.getElementById("welcome-el")

let name = "Marvin" +"!"
let greeting = "Hi, " + "welcome back "

 

function consoleLog(){
 welcomeEl.innerText = greeting + name

welcomeEl.innerText += ":-)"
 console.log( "I have" + " " + myPoints + " points")
 salutation()
}

let firstName = "Marvin"
let lastName = "Barrow"
let fullName = firstName + " " + lastName

let greetingTwo = "Hi there!"
function salutation(){ console.log(greetingTwo + " " + firstName)}

let myPoints = 3
function add3Points() {myPoints += 3
}

function removePoint(){
 myPoints -= 1
 }
 add3Points()
 add3Points()
 add3Points()
 removePoint()
 removePoint()
 