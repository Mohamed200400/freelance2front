import React, { useContext, useEffect, useState } from 'react'
import { CategContext } from '../Context/ResultContext'
import { NextContext } from '../Context/Next'

const Question = ({info}) => {
    const {result , setResult } = useContext(CategContext)
    const {next,setNext} = useContext(NextContext)
    const [selectedCheckbox,setSelectedCheckbox] = useState(null)
    
    console.log(result);
    const handleChange = (index)=>{
      setSelectedCheckbox(index)
      setNext(index)
    }

   


    const rate = ["إطلاقا","نادرا","أحيانا","غالبا","دائما"]


    const rate2 = ["دائما","غالبا","أحيانا","نادرا","إطلاقا"]
    const negative = [1,2,3,4,5]
    const positive = [5,4,3,2,1]

    useEffect(()=>{
      setNext(null)
      setSelectedCheckbox(null)
      {/*if (info.category === "d1" && selectedCheckbox){
        setResult((prev) =>({
          ...prev,
          d1 : prev.d1 + selectedCheckbox
        }) )
      }else if (info.category === "d2" && selectedCheckbox){
        setResult((prev) =>({
          ...prev,
          d2 : prev.d2 + selectedCheckbox
        }) )
      }else if (info.category === "d3" && selectedCheckbox){
        setResult((prev) =>({
          ...prev,
          d3 : prev.d3 + selectedCheckbox
        }) )
      }*/}



    },[info])
    
  return (
    <div>
        <p className='ques'>{info.question}</p>
        {info.type === false ? <div className='d-flex mt-5 mb-5 w-100'>
          {
            negative.map((el)=>{

              return <div key={el} className='w-100'>
                <label className='ms-2'>{rate2[el-1]}</label>
              <input className='inp' type='checkbox' 
              value={el} 
              onChange={()=>{handleChange(el)
                
              }} 
              checked={el === selectedCheckbox} />
              </div>
            })
          }

        </div>:<div className='d-flex mt-5 mb-5 w-100'>
          {
            positive.map((el)=>{

              return <div key={el} className='w-100'>
                <label className='ms-2'>{rate[el-1]}</label>
              <input className='inp' type='checkbox' 
              value={el} 
              onChange={()=>{handleChange(el)
                
              }} 
              
              checked={el === selectedCheckbox} />
              </div>
            })
          }

        </div>}
    </div>
  )
}


export default Question