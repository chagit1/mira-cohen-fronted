export const SET_ALL_ELIGIBILITY_AND_CHARACTERIZATION = 'SET_ALL_ELIGIBILITY_AND_CHARACTERIZATION';

export const setAllEligibilityAndCharacterizations = (EligibilityAndCharacterizations) => ({
  type: SET_ALL_ELIGIBILITY_AND_CHARACTERIZATION,
  payload: EligibilityAndCharacterizations,
});

export const deleteEligibilityAndCharacterization = (EligibilityAndCharacterizationId) => ({
    type: 'DELETE_ELIGIBILITY_AND_CHARACTERIZATION',
    payload: EligibilityAndCharacterizationId,
  });

  export const updateEligibilityAndCharacterization = (updatedEligibilityAndCharacterization) => ({
      type: 'UPDATE_ELIGIBILITY_AND_CHARACTERIZATION',
      payload: updatedEligibilityAndCharacterization,
  });

  export const addEligibilityAndCharacterization = (newEligibilityAndCharacterization) => ({
      type: 'ADD_ELIGIBILITY_AND_CHARACTERIZATION',
      payload: newEligibilityAndCharacterization,
  });
  