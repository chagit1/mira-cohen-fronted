import { Student } from "./Student.model";
import { User } from "./User.model";

export interface Institution {

    id: string;
    UserId?: string;  
    institutionName?: string; 
    symbol?: string; 
    managerName?: string;  
    contactPerson?: string; 
    contactPhone?: string;  
    contactEmail?: string; 
    inspectorName?: string; 
    students?: Student[]; 

}