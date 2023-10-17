import React from 'react';
import Campaign from '../components/Campaign';
import { getRandomCampaignImage } from '../utils/imagePicker';

const Landing = () => {

  const randomCampaignImage1 = getRandomCampaignImage();
  const randomCampaignImage2 = getRandomCampaignImage();
  const randomCampaignImage3 = getRandomCampaignImage();

  const campaigns = [
    { imageUrl: `${randomCampaignImage1}`, title: 'Quest for the Enchanted Cheese', description: 'Embark on an epic journey through uncharted lands, where youll uncover hidden treasures and face ancient foes.' },
    { imageUrl: `${randomCampaignImage2}`, title: 'Dragon Slaying Shenanigans', description: 'Join a band of brave adventurers as they attempt to save their kingdom from the clutches of a menacing dragon.' },
    { imageUrl: `${randomCampaignImage3}`, title: 'Cosmic Carnival Capers', description: 'Venture into a mysterious sci-fi universe, where secrets and wonders await those who dare to explore its depths.' }
  ];

  return (
    <div className="landing">
      <div className="landing-header">
        <h1>
          What story will <span className="main-title">you</span> tell?
        </h1>
        <p>Campaign Planner is your hub to create and share campaigns with your friends.</p>
      </div>

      <div className="landing-examples">
      <p>Create custom campaigns where you can let your imagination run wild!</p>
        <h2>Examples</h2>
        <div className="campaigns">
          {campaigns.map((campaign, index) => (
            <Campaign
              key={index}
              imageUrl={campaign.imageUrl}
              title={campaign.title}
              description={campaign.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;