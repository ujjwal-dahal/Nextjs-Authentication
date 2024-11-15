"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.scss";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me", {});
      const fetchedUserId = response.data.data._id;
      setUserId(fetchedUserId);
      console.log(fetchedUserId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      router.push(`/profile/${userId}`);
    }
  }, [userId, router]);

  return (
    <div className="profile">
      <p>Profile Section</p>
      {userId===null ? (
        <p>Nothing To Show</p>
      ) : (
        <>
          <button onClick={getUserDetails} className="profile-btn">
            See Your Profile
          </button>
          <button className="logout-btn" onClick={logoutHandler}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}
