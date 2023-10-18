import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_NOTE } from '../utils/mutations';

import Auth from '../utils/auth';

const NoteForm = ({ thoughtId }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [notePublic, setNotePublic] = useState('false'); // Assuming you want to use notePublic here
  const [characterCount, setCharacterCount] = useState(0);

  const [addNote, { error }] = useMutation(ADD_NOTE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({ // Fixed the function name here
        variables: {
          campaignId: thoughtId, // Assuming thoughtId is the correct variable
          noteTitle,
          noteText,
          notePublic,
          noteAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setNoteText('');
      setNoteTitle('');
      setNotePublic('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'noteText' && value.length <= 280) {
      setNoteText(value); // Fixed variable name here
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4></h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="noteText" // Fixed name here
                placeholder="Add your note..."
                value={noteText} // Fixed value here
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Note
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to write a note. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default NoteForm;
