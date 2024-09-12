export const SET_ALL_INSTITUTION = 'SET_ALL_INSTITUTION';

export const setAllInstitutions = (Institutions) => ({
  type: SET_ALL_INSTITUTION,
  payload: Institutions,
});

export const deleteInstitution = (InstitutionId) => ({
    type: 'DELETE_INSTITUTION',
    payload: InstitutionId,
  });

  export const updateInstitution = (updatedInstitution) => ({
      type: 'UPDATE_INSTITUTION',
      payload: updatedInstitution,
  });

  export const addInstitution = (newInstitution) => ({
      type: 'ADD_INSTITUTION',
      payload: newInstitution,
  });