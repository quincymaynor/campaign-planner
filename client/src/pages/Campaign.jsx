import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';
import { UPDATE_CAMPAIGN, REMOVE_CAMPAIGN } from '../utils/mutations';
import AuthService from '../utils/auth';
import Tools from '../components/Tools';
import NoteList from '../components/NoteList';

const Campaign = () => {
    // Get campaign id from the URL
    const { campaignId } = useParams();

    const { _loading, data, _error } = useQuery(QUERY_CAMPAIGN, {
        variables: { campaignId: campaignId },
    });
    
    const [removeCampaign] = useMutation(REMOVE_CAMPAIGN, {});
    // const [updateCampaign] = useMutation(UPDATE_CAMPAIGN, {});
    
    const handleRemove = async (event) => {
      event.preventDefault();
      try {
        const { data } = removeCampaign({
          variables: {
            campaignId: campaignId
          },
        });
    
      } catch (err) {
        console.error(err);
      }
    };

    // const handleUpdate = async (event) => {
    //   event.preventDefault();
    //   try {
    //     const { data } = updateCampaign({
    //       variables: {
    //         campaignId: campaignId
    //       },
    //     });
    
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    
    const campaign = data?.getCampaign || {};
    const privateNotes = campaign.privateNotes || [];
    const publicNotes = campaign.publicNotes || [];

    const campaignCreatedOn = campaign.createdAt || null;
    const campaignDescription = campaign.campaignDescription || null;

    // Check if the user is authenticated
    if (!AuthService.loggedIn()) {
        // Redirect to the login page or show a message
        return (
            <h4>
                Sign up or log in to see this!
            </h4>
        );
    }
    
    console.log(`${campaign?.campaignImage}`);
    const imgStyle = {
        backgroundImage: `url('../Campaign-Images/${campaign?.campaignImage}')`,
      };

    return (
        <main>
        <div className="dashboard">
          <Tools />
          <div className="dashboard-container">
            <div className="text-center mt-3">
              <div className="campaign-details">
                <div className="campaign-details-left">
                  <h1 className="no-margin-bottom">{campaign?.campaignTitle}</h1>
                  {campaignCreatedOn ? (
                    <small className="campaign-created no-margin-top">
                      Campaign created on: {campaignCreatedOn}
                    </small>
                  ) : (
                    <small className="campaign-created no-margin-top">No Campaign Creation Date</small>
                  )}
                  {campaignDescription ? (
                    <p>{campaignDescription}</p>
                  ) : (
                    <p>There is no campaign description yet!</p>
                  )}
                </div>
                <div className="campaign-details-right">
                  <img src={`../Campaign-Images/${campaign?.campaignImage}`} alt="Campaign" className="campaign-image" />
                </div>
              </div>
              <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3">
                  <div>
                    <div className="campaign-card-container">
                      <div>
                        <NoteList
                          notes={privateNotes}
                          title="Private Notes"
                        />
                        <NoteList
                          notes={publicNotes}
                          title="Public Notes"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="campaign-buttons">
                    <button className="edit-button">Edit Campaign</button>
                    <button className="delete-button" onClick={handleRemove}>Delete Campaign</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
};

export default Campaign;