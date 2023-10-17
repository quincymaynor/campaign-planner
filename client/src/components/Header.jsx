import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';
import logo from '../assets/images/logo.png';

const Header = () => {
  const isLoggedIn = AuthService.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
        {isLoggedIn ? (
          <Link to="/home" className="logo-container">
           <img src={logo} alt="Campaign Planner Logo" />
          </Link>
        ) : (
           <Link to="/" className="logo-container">
            <img src={logo} alt="Campaign Planner Logo" />
          </Link>
            )}
          <div className="header-buttons">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="header-button">
                  {AuthService.getProfile().authenticatedPerson.username}'s Profile
                </Link>
                <button className="header-button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="header-button">
                  Login
                </Link>
                <Link to="/signup" className="header-button">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
