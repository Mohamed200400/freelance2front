import axios from 'axios';
import React, { useState } from 'react';

const Forg = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetch_login = async () => {
    try {
      const res = await axios.post('https://psychological-scale.onrender.com/api/user', {
        email: email,
      });
      return res.data[0].password;  // Return the password directly
    } catch (err) {
      console.log({ message: err.message });
      throw err;
    }
  };

  const send = async (password) => {
    try {
      const res2 = await axios.post('http://psychological-scale.onrender.com/send-email', {
        to: email,
        subject: 'مركز خدات تقدير الذات',
        text: `كلمة المرور الخاصة بك هي : ${password}`,
      });
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
      <button
        className="text mt-4 mb-5 btn1"
        onClick={handle_click}
      >
        إرسال كلمة المرور
      </button>
    </div>
  );
};

export default Forg;
