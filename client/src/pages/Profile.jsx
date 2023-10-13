import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  // Check if the user is authenticated
  if (!AuthService.loggedIn()) {
    // Redirect to the login page or show a message
    return <Navigate to="/login" />;
  }

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        Sign up or log in to see this!
      </h4>
    );
  }

  return (
    <div>
      <div className="">
        <h2 className="">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>
    </div>
  );
};

export default Profile;