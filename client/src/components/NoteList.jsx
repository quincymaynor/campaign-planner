import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, title }) => {

    if (!notes.length) {
      return <h3>No {title} Yet</h3>;
    } else {
        return (
          <div>
            <div className="">
              <h1>{title}</h1>
            </div>
            <div className="row">
              {notes.map((note, index) => (
                <NoteCard
                    key={index}
                    link={`/note/${note._id}`}
                    title={note.noteTitle}
                    description={note.noteText}
                >
                {console.log(note)}
                </NoteCard>
              ))}
            </div>
          </div>
          );
    }
  };
  
  export default NoteList;