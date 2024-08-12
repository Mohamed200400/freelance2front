import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CategContext } from '../Context/ResultContext'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import Refresh from './Refresh'
import jsPDF  from "jspdf";
import html2canvas from "html2canvas"
import { useReactToPrint } from 'react-to-print';

const Result = () => {
  Refresh()
  const pdfRef = useRef()
  const { result } = useContext(CategContext)
  const [ra, setRa] = useState(null)
  const [user,setUser] = useState()
  const [ra1, setRa1] = useState(null)
  const [ra2, setRa2] = useState(null)
  const [ra3, setRa3] = useState(null)
  const rate = ["منخفض جدا", "منخفض", "متوسط", "مرتفع", "مرتفع جدا"]
  const totR = result.d1 + result.d2 + result.d3
  console.log(totR)
  const [date ,setDate]= useState("")
  const [p1, setP1] = useState(0)
  const [p2, setP2] = useState(0)
  const [p3, setP3] = useState(0)
  const cookie = new Cookies()
  const emailp = cookie.get("email")
  const [text , setText] = useState("")

  const contentToPrint = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const downloadPDF = () => {
    const input = pdfRef.current;
    
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('download.pdf');
      });
  };


  const userInfo = async()=>{

    try {
      
      
       const res = await axios.post("https://psychological-scale-nij9.onrender.com/api/user",{
        email : emailp
      })
      setUser(res.data[0])
      console.log(res.data[0].date);
      setDate(res.data[0].date)
      

    } catch (err) {
      console.log({ message: err.message })
    }
  }



  const result_fn = async(resu)=>{

    try {

       const res = await axios.put("https://psychological-scale-nij9.onrender.com/api/user/res",{
        email : emailp,
        result : resu
      })
      console.log(res);

    } catch (err) {
      console.log({ message: err.message })
    }
  }


  const fetchLengths = async () => {
    try {
      const [res1, res2, res3] = await Promise.all([
        axios.get("https://psychological-scale-nij9.onrender.com/api/question/d1/length"),
        axios.get("https://psychological-scale-nij9.onrender.com/api/question/d2/length"),
        axios.get("https://psychological-scale-nij9.onrender.com/api/question/d3/length")
      ])

      setP1(res1.data.length)
      setP2(res2.data.length)
      setP3(res3.data.length)
    } catch (err) {
      console.log({ message: err.message })
    }
  }

  useEffect(() => {
    userInfo()
    fetchLengths()
    
  }, [])

  useEffect(() => {
    if (p1 && p2 && p3) {
      const average = totR / (p1 + p2 + p3)
      if (average >= 1.00 && average <= 1.79) {
        result_fn((average*20).toFixed(2))
        setText("لديك انخفاض شديد في تقديرك لذاتك، وتحمل صورة سلبية عن نفسك، مع انعدام للثقة وشعور بالعجز وعدم الرضا عن الذات والحياة. ندعوك لمراجعة مختص في العلاج النفسي للحصول على الدعم المناسب.")
        setRa("منخفض جدًا")
      } else if (average >= 1.80 && average <= 2.59) {
        result_fn((average*20).toFixed(2))
        setText("لديك انخفاض في تقديرك لذاتك وتحمل صورة سلبية عن نفسك. ندعوك لمراجعة مختص في العلاج النفسي للحصول على الدعم المناسب.")
        setRa("منخفض")
      } else if (average >= 2.60 && average <= 3.39) {
        result_fn((average*20).toFixed(2))
        setText("لديك مستوى متوسط لتقديرك الذاتي، وتذبذب في الشعور بقيمة الذات والثقة، وتحمل صورة مشوّهة عن نفسك. وندعوك لتعزيز تقديرك الذاتي بالأفكار الإيجابية والسلوك التوكيدي وبناء صورة إيجابية عن ذاتك")
        setRa("متوسط")
      } else if (average >= 3.40 && average <= 4.19) {
        result_fn((average*20).toFixed(2))
        setText("لديك تقدير إيجابي لذاتك، وتحمل صورة إيجابية عن نفسك، وتشعر بقيمتك وثقتك، ولديك استعداد جيد لمواجهة التحديات.")
        setRa("مرتفع")
      } else if (average >= 4.20 && average <= 5.00) {
        result_fn((average*20).toFixed(2))
        setText("لديك تقدير إيجابي لذاتك، وتشعر بقيمتك وثقتك، ومدرك لجوانب قوتك، وتمتلك علاقات إيجابية، وتتعامل مع التحديات بثقة.")
        setRa("مرتفع جدًا")
      } else {
        setRa("قيمة غير معروفة")
      }
    }
    if (p1 ) {
      const average = result.d1 / p1 
      if (average >= 1.00 && average <= 1.79) {
        
        setRa1("منخفض جدًا")
      } else if (average >= 1.80 && average <= 2.59) {
       
        setRa1("منخفض")
      } else if (average >= 2.60 && average <= 3.39) {
       
        setRa1("متوسط")
      } else if (average >= 3.40 && average <= 4.19) {
        
        setRa1("مرتفع")
      } else if (average >= 4.20 && average <= 5.00) {
        
        setRa1("مرتفع جدًا")
      } else {
        setRa1("قيمة غير معروفة")
      }
    }
    if (p2 ) {
      const average = result.d2 / p2
      if (average >= 1.00 && average <= 1.79) {
        
        setRa2("منخفض جدًا")
      } else if (average >= 1.80 && average <= 2.59) {
       
        setRa2("منخفض")
      } else if (average >= 2.60 && average <= 3.39) {
       
        setRa2("متوسط")
      } else if (average >= 3.40 && average <= 4.19) {
       
        setRa2("مرتفع")
      } else if (average >= 4.20 && average <= 5.00) {
       
        setRa2("مرتفع جدًا")
      } else {
        setRa2("قيمة غير معروفة")
      }
    }
    if (p3 ) {
      const average = result.d3 / p3
      if (average >= 1.00 && average <= 1.79) {
       
        setRa3("منخفض جدًا")
      } else if (average >= 1.80 && average <= 2.59) {
      
        setRa3("منخفض")
      } else if (average >= 2.60 && average <= 3.39) {
       
        setRa3("متوسط")
      } else if (average >= 3.40 && average <= 4.19) {
        
        setRa3("مرتفع")
      } else if (average >= 4.20 && average <= 5.00) {
      
        setRa3("مرتفع جدًا")
      } else {
        setRa3("قيمة غير معروفة")
      }
    }
    
  }, [p1, p2, p3, totR])
 



  return (
    <div className='w-100 max m-auto'>
    <div className='w-100 max m-auto content' ref={pdfRef} >
      <div ref={contentToPrint}>
      {ra && <div className='w-85 max m-auto' >
        <h1 className=' tit mb-2 mt-3'>نتيجة مقياس تقدير الذات</h1>

        {user && <ul>
          <div className='d-flex'><li className='ms-3 mb-1 text'>الاسم :   </li> <label className='text'>{user.name}</label></div>
          <div className='d-flex'><li className='ms-3 mb-1 text'>	الجنس : </li><label className='text'>{user.gender}</label></div>
          <div className='d-flex'><li className='ms-3 mb-1 text'>	العمر : </li><label className='text'>{user.age}</label></div>
          <div className='d-flex'><li className='ms-3 mb-1 text'>	تاريخ إجراء القياس:  </li> <label className='text'>{date.slice(0,10)}</label></div>
        </ul>}
        
        
        <table className='tab mt-1 mb-1 w-100'>
          <thead className='tab'>
            <th className='tab text-center text25 b1 colw' colSpan={2}>المستوى العام لتقدير الذات</th>
          </thead>
          <tbody className='tab'>
            <tr>
            <td className='tab  b2'>مستوى <span className='fw-bold colg'>{ra}</span> لتقدير الذات</td>
            <td className='tab  b2'>النسبة <span className='fw-bold colg'>{((totR / (p1 + p2 + p3)) * 20).toFixed(2)} % </span></td>
            </tr>
            <tr>
              <td className='tab  b2' colSpan={2}>{text && text}</td>
            </tr>
          </tbody>
        </table>


        


        <table className='tab2 mt-2 mb-3 w-100'>
          <thead className='tab'>
            <th className='tab text-center text25 b1 colw' colSpan={3}>مستويات أبعاد تقدير الذات</th>
          </thead>
          <tbody className='tab'>
            <tr className='tab '>
            <td className='tab  b2'>البعد الشخصي</td>
            <td className='tab  b2'>البعد الأسري</td>
            <td className='tab  b2'>البعد الإجتماعي</td>
            </tr>
            <tr className='tab'>
              <td className='tab  b2'>النسبة <span className='fw-bold colg'>{((result.d1 / p1) * 20).toFixed(2)} % </span></td>
              <td className='tab  b2'>النسبة <span className='fw-bold colg'> {((result.d2 / p2) * 20).toFixed(2)} % </span></td>
              <td className='tab  b2'>النسبة <span className='fw-bold colg'> {((result.d3 / p3) * 20).toFixed(2)} % </span></td>
            </tr>
            <tr className='tab'>
            <td className='tab  b2'>مستوى <span className='fw-bold colg'>{ra1}</span> لتقدير الذات</td>
            <td className='tab  b2'>مستوى <span className='fw-bold colg'>{ra2}</span> لتقدير الذات</td>
            <td className='tab  b2'>مستوى <span className='fw-bold colg'>{ra3}</span> لتقدير الذات</td>
            </tr>
          </tbody>
        </table>
        
        
        </div>
        }
        <div className='m-auto'>
        <div className='w-100 d-flex justify-content-between tt mb-3'>
      <span className='w-27 '>0%</span>
      <span className='w-27'>35.8%</span>
      <span className='w-27 '>51.8%</span>
      <span className='w-27 '>67.8%</span>
      <span className='w-27 '>83.8%</span>
      <span className='w-27 '>100%</span>
      

    </div>


    <div className='w-100 d-flex justify-content-between tt'>
      <span className='w-2 red1'></span>
      <span className='w-2 red2'></span>
      <span className='w-2 or'></span>
      <span className='w-2 green1'></span>
      <span className='w-2 green2'></span>
      

    </div>

    <div className='w-100 d-flex justify-content-between'>
      <span className='w-20'>منخفض جدا</span>
      <span className='w-20'>منخفض</span>
      <span className='w-20'>متوسط</span>
      <span className='w-20'>مرتفع</span>
      <span className='w-20'>مرتفع جدا</span>

    </div>
    </div>

    <div className='d-flex row'>
       
    
    <div className='text-center text mt-2'>حقوق مقياس تقدير الذات للكبار محفوظة
    لدى مركز تقدير الذات</div>
    <div className='text-center text mt-1'>هل ترغب بتحسين وتعزيز تقديرك لذاتك؟ <a href='https://selfesteem.com.sa/' target='_blank'>إضغط هنا</a></div>
    </div>
    </div>
    </div>

    <div>
    <button className='text mt-5 mb-3  btn1 btn2 me-2 '  onClick={handlePrint}>طباعة  </button> 
    <button className='text mt-5 mb-3  btn1 btn2 me-2' onClick={downloadPDF}  > تحميل PDF</button> 
    <button className='text mt-5 mb-3  btn1 btn2 '><Link className='add2' to={'/'}>تسجيل الخروج </Link></button> 
    </div>
    </div>
  )
}

export default Result