import React, { useEffect, useState } from 'react'
import "./index.css"
const url = "https://restcountries.com/v3.1/subregion/asia"

const DisplayData = () => {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)

  const getData = async()=>{
    const response = await fetch(url)
    const data1 = await response.json()
    setData(data1)
    setShow(false)
  }

  useEffect(()=>{
    getData()
    
  },[show])

  const handleShow = ()=>{
      console.log("clicked")
      setShow(!show)
  }
  
  return (
    <>
    
    {/* <img src="https://flagcdn.com/w320/mn.png" alt="" width="200px"/> */}
    <table className='pos'>
            <thead >
                <tr >
                        <th>Country</th>
                        <th>Capital</th>
                        <th>Flag</th>
                        <th>Region</th>
                        <th>Subregion</th>
                        <th>Population</th>
                        <th>Languages</th>
                        <th>Borders</th>
                </tr>
            </thead>
       </table>
       <button className='btn' onClick={handleShow}>REFRESH</button>
        {
            data.map((item, index)=>{
                const {name:{common},capital,flags:{png}, region, subregion, population, languages, borders} = item
                
                return (
                     
                    
                     <table key={index}>
                        <tbody>
                            <tr>
                            <td>{common}</td>
                            <td>{capital}</td>
                            <td><img src={png} alt="Country flag" width="200px" /></td>
                            <td>{region}</td>
                            <td>{subregion}</td>
                            <td>{population}</td>
                            <td>{Object.values(languages).join(", ")}</td>
                            <td>{borders && Object.values(borders).join(", ")}</td>
                            
                        </tr>
                        </tbody>
                     </table>
            
                )
               
            })
        }
    </>
  )
}

export default DisplayData