import Swal from "sweetalert2";
import ReactDOM from 'react-dom';
import { AddStudent } from "./AddStudents/AddStudent.component";
import { Box, Button, Checkbox, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AddIcCallOutlined, AutoDeleteOutlined, ChevronLeft, ChevronRight, DeleteForeverRounded, DeleteOutline, DeleteOutlineRounded, DeleteSharp, DeleteSweep, DisplaySettings, Edit, EditNotifications, EditOutlined, ExpandMore, PlusOneOutlined, Remove } from "@mui/icons-material";
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
import { addStudent, deleteStudent, setAllStudents } from "../../Redux/Student/Student.Action";
import DeleteIcon from '@mui/icons-material/Delete'; // אייקון פח
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { deleteStudentApi } from "../../Api/Student.api";
import StudentDetails from "./StudentDetails.component";
import ExportAllStudentToExcel from "./ExportToExcel/ExportAllStudentToExcel.component";
import { UpdateStudent } from "./UpdateStudent.component";

export const AllStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
    const allStudentState = useSelector((state: { student: { allStudent: { [key: string]: Student[] } } }) => state.student);
    const [isMultiSelectActive, setIsMultiSelectActive] = useState(false); // משתנה למעקב אחרי מצב בחירה מרובה
    const [openDetails, setOpenDetails] = useState<{ [id: string]: boolean }>({});
    const [students, setStudents] = useState<Student[]>([]);
    const [shouldReload, setShouldReload] = useState(false);
    const detailsRef = useRef<HTMLDivElement | null>(null);
    const [currentPage, setCurrentPage] = useState(0); // עמוד נוכחי
    const studentsPerPage = 5;
    const [selectedStudents, setSelectedStudents] = useState<{ [id: string]: boolean }>({});
    const [selectAll, setSelectAll] = useState(false);  // משתנה למעקב אחרי אם כל התלמידים נבחרים


    const toggleDetails = (id: string) => {
        setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
            setOpenDetails({});
        }
    };

    useEffect(() => {
        if (allStudentState == undefined) {
            getAllStudent()
                .then((x) => {
                    const data = x.data;
                    const studentsArray = data.$values ? data.$values : [];

                    dispatch(setAllStudents(studentsArray));
                    setStudents(studentsArray);
                })
                .catch((err) => {
                    console.error("Error fetching students:", err);
                    setStudents([]);
                });
        }
        else
            setStudents(Object.values(allStudentState.allStudent).flat());
        setShouldReload(false);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [students]);


    const handleAddStudent = () => {
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
                            <AddStudent
                            ></AddStudent>
                            {/* // <ProviderWrapper userId={userId} />, */}
                        </Provider>,
                        container
                    );
                }
            },
            didClose: () => {
                setShouldReload(true)
            }
        })
    }

    const handleDeleteStudent = (id: string) => {
        Swal.fire({
            title: 'האם אתה בטוח שברצונך למחוק את התלמיד?',
            text: "הפעולה לא ניתנת לשחזור!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'כן, מחק!',
            cancelButtonText: 'לא, ביטול'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteStudentApi(id)
                        .then((x) => {
                            Swal.fire({
                                title: 'success',
                                text: 'התלמיד נמחק בהצלחה',
                                icon: 'success',
                                confirmButtonText: 'אישור',
                                customClass: {
                                    confirmButton: 'my-confirm-button'
                                }
                            });
                            dispatch(deleteStudent(id))
                        })
                        .catch((err) => {
                            Swal.fire('Error', 'שגיאה במחיקת התלמיד', 'error');
                        });
                }
            })
            .catch((err) => {
                Swal.fire('Error', 'שגיאה במחיקת התלמיד', 'error');
            });
    };

    const handleUpdateStudent = (student:Student) => {
        debugger
        Swal.fire({
            title: 'עדכון תלמיד',
            html: '<div id="add-student"></div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {
                const container = document.getElementById('add-student');
                if (container) {
                    ReactDOM.render(
                        <Provider store={store}>
                            <UpdateStudent student={student}></UpdateStudent>,
                            {/* // <ProviderWrapper userId={userId} />, */}
                        </Provider>,
                        container
                    );
                }
            }
        })
    }
    const getStudentType = (student: any): string => {
        return "strengthAreas" in student ? 'שעות עזר' : 'זכאות ואפיון';
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        setSelectedStudents(
            students.reduce((acc, student) => {
                acc[student.id] = checked;
                return acc;
            }, {} as { [id: string]: boolean })
        );
    };

    const toggleMultiSelect = () => {
        setIsMultiSelectActive(!isMultiSelectActive);
        if (isMultiSelectActive) {
            setSelectAll(false);
            setSelectedStudents({});
        }
    };

    const handleToggleStudent = (id: string) => {
        setSelectedStudents((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const currentStudents = students.slice(
        currentPage * studentsPerPage,
        (currentPage + 1) * studentsPerPage
    );

    const handleNextPage = () => {
        if ((currentPage + 1) * studentsPerPage < students.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };


    return <>
        <>
            <Box sx={{ padding: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color={isMultiSelectActive ? "secondary" : "primary"}
                        onClick={toggleMultiSelect}
                    >
                        {isMultiSelectActive ? "בטל" : "בחירה מרובה"}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddStudent}
                        sx={{ borderRadius: "20px" }}
                    >
                        הוספת תלמיד
                    </Button>
                    <ExportAllStudentToExcel></ExportAllStudentToExcel>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableRow>
                                <TableCell align="right">פעולות</TableCell>
                                <TableCell align="right">סוג תלמיד</TableCell>
                                <TableCell align="right">תאריך לידה</TableCell>
                                <TableCell align="right">תעודת זהות</TableCell>
                                <TableCell align="right">שם פרטי</TableCell>
                                <TableCell align="right">שם משפחה</TableCell>
                                {isMultiSelectActive && (
                                    <TableCell align="center">
                                        <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentStudents.map((student) => (
                                <React.Fragment key={student.id}>
                                    <TableRow hover>
                                        <TableCell align="right">
                                            <IconButton color="primary" aria-label="ערוך תלמיד"
                                            onClick={()=>handleUpdateStudent(student)}>
                                                <EditIcon />
                                            </IconButton>                                            
                                            <IconButton color="error" aria-label="מחק תלמיד" onClick={() => handleDeleteStudent(student.id)}>
                                                <DeleteOutline />
                                            </IconButton>
                                            <IconButton
                                                color="primary"
                                                aria-label="הצג פרטים"
                                                onClick={() => toggleDetails(student.id)}
                                            >
                                                {openDetails[student.id] ? <Remove /> : <ExpandMore />}
                                            </IconButton>                                         
                                        </TableCell>
                                        <TableCell align="right">{getStudentType(student)}</TableCell>
                                        <TableCell align="right">{new Date(student.birthDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="right">{student.tz}</TableCell>
                                        <TableCell align="right">{student.firstName}</TableCell>
                                        <TableCell align="right">{student.lastName}</TableCell>
                                        {isMultiSelectActive && (
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={!!selectedStudents[student.id]}
                                                    onChange={() => handleToggleStudent(student.id)}
                                                    color="primary"
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>                                   
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={100}>
                                            <StudentDetails
                                                student={student}
                                                isOpen={openDetails[student.id] || false}
                                            />
                                        </TableCell>
                                </React.Fragment>
                            ))}                            
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>

                    <IconButton
                        disabled={(currentPage + 1) * studentsPerPage >= students.length}
                        onClick={handleNextPage}
                        sx={{ marginInlineStart: 2 }}
                    >
                        <ChevronLeft fontSize="large" />
                    </IconButton>
                    <IconButton
                        disabled={currentPage === 0}
                        onClick={handlePreviousPage}
                        sx={{ marginInlineEnd: 2 }}
                    >
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </Box>
            </Box >
        </>
    </>
}

