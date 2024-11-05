import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react";
import { HelpHours } from "../../Model/HelpHours.model";
import { EligibilityAndCharacterization } from "../../Model/EligibilityAndCharacterization.model";
import { addEligibilityStudent } from "../../Api/EligibilityAndCharacterization.api";
import { addAdditionalHoursStudent } from "../../Api/HelpHours.api";
import { Student } from "../../Model/Student.model";
import { useSelector } from "react-redux";
import { User } from "../../Model/User.model";
import { useNavigate } from "react-router-dom";

export const AddStudent = () => {
    debugger
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
    const [formValues, setFormValues] = useState<Student>(
        {
            id: '',
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            tz: '',
            motherName: '',
            fatherName: '',
            fatherPhone: '',
            motherPhone: '',
            homePhone: '',
            address: '',
            institutionId: currentUser?.institutions!.id,
            familyPosition: 0,
            gradeLevel: ''
        }
    );
    const [studentType, setStudentType] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value!,
        });
    };

    const handleStudentTypeChange = (e: SelectChangeEvent<string>) => {
        const selectedType = e.target.value;
        setStudentType(selectedType);
        console.log(formValues);
        
    };
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formValues);

        if (studentType == 'שעות עזר') {
            const helpHours: HelpHours = {
                ...formValues,
                strengthAreas: '',
                areasForImprovement: '',
                academicAchievements: ''
            }
            console.log("ff",helpHours);
            debugger
            addAdditionalHoursStudent(helpHours)
                .then((x) => {
                    alert("success");
                    console.log(x.data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            const eligibility: EligibilityAndCharacterization = {
                ...formValues!,
                diagnosis: '',
                medicalDocuments: '',
                syncWithDiagnosis: false,
                managerSignature: false,
                teacherSignature: false,
                supervisorSignature: false,
                uploadedToShiluvit: false,
                parentReport: {},
                teacherReport: {},
            }
            console.log("gf",eligibility);
debugger
            addEligibilityStudent(eligibility)
                .then((x) => {
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
            <form onSubmit={handleFormSubmit}>
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
                    <InputLabel id="student-type-label">סוג תלמיד</InputLabel>
                    <Select
                        labelId="student-type-label"
                        id="student-type"
                        value={studentType}
                        onChange={handleStudentTypeChange}
                        fullWidth
                    >
                        <MenuItem value="זכאות ואפיון">זכאות ואפיון</MenuItem>
                        <MenuItem value="שעות עזר">שעות עזר</MenuItem>
                    </Select>
                    <ButtonBase className="btn-primary" type='submit' >
                        <span className="button__text">{'הוסף'}</span>
                        <span className="button__icon"></span>
                    </ButtonBase>
                </Box>
            </form>
        </div>
    </>
}