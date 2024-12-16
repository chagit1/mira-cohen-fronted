import { ParentReport } from "./ParentReport.model";
import { TeacherReport } from "./TeacherReport.model";

// export class Student {
//     constructor(
//     id: string,
//     firstName: string,
//     lastName: string,
//     birthDate: Date,
//     tz: string,
//     motherName: string,
//     fatherName: string,
//     fatherPhone: string,
//     motherPhone: string,
//     homePhone: string,
//     address: string,
//     institutionId: string,
//     familyPosition: number,
//     gradeLevel: string,
//     ){}
// }



export interface Student {
    id: string;
    firstName ?: string;
    lastName?: string;
    birthDate?: Date;
    tz?: string;
    motherName?: string;
    fatherName?: string;
    fatherPhone?: string;
    motherPhone?: string;
    homePhone?: string;
    address?: string;
    institutionId?: string;
    familyPosition?: number;
    gradeLevel?: string;
}
    // constructor(
    //     id: string,
    //     firstName: string,
    //     lastName: string,
    //     birthDate: Date,
    //     tz: string,
    //     motherName: string,
    //     fatherName: string,
    //     fatherPhone: string,
    //     motherPhone: string,
    //     homePhone: string,
    //     address: string,
    //     institutionId: string,
    //     familyPosition: number,
    //     gradeLevel: string
    // ) {
    //     this.id = id;
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.birthDate = birthDate;
    //     this.tz = tz;
    //     this.motherName = motherName;
    //     this.fatherName = fatherName;
    //     this.fatherPhone = fatherPhone;
    //     this.motherPhone = motherPhone;
    //     this.homePhone = homePhone;
    //     this.address = address;
    //     this.institutionId = institutionId;
    //     this.familyPosition = familyPosition;
    //     this.gradeLevel = gradeLevel;
    // }
// }
