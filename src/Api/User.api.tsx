import axios from 'axios';
import { User } from '../Model/User.model';
import { log } from 'console';

const Url = 'https://mira-cohen-back-qv53.onrender.com/api/User/'
export const AddUser=(user:User)=>{
     debugger
     console.log(user);
  return axios.post(`${Url}Add`, user);  
}