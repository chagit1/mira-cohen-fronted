import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navigate from '../Nav/Navigate.component';
import Login from '../Login.component';
import AddStudent from '../AddStudent.component';

export const Routing = () => {
    return (
        <Routes>
          {/* <Route path="/" element={<Navigate />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/add-student" element={<AddStudent />} />  
          <Route path="/allStudent" element={<AddStudent />} />  
          <Route path="/intitution" element={<AddStudent />} />  
          <Route path="/openTasks" element={<AddStudent />} />  
        </Routes>
        
    );
  };