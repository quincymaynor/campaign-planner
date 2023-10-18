import React from 'react';
import CampaignCard from './CampaignCard';

const CampaignList = ({ campaigns, title }) => {

    if (!campaigns.length) {
      return <h3>No {title} Yet</h3>;
    } else {
        return (
          <div>
            <div className="">
              <h1>{title}</h1>
            </div>
            <div className="row">
              {campaigns.map((campaign, index) => (
                <CampaignCard
                    key={index}
                    link={`/campaign/${campaign._id}`}
                    imageUrl={campaign.campaignImage}
                    title={campaign.campaignTitle}
                    description={campaign.campaignDescription}
                >
                {console.log(campaign)}
                </CampaignCard>
              ))}
            </div>
          </div>
          );
    }
  };
  
  export default CampaignList;