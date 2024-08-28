import React, { useState, useEffect } from "react";
import "./BlogPopUp.css";
import { useBlogs } from "../../Hooks/useBlogs";

const BlogPopUp = ({ closePopup, blogData = null }) => {
  const [title, setTitle] = useState(blogData?.title || "");
  const [content, setContent] = useState(blogData?.content || "");
  const [loading, setLoading] = useState(false);

  const { createBlog, editBlog } = useBlogs();  

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setContent(blogData.content);
    }
  }, [blogData]);

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
  
      if (response.status === true || response.status==='success') {
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
        />
        <textarea
          placeholder="Enter blog content..."
          className="blog-content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="popup-buttons">
          <button onClick={closePopup}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPopUp;
