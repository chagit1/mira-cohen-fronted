import axios from 'axios';
import { User } from '../Model/User.model';

// axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
// const apiUrl = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = 'https://localhost:7201/api/'

export const getAllUsers = () => {
    const response =  axios.get(`${apiUrl}User`);
    console.log(response);
    
    return response;
  }
  


export const AddUser=(user:User)=>{
  console.log(user);
  return axios.post(`${apiUrl}User/Add`, user);  
}

export const  Login=( email:string, password:string )=>
{
    debugger
return axios.get(`${apiUrl}User/login/${(email)}/${(password)}`, {
  withCredentials: true // מאפשר שליחת עוגיות
});

}


