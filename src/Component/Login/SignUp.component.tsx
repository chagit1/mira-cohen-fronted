import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User, UserRole } from "../../Model/User.model";
import withReactContent from 'sweetalert2-react-content';
import { AddUser, getAllUsers } from "../../Api/User.api";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, updateCurrentUser } from "../../Redux/User/userAction";
interface SignOutProps {
    handleUserAdded: (newUser: User) => Promise<void>;
}

const SignUp = () => {
    debugger
    const dispatch = useDispatch();
    const currentUser = useSelector((state: { user: { currentUser: User } }) => state.user.currentUser);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        role: UserRole.Client,
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
        setCurrentUser({
            ...formValues,
            [name]: value
        });
    };

    const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
        debugger
        event.preventDefault();

        if (!validateFields()) {
            return;
        }
        try {
            if (formValues) {
                const user: User = {
                    ...formValues
                }
                const rep = await AddUser(user);
                const response = rep.data;
                sessionStorage.setItem('role', response.role);
                sessionStorage.setItem('userId', response.id);
                sessionStorage.setItem('userName', response.name);
                dispatch(setCurrentUser(response));
                navigate("/AddInstitution");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            Swal.fire('Error', ' שגיאה בהוספת המשתמש נסה שוב', 'error');
        }
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const minLength = password.length >= 8;

        return {
            isValid: hasLowercase && hasUppercase && hasNumber && minLength,
            requirements: {
                hasLowercase,
                hasUppercase,
                hasNumber,
                minLength
            }
        };
    };

    const validateFields = () => {
        const passwordValidation = validatePassword(formValues!.password);

        let passwordError = '';
        if (!passwordValidation.requirements.minLength) {
            passwordError += 'לפחות 8 תווים. ';
        }
        if (!passwordValidation.requirements.hasUppercase) {
            passwordError += 'אות גדולה. ';
        }
        if (!passwordValidation.requirements.hasLowercase) {
            passwordError += 'אות קטנה. ';
        }
        if (!passwordValidation.requirements.hasNumber) {
            passwordError += 'מספר. ';
        }
        if (passwordValidation.isValid) {
            passwordError = '';
        }

        const newErrors = {
            name: formValues!.name ? '' : 'שדה חובה',
            email: validateEmail(formValues!.email) ? '' : 'כתובת אימייל לא תקינה',
            password: passwordError || '',
        };

        console.log("Validation Errors:", newErrors);
        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    return (
        <div>
            <form onSubmit={handleAddUser}>
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

                <button type="submit" className="btn-primary" style={{ marginLeft: '33%', marginTop: '6px', marginBottom: '-6px' }}>
                    <span className="button__text">next</span>
                    <span className="button__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                            <line y2="19" y1="5" x2="12" x1="12"></line>
                            <line y2="12" y1="12" x2="19" x1="5"></line>
                        </svg>
                    </span>
                </button>
            </form>
        </div>
    );
};

export default SignUp;
