import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigate from '../Navigate.component';
import Login from '../Login.component';
import AddStudent from '../AddStudent.component';

export const Routing = () => {
    return (
        <Routes>
          <Route path="/" element={<Navigate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-student" element={<AddStudent />} />  
        </Routes>
    );
  };