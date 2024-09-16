import { Institution } from "./Institution.model";
export interface User {
    id: string;
    name: string;
    email: string;       
    password: string;    
    role?: UserRole;     
    // institutions?: string;  
}

export enum UserRole {
    Manager = 'Manager',
    Client = 'Client'

}

