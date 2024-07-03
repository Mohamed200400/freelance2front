import React from 'react'
import { Link } from 'react-router-dom'

const Note = () => {
  return (
    <div className='w-100'>
        <h1 className='text-center mb-5'>تعليمات</h1>
        <ul className='col-sm-12 col-md-8 m-auto'>
            <li className=' text mb-4'>	يُستخدم هذا المقياس في تقدير الشخص لنفسه (بطريقة ذاتية) </li>
            <li className=' text mb-4'>	تُعرض عليك مجموعة من العبارات التي تعبر عن مشاعرك وتصرفاتك واتجاهاتك عن ذاتك في مواقف مختلفة، ويوجد أمام كل عبارة خمسة بدائل للاستجابة، المرجو منك : </li>
            <li className=' text mb-4 me-5'>أن تقرأ كل عبارة بدقة ثم تختار الاستجابة التي تنطبق عليك بوضع علامة (*).</li>
            <li className=' text mb-4 me-5'>	أن لا تترك عبارة دون الإجابة عليها.</li>
            <li className=' text mb-4'>	لا توجد إجابة صحيحة وأخرى خاطئة، الإجابة تعد صحيحة طالما تعبر عن واقعك أو موقفك أو شعورك تجاه المعنى الذي تحمله العبارة</li>
            <li className=' text mb-4'>	مما يجب التأكيد عليه أن إجابتك تحاط بسرية تامة، ولا يتم نشرها أو إعلانها لأي طرف آخر، وشكرا.</li>
            <li>يقصد بتقدير الذات : شعور الفرد بكفاءة ذاته و قيمتها و قدرتها على مواجهة تحديات الحياة </li>
        </ul>
        <button className='text mt-5 mb-3  btn1 btn2 '><Link className='add2' to={'/home'}>التالي</Link></button>
    </div>
  )
}

export default Note