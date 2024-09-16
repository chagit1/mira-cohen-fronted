import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navigate from '../Nav/Navigate.component';
import Login from '../Login.component';
import AddStudent from '../AddStudent.component';
import SignIn from '../Login/SignIn.component';
import SignOut from '../Login/SignOut.component';

export const Routing = () => {
    return (
        <Routes>
        <Route path="/SignIn" element={<SignIn></SignIn>} > </Route>
        <Route path="/SignOut" element={<SignOut></SignOut>} ></Route>
      
          <Route path="/add-student" element={<AddStudent />} />  
          <Route path="/allStudent" element={<AddStudent />} />  
          <Route path="/intitution" element={<AddStudent />} />  
          <Route path="/openTasks" element={<AddStudent />} />  
        </Routes>
        
    );
  };