// import React, { useState, useEffect } from 'react';
// import { Button, TextField, Container, Typography, Box } from '@mui/material';
// import { addInstitution } from '../Api/Institution.api'; // נניח שהפונקציה שלך נמצאת בקובץ api.ts
// import { useNavigate } from 'react-router-dom';

// interface AddInstitutionFormProps {
//   onInstitutionAdded: (institution: any) => void;
// }

// const AddInstitutionForm: React.FC<AddInstitutionFormProps> = ({ onInstitutionAdded }) => {
//   const [institutionName, setInstitutionName] = useState('');
//   const [symbol, setSymbol] = useState('');
//   const [managerName, setManagerName] = useState('');
//   const [contactPerson, setContactPerson] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [inspectorName, setInspectorName] = useState('');
//   const [userId, setUserId] = useState<string | null>(null);
//   const [Id, setId] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUserId = sessionStorage.getItem('userId');
//     setUserId(storedUserId);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (userId) {
//       try {
//         const institutionData = {
//           Id,
//           userId,
//           institutionName,
//           symbol,
//           managerName,
//           contactPerson,
//           contactPhone,
//           contactEmail,
//           inspectorName,
//         };

//         const newInstitution = await addInstitution(institutionData);
//         onInstitutionAdded(newInstitution); 

//         navigate("/allStudent");
//       } catch (error) {
//         console.error('Error adding institution:', error);
//       }
//     } else {
//       console.error('User ID is not available.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box my={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           עדכון פרטי המוסד
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="שם מוסד"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={institutionName}
//             onChange={(e) => setInstitutionName(e.target.value)}
//           />
//           <TextField
//             label="סמל"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//           />
//           <TextField
//             label="שם המנהל"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={managerName}
//             onChange={(e) => setManagerName(e.target.value)}
//           />
//           <TextField
//             label="איש קשר"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={contactPerson}
//             onChange={(e) => setContactPerson(e.target.value)}
//           />
//           <TextField
//             label="טלפון ליצירת קשר"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//           />
//           <TextField
//             label="מייל ליצירת קשר"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={contactEmail}
//             onChange={(e) => setContactEmail(e.target.value)}
//           />
//           <TextField
//             label="שם המפקח"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={inspectorName}
//             onChange={(e) => setInspectorName(e.target.value)}
//           />
//           <Button variant="contained" color="primary" fullWidth type="submit">
//             שמור
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default AddInstitutionForm;
import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { addInstitution } from '../Api/Institution.api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../Model/User.model';
import { Institution } from '../Model/Institution.model';
import { User } from '../Model/User.model';


interface AddInstitutionFormProps {
  onInstitutionAdded: (institution: Institution) => void; // עדכון סוג הממשק
}

const AddInstitutionForm: React.FC<AddInstitutionFormProps> = ({ onInstitutionAdded }) => {
  const [institutionName, setInstitutionName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [inspectorName, setInspectorName] = useState('');
  const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);

  const navigate = useNavigate();
   useEffect(() => {
    console.log("Updated currentUser:", currentUser?.email);

   }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const institutionData: Institution = {
        id: '', 
        UserId: currentUser?.id,
        institutionName,
        symbol,
        managerName,
        contactPerson: currentUser?.name,
        contactPhone,
        contactEmail: currentUser?.email,
        inspectorName,
      };

      const newInstitution = await addInstitution(institutionData);
      onInstitutionAdded(newInstitution);
      navigate("/allStudent");
    } catch (error) {
      console.error('Error adding institution:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          עדכון פרטי המוסד
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם מוסד"
            variant="outlined"
            margin="normal"
            fullWidth
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
          />
          <TextField
            label="סמל"
            variant="outlined"
            margin="normal"
            fullWidth
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <TextField
            label="שם המנהל"
            variant="outlined"
            margin="normal"
            fullWidth
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
          />
          <TextField
            label="שם המפקח"
            variant="outlined"
            margin="normal"
            fullWidth
            value={inspectorName}
            onChange={(e) => setInspectorName(e.target.value)}
          />
          <TextField
            label="טלפון ליצירת קשר"
            variant="outlined"
            margin="normal"
            fullWidth
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />

          {/* הוסף כאן את שאר השדות */}
          <Button type="submit" variant="contained" color="primary">
            הוסף מוסד
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddInstitutionForm;
