import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { HelpHours } from "../../Model/HelpHours.model";
import { EligibilityAndCharacterization } from "../../Model/EligibilityAndCharacterization.model";
import { updateAdditionalHoursStudent } from "../../Api/HelpHours.api";
import { updateEligibilityAndCharacterization } from "../../Redux/EligibilityAndCharacterization/EligibilityAndCharacterization.Action";
import { updateHelpHours } from "../../Redux/HelpHours/HelpHours.Action";
import { updateEligibilityStudent } from "../../Api/EligibilityAndCharacterization.api";
import { Student } from "../../Model/Student.model";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../Model/User.model";

export const UpdateStudent = (Student:any) => {
    debugger
    const dispatch = useDispatch();

    console.log(Student.student)
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
    const [formValues, setFormValues] = useState<Student>(
        {
            id: Student.student.id,
            firstName: Student.student.firstName,
            lastName: Student.student.lastName,
            birthDate: Student.student.birthDate,
            tz: Student.student.tz,
            motherName: Student.student.motherName,
            fatherName:Student.student.fatherName,
            fatherPhone: Student.student.fatherPhone,
            motherPhone: Student.student.motherPhone,
            homePhone: Student.student.homePhone,
            address: Student.student.address,
            institutionId: currentUser?.institutions!.id,
            familyPosition: Student.student.familyPosition,
            gradeLevel: Student.student.gradeLevel,
             
        }
    );
    const [helpHours, sethelpHours] = useState<HelpHours>(

  {
        ...formValues,
        strengthAreas: Student.student.strengthAreas,
        areasForImprovement: Student.student.areasForImprovement,
        academicAchievements: Student.student.academicAchievements
       
    })
    const [eligibility, setEligibility] = useState<EligibilityAndCharacterization>(

     {
        ...formValues!,
        diagnosis:Student.student.diagnosis,
        medicalDocuments: Student.student.medicalDocuments,
        syncWithDiagnosis: Student.student.syncWithDiagnosis,
        managerSignature: Student.student.managerSignature,
        teacherSignature: Student.student.teacherSignature,
        supervisorSignature: Student.student.supervisorSignature,
        uploadedToShiluvit: Student.student.uploadedToShiluvit,
        parentReport: Student.student.parentReport,
        teacherReport:Student.student.teacherReport,
    })
    console.log( "wert",helpHours);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        const name = event.target.name; // מקבלים את שם השדה ואת הקובץ שהועלה
        if (file) {
            console.log('נבחר קובץ:', file.name);  // בדוק אם הקובץ נמצא
            setEligibility({
                ...eligibility,
                [name]: file!,
            });
            // setDiagnosisFile(file);  // שמירה על הקובץ
        } else {
            console.log('לא נבחר קובץ');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value!,
        });
        setEligibility({
            ...eligibility,
            [name]: value!,
        });
        sethelpHours({
            ...helpHours,
            [name]: value!,
        });
    };

   
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        debugger
        console.log(formValues);

        if (Student.student.strengthAreas ) {
           
            console.log("ff",formValues);
            debugger
            updateAdditionalHoursStudent(helpHours)
                .then((x) => {
                    dispatch(updateHelpHours(x.data))

                    alert("success");
                    console.log(x.data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
           
            console.log("gf",eligibility);
debugger

updateEligibilityStudent(eligibility)

                .then((x) => {
                    dispatch(updateEligibilityAndCharacterization(x.data))

                    alert("success");
                    console.log(x.data)
                })
                .catch(err => {
                    console.log(err);
                });
        }

    };
    return <>
        <div>
      {Student.student.strengthAreas ?    <form onSubmit={handleFormSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        margin="dense"
                        name="firstName"
                        label="שם פרטי"
                        type="text"
                        fullWidth
                        value={formValues?.firstName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="lastName"
                        label="שם משפחה"
                        type="text"
                        fullWidth
                        value={formValues?.lastName || ''
                        }
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="birthDate"
                        label="תאריך לידה"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formValues?.birthDate}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="tz"
                        label="תעודת זהות"
                        type="text"
                        fullWidth
                        value={formValues?.tz || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="fatherName"
                        label="שם האב"
                        type="text"
                        fullWidth
                        value={formValues?.fatherName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="motherName"
                        label="שם האם"
                        type="text"
                        fullWidth
                        value={formValues?.motherName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="fatherPhone"
                        label="טלפון האב"
                        type="text"
                        fullWidth
                        value={formValues?.fatherPhone || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="motherPhone"
                        label="טלפון האם"
                        type="text"
                        fullWidth
                        value={formValues?.motherPhone || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="homePhone"
                        label="טלפון בבית"
                        type="text"
                        fullWidth
                        value={formValues?.homePhone || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="כתובת"
                        type="text"
                        fullWidth
                        value={formValues?.address || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="familyPosition"
                        label="עמדה משפחתית"
                        type="number"
                        fullWidth
                        value={formValues?.familyPosition || 0}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="gradeLevel"
                        label="רמת כיתה"
                        type="text"
                        fullWidth
                        value={formValues?.gradeLevel || ''}
                        onChange={handleChange}
                    />
                       <TextField
                    margin="dense"
                    name="academicAchievements"
                    label="הישג לימודי"
                    type="text"
                    fullWidth
                    value={helpHours?.academicAchievements || ''}
                    onChange={handleChange}
                />
                  <TextField
                    margin="dense"
                    name="areasForImprovement"
                    label="תחומי שיפור"
                    type="text"
                    fullWidth
                    value={helpHours?.areasForImprovement || ''}
                    onChange={handleChange}
                />
                 
                  <TextField
                    margin="dense"
                    name="strengthAreas"
                    label="תחומי חוזק"
                    type="text"
                    fullWidth
                    value={helpHours?.strengthAreas || ''}
                    onChange={handleChange}
                />

                    <ButtonBase className="btn-primary" type='submit' >
                        <span className="button__text">{'עדכן'}</span>
                        <span className="button__icon"></span>
                    </ButtonBase>
                </Box>
            </form>: <form onSubmit={handleFormSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        margin="dense"
                        name="firstName"
                        label="שם פרטי"
                        type="text"
                        fullWidth
                        value={formValues?.firstName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="lastName"
                        label="שם משפחה"
                        type="text"
                        fullWidth
                        value={formValues?.lastName || ''
                        }
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="birthDate"
                        label="תאריך לידה"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formValues?.birthDate}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="tz"
                        label="תעודת זהות"
                        type="text"
                        fullWidth
                        value={formValues?.tz || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="fatherName"
                        label="שם האב"
                        type="text"
                        fullWidth
                        value={formValues?.fatherName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="motherName"
                        label="שם האם"
                        type="text"
                        fullWidth
                        value={formValues?.motherName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="fatherPhone"
                        label="טלפון האב"
                        type="text"
                        fullWidth
                        value={formValues?.fatherPhone || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="motherPhone"
                        label="טלפון האם"
                        type="text"
                        fullWidth
                        value={formValues?.motherPhone || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="homePhone"
                        label="טלפון בבית"
                        type="text"
                        fullWidth
                        value={formValues?.homePhone || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="כתובת"
                        type="text"
                        fullWidth
                        value={formValues?.address || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="familyPosition"
                        label="עמדה משפחתית"
                        type="number"
                        fullWidth
                        value={formValues?.familyPosition || 0}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="gradeLevel"
                        label="רמת כיתה"
                        type="text"
                        fullWidth
                        value={formValues?.gradeLevel || ''}
                        onChange={handleChange}
                    />
               <TextField
                        margin="dense"
                        name="diagnosis"
                        label="Upload Diagnosis (PDF, image, etc.)"
                        type="file"
                        fullWidth
                        onChange={handleFileChange} // כאן אנחנו קוצרים את הקובץ
                    />  
                       <TextField
                        margin="dense"
                        name="medicalDocuments"
                        label="Upload medicalDocuments (PDF, image, etc.)"
                        type="file"
                        fullWidth
                        onChange={handleFileChange}
                    />
                 syncWithDiagnosis
                      <input
                        name="syncWithDiagnosis"
                        type="checkbox"
                        checked={eligibility.syncWithDiagnosis}
                        onChange={handleChange}
                    />
                   managerSignature  <input
                        name="managerSignature"
                        type="checkbox"
                        checked={eligibility.managerSignature}
                        onChange={handleChange}
                    />
teacherSignature<input
                        name="teacherSignature"
                        type="checkbox"
                        checked={eligibility.teacherSignature}
                        onChange={handleChange}
                    />
                    supervisorSignature  <input
                        name="supervisorSignature"
                        type="checkbox"
                        checked={eligibility.supervisorSignature}
                    />
                    uploadedToShiluvit  <input
                        name="uploadedToShiluvit"
                        type="checkbox"
                        checked={eligibility.uploadedToShiluvit}
                        onChange={handleChange}
                    />
                     
                        <ButtonBase className="btn-primary" type='submit' >
                        <span className="button__text">{'עדכן'}</span>
                        <span className="button__icon"></span>
                    </ButtonBase>
                </Box>
            </form>}
        </div>
    </>
}