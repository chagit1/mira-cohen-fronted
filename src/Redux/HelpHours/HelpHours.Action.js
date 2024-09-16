export const SET_ALL_HELP_HOURS = 'SET_ALL_HELP_HOURS';

export const setAllHelpHours = (HelpHours) => ({
  type: SET_ALL_HELP_HOURS,
  payload: HelpHours,
});

export const deleteHelpHours = (HelpHoursId) => ({
    type: 'DELETE_HELP_HOURS',
    payload: HelpHoursId,
  });

  export const updateHelpHours = (updatedHelpHours) => ({
      type: 'UPDATE_HELP_HOURS',
      payload: updatedHelpHours,
  });

  export const addHelpHours = (newHelpHours) => ({
      type: 'ADD_HELP_HOURS',
      payload: newHelpHours,
  });