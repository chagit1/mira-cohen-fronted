import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { Student } from '../../../Model/Student.model';
import { useEffect, useState } from 'react';
import { getAllStudent } from '../../../Api/HelpHours.api';
import { setAllStudents } from '../../../Redux/Student/Student.Action';
import data from "../../../assets/data.json";
import ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { CloudDownload } from '@mui/icons-material'; // אייקון Material UI
import './DownloadButton.css'; // קובץ CSS נפרד לעיצוב

const ExportAllStudentToExcel = () => {

    const allStudentState = useSelector((state: { student: { allStudent: { [key: string]: Student[] } } }) => state.student);
    const dispatch = useDispatch();
    const [students, setStudents] = useState<Student[]>([]);
    const studentTranslations = data.student;

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
        return () => {
        };
    }, []);

    const exportData = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Students');

        // הוספת כותרות
        const headerRow = Object.values(studentTranslations);
        worksheet.addRow(headerRow);

        worksheet.columns = headerRow.map((header) => ({
            header,
            width: header.length + 5, // הוספת מרווח נוסף לאורך הטקסט
        }));

        // עיצוב הכותרות
        const header = worksheet.getRow(1);
        header.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4F81BD' }, // כחול בהיר

            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            }; 
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // הוספת נתוני סטודנטים
        students.forEach((student, index) => {
            const rowData = Object.keys(studentTranslations).map((key) => {
                const studentKey = key as keyof Student;
                if (key.toLowerCase().includes('birth') || key.toLowerCase().includes('date')) {
                    const date = new Date(student?.birthDate!);
                    if (!isNaN(date.getTime())) {
                        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')
                            }/${date.getFullYear()}`;
                    }
                }

                return student[studentKey] || '';
            });
            const row = worksheet.addRow(rowData);
            row.eachCell((cell) => {
                cell.alignment = { vertical: 'top', horizontal: 'center' }; 
            });

    

        const fillColor = index % 2 === 0 ? 'FFFFFFFF' : 'FFD3D3D3'; // לבן ואפור בהיר
        row.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: fillColor },
                
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            }; 
        });
    });

        // הגדרת כיוון הטקסט מימין לשמאל
        worksheet.views = [{ rightToLeft: true }];

        // ייצוא הקובץ
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            FileSaver.saveAs(blob, 'תלמידים.xlsx');
        });
    };

    // const exportData = () => {
    //     let newStudents: { [key: string]: string }[] = [];
    //     students.map(student => {
    //         let bb: { [key: string]: string } = {};
    //         Object.entries(parentReportTranslations!).map(([key, value]) => {
    //             const studentKey = key as keyof Student;
    //             bb[value] = student[studentKey].toString()

    //         });
    //         newStudents.push(bb);
    //     });

    //     if (newStudents != null) {
    //         // יצירת Worksheet מתוך הנתונים
    //         const worksheet = XLSX.utils.json_to_sheet(newStudents!);

    //         worksheet['!dir'] = 'rtl'; // מגדיר כיוון מימין לשמאל

    //         // הוספת כותרות בצבע מותאם
    //         const range = XLSX.utils.decode_range(worksheet['!ref']!);
    //         for (let C = range.s.c; C <= range.e.c; ++C) {
    //             const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    //             if (!worksheet[cellAddress]) continue; // אם התא ריק
    //             worksheet[cellAddress].s = {
    //                 font: { bold: true, color: { rgb: "FFFFFF" } },
    //                 fill: { fgColor: { rgb: "4F81BD" } }, // צבע כחול בהיר
    //                 alignment: { horizontal: "center", vertical: "center" }
    //             };
    //         }

    //         // יצירת Workbook והוספת ה-Worksheet
    //         const workbook = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(workbook, worksheet, "Student");

    //         // ייצוא הקובץ
    //         XLSX.writeFile(workbook, "ExportedData.xlsx");
    //     }
    // };

    return (
        <div className="download-button-container">
        <button 
            className="download-button" 
            onClick={exportData} 
            title="הורדת התלמידים לקובץ" 
        >
            <CloudDownload className="download-icon" />
        </button>
    </div>
    );
};

export default ExportAllStudentToExcel;
