import React from "react";
import Card from "./Card";

function BodyOfPrivateBlogs(props) {



  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ backgroundColor: "#000" }} className="card-container">
      {props.privateBlogs?.map((obj, key) => (
        <Card
        refreshBlogs={props.refreshBlogs}
          key={key}
          id={obj._id}
          title={obj.title}
          authName={obj.userName}
          text={obj.content}
        />
      ))}
    </div>
  );
}

export default BodyOfPrivateBlogs;
