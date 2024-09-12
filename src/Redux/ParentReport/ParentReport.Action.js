export const SET_ALL_PARENT_REPORTS = 'SET_ALL_PARENT_REPORTS';

export const setAllParentReports = (ParentReports) => ({
  type: SET_ALL_PARENT_REPORTS,
  payload: ParentReports,
});

export const deleteParentReport = (ParentReportId) => ({
    type: 'DELETE_PARENT_REPORT',
    payload: ParentReportId,
  });

  export const updateParentReport = (updatedParentReport) => ({
      type: 'UPDATE_PARENT_REPORT',
      payload: updatedParentReport,
  });

  export const addParentReport = (newParentReport) => ({
      type: 'ADD_PARENT_REPORT',
      payload: newParentReport,
  });