import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Institution } from '../Model/Institution.model';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../Model/User.model';
import { addInstitution } from '../Api/Institution.api';
import { setCurrentUser } from '../Redux/User/userAction';
import { AddUser } from '../Api/User.api';
interface AddInstitutionFormProps {
  onInstitutionAdded: (institution: Institution) => void;
}
const AddInstitutionForm: React.FC<AddInstitutionFormProps> = ({ onInstitutionAdded }) => {

  const [institutionName, setInstitutionName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [inspectorName, setInspectorName] = useState('');
  const userID = sessionStorage.getItem('userId');

  const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Updated currentUser:", currentUser);

  }, []);


  const [errors, setErrors] = useState({
    institutionName: false,
    symbol: false,
    managerName: false,
    inspectorName: false,
    contactPhone: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      debugger;
      const rep = await AddUser(currentUser);
      const response = rep.data;

      sessionStorage.setItem('role', response.role);
      sessionStorage.setItem('userName', response.name);
      sessionStorage.setItem('userId', response.id);
      
      dispatch(setCurrentUser(response));
      console.log("currentUser", response);

      const institutionData: Institution = {
        id: '',
        UserId: response?.id,
        institutionName,
        symbol,
        managerName,
        contactPerson: response.name,
        contactPhone,
        contactEmail: response.email,
        inspectorName,
      };

      const newErrors = {
        institutionName: !institutionName,
        symbol: !symbol,
        managerName: !managerName,
        inspectorName: !inspectorName,
        contactPhone: !contactPhone,
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some(error => error)) {
        return;
      }
      debugger
      const newInstitution = await addInstitution(institutionData);
      console.log("newInstitution", newInstitution);
      sessionStorage.setItem('institutionId', newInstitution.id);
      const updatedUser = {
        ...response,
        institutions: newInstitution
      };

      dispatch(setCurrentUser(updatedUser));
      onInstitutionAdded(newInstitution);
      console.log("currentUser עם מוסד חדש", updatedUser);

    } catch (error) {
      console.error('Error adding institution:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h5" className="title" component="h1" gutterBottom>
          עדכון פרטי המוסד
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם מוסד"
            variant="outlined"
            margin="normal"
            fullWidth
            error={errors.institutionName}
            value={institutionName}
            onChange={(e) => {
              setInstitutionName(e.target.value);
              setErrors({ ...errors, institutionName: false });
            }}
          />
          {errors.institutionName && <Typography color="error">שדה זה חובה</Typography>}

          <TextField
            label="סמל"
            variant="outlined"
            margin="normal"
            fullWidth
            error={errors.symbol}
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value);
              setErrors({ ...errors, symbol: false });
            }}
          />
          {errors.symbol && <Typography color="error">שדה זה חובה</Typography>}

          <TextField
            label="שם המנהל"
            variant="outlined"
            margin="normal"
            fullWidth
            error={errors.managerName}
            value={managerName}
            onChange={(e) => {
              setManagerName(e.target.value);
              setErrors({ ...errors, managerName: false });
            }}
          />
          {errors.managerName && <Typography color="error">שדה זה חובה</Typography>}

          <TextField
            label="שם המפקח"
            variant="outlined"
            margin="normal"
            fullWidth
            error={errors.inspectorName}
            value={inspectorName}
            onChange={(e) => {
              setInspectorName(e.target.value);
              setErrors({ ...errors, inspectorName: false });
            }}
          />
          {errors.inspectorName && <Typography color="error">שדה זה חובה</Typography>}

          <TextField
            label="טלפון ליצירת קשר"
            variant="outlined"
            margin="normal"
            fullWidth
            error={errors.contactPhone}
            value={contactPhone}
            onChange={(e) => {
              setContactPhone(e.target.value);
              setErrors({ ...errors, contactPhone: false });
            }}
          />
          {errors.contactPhone && <Typography color="error">שדה זה חובה</Typography>}

          <Button type="submit" variant="contained" color="primary">הבא</Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddInstitutionForm;

