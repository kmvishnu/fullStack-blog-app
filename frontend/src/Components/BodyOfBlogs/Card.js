import React from 'react';
import './Card.css'; 

const Card = ({ title, authName, text }) => {
    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-authName">{authName}</p>
            <p className="card-text">{text}</p>
        </div>
    );
};

export default Card;
