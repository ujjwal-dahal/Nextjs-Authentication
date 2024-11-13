"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import "./VerifyEmail.scss";

export default function VerifyEmail() {
  const [token, setToken] = useState<string>(""); 
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [error , setError] = useState<boolean>(false) 

  const verifyClickBtn = async () => {
    
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("Verification Successful", response.data);
      toast.success("Verification Successful");
      setError(false)
      setUserVerified(true);
    } catch (error: any) {
      setError(true)
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Access token directly from URL using window.location.search
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken); 
    }
  }, []);

  return (
    <>
      <div className="verify-email">
        <h1>Verify Email</h1>
        <p>Verification Status: {userVerified ? "Verified" : "Pending"}</p>
        <p className="token">Your Token: {token || "No Token"}</p>
        <button className="verify-email" onClick={verifyClickBtn}>
          Verify
        </button>
        {userVerified && !error && (
          <div className="after-verification">
            <p>Now You Can Login</p>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </>
  );
}
