import React, { useContext, useEffect, useState } from 'react'
import Question from './Question'
import axios from 'axios'
import { NextContext } from '../Context/Next'
import { CategContext } from '../Context/ResultContext'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import {DiAptana} from "react-icons/di"

const Home = () => {


  const cookie = new Cookies()
  const nav = useNavigate()
  const {result , setResult } = useContext(CategContext)
  const {next,setNext} = useContext(NextContext)
  const [questions,setQuestions] = useState()
  const [nextt,setNextt] = useState(0) 
  const [taile,setTaile] = useState()
  const admin = cookie.get("isAdmin")

  const fetch_question = async ()=>{
    try{
      const res = await axios.get("https://psychological-scale.onrender.com/api/question")
      setQuestions(res.data)
    }catch(err){
      console.log({message : err.message});
    }
  }

  const fetch_len = async ()=>{
    try{
      const res = await axios.get("https://psychological-scale.onrender.com/api/user")
      setTaile(res.data.length)
    }catch(err){
      console.log({message : err.message});
    }
  }


  useEffect(()=>{
    fetch_question()
    fetch_len()
  },[])
  return (
    <div className='w-100 max m-auto'>
      <div className=' mt-4 mb btn1 '>عدد مستعملي المقياس : {taile && taile}</div>
      {admin && <Link to={"/dashboard"} className='add2 ' >إعدادات الإختبار<DiAptana className='icon me-2'/></Link>}
      <h2 className='m-auto mb-5 w-75 mt-5'>بداية المقياس :</h2>
      {questions && <Question info={questions[nextt]} />}
      {questions && nextt < questions.length-1 ? <button 
      className='text mt-4 mb-3  btn1 btn2'
      disabled={next === null}
       onClick={()=>{
        
        if (questions[nextt].category === "d1" && next){
          setResult((prev) =>({
            ...prev,
            d1 : prev.d1 + next
          }) )
        }else if (questions[nextt].category === "d2" && next){
          setResult((prev) =>({
            ...prev,
            d2 : prev.d2 + next
          }) )
        }else if (questions[nextt].category === "d3" && next){
          setResult((prev) =>({
            ...prev,
            d3 : prev.d3 + next
          }) )
        }

        setNextt(prev => prev + 1 )
      }}>التالي</button> : <button 
      className='text mt-4 mb-3  btn1 btn2'
      disabled={next === null} 
      onClick={()=>{
        
        if (questions[nextt].category === "d1" && next){
          setResult((prev) =>({
            ...prev,
            d1 : prev.d1 + next
          }) )
        }else if (questions[nextt].category === "d2" && next){
          setResult((prev) =>({
            ...prev,
            d2 : prev.d2 + next
          }) )
        }else if (questions[nextt].category === "d3" && next){
          setResult((prev) =>({
            ...prev,
            d3 : prev.d3 + next
          }) )
        }

       nav("/result") 
      }}
      >أحصل على النتائج</button>}
    </div>
  )
}

export default Home