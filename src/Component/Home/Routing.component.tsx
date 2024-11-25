import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../Login/SignIn.component';
import SignUp from '../Login/SignUp.component';
import AddInstitution from '../AddInstitution.component';
import AddStudent from '../AddStudent.component';
import { AllStudent } from '../Student/AllStudent.component';
import Navigate from '../Nav/Navigate.component';
import Student from '../Student/Student.component';

const userId = 'exampleUserId'; // או השתמש ב-state או context כדי לקבל את ה-userId
const handleInstitutionAdded = (institution: any) => {
  console.log('Institution added:', institution);
};

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/AddInstitution" element={<AddInstitution  onInstitutionAdded={handleInstitutionAdded} />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/allStudent" element={<AllStudent />} />
      <Route path="/intitution" element={<AddStudent />} />
      <Route path="/student" element={<Student />} />

    </Routes>
  );
};

export default Routing;
