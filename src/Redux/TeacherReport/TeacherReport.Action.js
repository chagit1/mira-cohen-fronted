export const SET_ALL_TEACHER_REPORTS = 'SET_ALL_TEACHER_REPORTS';

export const setAllTeacherReports = (teacherReports) => ({
  type: SET_ALL_TEACHER_REPORTS,
  payload: teacherReports,
});

export const deleteTeacherReport = (teacherReportId) => ({
    type: 'DELETE_TEACHER_REPORT',
    payload: teacherReportId,
  });

  export const updateTeacherReport = (updatedTeacherReport) => ({
      type: 'UPDATE_TEACHER_REPORT',
      payload: updatedTeacherReport,
  });

  export const addTeacherReport = (newTeacherReport) => ({
      type: 'ADD_TEACHER_REPORT',
      payload: newTeacherReport,
  });
  