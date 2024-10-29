import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Institution } from '../Model/Institution.model';
import { useSelector } from 'react-redux';
import { User } from '../Model/User.model';
import { useNavigate } from 'react-router-dom';
import { addInstitution } from '../Api/Institution.api';
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
  const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("Updated currentUser:", currentUser?.email);

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
      const newInstitution = await addInstitution(institutionData);
      onInstitutionAdded(newInstitution);
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

