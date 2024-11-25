import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
// const apiUrl = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = 'https://localhost:7201/api/';
export const getAllStudent = () => {
    const response =  axios.get(`${apiUrl}`);
    console.log(response);
    
    return response;
  }
  export const deleteStudentApi = (id: string) => {
    const response =  axios.delete(`${apiUrl}HelpHours/DeleteStudent/${id}`);
    console.log(response);
    
    return response;
  }
  