import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import 'react-toastify/dist/ReactToastify.css';

const Forg = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg,setMsg] = useState("")


  const fetch_login = async () => {
    try {
      const res = await axios.post('https://psychological-scale.onrender.com/api/user', {
        email: email,
      });
      await setMsg("لقد تم إرسال كلمة المرور إلى بريدك الإلكتروني")
      
      return res.data[0].password;  // Return the password directly
    } catch (err) {
      await setMsg("هناك خطأ في البريد الإلكتروني")
      
      console.log({ message: err.message });
      throw err;
    }
  };

  const send = async (password) => {
    try {
      const res2 = await axios.post('https://psychological-scale.onrender.com/send-email', {
        to: email,
        subject: 'مركز خدمات تقدير الذات',
        text:` كلمة المرور الخاصة بك هي : ${password}`,
      })
       
      
      console.log(res2);
    } catch (err) {
       
      
      console.log({ message: err.message });
    }
  };



  const handle_click = async () => {
    try {
      const fetchedPassword = await fetch_login();
      setPassword(fetchedPassword); // Update state if needed elsewhere
      await send(fetchedPassword); // Pass fetchedPassword directly to send
      
    } catch (err) {
      console.error("Error during login and send process:", err);
    }
  };

  return (
    <div className="w">
      <div className="left text mt-1">البريد الإلكتروني :</div>
      <input
        className="text mb-4"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <p className={msg.length < 32 ? 'text err' : 'text grr'}>{msg && msg}</p>
      <button
        className="text mt-4 mb-3 btn1"
        onClick={async()=>{
          
          handle_click()}}
      >
        إرسال كلمة المرور
      </button>
      <Link to={"/login"} className='add2 me-2 '>رجوع </Link>
      
    </div>
  );
};
export default Forg;