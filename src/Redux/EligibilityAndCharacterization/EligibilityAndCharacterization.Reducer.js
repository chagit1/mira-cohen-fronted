import { SET_ALL_ELIGIBILITY_AND_CHARACTERIZATION } from './EligibilityAndCharacterization.Action';

const initialState = {
    allEligibilityAndCharacterizations: [],
  };

  const EligibilityAndCharacterizationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_ELIGIBILITY_AND_CHARACTERIZATION:
        return {
          ...state,
          allEligibilityAndCharacterizations: action.payload,
        };
        case 'DELETE_ELIGIBILITY_AND_CHARACTERIZATION':
            return {
              ...state,
              allEligibilityAndCharacterizations: state.allEligibilityAndCharacterizations.filter(EligibilityAndCharacterization => EligibilityAndCharacterization.id !== action.payload),
            };
        case 'UPDATE_ELIGIBILITY_AND_CHARACTERIZATION':
            return {
              ...state,
              allEligibilityAndCharacterizations: state.allEligibilityAndCharacterizations.map((EligibilityAndCharacterization) =>
                    EligibilityAndCharacterization.id === action.payload.id ? action.payload : EligibilityAndCharacterization
                  ),
                };
        case 'ADD_ELIGIBILITY_AND_CHARACTERIZATION':
            return {
               ...state,
               allEligibilityAndCharacterizations: [...state.allEligibilityAndCharacterizations, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default EligibilityAndCharacterizationsReducer;
  