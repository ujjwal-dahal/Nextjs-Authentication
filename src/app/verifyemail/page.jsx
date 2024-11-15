"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import "./VerifyEmail.scss";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [userVerified, setUserVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyClickBtn = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("Verification Successful", response.data);
      toast.success("Verification Successful");
      setError(false);
      setUserVerified(true);
    } catch (error) {
      setError(true);
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
    <div className="verify-email">
      <h1>Verify Email</h1>
      <p>Verification Status: {userVerified ? "Verified" : "Pending"}</p>
      <button className="verify-email-btn" onClick={verifyClickBtn}>
        Verify
      </button>
      {userVerified && !error && (
        <div className="after-verification">
          <p>Now You Can Login</p>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
