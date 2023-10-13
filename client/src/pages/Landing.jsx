import React from 'react';
import Campaign from '../components/Campaign';

const Landing = () => {

  const campaigns = [
    { imageUrl: 'https://i.pinimg.com/736x/c5/0d/ea/c50deac621d9831f53f86bdc826fabb5.jpg', title: 'Quest for the Enchanted Cheese', description: 'Embark on an epic journey through uncharted lands, where youll uncover hidden treasures and face ancient foes.' },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5nowxSW9buY6RpTNR-nqAQQlz_Awyt9m4A&usqp=CAU', title: 'Dragon Slaying Shenanigans', description: 'Join a band of brave adventurers as they attempt to save their kingdom from the clutches of a menacing dragon.' },
    { imageUrl: 'https://i.pinimg.com/736x/63/2c/f9/632cf9e1062ec2d2dfc5cec7eae813df.jpg', title: 'Cosmic Carnival Capers', description: 'Venture into a mysterious sci-fi universe, where secrets and wonders await those who dare to explore its depths.' }
    // Add more campaign data as needed
  ];
  
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