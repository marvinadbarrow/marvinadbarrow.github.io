let mathAppOneEl = document.getElementById('app-1-thumbnail')
let mathAppTwoEl = document.getElementById('app-2-thumbnail')
let mathAppThreeEl = document.getElementById('app-3-thumbnail')
let mathAppFourEl = document.getElementById('app-4-thumbnail')



let mathElementsArr = [mathAppOneEl, mathAppTwoEl, mathAppThreeEl, mathAppFourEl]

let gifAddressArr = [
    './calculator random.gif',
    './calculator simple.gif',
    './quadratic generator.gif',
    './calculator scientific.gif',

  ]


let imageAddressArr = [
    './calculator-random b.png',
    './calculator-simple b.png',
    './quadratic generator.png',
    './thumbnail scientific calculator cropped.png',
   
]

mathElementsArr.forEach(element =>{
    let imageIndex = mathElementsArr.indexOf(element)
 
    // on mouseover gif image of gample play replaces still image
    element.addEventListener('mouseover', function(){
        element.src = gifAddressArr[imageIndex]
    })

// on mouseout still image of game replaces gif
    element.addEventListener('mouseout', function(){
        element.src = imageAddressArr[imageIndex]
    })

})

