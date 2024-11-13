"use client";

import DatabaseConnection from "@/dbConnection/dbConnection";
import "./EachUserProfile.scss";
import User from "@/models/userModel";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

DatabaseConnection();

export default function EachUserProfile({ params }: any) {
  const [userData, setUserData] = useState({
    email: "",
    username: ""
  });

  const { profileUserId } = params;

  const fetchUserData = async () => {
    try {
      const user = await User.findOne({ _id: profileUserId });
      if (!user) {
        toast.error("User Not Found");
        return;
      }
      setUserData({
        email: user.email,
        username: user.username
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [profileUserId]);

  return (
    <div className="each-profile">
      <p className="username">Username: {userData.username}</p>
      <p className="email">Email: {userData.email}</p>
    </div>
  );
}
