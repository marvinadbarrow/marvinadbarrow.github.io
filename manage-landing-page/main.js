// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

// actual script for new website below

var navWrapper = document.querySelector('nav-wrapper')
var firstMainElement = document.querySelector('.first-main')
var headerContainer = document.querySelector('.primary-header')
var hamburgerToggle =   document.querySelector('.icon-hamburger');
var closeMenuToggle = document.querySelector('.icon-close')
var primaryNav = document.getElementById('primary-nav-bar')



hamburgerToggle.addEventListener('click', ()=>{
closeMenuToggle.style.display = 'block'
  hamburgerToggle.style.display = 'none'
  primaryNav.style.display = 'block'
  headerContainer.toggleAttribute('data-overlay')
  console.log(headerContainer)
// console.log('menu open')
console.log(document.querySelector('.icon-close'))
navWrapper.style.cssText = 'margin-top: 500px;'
})

closeMenuToggle.addEventListener('click', ()=>{
    hamburgerToggle.style.display = 'block'
      closeMenuToggle.style.display = 'none'
      primaryNav.style.display = 'none'
      headerContainer.toggleAttribute('data-overlay')
      console.log(headerContainer)
    })

    // event listener on window which, if the nav bar list is closed in mobile mode, will make it reappear if for any reason the user is able to resize manually.  It's probably overkill since the default user situation would probably be either desktop, or mobile.  But I wanted to do it as an added precaution. 
    window.addEventListener("resize", (event) => {
      let windowWidth = event.target.outerWidth
      // console.log(windowWidth)
    
      if(windowWidth > 622){ // if window width is resized to greater than 600px 
        // console.log('desktop view'); // desktop mode
        primaryNav.style.display = 'block' // show nav list (which will be in original configuration)
        hamburgerToggle.style.display = 'block' // unhide hamburger icon
        closeMenuToggle.style.display = 'none' // hide close icon
        headerContainer.removeAttribute('data-overlay')


        // note, that although for window sizes > 620px, hamburger icon is 'unhidden', it will still be invisible because it is contained in the 'button' element which itself is invisible at these window dimensions.  Once the window is made small enough again, then the button will show, revealing the hamburger icon, as expected. 
      }else{
        primaryNav.style.display = 'none' 
        // console.log('mobile view')
      }
    });