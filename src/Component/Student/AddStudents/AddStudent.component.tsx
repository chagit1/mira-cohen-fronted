import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { HelpHours } from "../../../Model/HelpHours.model";
import { EligibilityAndCharacterization } from "../../../Model/EligibilityAndCharacterization.model";
import { addEligibilityStudent } from "../../../Api/EligibilityAndCharacterization.api";
import { addAdditionalHoursStudent } from "../../../Api/HelpHours.api";
import { Student } from "../../../Model/Student.model";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../Model/User.model";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { addStudent, setAllStudents } from "../../../Redux/Student/Student.Action";
import { FamilyStatus } from "../../../Model/TeacherReport.model";

export const AddStudent = ({ onActionComplete }: { onActionComplete: () => void }) => {
    debugger
    const dispatch = useDispatch();
    const allStudentState = useSelector((state: { student: { allStudent: { [key: string]: Student[] } } }) => state.student);
    const MySwal = withReactContent(Swal);
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
    const institutionId = sessionStorage.getItem('6728eb41c805ab07e544eb4b');
    const [isHelpHours, setIsHelpHours] = useState<boolean>(false)
    const [studentType, setStudentType] = useState<string>("");
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
            institutionId: '6728eb41c805ab07e544eb4b',
            familyPosition: 0,
            gradeLevel: ''

        }
    );
    const [helpHours, setHelpHours] = useState<HelpHours>(
        {
            ...formValues,
            strengthAreas: '',
            areasForImprovement: '',
            academicAchievements: ''
        })
    const [eligibility, setEligibility] = useState<EligibilityAndCharacterization>(
        {
            ...formValues,
            diagnosis: '',
            medicalDocuments: '',
            syncWithDiagnosis: false,
            managerSignature: false,
            teacherSignature: false,
            supervisorSignature: false,
            uploadedToShiluvit: false,
            parentReport:{
                parentReportId: "",
                studentId: "",
                strengthArea: "",
                birthProcessAndEarlyDevelopment: "",
                weaning: "",
                preSchoolEducation: "",
                ParamedicalSupport: "",
                PreSchoolDifficulties: "",
                elementaryEducation: "",
                readingAndWritingDevelopment: "",
                understandingInstructions: "",
                elementarySchoolDifficulties: "",
                academicDifficulties: "",
                socialAndEmotionalDifficulties: "",
                wasWithoutFramework: false,
                currentAcademicStatus: "",
                currentReadingGap: "",
                currentWritingGap: "",
                currentMotivationGap: "",
                currentSocialGap: "",
                currentEmotionalGap: "",
                currentCulturalAndLeisureGap: ""
            },
            teacherReport: {
                id: "",
                studentId: "",
                readingAndWritingSkills: "",
                academicGap: "",
                understandingOfTheMaterial: "",
                memory: "",
                generalKnowledge: "",
                motivation: "",
                vocabulary: "",
                academicAchievements: "",
                socialAndEmotionalConduct: "",
                familyStatus: FamilyStatus.Married
            },
        })

    useEffect(() => {
        setIsHelpHours(false)
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value!
        })
        setEligibility({
            ...eligibility,
            [name]: value!
        })
        setHelpHours({
            ...helpHours,
            [name]: value!
        })
    };

    const handleStudentTypeChange = (e: SelectChangeEvent<string>) => {
        if (e.target.value == "שעות עזר") {
            setIsHelpHours(true)
        }
        else
            setIsHelpHours(false)
        const selectedType = e.target.value;
        setStudentType(selectedType);
        console.log(formValues);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (studentType == 'שעות עזר') {
            addAdditionalHoursStudent(helpHours!)
                .then((x) => {
                    dispatch(setAllStudents(x.data))
                    if (onActionComplete) {
                        onActionComplete();
                    }
                    MySwal.fire({
                        title: 'success',
                        text: 'התלמיד נוסף בהצלחה',
                        icon: 'success',
                        confirmButtonText: 'אישור',
                        customClass: {
                            confirmButton: 'my-confirm-button'
                        }
                    });
                })
                .catch(err => {
                    Swal.fire('Error', 'שגיאה בהוספת התלמיד', 'error');
                });
        }
        else {
            setIsHelpHours(false)
            debugger
            addEligibilityStudent(eligibility)
                .then((x) => {
                    dispatch(addStudent(x.data))
                    MySwal.fire({
                        title: 'success',
                        text: 'התלמיד נוסף בהצלחה',
                        icon: 'success',
                        confirmButtonText: 'אישור',
                        customClass: {
                            confirmButton: 'my-confirm-button'
                        }
                    });
                })
                .catch(err => {
                    Swal.fire('Error', 'שגיאה בהוספת התלמיד', 'error');
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
                        <MenuItem value="זכאות ואפיון" >זכאות ואפיון</MenuItem>
                        <MenuItem value="שעות עזר">שעות עזר</MenuItem>
                    </Select>
                    {isHelpHours == true ? (
                        <>
                            <TextField
                                margin="dense"
                                name="strengthAreas"
                                label="חוזקות"
                                type="text"
                                fullWidth
                                value={helpHours?.strengthAreas || ''}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="areasForImprovement"
                                label="מוקדים לחיזוק "
                                type="text"
                                fullWidth
                                value={helpHours?.areasForImprovement || ''}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="academicAchievements"
                                label="הישגים לימודיים "
                                type="text"
                                fullWidth
                                value={helpHours?.academicAchievements || ''}
                                onChange={handleChange}
                            />
                        </>
                    ) : <></>
                    }
                    <ButtonBase className="btn-primary" type='submit' >
                        <span className="button__text">{'הוסף'}</span>
                        <span className="button__icon"></span>
                    </ButtonBase>
                </Box>
            </form>
        </div>
    </>
}