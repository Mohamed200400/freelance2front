import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const nav = useNavigate()
    const [qu,setQu] = useState('')
    const [ty,setTy] = useState("")
    const [po , setPo] = useState(null)
    const fetch_add = async()=>{
        try{
            const res = await axios.post("https://psychological-scale-nij9.onrender.com/api/question",{
                question : qu ,
                category : ty ,
                type : po
            })
            
                
            
        }catch(err){
            console.log({message : err.message});
        }
    }
  return (
    <div  className=' mt-5 mb-5  max m-auto col-sm-12 col-md-4'>
        <label className='text'>السؤال:</label><br/>
        <input type='text' onChange={(e)=>{setQu(e.target.value)}} /><br/>
        <label className='text mt-4 mb-4'>بعد السؤال:</label>
        <select onChange={(e)=>{setTy(e.target.value)}}>
            <option value={''} className='text'>إختار</option>
            <option value={'d1'}  className='text'>شخصي</option>
            <option value={'d2'} className='text'>أسري</option>
            <option value={'d3'} className='text'>إجتماعي</option>
        </select>
        <br/>
        <label className='text '>إيجابي</label><input type='radio' value={true} name='gg' onChange={(e)=>{setPo(e.target.value)}}/>
        <label className='text me-3'>سلبي</label><input type='radio' value={false} name='gg' onChange={(e)=>{setPo(e.target.value)}}/>
        <br/>
        <button disabled={!(qu && ty && po)} onClick={()=>{
            fetch_add()
            nav("/dashboard")
        }} className='text mt-4 mb-3  btn1 ms-3'>إضافة</button> <button onClick={()=>{
            nav("/dashboard")
        }} className='text mt-4 mb-3  btn1'>إلغاء</button>
    </div>
  )
}

export default Add