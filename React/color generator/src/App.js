import React from 'react'
import { useState } from 'react'
import Values from "values.js"
import "./color generator.css"
import SingleColor from './SingleColor'

const App = () => {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values("#9d4d74").all(10))

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
          let colors = new Values(color).all(10)
          setList(colors)
          console.log(colors);

    } catch(error) {
        console.log(error);
        setError(true)
    }
  

  }

  return (
    <>
    <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" value={color} onChange={(e)=>setColor(e.target.value)} placeholder="#f15025" className={`${error?'error':null}` }/>
            <button className="btn" type='submit'>submit</button>
        </form>
      
    </section>
    <section className="colors">
          {
            list.map((color, index)=>{
                return <SingleColor key={index} {...color} hex={color.hex}/>
            })
          }
    </section>
    </>
   
  )
}

export default App