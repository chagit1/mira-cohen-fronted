import { useState } from 'react';
import { TextField, Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../Api/User.api';
import Swal from 'sweetalert2';
import './SignIn.css'; // קובץ CSS חיצוני לעיצוב

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const rep = Login(email, password);
      const response = (await rep).data;
      sessionStorage.setItem('role', response.user.role);
      sessionStorage.setItem('userId', response.user.id);
      sessionStorage.setItem('userName', response.user.name);
      Swal.fire({
        title: 'התחברות הצליחה!',
        text: 'ברוך הבא',
        icon: 'success',
        confirmButtonText: 'אישור',
      });
      navigate('/');
    } catch {
      Swal.fire('Error', 'משתמש לא קיים, נסה שוב או הירשם', 'error');
    }
  };

  const handleAddUser = () => {
    navigate('/SignUp');
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="70vh"
        className="signin-container"
      >
        <Typography className="titleS" variant="h3" >
          התחברות
        </Typography>
        <TextField
          label="אימייל"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <TextField
          label="סיסמא"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          className="login-button"
        >
          התחבר
        </Button>
        <br />
        <Button
          className='sighnUp'
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} // מרכז את הכפתור
        >
          אם אתה לא מחובר הירשם עכשיו
        </Button>
      </Box>

    </Container>
  );
};

export default SignIn;
