import axios from 'axios';
import { User } from '../Model/User.model';

axios.defaults.baseURL = process.env.APP_MIRA_COHEN;
const apiUrl = process.env.APP_MIRA_COHEN;

export const getAllUsers = () => {
    const response =  axios.get(`${apiUrl}User`);
    console.log(response);
    
    return response;
  }
  


export const AddUser=(user:User)=>{
  return axios.post(`${apiUrl}Add`, user);  
}
