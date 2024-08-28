import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogPopUp from "../BlogPopUp/BlogPopUp"; 
import { useUser } from "../../Hooks/useUser";

const Header = ({ isMyBlogsActive, refreshBlogs }) => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const userName = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    logoutUser();
    navigate("/login");
  };

  const handleCreateBlogClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    refreshBlogs()
    setIsPopupOpen(false);
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/home")}>
        BlogosHub
      </div>
      {isMyBlogsActive && (
        <div className="create-blog-button" onClick={handleCreateBlogClick}>
          Create Blog
        </div>
      )}
      {userName ? (
        <div className="user-icon" onClick={toggleMenu}>
          {userName.charAt(0).toUpperCase()}
        </div>
      ) : (
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
      )}
      {isMenuOpen && (
        <div className="menu">
          {userName ? (
            <>
              {isMyBlogsActive ? (
                <p onClick={() => navigate("/home")}>Home</p>
              ) : (
                <p onClick={() => navigate("/myblogs")}>My Blogs</p>
              )}
              <p onClick={handleSignOut}>Sign Out</p>
            </>
          ) : (
            <>
              <p onClick={() => navigate("/login")}>Login</p>
              <p onClick={() => navigate("/register")}>Sign Up</p>
            </>
          )}
        </div>
      )}
      {isPopupOpen && <BlogPopUp closePopup={closePopup} refreshBlogs={refreshBlogs} />} 
    </header>
  );
};

export default Header;
