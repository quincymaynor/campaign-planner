import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';

const Tools = () => {
    const isLoggedIn = AuthService.loggedIn();
  
    return (
        <div className="menu-container">
            <div className="menu">
            <h2>Tools</h2>
            <ul>
                <li>
                <Link to="/create-campaign">Create Campaign</Link>
                </li>
                <li>
                <Link to="/create-note">Create Note</Link>
                </li>
                {/* Add more menu items as needed */}
            </ul>
            </div>
        </div>
      );
    };
  
export default Tools;
