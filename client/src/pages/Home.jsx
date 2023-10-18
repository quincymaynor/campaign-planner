import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'; // Import useQuery from Apollo Client
import { QUERY_ME } from '../utils/queries'; // Import your QUERY_ME if it's not already imported
import AuthService from '../utils/auth';
import Tools from '../components/Tools';
import CampaignList from '../components/CampaignList';

const Home = () => {
  const isLoggedIn = AuthService.loggedIn();
  const username = isLoggedIn ? AuthService.getProfile().authenticatedPerson.username : '';
  const { data } = useQuery(QUERY_ME)

  const gmCampaigns = data?.getMe.gmCampaigns || [];
  const playerCampaigns = data?.getMe.playerCampaigns || [];

  return (
    <main>
      <div className="dashboard">
        <Tools/>
        <div className="dashboard-container">
          <div className="text-center mt-3">
            <h1>Dashboard</h1>
          </div>
          <div className="flex-row justify-center">
            <div className="col-12 col-md-10 mb-3 p-3">
              <div>
                <div className="campaign-card-container">
                  <div>
                    <CampaignList
                      campaigns={gmCampaigns}
                      title="Owned Campaigns"
                    />
                    <CampaignList
                      campaigns={playerCampaigns}
                      title="Joined Campaigns"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;