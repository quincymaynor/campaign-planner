import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import { QUERY_CAMPAIGN } from '../utils/queries';
import AuthService from '../utils/auth';
import Tools from '../components/Tools';
import NoteList from '../components/NoteList';

const Campaign = () => {
    // Get campaign id from the url
    let { campaignId } = useParams();

    const { loading, data, error } = useQuery(QUERY_CAMPAIGN, {
        variables: { campaignId: campaignId },
    });

    const campaign = data?.getCampaign || {};
    const privateNotes = data?.getCampaign.privateNotes || [];
    const publicNotes = data?.getCampaign.publicNotes || [];
    // console.log('Loading:', loading);
    // console.log('Error:', error);
    // console.log('Data:', data);

    // Check if the user is authenticated
    if (!AuthService.loggedIn()) {
        // Redirect to the login page or show a message
        return (
            <h4>
                Sign up or log in to see this!
            </h4>
        );
    }

    return (
    <main>
      <div className="dashboard">
        <Tools/>
        
      </div>
      <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="dashboard-container">
                <div className="text-center mt-3">
                    <h1>{campaign?.campaignTitle}</h1>
                </div>
                <div className="flex-row justify-center">
                    <div className="col-12 col-md-10 mb-3 p-3">
                        <div className="campaign-card-container">
                            <div>
                                <NoteList
                                    notes={privateNotes}
                                    title="My Private Notes"
                                />
                                <NoteList
                                    notes={publicNotes}
                                    title="My Public Notes"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}
        </div>
    </main>
    );
};


export default Campaign;