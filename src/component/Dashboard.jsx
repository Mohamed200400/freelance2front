import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [familly,setFamilly] = useState([])
  const [up,setUp] = useState(false)
  const fetch_cat1 = async(cat)=>{
    try{
      const res = await axios.get("https://psychological-scale-nij9.onrender.com/api/question/"+cat)
      setFamilly([...res.data])
    }catch(err){
      console.log({message  : err.message});
    }
  }
  

  const [soc,setSoc] = useState([])
  const fetch_cat2 = async(cat)=>{
    try{
      const res = await axios.get("https://psychological-scale-nij9.onrender.com/api/question/"+cat)
      setSoc([...res.data])
    }catch(err){
      console.log({message  : err.message});
    }
  }
 
  const [idk,setIdk] = useState([])
  const fetch_cat3 = async(cat)=>{
    try{
      const res = await axios.get("https://psychological-scale-nij9.onrender.com/api/question/"+cat)
      setIdk([...res.data])
    }catch(err){
      console.log({message  : err.message});
    }
  }
  var i = 1
  const fdelete = async(id)=>{
    try{
      const res = await axios.delete("https://psychological-scale-nij9.onrender.com/api/question/"+id)
      setUp(prev => !prev)
    }catch(err){
      console.log({message  : err.message});
    }
  }


  useEffect(()=>{
    fetch_cat3("d3") 
    fetch_cat2("d2")
    fetch_cat1("d1")
    
  },[up])
  return (
    <div className=' mt-5 mb-5 w-100 max m-auto'>
      <Link to={"/info"} className='add  '>قواعد البيانات </Link>
      <Link to={"/home"} className='add2 me-2 '>رجوع </Link>
      <table className='tab m-auto mt-4 mb-4'>
        <thead className='tab'>
          <th className='tab'>التسلسل</th>
          <th className='tab'>البعد</th>
          <th className='tab'>السؤال</th>
        </thead>
        <tbody className='tab'>
          {
            familly.map((el,idx)=>{
              return (
                <tr key={el} className='tab'>
                  <td className='tab'>{i++}</td>
                  {idx === 0 && <td className='tab' rowSpan={familly.length} >{"الشخصي"}</td>}
                  <td  className="tab" ><div className={el.type === false && "err"}>{el.question}</div></td>
                  <td className='tab'><button className='del' onClick={()=>{
                    fdelete(el._id)
                  }}>حذف</button></td>
                  
                </tr>
              )
            })
          }
          {
            soc.map((el,idx)=>{
              return (
                <tr className='tab' key={el}>
                  <td className='tab'>{i++}</td>
                  {idx === 0 && <td className='tab' rowSpan={soc.length} >{"الأسري"}</td>}
                  <td className='tab'><div className={el.type === false && "err"}>{el.question}</div></td>
                  <td className='tab'><button className='del' onClick={()=>{
                    fdelete(el._id)
                  }}>حذف</button></td>
                </tr>
              )
            })
          }
          {
            idk.map((el,idx)=>{
              return (
                <tr className='tab' key={el}>
                  <td className='tab'>{i++}</td>
                  {idx === 0 && <td className='tab' rowSpan={idk.length} >{"الإجتماعي"}</td>}
                  <td className='tab'><div className={el.type === false && "err"}>{el.question}</div></td>
                  <td className='tab'><button 
                   className='del'
                  onClick={()=>{
                    fdelete(el._id)
                  }}>حذف</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Link to={"/addquestion"} className='add '>أضف سؤال + </Link>
     
    </div>
  )
}

export default Dashboard