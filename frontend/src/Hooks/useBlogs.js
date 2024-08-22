import { useCallback, useEffect, useState } from "react";
import api from "../Components/Common/axios";
import { useDispatch } from "react-redux";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [privateBlogs, setPrivateBlogs] = useState([]);
  const dispatch = useDispatch();

  const viewBlogs = useCallback(async () => {
    try {
      const response = await api.get("/viewAllBlogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  }, []);

  const viewPrivateBlogs = useCallback(async () => {
    try {
      const response = await api.get("/viewPrivateBlogs");
      setPrivateBlogs(response.data);
    } catch (error) {
      console.error("Error fetching private blogs", error);
    }
  }, []);

  const createBlog = async (payload) => {
    try {
      const response = await api.post("/createBlog", payload, {
        dispatch,
      });

      await viewBlogs();
      await viewPrivateBlogs();

      return response.data;
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };

  const editBlog = async (payload) => {
    console.log("payload", payload);
    try {
      const response = await api.put("/editBlog", payload, {
        dispatch,
      });

      await viewBlogs();
      await viewPrivateBlogs();

      return response.data;
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await api.delete(`/deleteBlog/${id}`, {
        dispatch,
      });
      return response;
    } catch (error) {
      console.error("Error deleting blog", error);
    } finally {
    }
  };


  return {
    privateBlogs,
    viewPrivateBlogs,
    createBlog,
    viewBlogs,
    blogs,
    editBlog,
    deleteBlog,
  };
};
