import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigate = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // נניח שסוג המשתמש נשמר ב-localStorage תחת המפתח 'userType'
    const userType = localStorage.getItem('userType');

    if (userType === 'admin') {
      navigate('/admin');
    } else if (userType === 'institution') {
      navigate('/institution');
    } else if (userType === 'teacher') {
      navigate('/teacher');
    } else {
      // אם המשתמש אינו מחובר, ננווט לדף ההתחברות
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default Navigate;
