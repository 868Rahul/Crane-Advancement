import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from '../../assets/craneLogo.png'; // Update this path to match your logo file name

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in when component mounts and when it updates
  useEffect(() => {
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      setIsLoggedIn(userLoggedIn);
    };
    
    // Check immediately when component mounts
    checkLoginStatus();
    
    // Set up an interval to check periodically
    const intervalId = setInterval(checkLoginStatus, 1000);
    
    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);
  
  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication state
    localStorage.setItem('userLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <img src={logoImage} alt="Crane Logo" className="header-logo" />
          <h1 className="logo"> CRANE</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/"><i className="fa-solid fa-house"></i> Home</Link></li>
            <li><Link to="/about"><i className="fa-solid fa-user"></i> About</Link></li>
            <li><Link to="/services"><i className="fa-solid fa-screwdriver-wrench"></i> Services</Link></li>
            <li><Link to="/contact"><i className="fa-solid fa-phone"></i> Contact</Link></li>
            <li><Link to="/ToolkitPage"><i className="fa-solid fa-toolbox"></i> Toolkit</Link></li>
          </ul>
        </nav>
        <div className="auth-button">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          ) : (
            <Link to="/signin" className="signin-btn">
              <i className="fa-solid fa-right-to-bracket"></i> Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;