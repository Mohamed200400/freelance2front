import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Login = () => {
  const cookie = new Cookies();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle_lo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await fetch_login();
  };

  const fetch_login = async () => {
    try {
      const res = await axios.post('https://psychological-scale.onrender.com/api/login', {
        email: email,
        password: password,
      });

      if (res.status === 200) {
        cookie.set('isAdmin', res.data.isAdmin);
        cookie.set('email', res.data.email);
        console.log(res);
        nav('/note');
      }
    } catch (err) {
      setError('البريد أو كلمة المرور خاطئة');
      console.log({ message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [email, password]);

  return (
    <div className='w'>
      {loading && (
        <div className='cont col-md-6 col-sm-12 col-12 h-75 '>
          <div className='loading-circle'></div>
        </div>
      )}
      <h1 className='mb-5 mt-4'>صفحة تسجيل الدخول</h1>
      <div className='left text mt-1'>البريد الإلكتروني :</div>
      <input className='text' type='text' onChange={(e) => setEmail(e.target.value)} required />
      <div className='left text'>كلمة المرور :</div>
      <input className='text' type='password' onChange={(e) => setPassword(e.target.value)} required />
      <p className='text mt-4 err'>{error}</p>
      <button className='text mt-4 mb-3 btn1' onClick={handle_lo}>
        تسجيل الدخول
      </button>
      <p className='text'>
        إذا لم يكن لديك حساب قم
        <Link to={'/register'} className='me-2'>
          بإنشاء واحد
        </Link>
      </p>
      <p className='text'>
        هل نسيت
        <Link to={'/forg'} className='me-2'>
          كلمة المرور
        </Link>
      </p>
    </div>
  );
};

export default Login;
