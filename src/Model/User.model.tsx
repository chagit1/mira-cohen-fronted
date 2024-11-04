import { Institution } from "./Institution.model";

export interface User {
    id: string;
    name: string;
    email: string;       
    password: string;    
    role?: UserRole; 
    institutions?: Institution; 

}

export enum UserRole {
    Manager ,Client 
}
  export interface UserState {
    allUser: User[];
    currentUser: User | null; // נוכל לאפשר currentUser להיות null אם אין משתמש מחובר
  }
  
  export interface RootState {
    user: UserState;
    // הוסף כאן את שאר הקטגוריות של ה-state שלך
  }
  