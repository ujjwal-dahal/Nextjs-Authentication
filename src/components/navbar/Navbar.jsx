"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Navbar.scss";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Navbar() {
  const [isCookie, setIsCookie] = useState(false);
  const router = useRouter();


  const fetchToken = async ()=>{
    let response = await axios.get("/api/users/getcookie");
    if(response.data.cookieData){
      setIsCookie(true)
    }
  }

  
  useEffect(() => {
    fetchToken();
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div className="navbar">
      <Link href={"/"}>Home</Link>
      <div className="link">
        {!isCookie && (
          <>
            <button className="register" onClick={() => router.push("/register")}>Register</button>
            <button className="login" onClick={() => router.push("/login")}>Login</button>
          </>
        )}
        {isCookie && (
          <button className="logout" onClick={logoutHandler}>Logout</button>
        )}
      </div>
    </div>
  );
}
