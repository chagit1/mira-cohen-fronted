import { useEffect, useState } from "react";
import { ParentReport } from "../../Model/ParentReport.model";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import data from "../../assets/data.json";
import { addParentReport, updateParentReport } from "../../Api/ParentReport.model";
import { useDispatch } from "react-redux";
import { setAllStudents, updateStudent } from "../../Redux/Student/Student.Action";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { log } from "console";
import { wait } from "@testing-library/user-event/dist/utils";

const ParentReportComponent: React.FC = () => {
  const location = useLocation();
  const studentFromLocation = location.state?.student as { [key: string]: any };
  const [student, setStudent] = useState<{ [key: string]: any }>(studentFromLocation);
  const [editable, setEditable] = useState(false);
  const [report, setReport] = useState<ParentReport | null>(student?.parentReport || null);
  const parentReportTranslations = data.parentReport;
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [accordionStates, setAccordionStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.log(student);

    if (!student.parentReport) {
      const newParentReport: ParentReport = {
        parentReportId: "",
        studentId: student.id,
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
        academicDifficulties: "hbyy",
        socialAndEmotionalDifficulties: "",
        wasWithoutFramework: false,
        currentAcademicStatus: "",
        currentReadingGap: "",
        currentWritingGap: "",
        currentMotivationGap: "",
        currentSocialGap: "",
        currentEmotionalGap: "",
        currentCulturalAndLeisureGap: "",
      };

      setStudent((prevStudent) => ({
        ...prevStudent,
        parentReport: newParentReport,
      }));
      setReport(newParentReport);
    }
  }, [student]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ParentReport
  ) => {
    if (report) {
      setReport({ ...report, [field]: event.target.value });
    }
  };

  const handleSave = () => {
    if (!report?.parentReportId) {
      debugger
      addParentReport(report!)
        .then((x) => {
          dispatch(updateStudent(x.data))
          dispatch(setAllStudents(x.data))
          setReport(x.data)
          MySwal.fire({
            title: 'success',
            text: 'הדוח עודכן בהצלחה',
            icon: 'success',
            confirmButtonText: 'אישור',
            customClass: {
              confirmButton: 'my-confirm-button'
            }
          });
        })
        .catch(err => {
          Swal.fire('Error', 'שגיאה בעדכון הדוח', 'error');
        });
    }
    else {
      debugger
      report.studentId = student.id
      updateParentReport(report)
        .then((x) => {
          console.log("Updated successfully:", x.data);
          dispatch(updateStudent(x.data));
          dispatch(setAllStudents(x.data));
          setReport(x.data);
          MySwal.fire({
            title: 'Success',
            text: 'הדוח עודכן בהצלחה',
            icon: 'success',
            confirmButtonText: 'אישור',
            customClass: {
              confirmButton: 'my-confirm-button',
            },
          });
        })
        .catch((err) => {
          console.error("Update error:", err.response || err.message);
          Swal.fire('Error', 'שגיאה בעדכון הדוח', 'error');
        });
    }
    console.log("Saved report:", report);
    setEditable(false);
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setAccordionStates((prev) => ({
      ...prev,
      [panel]: isExpanded,
    }));
  };
  
  return (
    <div style={{ margin: "20px auto", maxWidth: "90%", fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h4" style={{ marginBottom: "10px", textAlign: "center", color: "#333" }}>
        דוח הורים
        <Typography variant="h6" style={{ marginBottom: "10px", color: "#666" }}>
          {`${student.lastName}, ${student.firstName}`}
        </Typography>
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          startIcon={<EditIcon />}
          onClick={() => setEditable(!editable)}
          style={{
            marginBottom: "20px",
            backgroundColor: "#3f51b5",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
        {!editable ? <>ערוך דוח</> : <>בטל עריכה</>}  
        </Button>
      </Box>

      {report && (
        <div
          style={{ display: "grid", gridTemplateColumns: "50% 50%", gap: "20px" }}
        >
          {Object.entries(parentReportTranslations).map(([key, value]) => (
            <Accordion
              expanded={accordionStates[key] || false}
              onChange={handleAccordionChange(key)} 
              key={key}
              style={{
                borderRadius: "10px",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                direction: "rtl",
                border: "1px solid #e0e0e0",
                marginBottom: "10px",
              }}
              disableGutters
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <Typography style={{ textAlign: "right", color: "#333" }}>{value}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "15px", backgroundColor: "#fafafa", borderRadius: "8px" }}>
                {editable ? (
                  <textarea
                    style={{
                      width: "100%",
                      minHeight: "120px",
                      fontSize: "16px",
                      lineHeight: "1.5",
                      fontFamily: "Arial, sans-serif",
                      border: "1px solid #ccc",
                      padding: "10px",
                      resize: "none",
                      borderRadius: "8px",
                      boxSizing: "border-box",
                    }}
                    value={(report as any)[key]}
                    onChange={(e) => handleInputChange(e, key as keyof ParentReport)}
                  />
                ) : (
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      fontSize: "16px",
                      lineHeight: "1.5",
                      fontFamily: "Arial, sans-serif",
                      textAlign: "right",
                      color: "#555",
                    }}
                  >
                    {(report as any)[key]}
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!editable}
          style={{
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "8px",
            fontSize: "16px",
          }}
          
        >
          שמור
        </Button>
      </div>
    </div>
  );
};

export default ParentReportComponent;