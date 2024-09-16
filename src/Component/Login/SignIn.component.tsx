import { useState } from 'react';
import {TextField, Container, Typography, Box, Button } from '@mui/material';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../Redux/actions'; // Import actions
import Swal from 'sweetalert2';
import SignOut from './SignOut.component';
import { User } from '../../Model/User.model';
import { AddUser } from '../../Api/User.api';
import withReactContent from 'sweetalert2-react-content';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook to dispatch actions
  const MySwal = withReactContent(Swal);
  const handleLogin = async () => {
    try {
      const response = await fetch(`https://localhost:7201/api/User/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const userType = data.userType; // Assuming your API returns an object with a userType property

      // Dispatch success action and save userType in localStorage
      dispatch(loginSuccess(userType));
      localStorage.setItem('userType', userType);

      // Navigate to the main page or wherever you need
      navigate('/');
    } catch (error) {
      // Dispatch failure action
      if (error instanceof Error) {
        dispatch(loginFailure(error.message));
      } else {
        dispatch(loginFailure('An unknown error occurred'));
      }
      console.error('Login error:', error);
    }
  };
  const handleAddUser = () => {
    navigate('/SignOut')
  }
  // const handleAddUser = () => {
  //   debugger
  //   Swal.fire({
  //     title: 'הוספת משתמש חדש',
  //     html: '<div id="add-user-container"></div>',
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     didOpen: () => {
  //       const container = document.getElementById('add-user-container');
  //       if (container) {
  //         ReactDOM.render(
  //           <SignOut
  //             // open={true}
  //             // users={users}
  //             // setUsers={setUsers}
  //             handleUserAdded={async (newUser: User) => {
  //               try {
  //                 debugger
  //                 const response = await AddUser(newUser);
  //                 const addedUser = response.data;
  //                 // setUsers([ addedLead,...users]);
  //                 // dispatch(addLead2(addedLead));
  //                 MySwal.fire({
  //                   title: 'success',
  //                   text: 'הליד נוסף בהצלחה',
  //                   icon: 'success',
  //                   confirmButtonText: 'אישור',
  //                   customClass: {
  //                     confirmButton: 'my-confirm-button'
  //                   }
  //                 });
  //                 // Swal.fire('Success', 'הליד נוסף בהצלחה', 'success');
  //               } catch (error) {
  //                 Swal.fire('Error', 'שגיאה בהוספת הליד', 'error');
  //               }
  //             }}
  //           />,
  //           container
  //         );
  //       }
  //     },
  //   });
  // };
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
