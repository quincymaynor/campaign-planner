import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import { QUERY_CAMPAIGN } from '../utils/queries';
import AuthService from '../utils/auth';

const Campaign = () => {
    const { campaignId: userParam } = useParams(); // <-- is this right?
    if (userParam == undefined) {
        console.log("viewing own profile");
    } else {
        console.log(userParam);
    }

    const { loading, data, error } = useQuery(QUERY_CAMPAIGN);

    const campaign = data?.user || {};
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Data:', data);

    // Check if the user is authenticated
    if (!AuthService.loggedIn()) {
        // Redirect to the login page or show a message
        return (
            <h4>
                Sign up or log in to see this!
            </h4>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>
                {userParam ? `${campaign?.campaignTitle}` : 'Campaign title here'} {/* is this syntax right? */}
            </h1>
            <p>
                Campaign Created: {campaign.createdAt}
            </p>
        </div>
    );
};


export default Campaign;