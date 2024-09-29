
import { ParentReport } from "./ParentReport.model";
import { Student } from "./Student.model";
import { TeacherReport } from "./TeacherReport.model";

export interface EligibilityAndCharacterization extends Student{  

    diagnosis: string;
    medicalDocuments: string;
    syncWithDiagnosis: boolean;
    managerSignature: boolean;
    teacherSignature: boolean;
    supervisorSignature: boolean;
    uploadedToShiluvit: boolean;
    parentReport: ParentReport;
    teacherReport: TeacherReport; 
  
}
