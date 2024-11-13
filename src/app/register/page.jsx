"use client";

import { useEffect, useState } from "react";
import "./Register.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const Register = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [disableBtn, setDisableBtn] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };


  const registerBtnClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/register", userData);
      if (response.data) {
        console.log("Registration Successful", response.data);
        router.push("/login");
      } else {
        toast.error("Registration Failed");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };


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

      <input
        type="email"
        name="email"
        className="email"
        placeholder="Email Address"
        value={userData.email}
        onChange={handleInputChange}
      />

      <input
        type="password"
        name="password"
        className="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleInputChange}
      />

      <button
        className="register-btn"
        onClick={registerBtnClick}
        disabled={disableBtn || isLoading} 
      >
        {isLoading ? "Registering..." : disableBtn ? "No Register" : "Register"}
      </button>

      <div className="below-btn">
        <p>Already have an Account?</p> <Link href={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
