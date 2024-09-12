import { SET_ALL_PARENT_REPORTS } from './ParentReport.Action';

const initialState = {
    allParentReports: [],
  };

  const ParentReportsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_PARENT_REPORTS:
        return {
          ...state,
          allParentReports: action.payload,
        };
        case 'DELETE_PARENT_REPORT':
            return {
              ...state,
              allParentReports: state.allParentReports.filter(ParentReport => ParentReport.id !== action.payload),
            };
        case 'UPDATE_PARENT_REPORT':
            return {
              ...state,
              allParentReports: state.allParentReports.map((ParentReport) =>
                    ParentReport.id === action.payload.id ? action.payload : ParentReport
                  ),
                };
        case 'ADD_PARENT_REPORT':
            return {
               ...state,
               allParentReports: [...state.allParentReports, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default ParentReportsReducer;
  