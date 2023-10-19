import React from 'react';

const CampaignCard = ({ imageUrl, link, title, description }) => {
  const cardStyle = {
    backgroundImage: `url('${imageUrl}')`,
  };

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

export default CampaignCard;
