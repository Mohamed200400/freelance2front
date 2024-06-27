import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Info = () => {
  const [length, setLength] = useState();
  const [male_length, setMale_length] = useState();
  const [female, setFemale] = useState();
  const [percent, setPercent] = useState();
  const [user, setUser] = useState([]);

  const [age1, setAge1] = useState();
  const [age2, setAge2] = useState();
  const [age3, setAge3] = useState();
  const [age4, setAge4] = useState();
  const [age5, setAge5] = useState();
  const [age6, setAge6] = useState();
  const [age7, setAge7] = useState();
  const [age8, setAge8] = useState();

  const [av1, setAv1] = useState(0);
  const [av2, setAv2] = useState(0);
  const [av3, setAv3] = useState(0);
  const [av4, setAv4] = useState(0);
  const [av5, setAv5] = useState(0);
  const [av6, setAv6] = useState(0);
  const [av7, setAv7] = useState(0);
  const [av8, setAv8] = useState(0);

  const all = async () => {
    try {
      const res = await axios.get('https://psychological-scale.onrender.com/api/user');
      setLength(res.data.length);
      setUser(res.data.user);
      setPercent(100 / res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const boy = async () => {
    try {
      const res = await axios.get('https://psychological-scale.onrender.com/api/user/male');
      setMale_length(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const page = async () => {
    try {
      const [
        age1Res,
        age2Res,
        age3Res,
        age4Res,
        age5Res,
        age6Res,
        age7Res,
        age8Res
      ] = await Promise.all([
        axios.get('https://psychological-scale.onrender.com/api/user/25-18 سنة'),
        axios.get('https://psychological-scale.onrender.com/api/user/30-25 سنة'),
        axios.get('https://psychological-scale.onrender.com/api/user/35-30 سنة'),
        axios.get('https://psychological-scale.onrender.com/api/user/40-35 سنة'),
        axios.get('https://psychological-scale.onrender.com/api/user/45-40 سنة'),
        axios.get('https://psychological-scale.onrender.com/api/user/50-45 سنة'),
        axios.get('https://psychological-scale.onrender.com/api/user/55-50 سنة'),
        axios.get('https://psychological-scale.onrender.com/api/user/55 سنة فأكثر')
      ]);

      setAge1(age1Res.data.length);
      setAge2(age2Res.data.length);
      setAge3(age3Res.data.length);
      setAge4(age4Res.data.length);
      setAge5(age5Res.data.length);
      setAge6(age6Res.data.length);
      setAge7(age7Res.data.length);
      setAge8(age8Res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    all();
    boy();
    page();
  }, []);

  useEffect(() => {
    const av = () => {
      let av1Sum = 0, av2Sum = 0, av3Sum = 0, av4Sum = 0, av5Sum = 0, av6Sum = 0, av7Sum = 0, av8Sum = 0;
      user.forEach(el => {
        if (el.age === '25-18 سنة') {
          av1Sum += el.result;
        } else if (el.age === '30-25 سنة') {
          av2Sum += el.result;
        } else if (el.age === '35-30 سنة') {
          av3Sum += el.result;
        } else if (el.age === '40-35 سنة') {
          av4Sum += el.result;
        } else if (el.age === '45-40 سنة') {
          av5Sum += el.result;
        } else if (el.age === '50-45 سنة') {
          av6Sum += el.result;
        } else if (el.age === '55-50 سنة') {
          av7Sum += el.result;
        } else if (el.age === '55 سنة فأكثر') {
          av8Sum += el.result;
        }
      });
      setAv1(av1Sum);
      setAv2(av2Sum);
      setAv3(av3Sum);
      setAv4(av4Sum);
      setAv5(av5Sum);
      setAv6(av6Sum);
      setAv7(av7Sum);
      setAv8(av8Sum);
    };

    if (user.length > 0) {
      av();
    }
  }, [user]);

  useEffect(() => {
    if (length !== undefined && male_length !== undefined) {
      setFemale(length - male_length);
    }
  }, [length, male_length]);

  return (
    <div className='w-85 max m-auto'>
      <h1 className=' tit mb-5'>بيانات المقياس</h1>
      <table className='tab mt-5 mb-5 w-100'>
        <thead className='tab'>
          <tr>
            <th className='tab text-center text30 b1 colw'  colSpan={2}>نسبة الذكور و الإناث</th>
          </tr>
        </thead>
        <tbody  className='tab'>
          <tr>
            <td className='tab text25 b2'>نسبة الذكور {male_length && percent && (male_length * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'> نسبة الإناث {female && percent && (female * percent).toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>

      <table className='tab mt-5 mb-5 w-100'>
        <thead  className='tab'>
          <tr>
            <th className='tab text-center text30 b1 colw'  colSpan={9}>إحصائيات المقياس</th>
          </tr>
        </thead>
        <tbody className='tab'>
          <tr>
            <td className='tab text25 b2'>العمر</td>
            <td className='tab text25 b2'>25-18 سنة</td>
            <td className='tab text25 b2'>30-25 سنة</td>
            <td className='tab text25 b2'>35-30 سنة</td>
            <td className='tab text25 b2'>40-35 سنة</td>
            <td className='tab text25 b2'>45-40 سنة</td>
            <td className='tab text25 b2'>50-45 سنة</td>
            <td className='tab text25 b2'>55-50 سنة</td>
            <td className='tab text25 b2'>55 سنة فأكثر</td>
            
          </tr>
          <tr>
            <td className='tab text25 b2'>نسبة إستعمال المقياس</td>
            <td className='tab text25 b2'>{age1 && percent && (age1 * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'>{age2 && percent && (age2 * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'>{age3 && percent && (age3 * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'>{age4 && percent && (age4 * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'>{age5 && percent && (age5 * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'>{age6 && percent && (age6 * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'>{age7 && percent && (age7 * percent).toFixed(2)} %</td>
            <td className='tab text25 b2'>{age8 && percent && (age8 * percent).toFixed(2)} %</td>
          </tr>
          <tr>
            <td className='tab text25 b2'>متوسط نسبة قبول الذات</td>
            <td className='tab text25 b2'>{av1  && (av1 / age1).toFixed(2)} %</td>
            <td className='tab text25 b2'>{av2  && (av2 / age2).toFixed(2)} %</td>
            <td className='tab text25 b2'>{av3  && (av3 / age3).toFixed(2)} %</td>
            <td className='tab text25 b2'>{av4  && (av4 / age4).toFixed(2)} %</td>
            <td className='tab text25 b2'>{av5  && (av5 / age5).toFixed(2)} %</td>
            <td className='tab text25 b2'>{av6  && (av6 / age6).toFixed(2)} %</td>
            <td className='tab text25 b2'>{av7  && (av7 / age7).toFixed(2)} %</td>
            <td className='tab text25 b2'>{av8  && (av8 / age8).toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Info;
