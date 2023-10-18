import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';
import { getRandomCampaignImage } from '../utils/imagePicker';

const Profile = () => {
  const { username: userParam } = useParams();
  if (userParam == undefined ){
    console.log("viewing own profile");
  } else {
    console.log(userParam);
  }

  const { loading, data, error } = useQuery(QUERY_ME);

  const user = data?.getMe || {};
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

  // //populate background images
  const randomCampaignImage1 = getRandomCampaignImage();
  const randomCampaignImage2 = getRandomCampaignImage();
  const randomCampaignImage3 = getRandomCampaignImage();

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
        <span className="standout">{user?.username || 'null'}{' '}</span>
        <span className="profile-email">({user?.email || 'null'})</span>
      </h2>
      <p className="profile-created">
        Account created on: {user?.createdOn || 'null'}
      </p>
    </div>

    <div className="profile-image">
      <img src="https://placehold.co/100x100.png"></img>
    </div>
  </div>

    <div className="profile-cards">
      <div className="profile-card" style={{
          backgroundImage: `url(${randomCampaignImage1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'}}>
        <p className="profile-card-title">Friends</p>
        <p className="profile-number">##</p>
      </div>
      <div className="profile-card" style={{
          backgroundImage: `url(${randomCampaignImage2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'}}>
      <p className="profile-card-title">Campaigns Created</p>
        <p className="profile-number">##</p>
      </div>
      <div className="profile-card" style={{
          backgroundImage: `url(${randomCampaignImage3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'}}>
      <p className="profile-card-title">Campaigns Joined</p>
        <p className="profile-number">##</p>
      </div>
    </div>

    </div>
  </div>
 );
};


export default Profile;