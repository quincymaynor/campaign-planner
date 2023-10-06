import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';

const Header = () => {
  // Check if the user is logged in
  const isLoggedIn = AuthService.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    AuthService.logout(); // Use AuthService for logout
  };

  return(
  <header>
  <div className="container">
    <div className="header-content">
      <Link to="/">
        <h1>Campaign Planner</h1>
      </Link>
      <p>All of your campaign notes in one place.</p>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile">{AuthService.getProfile().authenticatedPerson.username}'s Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  </div>
</header>
  );
};

export default Header;
