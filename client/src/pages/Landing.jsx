import React from 'react';
import Campaign from '../components/Campaign';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-header">
        <h1>What story will you tell?</h1>
        <p>Campaign Planner is your hub to create and share campaigns with your friends.</p>
        <p>Create custom campaigns where you can let your imagination run wild!</p>
      </div>

      <div className="landing-examples">
        <h2>Examples</h2>
        <div className="campaigns">
          <Campaign
            title="Example Campaign 1"
            description="An epic adventure awaits in a mystical land."
          />
          <Campaign
            title="Example Campaign 2"
            description="Join forces and save the kingdom from a dragon."
          />
          <Campaign
            title="Example Campaign 3"
            description="Explore a sci-fi universe and uncover its secrets."
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;