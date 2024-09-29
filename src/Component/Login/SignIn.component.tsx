import { useState } from 'react';
import {TextField, Container, Typography, Box, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { AddUser, Login } from '../../Api/User.api';
import Swal from 'sweetalert2';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
debugger
     const rep = Login(email,password)
     const response = (await rep).data     
     sessionStorage.setItem('role', response.user.role);
     sessionStorage.setItem('userId', response.user.id);
     sessionStorage.setItem('userName', response.user.name);
     Swal.fire({
      title: 'success',
      text: 'התחברת בהצלחה',
      icon: 'success',
      confirmButtonText: 'אישור',
      customClass: {
          confirmButton: 'my-confirm-button'
      }
  });
     navigate('/');

    }
    catch{
      Swal.fire('Error','לא קיים משתמש זה נסה שוב או הירשם', 'error');

    }
  
  };

  const handleAddUser = () => {
    navigate('/SignUp')
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

export default SignIn;
