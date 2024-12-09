import axios from 'axios';
import { EligibilityAndCharacterization } from '../Model/EligibilityAndCharacterization.model';
axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = process.env.REACT_APP_MIRA_COHEN;

export const addEligibilityStudent = (student: EligibilityAndCharacterization) => {
        const newStudent = {
            ...student,
            birthDate: new Date(student.birthDate).toISOString(),
            familyPosition: Number(student.familyPosition)
    }
    return axios.post(`${apiUrl}EligibilityAndCharacterization/Add`, student);

}

export const updateEligibilityStudent = (student: EligibilityAndCharacterization) => {
  
    try {
      const studentToConvert = {
        ...student!,
        // birthDate: new Date(student!.birthDate!).toISOString()
      }
      debugger
      console.log(student)
      const response =  axios.put(`https://localhost:7201/api/EligibilityAndCharacterization/Update`,student, {
        headers: {
            'Content-Type': 'multipart/form-data', // חשוב להגדיר את זה כ-multipart/form-data
        },
    })
      console.log("r",response);
     
      return response; 
    } catch (error) {
      console.error('Error update student:', error);
      throw error;
    }
}
