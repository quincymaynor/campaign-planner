import React from 'react';
import Campaign from '../components/Campaign';

const CampaignList = ({ campaigns, title }) => {

    if (!campaigns.length) {
      return <h3>No {title} Yet</h3>;
    } else {
        return (
            <div className="row">
              {campaigns.map((campaign, index) => (

                  <Campaign
                      key={index}
                      link={`/campaign/${campaign._id}`}
                      imageUrl={campaign.campaignImage}
                      title={campaign.campaignTitle}
                      description={campaign.campaignDescription}
                  >
                {console.log(campaign)}
                </Campaign>
              ))}
            </div>
          );
    }
  };
  
  export default CampaignList;