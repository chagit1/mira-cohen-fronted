import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Sign } from "crypto";
import { useState } from "react";
import Swal from "sweetalert2";
import { User, UserRole } from "../../Model/User.model";
import withReactContent from 'sweetalert2-react-content';
import { AddUser } from "../../Api/User.api";


interface SignOutProps {
    // leads: Lead[];
    // setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
    handleUserAdded: (newUser: User) => Promise<void>;
}
const SignOut = () => {
    debugger
    const MySwal = withReactContent(Swal);
    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        role: UserRole.Client,
        // institutions: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        // institutions: ''  
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validateFields = () => {
        debugger
        const newErrors = {
            name: formValues.name ? '' : 'שדה חובה',
            email: validateEmail(formValues.email) ? '' : 'כתובת אימייל לא תקינה',
            password: formValues.password ? '' : 'יש למלא עם אות גדולה אות קטנה ומספר',
        };
        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };
    const handleAddUser = async () => {
        debugger

        const { name, email, password } = formValues;
        if (!validateFields()) {
            return;
        }
        if (!name || !email || !password) {
            Swal.fire('Error', 'אנא מלא את כל השדות', 'error');
            return;
        }
        try {
            const response = await AddUser(formValues);
            const addedUser = response.data;
            // setUsers([ addedLead,...users]);
            // dispatch(addLead2(addedLead));
            MySwal.fire({
                title: 'success',
                text: 'המשתמש נוסף בהצלחה',
                icon: 'success',
                confirmButtonText: 'אישור',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
        } catch (error) {
            Swal.fire('Error', 'שגיאה בהוספת המשתמש', 'error');
        }
    }

    return (
        <div>
            <TextField
                dir='rtl'
                sx={{ textAlign: 'right', fontFamily: 'CustomFont', fontSize: '20px' }}
                inputProps={{ style: { fontFamily: 'CustomFont' } }}
                InputLabelProps={{ style: { fontFamily: 'CustomFont' } }}
                className='textt'
                autoFocus
                margin="dense"
                name="name"
                label="שם מלא"
                type="text"
                fullWidth
                multiline
                value={formValues.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}

            />
            <TextField
                inputProps={{ style: { fontFamily: 'CustomFont' } }}
                InputLabelProps={{ style: { fontFamily: 'CustomFont' } }}
                dir='rtl'
                sx={{ textAlign: 'right' }}
                className='textt'
                margin="dense"
                name="email"
                label="אמייל"
                type="email"
                fullWidth
                multiline
                value={formValues.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                inputProps={{ style: { fontFamily: 'CustomFont' } }}
                InputLabelProps={{ style: { fontFamily: 'CustomFont' } }}
                dir='rtl'
                sx={{ textAlign: 'right' }}
                className='textt'
                margin="dense"
                name="password"
                label="סיסמה"
                type="password"
                fullWidth
                multiline
                value={formValues.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
            />
            <button onClick={handleAddUser} className="btn-primary" style={{ marginLeft: '33%', marginTop: '6px', marginBottom: '-6px' }}>
                <span className="button__text"> הוספת משתמש</span>
                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
        </div>

    );
};

export default SignOut;