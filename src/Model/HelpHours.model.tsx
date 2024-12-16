import { Student } from "./Student.model";

export interface HelpHours extends Student {
    strengthAreas?: string,
    areasForImprovement?: string,
    academicAchievements?: string
    
    
}


// export class HelpHours extends Student {
//     strengthAreas: string;
//     areasForImprovement: string;
//     academicAchievements: string;

//     constructor(
//         id: string,
//         firstName: string,
//         lastName: string,
//         birthDate: Date,
//         tz: string,
//         motherName: string,
//         fatherName: string,
//         fatherPhone: string,
//         motherPhone: string,
//         homePhone: string,
//         address: string,
//         institutionId: string,
//         familyPosition: number,
//         gradeLevel: string,
//         strengthAreas: string,
//         areasForImprovement: string,
//         academicAchievements: string
//     ) {
//         super(id, firstName, lastName, birthDate, tz, motherName, fatherName, fatherPhone, motherPhone, homePhone, address, institutionId, familyPosition, gradeLevel);
//         this.strengthAreas = strengthAreas;
//         this.areasForImprovement = areasForImprovement;
//         this.academicAchievements = academicAchievements;
//     }
// }
