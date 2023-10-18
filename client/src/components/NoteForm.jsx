import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_NOTE } from '../utils/mutations';

import Auth from '../utils/auth';

const NoteForm = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [notePublic, setNotePublic] = useState(false); // Updated initial state
  const [characterCount, setCharacterCount] = useState(0);

  const { loading, data } = useQuery(QUERY_ME); // Query to get the user's data

  const user = data?.getMe || {};
  console.log('Loading:', loading);
  console.log('Data:', data);

  // Assuming you want to use the first campaign
  const noteCampaign = user.campaigns && user.campaigns.length > 0 ? user.campaigns[0].id : '';
  const campaignOptions = user.campaigns && user.campaigns.length > 0
  ? user.campaigns.map((campaign) => (
      <option key={campaign.id} value={campaign.id}>
        {campaign.title}
      </option>
    ))
  : null;

  const [addNote, { error }] = useMutation(ADD_NOTE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({
        variables: {
          campaignId: noteCampaign, // Assuming you have a selected campaign ID
          noteTitle,
          noteText,
          notePublic,
          noteAuthor: Auth.getProfile().authenticatedPerson.username
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

  return (
    <>
    <div className="note-form-row">
    <label className="note-form-label" htmlFor="noteCampaign">Select Campaign:</label>
    <select
      name="noteCampaign"
      id="noteCampaign"
      value={noteCampaign}
      onChange={(e) => setNoteCampaign(e.target.value)}
      className="form-input" // Apply the form-input class for styling
    >
      {campaignOptions}
    </select>
  </div>
  <div className="note-form-row">
    <label className="note-form-label" htmlFor="noteTitle">Note Title:</label>
    <input
      type="text"
      name="noteTitle"
      id="noteTitle"
      value={noteTitle}
      onChange={handleChange}
      className="form-input" // Apply the form-input class for styling
    />
  </div>
  <div className="note-form-row">
    <label className="note-form-label" htmlFor="noteText">Note Text:</label>
    <textarea
      name="noteText"
      id="noteText"
      value={noteText}
      onChange={handleChange}
      className="form-input" // Apply the form-input class for styling
    />
  </div>
  <div className="note-form-row">
    <p className="character-count">
      Character Count: {characterCount}/280
    </p>
  </div>
  <div className="note-form-row">
    <label className="note-form-label">Make Note Public:</label>
    <input
      type="checkbox"
      name="notePublic"
      checked={notePublic}
      onChange={() => setNotePublic(!notePublic)}
      className="note-form-checkbox" // Use the existing class or create a new one
    />
  </div>
  <div className="note-form-row">
    {Auth.loggedIn() ? (
      <button onClick={handleFormSubmit} className="btn-primary">Add Note</button>
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
  </div>
  </>
  );
};

export default NoteForm;
