import axios from 'axios';
import { HelpHours } from '../Model/HelpHours.model';
axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = process.env.REACT_APP_MIRA_COHEN;

export const addAdditionalHoursStudent   =  (student: HelpHours) => {
    try {
      const studentToConvert = {
        ...student!,
        birthDate: new Date(student!.birthDate!).toISOString()
      }
      const response =  axios.post(`${apiUrl}HelpHours/Add`, studentToConvert);
      return response; 
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };

  export const getAllHelpHoutsStudent = () => {
    const response =  axios.get(`${apiUrl}HelpHours`);
    console.log(response);
    
    return response;
  }

  export const getAllStudent = () => {
    const response =  axios.get(`${apiUrl}HelpHours/GetAllStudent`);
    console.log(response);
    
    return response;
  }

  export const updateAdditionalHoursStudent   =  (student: HelpHours) => {
    try {
      const studentToConvert = {
        ...student!,
        birthDate: new Date(student!.birthDate!).toISOString()
      }
      debugger
      const response =  axios.put(`${apiUrl}HelpHours/Update`, studentToConvert);
      console.log("r",response);
      
      return response; 
    } catch (error) {
      console.error('Error update student:', error);
      throw error;
    }
  };