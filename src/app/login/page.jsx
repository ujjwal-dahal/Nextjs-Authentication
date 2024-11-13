"use client";

import { useEffect, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const Register = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
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
      const response = await axios.post("/api/users/login", userData);
      if (response.data) {
        console.log("Login Successful", response.data);
        toast.success("Login Successfull")
        router.push("/profile");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const {email, password } = userData;
    setDisableBtn(!(email && password));
  }, [userData]);

  return (
    <div className="login-page">
      <p>Login</p>

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
        {isLoading ? "Logging..." : disableBtn ? "No Login" : "Login"}
      </button>

      <div className="below-btn">
        <p>New User?</p> <Link href={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Register;
