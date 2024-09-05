import React, { useState, useEffect } from "react";
import "./BlogPopUp.css";
import { useBlogs } from "../../Hooks/useBlogs";

const BlogPopUp = ({ closePopup, blogData = null }) => {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(blogData?.title || "");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);

  const [content, setContent] = useState(blogData?.content || "");
  const [isContentValid, setIsContentValid] = useState(false);
  const [contentError, setContentError] = useState("");
  const [contentTouched, setContentTouched] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);


  const { createBlog, editBlog } = useBlogs();

  const validateTitle = (title) => {
    if (!title) {
      setTitleError("title is required");
      return false;
    } else if (title.length <= 2 || title.length >= 50) {
      setTitleError("Title must be between 2 and 50 characters");
      return false;
    } else {
      setTitleError("");
      return true;
    }
  };

  const validateContent = (content) => {
    if (!content) {
      setContentError("content is required");
      return false;
    } else if (content.length <= 10 || content.length >= 1000) {
      setContentError("Content must be between 10 and 1000 characters");
      return false;
    } else {
      setContentError("");
      return true;
    }
  };

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setContent(blogData.content);
    }
  }, [blogData]);

  useEffect(() => {
    setIsTitleValid(validateTitle(title));
    setIsContentValid(validateContent(content));
  }, [title, content]);

  useEffect(() => {
    setIsFormValid(isTitleValid && isContentValid);
  }, [isTitleValid, isContentValid]);

  const handleSubmit = async () => {
    const blogPayload = {
      data: {
        title: title,
        content: content,
      },
    };
    try {
      setLoading(true);
      let response;
      if (blogData) {
        response = await editBlog({
          data: {
            id: blogData.id,
            title: title,
            content: content,
          },
        });
      } else {
        response = await createBlog(blogPayload);
      }

      if (response.status === true || response.status === "success") {
        setLoading(false);
        closePopup();
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{blogData ? "Edit Blog" : "Create a New Blog"}</h2>
        <input
          type="text"
          placeholder="Enter blog title..."
          className="blog-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTitleTouched(true)}
          required
        />
        {titleTouched && titleError && (
          <p className="error-message">{titleError}</p>
        )}
        <textarea
          placeholder="Enter blog content..."
          className="blog-content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setContentTouched(true)}
          required
        ></textarea>
        {contentTouched && contentError && (
          <p className="error-message">{contentError}</p>
        )}
        <div className="popup-buttons">
          <button onClick={closePopup}>Cancel</button>
          <button
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPopUp;
