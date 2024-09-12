import { SET_ALL_TEACHER_REPORTS } from './TeacherReport.Action';

const initialState = {
    allTeacherReports: [],
  };

  const TeacherReportsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_TEACHER_REPORTS:
        return {
          ...state,
          allTeacherReports: action.payload,
        };
        case 'DELETE_TEACHER_REPORT':
            return {
              ...state,
              allTeacherReports: state.allTeacherReports.filter(TeacherReport => TeacherReport.id !== action.payload),
            };
        case 'UPDATE_TEACHER_REPORT':
            return {
              ...state,
              allTeacherReports: state.allTeacherReports.map((TeacherReport) =>
                    TeacherReport.id === action.payload.id ? action.payload : TeacherReport
                  ),
                };
        case 'ADD_TEACHER_REPORT':
            return {
               ...state,
               allTeacherReports: [...state.allTeacherReports, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default TeacherReportsReducer;
  