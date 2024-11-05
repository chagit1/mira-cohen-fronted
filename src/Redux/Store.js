import { configureStore } from '@reduxjs/toolkit';

import TeacherReportsReducer from './TeacherReport/TeacherReport.Reducer';
import InstitutionsReducer from './Institution/Institution.Reducer';
import HelpHoursReducer from './HelpHours/HelpHours.Reducer';
import EligibilityAndCharacterizationsReducer from './EligibilityAndCharacterization/EligibilityAndCharacterization.Reducer';
import UserReducer from './User/userReducer';
import ParentReportsReducer from './ParentReport/ParentReport.Reducer';
import { Student } from '../Model/Student.model';
import StudentsReducer from './Student/Student.Reducer';
const store = configureStore({
    reducer: {
        user: UserReducer,
        TeacherReports : TeacherReportsReducer,
        ParentReports : ParentReportsReducer,
        Institutions: InstitutionsReducer,
        HelpHours : HelpHoursReducer,
        EligibilityAndCharacterizations : EligibilityAndCharacterizationsReducer,
        Student: StudentsReducer
    }
      }
  );
    
  
  export default store;