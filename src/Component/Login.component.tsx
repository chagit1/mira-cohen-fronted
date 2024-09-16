import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../Api/User.api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
   
    const userType = 'client'; // לדוגמה, מנהל מוסד

    // שמירת סוג המשתמש ב-localStorage
    sessionStorage.setItem('userType', userType);
    sessionStorage.setItem('userId', "123123");
    sessionStorage.setItem('firstName', "דינה");
    sessionStorage.setItem('lastName', "לנדי");

    // ניווט לדף הראשי שינהל את ההפניה
    navigate('/');
  };

  const handleAddUser = () => {
      navigate('/SignOut')
    }
  return (
    <>
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
    <button className="add-lead-button" onClick={handleAddUser}>
          +
          <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>הרשמה</span>
        </button>
</>
  );
};

export default Login;
