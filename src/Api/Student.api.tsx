import axios from 'axios';
axios.defaults.baseURL = process.env.APP_MIRA_COHEN;
const apiUrl = process.env.APP_MIRA_COHEN;

export const getAllStudent = () => {
    const response =  axios.get(`${apiUrl}`);
    console.log(response);
    
    return response;
  }
  