"use client";

import DatabaseConnection from "@/dbConnection/dbConnection";
import "./EachUserProfile.scss";
import User from "@/models/userModel";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";


export default function EachUserProfile({ params }: any) {
  const [userData, setUserData] = useState({
    email: "",
    username: ""
  });

  const userId = params.profileUserId;

  const fetchUserData = async () => {
    try {

      let response = await axios.post("/api/users/me",{});
      if(userId=== response.data.data._id){
        setUserData(response.data.data)
      }
           
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div className="each-profile">
    <p className="title">Your Profile</p>
      <p className="username">Username: {userData.username}</p>
      <p className="email">Email: {userData.email}</p>
    </div>
  );
}
