import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie"


const Register = () => {
  const cookie = new Cookies()
  const nav = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name ,setName]  = useState("")
  const [gender,setGender] = useState("")
  const [age,setAge] = useState("")

  const fetch_register = async()=>{
    try{
      const res = await axios.post("https://psychological-scale.onrender.com/api/register",{
      name : name ,
      email : email ,
      password : password ,
      gender : gender ,
      age : age
    })
    
    if (res.status === 201){
      cookie.set("isAdmin",res.data.isAdmin)
      cookie.set("email",res.data.email)
      console.log(res);
      nav("/note")

    }
    }catch(err){
      
      console.log({message  : err.message});
    }
  }

  return (
    <div className='w'>
    <h1 className='mb-5'>صفحة إنشاء حساب</h1>
    <div className='left text mt-1'>الإسم</div>
    <input className='text' type='text' onChange={(e)=>{setName(e.target.value)}} required />
    <div className='left text'>البريد الإلكتروني</div>
    <input className='text' type='text' onChange={(e)=>{setEmail(e.target.value)}} required />
    <div className='left text'>كلمة المرور</div>
    <input className='text' type='password' onChange={(e)=>{setPassword(e.target.value)}} required/>
    <div className='left text'>الجنس :</div>
    <div>
      <label className='ms-2'>ذكر :</label><input  name='p'  value={'ذكر'} type='radio'  required onChange={(e)=>{setGender(e.target.value)}}/>
      <label className='me-4 ms-2'>أنثى :</label><input name='p' value={'أنثى'} type='radio' required onChange={(e)=>{setGender(e.target.value)}}/>
    </div>
    <div className='left text'>العمر :</div>
    <div className='dd'>
      <div><input  name='pi'  value={'25-18 سنة'} type='radio'  required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'> 25-18 سنة</label></div>
      <div><input name='pi' value={'30-25 سنة'} type='radio' required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'> 30-25 سنة</label></div>
      <div><input  name='pi'  value={'35-30 سنة'} type='radio'  required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'>35-30 سنة</label></div>
      <div><input name='pi' value={'40-35 سنة'} type='radio' required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'>40-35 سنة</label></div>
      <div><input  name='pi'  value={'45-40 سنة'} type='radio'  required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'>45-40 سنة</label></div>
      <div><input name='pi' value={'50-45 سنة'} type='radio' required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'> 50-45 سنة</label></div>
      <div><input  name='pi'  value={'55-50 سنة'} type='radio'  required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'>55-50 سنة</label></div>
      <div><input name='pi' value={' 55 سنة فأكثر'} type='radio' required onChange={(e)=>{setAge(e.target.value)}}/><label className='me-2 mb-1'> 55 سنة فأكثر</label></div>
    
    
    </div>


    <button
    className='text mt-4 mb-3  btn1'
    onClick={()=>{
      fetch_register()
    }}
    >إنشاء حساب</button>
    <p>إذا كان لديك حساب يمكنك <Link to={"/login"}>تسجيل الدخول</Link> </p>

    </div>
  )
}

export default Register