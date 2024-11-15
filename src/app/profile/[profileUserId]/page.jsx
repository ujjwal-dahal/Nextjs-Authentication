"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import defaultUser from "../.././../../public/images/defaultUser.avif";
import "./EachUserProfile.scss";
import { use } from "react";
export default function EachUserProfile({ params }) {

  let wrappedParams = use(params);
  const userId = wrappedParams.profileUserId; 


  const [userData, setUserData] = useState({
    email: "",
    username: "",
  });

  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null); 

  // Fetching user data from the API
  const fetchUserData = async () => {
    try {
      const response = await axios.post("/api/users/me", {});
      if (userId === response.data.data._id) {
        setUserData(response.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);


  const handleFileChange = (event) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const allowedTypes = ["image/jpeg","image/png","image/gif","image/jpg"];
      if(allowedTypes.includes(selectedImage.type)){
        setImage(selectedImage); 
        setImageName(selectedImage.name); 
      }
      else{
        toast.error('Please upload a valid image file (JPEG, PNG, JPG or GIF).')
        setImage(null)
        setImageName("")
      }
    }
  };


  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please choose an Image first.");
      return;
    }

    const formData = new FormData();
    formData.set("userImage" , image);

    try {
      const response = await axios.post("/api/users/userimageupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      setImage(null)
      setImageName("")
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="each-profile">
      <p className="title">Your Profile</p>

      <div className="image-container">
        <Image src={defaultUser} className="default-user" alt="User Profile" />
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
