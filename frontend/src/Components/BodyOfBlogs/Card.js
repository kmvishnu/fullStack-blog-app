import React, { useState } from 'react';
import './Card.css';

const Card = ({ title, authName, text }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);


    const handleViewClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };


    return (<div className="card">
        <div className="card-header">
            <h2 className="card-title">{title}</h2>
            <div className="card-actions">
                <button onClick={handleViewClick} className="action-button">👁️</button>

            </div>
        </div>
        <p className="card-authName">{authName}</p>
        <p className="card-text">{text}</p>


        {isPopupVisible && (
            <div className="popup-overlay">
                <div className="popup-content">
                    <div style={{position:'sticky', top:0 , backgroundColor: 'white'}}>

                    <h2 >{title}</h2>
                    <button onClick={handleClosePopup} className="close-popup-button">Close</button>
                    </div>
                    <p>{text}</p>
                </div>
            </div>
        )}
    </div>
    );
};

export default Card;
