import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_NOTE } from '../utils/mutations';

import Auth from '../utils/auth';

const NoteForm = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [notePublic, setNotePublic] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [noteCampaign, setNoteCampaign] = useState(''); // Define noteCampaign state

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.getMe || {};

  const campaignOptions = user.gmCampaigns && user.gmCampaigns.length > 0
  ? [
      <option key="default" value="">
        Select Campaign
      </option>,
      ...user.campaigns.map((campaign) => (
        <option key={campaign.id} value={campaign.id}>
          {campaign.title}
        </option>
      ))
    ]
  : (
    <option key="default" value="">
      Select Campaign
    </option>
  );

  const [addNote, { error }] = useMutation(ADD_NOTE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({
        variables: {
          campaignId: noteCampaign,
          noteTitle,
          noteText,
          notePublic,
          noteAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });

      setNoteText('');
      setNoteTitle('');
      setNotePublic(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'noteText' && value.length <= 280) {
      setNoteText(value);
      setCharacterCount(value.length);
    }
  };

  const toggleNotePublic = () => {
    setNotePublic(!notePublic);
  };

  return (
    <div className="card">
      <h4 className="card-header bg-dark text-light p-2">Create Note</h4>
      <div className="card-body">
        <form onSubmit={handleFormSubmit}>
        <select
        name="noteCampaign"
        id="noteCampaign"
        value={noteCampaign || ''} // Set a default empty string value
        onChange={(e) => setNoteCampaign(e.target.value)}
       className="form-input"
      >
        {campaignOptions}
</select>
          <input
            type="text"
            name="noteTitle"
            id="noteTitle"
            value={noteTitle}
            onChange={handleChange}
            className="form-input"
            placeholder="Note Title"
          />
          <textarea
            name="noteText"
            id="noteText"
            value={noteText}
            onChange={handleChange}
            className="form-input"
            placeholder="Note Text"
          />
          <div className="character-count">Character Count: {characterCount}/280</div>
          <div className="note-public-checkbox">
            <label className="form-label">Make Note Public:</label>
            <input
              type="checkbox"
              name="notePublic"
              checked={notePublic}
              onChange={toggleNotePublic}
            />
          </div>
          {Auth.loggedIn() ? (
            <button onClick={handleFormSubmit} className="btn btn-block btn-primary">
              Add Note
            </button>
          ) : (
            <p>
              You need to be logged in to write a note. Please{' '}
              <Link to="/login" className="note-form-link">
                login
              </Link>{' '}
              or{' '}
              <Link to="/signup" className="note-form-link">
                signup
              </Link>
              .
            </p>
          )}
        </form>
        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default NoteForm;
