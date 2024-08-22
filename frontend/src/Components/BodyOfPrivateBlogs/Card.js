import React, { useState } from "react";
import "./Card.css";
import BlogPopUp from "../BlogPopUp/BlogPopUp";  
import { useBlogs } from "../../Hooks/useBlogs";

const Card = ({ id, title, authName, text }) => {

    console.log("carrrrd",id)
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const { viewBlogs, viewPrivateBlogs, deleteBlog} = useBlogs();


  const handleViewClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleEditClick = () => {
    setIsEditPopupVisible(true);
  };

  const handleDeleteClick=async ()=>{
    await deleteBlog(id);
    viewPrivateBlogs();
  }

  const handleCloseEditPopup = () => {
 
    setIsEditPopupVisible(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions">
          <button onClick={handleViewClick} className="action-button">👁️</button>
          <button onClick={handleEditClick} className="action-button">✏️</button>
          <button className="action-button" onClick={handleDeleteClick}>🗑️</button>
        </div>
      </div>
      <p className="card-authName">{authName}</p>
      <p className="card-text">{text}</p>

      {/* Popup for viewing the blog details */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{title}</h2>
            <p>{text}</p>
            <button onClick={handleClosePopup} className="close-popup-button">Close</button>
          </div>
        </div>
      )}

      {/* Popup for editing the blog */}
      {isEditPopupVisible && (
        <BlogPopUp
          closePopup={handleCloseEditPopup}
          blogData={{ id, title, content: text }} 
        />
      )}
    </div>
  );
};

export default Card;
