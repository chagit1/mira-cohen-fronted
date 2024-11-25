import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Container, Box, Typography, 
Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setCurrentUser } from "../../Redux/User/userAction";
import { UserRole } from "../../Model/User.model";
import AddInstitutionForm from '../AddInstitution.component';
import './SignUp.css';

const steps = ['פרטי משתמש', ' פרטי מוסד', 'סיום'];

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

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
    const handleClose = () => {
        setOpen(false);
        navigate('/')
    };

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

    const handleNext = async () => {
        debugger
        if (activeStep === 0) {
            if (!validateFields()) {
                return;
            }
            dispatch(setCurrentUser(formValues));
            setActiveStep(prevStep => prevStep + 1);
            
        } else if (activeStep === 1) {
            setActiveStep(prevStep => prevStep + 1);
        }
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
        <Container maxWidth="sm" className="container">
            <Box my={4}>
                <Stepper activeStep={activeStep} className="stepper">
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 0 && (
                    <form>
                        <Typography variant="h5" className="title">הכנס פרטי משתמש</Typography>
                        <TextField
                            label="שם מלא"
                            name="name"
                            fullWidth
                            margin="normal"
                            value={formValues.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            label="אימייל"
                            name="email"
                            fullWidth
                            margin="normal"
                            value={formValues.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label="סיסמה"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formValues.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            הבא
                        </Button>
                    </form>
                )}
                {activeStep === 1 && (
                    <>
                        <AddInstitutionForm onInstitutionAdded={() => handleNext()} />
                    </>
                )}

                {activeStep === 2 && (
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle className="dialog-title">נרשמת בהצלחה!</DialogTitle>
                        <DialogContent className="dialog-content">
                            <Typography>
                                ההרשמה בוצעה בהצלחה. לחץ על אישור כדי לחזור לדף הבית.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button className="button-confirm" onClick={handleClose} autoFocus>
                                אישור
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Box>
        </Container>
    );
};

export default SignUp;


