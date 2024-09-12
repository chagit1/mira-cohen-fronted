import { SET_ALL_HELP_HOURS } from './HelpHours.Action';

const initialState = {
    allHelpHours: [],
  };

  const HelpHoursReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_HELP_HOURS:
        return {
          ...state,
          allHelpHours: action.payload,
        };
        case 'DELETE_HELP_HOURS':
            return {
              ...state,
              allHelpHours: state.allHelpHours.filter(HelpHours => HelpHours.id !== action.payload),
            };
        case 'UPDATE_HELP_HOURS':
            return {
              ...state,
              allHelpHours: state.allHelpHours.map((HelpHours) =>
                    HelpHours.id === action.payload.id ? action.payload : HelpHours
                  ),
                };
        case 'ADD_HELP_HOURS':
            return {
               ...state,
               allHelpHours: [...state.allHelpHours, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default HelpHoursReducer;
  