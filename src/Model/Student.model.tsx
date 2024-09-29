import { ParentReport } from "./ParentReport.model";
import { TeacherReport } from "./TeacherReport.model";

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    tz: string;
    motherName: string;
    fatherName: string;
    fatherPhone: string;
    motherPhone: string;
    homePhone: string;
    address: string;
    institutionId: string;
    familyPosition: number;
    gradeLevel: string;
}