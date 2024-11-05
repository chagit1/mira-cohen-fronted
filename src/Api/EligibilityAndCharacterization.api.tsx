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