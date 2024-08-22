import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useBlogs } from "../../Hooks/useBlogs";

function BodyOfBlogs() {
  const { viewBlogs,blogs } = useBlogs();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      await viewBlogs();
      setLoading(false);
    };
    fetchBlogs();
  }, [viewBlogs]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div style={{ backgroundColor: "#000" }} className="card-container">
      {blogs?.map((obj) => {
        return (
          <Card
            title={obj.title}
            authName={obj.userName}
            text={obj.content}
          />
        );
      })}
    </div>
  );
}

export default BodyOfBlogs;
