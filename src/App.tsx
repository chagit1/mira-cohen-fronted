import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login.component';
import AddStudent from './Component/AddStudent.component';
import Navigate from './Component/Navigate.component';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-student" element={<AddStudent />} />  
      </Routes>
    </Router>
  );
};

export default App;
