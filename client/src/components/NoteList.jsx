import React from 'react';
import Campaign from './Campaign';

const NoteList = ({ notes, title }) => {

    if (!notes.length) {
      return <h3>No {title} Yet</h3>;
    } else {
        return (
            <div className="row">
              {notes.map((note, index) => (
                <Campaign
                    key={index}
                    link={`/note/${note._id}`}
                    title={note.noteTitle}
                    description={note.noteText}
                >
                {console.log(note)}
                </Campaign>
              ))}
            </div>
          );
    }
  };
  
  export default NoteList;