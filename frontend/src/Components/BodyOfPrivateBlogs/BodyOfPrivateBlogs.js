import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useBlogs } from "../../Hooks/useBlogs";

function BodyOfPrivateBlogs() {
  const { viewPrivateBlogs,privateBlogs } = useBlogs();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      await viewPrivateBlogs();
      setLoading(false);
    };
    fetchBlogs();
  }, [viewPrivateBlogs]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div style={{ backgroundColor: "#000" }} className="card-container">
      {privateBlogs?.map((obj) => {
        return (
          <Card
          id={obj._id}
            title={obj.title}
            authName={obj.userName}
            text={obj.content}
          />
        );
      })}
    </div>
  );
}

export default BodyOfPrivateBlogs;
