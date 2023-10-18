import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'; // Import useQuery from Apollo Client
import AuthService from '../utils/auth';
import Campaign from '../components/Campaign';
import { QUERY_ME } from '../utils/queries'; // Import your QUERY_ME if it's not already imported

const Home = () => {
  const isLoggedIn = AuthService.loggedIn();
  const username = isLoggedIn ? AuthService.getProfile().authenticatedPerson.username : '';
  const { loading, data } = useQuery(QUERY_ME)

  const gmCampaigns = data?.gmCampaigns || [];
  const playerCampaigns = data?.playerCampaigns || [];

  const user = data?.getMe || {};
  console.log('Loading:', loading);
  console.log('Data:', data);

  return (
    <main>
      <div className="dashboard">
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
        <div className="dashboard-container">
          <div className="text-center mt-3">
            <h1>Dashboard</h1>
          </div>
          <div className="flex-row justify-center">
            <div className="col-12 col-md-10 mb-3 p-3">
              {isLoggedIn ? (
                <h3 className="mt-2 mb-2">Welcome home, {username}!</h3>
              ) : (
                <h2>Please log in or sign up to access this page.</h2>
              )}
              {isLoggedIn && (
                <div>
                  <div className="campaign-card-container">
                    <h4 className="mt-3">My Campaigns:</h4>
                    <div className="row">
                      <Campaign title="Campaign 1" />
                      <Campaign title="Campaign 2" />
                      {/* Add more Campaign components for each campaign */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;