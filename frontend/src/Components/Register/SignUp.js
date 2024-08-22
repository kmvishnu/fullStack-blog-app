import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const [name, setName] = useState("")
    const [isNameValid, setIsNameValid] = useState(false);
    const [nameError, setNameError] = useState("");
    const [nameTouched, setNameTouched] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);


    useEffect(() => {
        setIsEmailValid(validateEmail(email));
        setIsPasswordValid(validatePassword(password));
        setIsConfirmPasswordValid(validateConfirmPassword(confirmPassword));
        setIsNameValid(validateName(name))
    }, [email, password, name, confirmPassword]);

    useEffect(() => {
        setIsFormValid(isEmailValid && isPasswordValid && isNameValid && isConfirmPasswordValid);
    }, [isEmailValid, isPasswordValid, isNameValid, isConfirmPasswordValid]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email is required");
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password is required");
            return false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords are not maching");
            return false;
        } else {
            setConfirmPasswordError("");
            return true;
        }
    };

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError("Password is required");
            return false;
        } else if (password.length <= 3 || password.length >= 20) {
            setPasswordError("Password must be between 4 and 20 characters");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const validateName = (name) => {
        if (!name) {
            setNameError("Name is required");
            return false;
        } else if (name.length <= 1 || name.length >= 20) {
            setNameError("Name must be between 2 and 20 characters");
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
      
    };

    return (
        <div className="signUp-container">
            <form className="signUp-form" onSubmit={handleSubmit}>

                <h2>signUp</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setNameTouched(true)}
                        required
                    />
                    {nameTouched && nameError && <p className="error-message">{nameError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        required
                    />
                    {emailTouched && emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setPasswordTouched(true)}
                        required
                    />
                    {passwordTouched && passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmPasswordTouched(true)}
                        required
                    />
                    {confirmPasswordError && confirmPasswordTouched && <p className="error-message">{confirmPasswordError}</p>}
                </div>
                <button type="submit" className="signUp-button" disabled={!isFormValid}>SignUp</button>
                <p onClick={() => { navigate("/login") }}>Already have an account? Sign In</p>
            </form>

        </div>
    );
};

export default SignUp;
