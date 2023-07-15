import { useState } from 'react'// import useState
import reactLogo from './assets/react.svg' // import image from relative path with a variable name
import viteLogo from '/vite.svg' // import image using a variable name
import './App.css' // import CSS which is in the same directory

function App() {
  const [count, setCount] = useState(0)


  // note the opening and closing <>, </> must be done if you want to have more than one div element inside of the return; here there are two divs, an h1, and a paragraph, which is elements.  Without the open and closing empty tags you would only be allowed to use one of the four.  Using a div tag for this is acceptable but then that's just a wasted element.   

  // note that for useState(data), the 'data' can be a number, a string, a boolean, or an array.  when you assign it a variable (which can be an array), for example const [name, setName] = useState(data), the name parameter in the array is the variable name given to the data, which will be updated, and the setName, is the function that is used to update the data inside useState(data).  When this is updated, this triggers the return and therefore the {name} will be updated to the new data that was set inside the setName function. 

  // in the example for this vite webpage here, 'count' is the variable name given to the zero in useState(0), when the button is clicked, the variable count which holds the data, i.e. count = 0, is altered, as in count + 1, so now, count = 1.  So useState(0) becomes useState(1), and that event triggers the return which takes the currently available 'count' data, which is 1, so that will be rendered to the page. 
  return (
    <> 
      <div>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Simple  Counter app</h1>
      <div className="card">

<div className="counter-holder">

<button onClick={() => setCount((count) => 
// if count value > 0 then decrease number by one, otherwise don't change count, because count is zero and cannot be negative
      count > 0 ? count - 1: count = count)}>-</button>

<div className="count-container">
  <p className="count-para">Count is : {count}</p>
</div>

<button onClick={() => setCount((count) => count + 1)}>+</button>

</div>

      </div>
      <p className="read-the-docs">
React logo to learn more
      </p>
    </>
  )
}

export default App
