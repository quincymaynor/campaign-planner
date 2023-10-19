import React from 'react';
import { getRandomDarkColor } from '../utils/colorPicker'; // Import the color picker util

const NoteCard = ({ imageUrl, link, title, description }) => {

  let cardStyle;
  if (imageUrl === undefined) {
  cardStyle = {
      backgroundColor: getRandomDarkColor(),
    };
  }
  else {
  cardStyle = {
    backgroundImage: `url('${imageUrl}')`,
  };

}


console.log(cardStyle);

  return (
    <div className="campaign-cards-container">
      <a href={link}>
        <div className="campaign-card">
          <div className="campaign-card-inner">
            <div className="campaign-card-front" style={cardStyle}>
              <div className="campaign-title">{title}</div>
            </div>
              <div className="campaign-card-back" style={cardStyle}>
              <div className="campaign-description">{description}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default NoteCard;