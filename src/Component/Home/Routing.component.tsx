import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navigate from '../Nav/Navigate.component';
import Login from '../Login.component';
import AddStudent from '../AddStudent.component';
import SignIn from '../Login/SignIn.component';
import SignOut from '../Login/SignOut.component';
import { AllStudent } from '../Student/AllStudent.component';

export const Routing = () => {
    return (
        <Routes>
          {/* <Route path="/" element={<Navigate />} /> */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignOut" element={<SignOut />} />
          <Route path="/add-student" element={<AddStudent />} />  
          <Route path="/allStudent" element={<AllStudent />} />  
          <Route path="/intitution" element={<AddStudent />} />  
          <Route path="/openTasks" element={<AddStudent />} />  
        </Routes>
        
    );
  };