import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import { QUERY_USER } from '../utils/queries';
import AuthService from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
console.log(userParam); // check if userParam is being extracted correctly


const { loading, data, error } = useQuery(QUERY_USER, {
  variables: { username: userParam },
  skip: !userParam, // Skip the query if userParam is not defined
});

  const user = data?.user || {};
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
      <div className="">
        <h2 className="">
        Viewing {userParam ? `${user?.username}'s` : 'your'} profile.
        </h2>
      </div>
    </div>
  );
};

export default Profile;