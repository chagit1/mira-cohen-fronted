import axios from 'axios';
import { HelpHours } from '../Model/HelpHours.model';
import moment, { now } from 'moment';
axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = process.env.REACT_APP_MIRA_COHEN;
// const apiUrl = 'https://localhost:7201/api/';

export const addAdditionalHoursStudent = (student: HelpHours) => {
  try {
    const studentToConvert = {
      ...student!,
      birthDate: new Date(student.birthDate!).toISOString()
    }
    const response = axios.post(`${apiUrl}HelpHours/Add`, studentToConvert);
    return response;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const addMultiHelpHoutsStudent = (student: HelpHours[]) => {
  const specialStudents = student.map((s) => ({
    ...s,
    birthDate: s.birthDate?.toISOString()
  }
  ));
  const response = axios.post(`${apiUrl}HelpHours/AddMulti`, specialStudents);
  return response;
};

export const getAllHelpHoutsStudent = () => {
  const response = axios.get(`${apiUrl}HelpHours`);
  console.log(response);

  return response;
}

export const updateAdditionalHoursStudent = (student: HelpHours) => {
  try {
    const studentToConvert = {
      ...student!,
      birthDate: new Date(student.birthDate!).toISOString()
    }
    debugger
    const response = axios.put(`${apiUrl}HelpHours/Update`, studentToConvert);
    console.log("r", response);

    return response;
  } catch (error) {
    console.error('Error update student:', error);
    throw error;
  }
};