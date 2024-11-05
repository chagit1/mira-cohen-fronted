export const SET_ALL_STUDENT = 'SET_ALL_STUDENT';

export const setAllStudents = (students) => ({
  type: SET_ALL_STUDENT,
  payload: students,
});

export const deleteStudent = (studentId) => ({
    type: 'DELETE_STUDENT',
    payload: studentId,
  });

  export const updateStudent = (updatedStudent) => ({
      type: 'UPDATE_STUDENT',
      payload: updatedStudent,
  });

  export const addStudent = (newStudent) => ({
      type: 'ADD_STUDENT',
      payload: newStudent,
  });