import { SET_ALL_STUDENT } from './Student.Action';

const initialState = {
    allStudent: [],
  };

  const StudentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_STUDENT:
        return {
          ...state,
          allStudent: action.payload,
        };
        case 'DELETE_STUDENT':
            return {
              ...state,
              allStudent: state.allStudent.filter(student => student.id !== action.payload),
            };
        case 'UPDATE_STUDENT':
            return {
              ...state,
              allStudent: state.allStudent.map((student) =>
                    student.id === action.payload.id ? action.payload : student
                  ),
                };
        case 'ADD_STUDENT':
            return {
               ...state,
               allStudent: [...state.allStudent, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default StudentsReducer;
  