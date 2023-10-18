import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import { QUERY_CAMPAIGN } from '../utils/queries';
import AuthService from '../utils/auth';

const Campaign = () => {
    let { campaignId } = useParams(); // <-- is this right?
    // if (userParam == undefined) {
    //     console.log("viewing own profile");
    // } else {
    //     console.log(userParam);
    // }

    const { loading, data, error } = useQuery(QUERY_CAMPAIGN, {
        variables: { campaignId: campaignId },
    });

    const campaign = data?.getCampaign || {};
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Data:', data);

    // // Check if the user is authenticated
    // if (!AuthService.loggedIn()) {
    //     // Redirect to the login page or show a message
    //     return (
    //         <h4>
    //             Sign up or log in to see this!
    //         </h4>
    //     );
    // }

    return (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
                <h1>
                    {campaign?.campaignTitle}
                </h1>
                <p>
                    Campaign Created: {campaign.createdAt}
                </p>
            </div>
          )}
        </div>
    );
};


export default Campaign;