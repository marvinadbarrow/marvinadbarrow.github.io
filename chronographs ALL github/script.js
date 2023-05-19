



let chronographAppOneEl = document.getElementById('app-1-thumbnail')
let chronographAppTwoEl = document.getElementById('app-2-thumbnail')
let chronographAppThreeEl = document.getElementById('app-3-thumbnail')
let chronographAppFourEl = document.getElementById('app-4-thumbnail')
let chronographAppFiveEl = document.getElementById('app-5-thumbnail')
let chronographAppSixEl = document.getElementById('app-6-thumbnail')


let chronographElementsArr = [chronographAppOneEl, chronographAppTwoEl, chronographAppThreeEl, chronographAppFourEl, chronographAppFiveEl]

let gifAddressArr = [
    './stopwatch basic.gif',
    './stopwatch laps.gif',
    './stopwatch full.gif',
    './chronograph analogue.gif',
    './chronograph digital.gif'
  ]


let imageAddressArr = [
    './chronographs thumbnails/basic stopwatch.png',
    './chronographs thumbnails/basic stopwatch - laps.png',
    './chronographs thumbnails/full stopwatch.png',
    './chronographs thumbnails/chronograph analogue.png',
    './chronographs thumbnails/chronograph digital responsive.png'
]

chronographElementsArr.forEach(element =>{
    let imageIndex = chronographElementsArr.indexOf(element)
 
    // on mouseover gif image of gample play replaces still image
    element.addEventListener('mouseover', function(){
        element.src = gifAddressArr[imageIndex]
    })

// on mouseout still image of game replaces gif
    element.addEventListener('mouseout', function(){
        element.src = imageAddressArr[imageIndex]
    })

})