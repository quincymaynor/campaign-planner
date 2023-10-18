import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CAMPAIGN } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const CampaignForm = () => {
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addCampaign, { error }] = useMutation
  (ADD_CAMPAIGN, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addThought({
        variables: {
          campaignTitle,
          campaignDescription,
          campaignAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setCampaignTitle('');
      setCampaignDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'campaignDescription' && value.length <= 500) {
      setCampaignDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3></h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 500 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/500
          </p>
          <form
            className=""
            onSubmit={handleFormSubmit}
          >
            <div className="">
              <textarea
                name=""
                placeholder=""
                value={thoughtText}
                className=""
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="">
              <button className="" type="submit">
                Add Campaign
              </button>
            </div>
            {error && (
              <div className="">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to make a campaign. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CampaignForm;
