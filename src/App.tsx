import React, { useEffect } from 'react';
import {useNavigate, Outlet } from 'react-router-dom';
import Navigate from './Component/Navigate.component';
import { Home } from './Component/Home/Home.component';

const App = () => {
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   if (!sessionStorage.getItem("userId")) {
    //     console.log("ffff");
        
    //     navigate('/login');
    //   }
    // }, [navigate]);
  
    return (
      
    <Home></Home>
  );
};

export default App;
