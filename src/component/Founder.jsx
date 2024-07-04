import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from "./logo2.png"
import {FaArrowLeft} from "react-icons/fa"
import {CiCircleQuestion} from "react-icons/ci"
import {CiStopwatch} from "react-icons/ci"
import axios from 'axios'

const Founder = () => {
  const [taile,setTaile] = useState()
  const fetch_len = async ()=>{
    try{
      // https://psychological-scale.onrender.com
      const res = await axios.get("https://psychological-scale.onrender.com/api/user")
      setTaile(res.data.length)
     
    }catch(err){
      console.log({message : err.message});
    }
  }

  useEffect(()=>{
    fetch_len()
  },[])

  return (
    <div>
    <div className='col-sm-12 col-md-8 col-xl-6 m-auto founder'>
        <div className='w-100 imgc'><img src={img} alt='xt' className='img '/></div>
        <h1 className='text-center mb-2 aa colw'>مقياس تقدير الذات للكبار</h1>
        <h5 className='text-center mb-4 colw'>Self-Esteem Scale for adults </h5>
        <p className=' text mt-5 mb-5  colw'>يهدف المقياس إلى الكشف
عن مستويات تقدير الذات
لدى الكبار من خالل فقرات
وعبارات تتلاءم مع قيم
وثقافة المجتمع، ويحتوي
على أبعاد متعددة تكشف عن
العوامل التي يتشكل منها
تقديرنا ألنفسنا. </p>
        <p className='text-center text colw'>إعداد</p>
        <p className='text-center mb-2 text colw'>الدكتور  فيصل بن ناصر الشدوخي </p>
        <div className='w-100 tt1'><button className=' mt-5 mb-3 start '><Link className=' text start' to={'/login'}>إبدأ الان <FaArrowLeft/></Link></button></div>
        <hr/>
        <div className='w-100 d-flex justify-content-between'>
          <div><CiCircleQuestion className='ico colw'/><span className='colw text'>39 سؤالا</span></div>
          <div><CiStopwatch className='ico colw'/><span className='colw text'>12 دقيقة</span></div>
        </div>
    </div>
    {taile && <div className='text-center text30 grey colw'>عدد المستخدمين + { taile + 930} </div>}
    </div>
  )
}

export default Founder