import React, { useEffect } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { User } from '../Model/User.model';
  
const AddStudenth = () => {

  const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);

  useEffect(() => {
    console.log("Updated currentUser:", currentUser);

  }, []);
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          הוספת תלמיד חדש
        </Typography>
        <TextField label="שם פרטי" variant="outlined" margin="normal" fullWidth />
        <TextField label="שם משפחה" variant="outlined" margin="normal" fullWidth />
        <TextField label="מידע על התנהגות" variant="outlined" margin="normal" fullWidth multiline rows={4} />
        <TextField label="כישורים לימודיים" variant="outlined" margin="normal" fullWidth multiline rows={4} />
        <TextField label="כישורים חברתיים" variant="outlined" margin="normal" fullWidth multiline rows={4} />
        <Button variant="contained" color="primary" fullWidth>
          שמור
        </Button>
      </Box>
    </Container>
  );
};

export default AddStudenth;
