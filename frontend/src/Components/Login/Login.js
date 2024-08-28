import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Hooks/useUser";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { loginUser, error } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
    setIsPasswordValid(validatePassword(password));
  }, [email, password]);

  useEffect(() => {
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    try {
      setLoading(true);
      const response = await loginUser(userData);
      if (response.status === "success") {
        setLoading(false);
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/home", { replace: true });
      }
      setLoading(false);

    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 onClick={() => navigate("/home")}>BlogosHub</h2>
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
          {emailTouched && emailError && (
            <p className="error-message">{emailError}</p>
          )}
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
          {passwordTouched && passwordError && (
            <p className="error-message">{passwordError}</p>
          )}
        </div>
        <button type="submit" className="login-button" disabled={!isFormValid}>
          {loading ? "Loading..." : "Login"}
        </button>
        {error && (
            <p className="error-message">{error}</p>
          )}
        <br />
        <p
          onClick={() => {
            navigate("/register");
          }}
        >
          Don't have an account? Sign Up
        </p>
      </form>
    </div>
  );
};

export default Login;
