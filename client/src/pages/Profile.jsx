import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  if (userParam == undefined ){
    console.log("viewing own profile");
  } else {
    console.log(userParam);
  }

  const { loading, data, error } = useQuery(QUERY_ME);

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
    <div className="profile">
        <h2 className="">
        Viewing {userParam ? `${user?.username}'s` : 'your'} profile.
        </h2>

      <div className="profile-container">
  <div className="profile-info">
    <div className="profile-text">
      <h2 className="profile-username">
        {user?.username || 'null'}{' '}
        <span className="profile-email">({user.email || 'null'})</span>
      </h2>
      <p className="profile-created">
        Account created on: {user.createdOn || 'null'}
      </p>
    </div>

    <div className="profile-image">
      <img src="https://placehold.co/100x100.png"></img>
    </div>
  </div>


    <div className="profile-cards">
      <div className="profile-card profile-card-1">
        <h3>Friends</h3>
        <p className="profile-number">##</p>
      </div>
      <div className="profile-card profile-card-2">
        <h3>Campaigns Created</h3>
        <p className="profile-number">##</p>
      </div>
      <div className="profile-card profile-card-3">
        <h3>Campaigns Joined</h3>
        <p className="profile-number">##</p>
      </div>
    </div>

    </div>
  </div>
 );
};


export default Profile;