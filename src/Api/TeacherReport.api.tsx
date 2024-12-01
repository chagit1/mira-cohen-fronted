import axios from 'axios';
import { TeacherReport } from '../Model/TeacherReport.model';
axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = process.env.REACT_APP_MIRA_COHEN;

export const addTeacherReport = (teacherReport: TeacherReport) => {
    debugger
    return axios.post(`${apiUrl}TeacherReport/Add`, teacherReport);
}
export const updateTeacherReport = (teacherReport: TeacherReport) => {
    debugger
    const x = axios.put(`${apiUrl}TeacherReport/Update`, teacherReport);
    return x;
}