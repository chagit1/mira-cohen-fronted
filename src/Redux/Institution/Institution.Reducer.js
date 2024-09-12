import { SET_ALL_INSTITUTION } from './Institution.Action';

const initialState = {
    allInstitution: [],
  };

  const InstitutionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_INSTITUTION:
        return {
          ...state,
          allInstitution: action.payload,
        };
        case 'DELETE_INSTITUTION':
            return {
              ...state,
              allInstitution: state.allInstitution.filter(Institution => Institution.id !== action.payload),
            };
        case 'UPDATE_INSTITUTION':
            return {
              ...state,
              allInstitution: state.allInstitution.map((Institution) =>
                    Institution.id === action.payload.id ? action.payload : Institution
                  ),
                };
        case 'ADD_INSTITUTION':
            return {
               ...state,
               allInstitution: [...state.allInstitution, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default InstitutionsReducer;
  