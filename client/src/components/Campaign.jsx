import React from 'react';

const Campaign = ({ imageUrl, title }) => {
  const cardStyle = {
    backgroundImage: `url('${imageUrl}')`,
  };

  return (
    <div className="campaign-card" style={cardStyle}>
      <div className="campaign-title">{title}</div>
    </div>
  );
};

export default Campaign;