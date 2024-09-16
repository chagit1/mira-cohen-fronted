import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { User, UserRole } from "../../Model/User.model";
import withReactContent from 'sweetalert2-react-content';
import { AddUser } from "../../Api/User.api";

interface SignOutProps {
    handleUserAdded: (newUser: User) => Promise<void>;
}

const SignOut = () => {
    const MySwal = withReactContent(Swal);
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
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const minLength = password.length >= 8;

        console.log("Password:", password);
        console.log("Has Lowercase:", hasLowercase);
        console.log("Has Uppercase:", hasUppercase);
        console.log("Has Number:", hasNumber);
        console.log("Min Length:", minLength);

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
        // בדיקת הסיסמה עם הדרישות המפורטות
        const passwordValidation = validatePassword(formValues.password);

        // יצירת הודעת שגיאה על בסיס מה שחסר בסיסמה
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

        // אם אין שגיאות, המחיקה של השגיאה
        if (passwordValidation.isValid) {
            passwordError = '';
        }

        const newErrors = {
            name: formValues.name ? '' : 'שדה חובה',
            email: validateEmail(formValues.email) ? '' : 'כתובת אימייל לא תקינה',
            password: passwordError || '',
        };

        console.log("Validation Errors:", newErrors);
        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const handleAddUser = async () => {
        const { name, email, password } = formValues;
        console.log("Form Values:", formValues);

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
            console.error("Error adding user:", error);
            Swal.fire('Error', 'שגיאה בהוספת המשתמש', 'error');
        }
    };

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
                <span className="button__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                        <line y2="19" y1="5" x2="12" x1="12"></line>
                        <line y2="12" y1="12" x2="19" x1="5"></line>
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default SignOut;
