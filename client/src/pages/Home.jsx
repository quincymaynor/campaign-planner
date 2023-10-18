import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'; // Import useQuery from Apollo Client
import { QUERY_ME } from '../utils/queries'; // Import your QUERY_ME if it's not already imported
import AuthService from '../utils/auth';
import CampaignList from '../components/CampaignList';

const Home = () => {
  const isLoggedIn = AuthService.loggedIn();
  const username = isLoggedIn ? AuthService.getProfile().authenticatedPerson.username : '';
  const { data } = useQuery(QUERY_ME)

  const user = data?.getMe || {};
  const gmCampaigns = data?.getMe.gmCampaigns || [];
  const playerCampaigns = data?.getMe.playerCampaigns || [];

  console.log('Data:', data);
  console.log('gmCampaigns', gmCampaigns);
  console.log('user', user);

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
                    <div>
                      <CampaignList
                        campaigns={gmCampaigns}
                        title="GM Campaigns"
                      />
                      <CampaignList
                        campaigns={playerCampaigns}
                        title="Player Campaigns"
                      />
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