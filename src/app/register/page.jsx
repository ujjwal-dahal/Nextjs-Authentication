"use client";

import { useEffect, useState } from "react";
import "./Register.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import * as Yup from "yup";

const Register = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));

    // Clear individual field errors as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle form submission
  const registerBtnClick = async () => {
    try {
      setIsLoading(true);

      // Validate userData against the schema
      await validationSchema.validate(userData, { abortEarly: false });

      // Make the API call to register
      const response = await axios.post("/api/users/register", userData);

      if (response.data) {
        toast.success("Registration Successful");
        router.push("/verificationpage");
      } else {
        toast.error("Registration Failed");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        // Extract validation errors from Yup
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        // Handle other errors (e.g., API errors)
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Enable/disable the Register button based on field values
  useEffect(() => {
    const { username, email, password } = userData;
    setDisableBtn(!(username && email && password));
  }, [userData]);

  return (
    <div className="registration-page">
      <p>Registration</p>

      <input
        type="text"
        name="username"
        className="username"
        placeholder="Username"
        value={userData.username}
        onChange={handleInputChange}
      />
      {errors.username && <p className="error">{errors.username}</p>}

      <input
        type="email"
        name="email"
        className="email"
        placeholder="Email Address"
        value={userData.email}
        onChange={handleInputChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type="password"
        name="password"
        className="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleInputChange}
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <button
        className="register-btn"
        onClick={registerBtnClick}
        disabled={disableBtn || isLoading}
      >
        {isLoading ? "Registering..." : disableBtn ? "Fill All Fields" : "Register"}
      </button>

      <div className="below-btn">
        <p>Already have an Account?</p> <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
