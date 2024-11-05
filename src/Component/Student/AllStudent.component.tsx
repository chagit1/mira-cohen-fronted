import Swal from "sweetalert2";
import ReactDOM from 'react-dom';
import { AddStudent } from "./AddStudent.component";
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddIcCallOutlined, Edit, EditNotifications, EditOutlined, PlusOneOutlined } from "@mui/icons-material";
import { getAllHelpHoutsStudent, getAllStudent } from "../../Api/HelpHours.api";
import { error } from "console";
import { Student } from "../../Model/Student.model";
import { HelpHours } from "../../Model/HelpHours.model";
import { EligibilityAndCharacterization } from "../../Model/EligibilityAndCharacterization.model";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../Redux/Store";
import { useNavigate } from "react-router-dom";
import { User } from "../../Model/User.model";
import { setAllStudents } from "../../Redux/Student/Student.Action";


export const AllStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
    const allStudentState = useSelector((state: { student: { allStudent: { [key: string]: Student[] } } }) => state.student);

    const [openDetails, setOpenDetails] = useState<{ [id: string]: boolean }>({});
    const [students, setStudents] = useState<Student[]>([]);

    const handleToggleDetails = (id: string) => {
        setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        debugger
            if (allStudentState == undefined) {
                getAllStudent()
                    .then((x) => {
                        const data = x.data;
                        const studentsArray = data.$values ? data.$values : []; // קבלת מערך התלמידים מתוך `$values`

                        dispatch(setAllStudents(studentsArray));
                        setStudents(studentsArray);
                    })
                    .catch((err) => {
                        console.error("Error fetching students:", err);
                        setStudents([]); // אתחול לרשימה ריקה במקרה של שגיאה
                    });
        }        
    }, []);

const handleAddStudent = () => {
    debugger
    Swal.fire({
        title: 'הוספת תלמיד',
        html: '<div id="add-student"></div>',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        didOpen: () => {
            const container = document.getElementById('add-student');
            if (container) {
                ReactDOM.render(
                    <Provider store={store}>
                        <AddStudent></AddStudent>,
                        {/* // <ProviderWrapper userId={userId} />, */}
                    </Provider>,
                    container
                );
            }
        }
    })
}

return <>
    <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>                
                    <TableRow>
                        <TableCell align="right">פעולות</TableCell>
                        <TableCell align="right">סוג תלמיד</TableCell>
                        <TableCell align="right">תאריך לידה</TableCell>
                        <TableCell align="right">תעודת זהות</TableCell>
                        <TableCell align="right">שם פרטי</TableCell>
                        <TableCell align="right">שם משפחה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <React.Fragment key={student.id}>
                            <TableRow>
                                <TableCell align="right">
                                    <IconButton color="primary" aria-label="ערוך תלמיד">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="הצג פרטים" onClick={() => handleToggleDetails(student.id)}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">{student instanceof HelpHours ? 'שעות עזר' : 'זכאות ואפיון'}</TableCell>
                                <TableCell align="right">{new Date(student.birthDate).toLocaleDateString()}</TableCell>
                                <TableCell align="right">{student.tz}</TableCell>
                                <TableCell align="right">{student.firstName}</TableCell>
                                <TableCell align="right">{student.lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={openDetails[student.id]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Typography variant="h6" gutterBottom>
                                                פרטים מלאים
                                            </Typography>
                                            <Typography>שם האם: {student.fatherName}</Typography>
                                            <Typography>שם האב: {student.fatherName}</Typography>
                                            <Typography>טלפון האב: {student.fatherPhone}</Typography>
                                            <Typography>טלפון האם: {student.motherPhone}</Typography>
                                            <Typography>טלפון בית: {student.homePhone}</Typography>
                                            <Typography>כתובת: {student.address}</Typography>
                                            {/* הוספת פרטים נוספים לפי סוג התלמיד */}
                                            {student instanceof HelpHours ? (
                                                <>
                                                    <Typography>חוזקות: {student.strengthAreas}</Typography>
                                                    <Typography>תחומים לשיפור: {student.areasForImprovement}</Typography>
                                                    <Typography>הישגים אקדמיים: {student.academicAchievements}</Typography>
                                                </>
                                            ) : student instanceof EligibilityAndCharacterization ? (
                                                <>
                                                    <Typography>אבחון: {student.diagnosis}</Typography>
                                                    <Typography>מסמכים רפואיים: {student.medicalDocuments}</Typography>
                                                    <Typography>סנכרון עם אבחון: {student.syncWithDiagnosis ? 'כן' : 'לא'}</Typography>
                                                    <Typography>חתימת מנהל: {student.managerSignature ? 'כן' : 'לא'}</Typography>
                                                </>
                                            ) : null}
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <button className="add-Student-button" onClick={handleAddStudent}>
            +
            <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>הוספת תלמיד</span>
        </button>
    </>
</>
    } 