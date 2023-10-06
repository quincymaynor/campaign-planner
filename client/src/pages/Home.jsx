import React from 'react';
import AuthService from '../utils/auth'; // Import your AuthService

const Home = () => {
  const isLoggedIn = AuthService.loggedIn(); // Check if the user is logged in

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 mb-3 p-3">
          {isLoggedIn ? (
            <h2>Welcome home, {AuthService.getProfile().authenticatedPerson.username}!</h2>
          ) : (
            <h2>Please log in or sign up to access this page.</h2>
          )}
          {isLoggedIn && (
            // Render additional content for logged-in users
            <div>
              {/* You can add more content here */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;