let mathAppOneEl = document.getElementById('app-1-thumbnail')
let mathAppTwoEl = document.getElementById('app-2-thumbnail')
let mathAppThreeEl = document.getElementById('app-3-thumbnail')
let mathAppFourEl = document.getElementById('app-4-thumbnail')



let mathElementsArr = [mathAppOneEl, mathAppTwoEl, mathAppThreeEl, mathAppFourEl]

let gifAddressArr = [
    './thumbnails math apps/vids for GIF conversion/calculator random.gif',
    './thumbnails math apps/vids for GIF conversion/calculator simple.gif',
    './thumbnails math apps/vids for GIF conversion/quadratic generator.gif',
    './thumbnails math apps/vids for GIF conversion/calculator scientific.gif',

  ]


let imageAddressArr = [
    './thumbnails math apps/calculator-random b.png',
    './thumbnails math apps/calculator-simple b.png',
    './thumbnails math apps/quadratic generator.png',
    './thumbnails math apps/thumbnail scientific calculator cropped.png',
   
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

