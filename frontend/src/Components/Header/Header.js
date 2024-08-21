import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="logo">BlogosHub</div>
            <div className="hamburger" onClick={toggleMenu}>
                &#9776;
            </div>
            {isMenuOpen && (
                <div className="menu">
                    <p>Login</p>
                    <p>Sign Up</p>
                </div>
            )}
        </header>
    );
};

export default Header;
