import { useCallback, useState } from "react";
import api, { useAxiosInterceptor } from "../Components/Common/axios";

export const useBlogs = () => {
  useAxiosInterceptor(); // Set up the interceptor
  const [blogs, setBlogs] = useState([]);
  const [privateBlogs, setPrivateBlogs] = useState([]);

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
    }
  }, []);

  const createBlog = async (payload) => {
    try {
      const response = await api.post("/createBlog", payload);

      await viewBlogs();
      await viewPrivateBlogs();

      return response.data;
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };

  const editBlog = async (payload) => {
    try {
      const response = await api.put("/editBlog", payload);

      await viewBlogs();
      await viewPrivateBlogs();

      return response.data;
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await api.delete(`/deleteBlog/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting blog", error);
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
