"use client"

import { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import defaultUser from "../../../../public/images/defaultUser.avif";
import "./EachUserProfile.scss";

export default function EachUserProfile({ params }) {
  const wrappedParams = use(params);
  const userId = wrappedParams.profileUserId;

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    profileImage: "",
  });

  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);

  // Fetch user data, including profileImage URL
  const fetchUserData = async () => {
    try {
      const response = await axios.post("/api/users/me", {});
      if (response.data.data._id === userId) {
        const imageUrlLocalStorage = localStorage.getItem(response.data.data._id );
        setUserData((prevData) => ({
          ...prevData,
          email: response.data.data.email,
          username: response.data.data.username,
          profileImage: imageUrlLocalStorage || defaultUser,
        }));
      }
    } catch (error) {
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserImage = async ()=>{
    try {
      const getResponse = await axios.get("/api/users/upload-image");
      const { imageUrl } = getResponse.data?.userData;
      localStorage.setItem(userId , imageUrl)
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchUserImage();
  },[])

  const handleFileChange = (event) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (allowedTypes.includes(selectedImage.type)) {
        setImage(selectedImage);
        setImageName(selectedImage.name);
      } else {
        toast.error("Please upload a valid image file (JPEG, PNG, JPG, or GIF).");
        setImage(null);
        setImageName("");
      }
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please choose an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("userImage", image);
    formData.append("userImageId", userId);

    try {
      const response = await axios.post("/api/users/upload-image", formData);
      if (response.data.success) {
        toast.success("File uploaded successfully!");
        setImage(null);
        setImageName("");

        // Update the profileImage state with the new image URL
        setUserData((prevData) => ({
          ...prevData,
          profileImage: response.data.imageUrl,
        }));

        // Store the image URL in localStorage to persist the state across sessions
        localStorage.setItem(userId, response.data.imageUrl);
      }
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="each-profile">
      <p className="title">Your Profile</p>
      <div className="image-container">
        <Image
          src={userData.profileImage || defaultUser}
          className="default-user"
          alt="User Profile"
          width={150}
          height={150}
        />
        <input
          type="file"
          name="userImage"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" className="choose-file-btn">
          Choose File
        </label>
        <p className="file-name">{imageName && `Selected File: ${imageName}`}</p>
        <button onClick={handleFileUpload}>Change Profile</button>
      </div>
      <p className="username">Username: {userData.username}</p>
      <p className="email">Email: {userData.email}</p>
    </div>
  );
}
