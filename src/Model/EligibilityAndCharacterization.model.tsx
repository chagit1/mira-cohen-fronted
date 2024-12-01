
import { ParentReport } from "./ParentReport.model";
import { Student } from "./Student.model";
import { TeacherReport } from "./TeacherReport.model";

// export interface EligibilityAndCharacterization extends Student{  

//     diagnosis: string;
//     medicalDocuments: string;
//     syncWithDiagnosis: boolean;
//     managerSignature: boolean;
//     teacherSignature: boolean;
//     supervisorSignature: boolean;
//     uploadedToShiluvit: boolean;
//     parentReport: ParentReport;
//     teacherReport: TeacherReport; 
// }



export class EligibilityAndCharacterization extends Student {
    diagnosis: string;
    medicalDocuments: string;
    syncWithDiagnosis: boolean;
    managerSignature: boolean;
    teacherSignature: boolean;
    supervisorSignature: boolean;
    uploadedToShiluvit: boolean;
    parentReport : ParentReport;
    teacherReport : TeacherReport;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        birthDate: Date,
        tz: string,
        motherName: string,
        fatherName: string,
        fatherPhone: string,
        motherPhone: string,
        homePhone: string,
        address: string,
        institutionId: string,
        familyPosition: number,
        gradeLevel: string,
        diagnosis: string,
        medicalDocuments: string,
        syncWithDiagnosis: boolean,
        managerSignature: boolean,
        teacherSignature: boolean,
        supervisorSignature: boolean,
        uploadedToShiluvit: boolean,
        parentReport: ParentReport,
        teacherReport: TeacherReport
    ) {
        super(id, firstName, lastName, birthDate, tz, motherName, fatherName, fatherPhone, motherPhone, homePhone, address, institutionId, familyPosition, gradeLevel);
        this.diagnosis = diagnosis;
        this.medicalDocuments = medicalDocuments;
        this.syncWithDiagnosis = syncWithDiagnosis;
        this.managerSignature = managerSignature;
        this.teacherSignature = teacherSignature;
        this.supervisorSignature = supervisorSignature;
        this.uploadedToShiluvit = uploadedToShiluvit;
        this.parentReport = parentReport;
        this.teacherReport = teacherReport;
    }
}
