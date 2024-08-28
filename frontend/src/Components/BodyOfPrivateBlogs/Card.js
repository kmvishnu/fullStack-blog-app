import React, { useState } from "react";
import "./Card.css";
import BlogPopUp from "../BlogPopUp/BlogPopUp";  
import { useBlogs } from "../../Hooks/useBlogs";

const Card = ({ id, title, authName, text , refreshBlogs}) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const { deleteBlog} = useBlogs();


  const handleViewClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    refreshBlogs()
  };

  const handleEditClick = () => {
    setIsEditPopupVisible(true);
  };

  const handleDeleteClick=async ()=>{
    await deleteBlog(id);
    refreshBlogs()
  }

  const handleCloseEditPopup = () => {
 
    setIsEditPopupVisible(false);
    refreshBlogs()

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

      
      {isPopupVisible && (
        <div className="popup-overlay">
        <div className="popup-content">
            <div className="popup-header">
                <h2 className="popup-title">{title}</h2>
                <button onClick={handleClosePopup} className="close-popup-button">Close</button>
            </div>
            <div className="popup-body">
                <p>{text}</p>
            </div>
        </div>
    </div>
      )}

      
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
