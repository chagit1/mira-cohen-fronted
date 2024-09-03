import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // כאן תבצעי את הבדיקה מול השרת ותקבלי את סוג המשתמש
    // נניח שמחזירים סוג משתמש כדוגמה:
    const userType = 'institution'; // לדוגמה, מנהל מוסד

    // שמירת סוג המשתמש ב-localStorage
    localStorage.setItem('userType', userType);

    // ניווט לדף הראשי שינהל את ההפניה
    navigate('/');
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          התחברות
        </Typography>
        <TextField
          label="אימייל"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="סיסמא"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          התחבר
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
