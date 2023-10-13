import React from 'react';

const Campaign = ({ imageUrl, title, description }) => {
  const cardStyle = {
    backgroundImage: `url('${imageUrl}')`,
  };

  return (
    <div className="campaign-cards-container">
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
    </div>
  );
};

export default Campaign;
