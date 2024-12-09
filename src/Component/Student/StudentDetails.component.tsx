import React, { useEffect, useState } from "react";
import { Collapse, Typography, TableRow, TableCell, Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface StudentDetailsProps {
  student: { [key: string]: any };

  isOpen: boolean;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student, isOpen }) => {
  const [isHelpHours, setIsHelpHours] = useState<boolean>(false)
  const [studentType, setStudentType] = useState<string>("");
  const nav = useNavigate()
  useEffect(() => {
    if ("strengthAreas" in student)
      setStudentType("שעות עזר")
    else
      setStudentType("זכאות ואפיון")
  }, []);
  const toParentReport = () =>  {
    
    nav('/parentReport', { state: { student } })
  }
  const toTeacherReport = () =>  {
    nav('/teacherReport' , { state: { student } })
  }
  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <Box
        margin={2}
        padding={3}
        // borderRadius={4}
        // bgcolor="#e6f2ff"
        display="flex"
        justifyContent="space-between"
        sx={{
          gap: 2
        }}
      >
        <Box width="30%" textAlign="right">
          <Typography variant="h6" gutterBottom color="primary">
            פרטים נוספים
          </Typography>
          {studentType == "שעות עזר" ? (
            <>
              <Typography>
                <strong>תחומי חוזק:</strong> {student.strengthAreas}
              </Typography>
              <Typography>
                <strong>תחומים לשיפור:</strong> {student.areasForImprovement}
              </Typography>
              <Typography>
                <strong>הישגים אקדמיים:</strong> {student.academicAchievements}
              </Typography>
            </>
          ) : (
            <>
            
             <Typography>
               <Button onClick={toParentReport}>דוח הורים</Button>
              </Typography>
              <Typography>
               <Button onClick={toTeacherReport}>דוח מחנך</Button>
              </Typography>
            </>
          )}


        </Box>

        <Box width="30%" textAlign="right">
          <Typography variant="h6" gutterBottom color="primary" >
            פרטי הורים
          </Typography>
          <Typography>
            <strong>שם האם:</strong> {student.motherName}
          </Typography>
          <Typography>
            <strong>שם האב:</strong> {student.fatherName}
          </Typography>
          <Typography>
            <strong>טלפון אב:</strong> {student.fatherPhone}
          </Typography>
          <Typography>
            <strong>טלפון אם:</strong> {student.motherPhone}
          </Typography>
          <Typography>
            <strong>טלפון בית:</strong> {student.homePhone}
          </Typography>
        </Box>

        <Box width="30%" textAlign="right">
          <Typography variant="h6" gutterBottom color="primary" >
            פרטי התלמיד
          </Typography>
          <Typography>
            <strong>שם פרטי:</strong> {student.firstName}
          </Typography>
          <Typography>
            <strong>שם משפחה:</strong> {student.lastName}
          </Typography>
          <Typography>
            <strong>תאריך לידה:</strong> {student.birthDate}
          </Typography>
          <Typography>
            <strong>תעודת זהות:</strong> {student.tz}
          </Typography>
          <Typography>
            <strong>כתובת:</strong> {student.address}
          </Typography>
          <Typography>
            <strong>מיקום במשפחה:</strong> {student.familyPosition}
          </Typography>
          <Typography>
            <strong>רמת כיתה:</strong> {student.gradeLevel}
          </Typography>
        </Box>
      </Box>
    </Collapse>
  );
};
export default StudentDetails;
