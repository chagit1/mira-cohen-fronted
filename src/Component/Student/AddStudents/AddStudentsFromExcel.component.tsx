import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Student } from "../../../Model/Student.model";
import { useDispatch, useSelector } from "react-redux";
import data from "../../../assets/data.json";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { addMultiHelpHoutsStudent } from "../../../Api/HelpHours.api";
import { HelpHours } from "../../../Model/HelpHours.model";
import { EligibilityAndCharacterization } from "../../../Model/EligibilityAndCharacterization.model";
import { addMultiEligibilityStudent } from "../../../Api/EligibilityAndCharacterization.api";
import { CloudUpload, Help, UploadFile } from "@mui/icons-material";
import { setAllStudents } from "../../../Redux/Student/Student.Action";
import moment from "moment";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

const AddStudentsFromExcel = ({ onActionComplete }: { onActionComplete: () => void }) => {
    const [eligibility, setEligibility] = useState<EligibilityAndCharacterization[]>([]);

    const [fileName, setFileName] = useState<string>("");
    const dispatch = useDispatch();
    const studentTranslations = data.student;
    const MySwal = withReactContent(Swal);

    const excelSerialToDate = (serial: number): Date => {
        const excelEpoch = new Date(1900, 0, 1); // 1 בינואר 1900
        const fixedSerial = serial - 1;
        excelEpoch.setDate(excelEpoch.getDate() + fixedSerial);
        return excelEpoch;
    }

    const readExcelDate = (value: any) => {
        if (typeof value === 'number') {
            // אם הערך הוא מספר סידורי, נהפוך אותו לתאריך
            const date = excelSerialToDate(value);
            return new Date(date);
        } else if (typeof value === 'string') {
            const parsedDate = moment(value, [
                "DD/MM/YYYY", "DD.MM.YYYY", "MM.DD.YYYY", "MM.DD.YY", "DD.MM.YY",
                "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YY", "DD-MM-YYYY",
                "MM/DD/YY", "MM/DD/YYYY", "DD/MM/YY",
                "YYYY-MM-DD", "MM/DD/YYYY"], true);
            return parsedDate.isValid() ? parsedDate.toDate() : new Date();
        }
        return new Date();
    }
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, typeStudent: string) => {
        debugger
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                if (data) {
                    const workbook = XLSX.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const rawData = XLSX.utils.sheet_to_json<{ [key: string]: string }>(worksheet);

                    if (typeStudent == 'שעות עזר') {
                        debugger
                        const processedHelpHoursStudents = rawData.map((row) => {
                            const translatedStudent: HelpHours = {
                                id: "",
                                institutionId: "6728eb41c805ab07e544eb4b",

                            };
                            for (const [key, value] of Object.entries(studentTranslations)) {
                                const studentKey = key as keyof HelpHours;
                                if (value in row) {
                                    const cellValue = row[value];
                                    if (studentKey === "birthDate") {
                                        const date = readExcelDate(cellValue)
                                        translatedStudent[studentKey] = date;
                                    }
                                    else if (studentKey === "familyPosition") {
                                        translatedStudent[studentKey] = cellValue
                                            ? parseInt(cellValue, 10)
                                            : undefined;
                                    }
                                    else {
                                        translatedStudent[studentKey] = cellValue as never;
                                    }
                                }
                            }
                            return translatedStudent as HelpHours;
                        });
                        addMultiHelpHoutsStudent(processedHelpHoursStudents)
                            .then((x) => {
                                dispatch(setAllStudents(x.data))
                                MySwal.fire({
                                    title: 'success',
                                    text: 'התלמידים נוספו בהצלחה',
                                    icon: 'success',
                                    confirmButtonText: 'אישור',
                                    customClass: {
                                        confirmButton: 'my-confirm-button'
                                    }
                                });
                                if (onActionComplete) {
                                    onActionComplete();
                                }
                            })
                            .catch(err => {
                                Swal.fire('Error', 'שגיאה בהוספת התלמיד', 'error');
                            });
                    }
                    else {
                        debugger
                        const processedEligibility = rawData.map((row) => {
                            const translateEligibiltydStudent: EligibilityAndCharacterization = {
                                id: "",
                                institutionId: "6728eb41c805ab07e544eb4b",
                            };
                            for (const [key, value] of Object.entries(studentTranslations)) {
                                const studentKey = key as keyof EligibilityAndCharacterization;
                                if (value in row) {
                                    const cellValue = row[value];
                                    if (studentKey === "birthDate") {
                                        const date = readExcelDate(cellValue)
                                        translateEligibiltydStudent[studentKey] = date;
                                    }
                                    else if (studentKey === "familyPosition") {
                                        translateEligibiltydStudent[studentKey] = cellValue
                                            ? parseInt(cellValue, 10)
                                            : undefined;
                                    }
                                    else {
                                        translateEligibiltydStudent[studentKey] = cellValue as never;
                                    }
                                }
                            }
                            return translateEligibiltydStudent
                        });

                        addMultiEligibilityStudent(processedEligibility)
                            .then((x) => {
                                dispatch(setAllStudents(x.data))
                                MySwal.fire({
                                    title: 'success',
                                    text: 'התלמידים נוספו בהצלחה',
                                    icon: 'success',
                                    confirmButtonText: 'אישור',
                                    customClass: {
                                        confirmButton: 'my-confirm-button'
                                    }
                                });
                                if (onActionComplete) {
                                    onActionComplete();
                                }
                            })
                            .catch(err => {
                                Swal.fire('Error', 'שגיאה בהוספת התלמידים', 'error');
                            });
                    }
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    return (

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
      {/* כפתור ראשון: זכאות ואפיון */}
      <div>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => handleFileUpload(e, "זכאות ואפיון")}
          style={{ display: "none" }}
          id="upload-eligibility"
        />
        <label htmlFor="upload-eligibility">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFile />}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              textTransform: "none",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            העלאת קובץ זכאות ואפיון
          </Button>
        </label>
      </div>

      {/* כפתור שני: שעות עזר */}
      <div>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => handleFileUpload(e, "שעות עזר")}
          style={{ display: "none" }}
          id="upload-hours"
        />
        <label htmlFor="upload-hours">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFile />}
            style={{
              backgroundColor: "#2196f3",
              color: "#fff",
              textTransform: "none",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            העלאת קובץ שעות עזר
          </Button>
        </label>
      </div>
    </div>
    //     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    //     {/* כפתור עגול להעלאת מסמכים */}
    //     <Tooltip title="העלה מסמכים">
    //       <IconButton
    //         onClick={handleMenuOpen}
    //         style={{
    //           backgroundColor: "#1976d2",
    //           color: "#fff",
    //           width: "60px",
    //           height: "60px",
    //           borderRadius: "50%",
    //           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    //         }}
    //       >
    //         <CloudUpload fontSize="large" />
    //       </IconButton>
    //     </Tooltip>
  
    //     {/* תפריט לבחירת סוג המסמך */}
    //     <Menu
    //       anchorEl={anchorEl}
    //       open={Boolean(anchorEl)}
    //       onClose={handleMenuClose}
    //       PaperProps={{
    //         style: {
    //           borderRadius: "8px",
    //           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    //         },
    //       }}
    //     >
    //       <MenuItem onClick={() => handleTypeSelection("שעות עזר")}>
    //         שעות עזר
    //       </MenuItem>
    //       <MenuItem onClick={() => handleTypeSelection("זכאות ואפיון")}>
    //         זכאות ואפיון
    //       </MenuItem>
    //     </Menu>
  
    //     {isTypeSelected && (
    //       <div style={{ marginTop: "20px" }}>
    //         <input
    //           type="file"
    //           accept=".xls,.xlsx"
    //           onChange={handleFileUpload}
    //           style={{
    //             display: "none",
    //           }}
    //           id="upload-file"
    //         />
    //         <label htmlFor="upload-file">
    //           <Button
    //             variant="contained"
    //             component="span"
    //             startIcon={<CloudUpload />}
    //             style={{
    //               backgroundColor: "#4caf50",
    //               color: "#fff",
    //               textTransform: "none",
    //               borderRadius: "8px",
    //             }}
    //           >
    //             העלאת קובץ ({typeStudent})
    //           </Button>
    //         </label>
    //       </div>
    //     )}
    //   </div>
    );
};

export default AddStudentsFromExcel;
