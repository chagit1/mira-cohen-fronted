import axios from 'axios';
import { ParentReport } from '../Model/ParentReport.model';

axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = process.env.REACT_APP_MIRA_COHEN;

export const addParentReport = (parentReport: ParentReport) => {
    debugger
    return axios.post(`${apiUrl}ParentReport/Add`, parentReport);
}
export const updateParentReport = (parentReport: ParentReport) => {
    debugger
    const x = axios.put(`${apiUrl}ParentReport/Update`, parentReport);
    return x;
}
