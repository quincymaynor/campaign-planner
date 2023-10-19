import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { UPDATE_CAMPAIGN } from '../utils/mutations';
import { QUERY_ME, QUERY_CAMPAIGN } from '../utils/queries';

import Tools from '../components/Tools';
import Auth from '../utils/auth';

const CampaignUpdate = () => {

  const campaignImages = [
    'Apocalypse-Setting-1.png',
    'Castle-1.png',
    'Castle-2.png',
    'Cyberpunk-Setting-1.png',
    'Cyberpunk-Setting-2.png',
    'Dungeon-Setting-1.png',
    'Floating-Islands-Setting-1.png',
    'Flying-Cars-Setting-1.png',
    'Flying-Cars-Setting-2.png',
    'Forest-Setting-1.png',
    'Forest-Setting-2.png',
    'Jungle-Setting-1.png',
    'Jungle-Setting-2.png',
    'Medieval-City-1.png',
    'Medieval-Table-Setting.png',
    'Mountain-Setting-1.png',
    'Mountain-Setting-2.png',
    'Mountain-Setting-3.png',
    'Mountain-Setting-4.png',
    'Night-Setting-1.png',
    'Snow-Biome-1.png',
    'Town-Setting-1.png',
    'Western-Setting-1.png'
  ];

  const { campaignId } = useParams();

  const { _loading, data, _error } = useQuery(QUERY_CAMPAIGN, {
      variables: { campaignId: campaignId },
  });

  const campaign = data?.getCampaign || {};
  
  const [selectedImage, setSelectedImage] = useState(campaignImages[0]);
  const [campaignImage, setCampaignImage] = useState(selectedImage); // New state for campaignImage
  const handleImageChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedImage(selectedValue);
    setCampaignImage(selectedValue); // Update campaignImage state
  };

  const [campaignTitle, setCampaignTitle] = useState(campaign.campaignTitle);
  const [campaignDescription, setCampaignDescription] = useState(campaign.campaignDescription);

  const [characterCount, setCharacterCount] = useState(0);

  const [updateCampaign, { error }] = useMutation(UPDATE_CAMPAIGN, {
    // refetchQueries: [
    //   QUERY_ME,
    //   'GetMe'
    // ]
  });


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {

      const { data } = updateCampaign({
        variables: {
            campaignId: campaignId,
            campaignTitle,
            campaignDescription,
            campaignAuthor: Auth.getProfile().authenticatedPerson.username,
            campaignImage, // Include campaignImage in the data
        },
      });
  
      setCampaignTitle('');
      setCampaignDescription('');
      setCampaignImage(selectedImage); // Reset the selected image

    } catch (err) {
      console.error(err);
    }
  };
  
    // const handleUpdate = async (event) => {
    //   event.preventDefault();
    //   try {
    //     const { data } = updateCampaign({
    //       variables: {
    //         campaignId: campaignId
    //       },
    //     });
    
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'campaignDescription' && value.length <= 280) {
      setCampaignDescription(value);
      setCharacterCount(value.length);
    }
  };

  const handleTitleChange = (event) => {
    setCampaignTitle(event.target.value);
  };

  return (
    <main>
      <div className="dashboard">
      <Tools/>
        <div className="dashboard-container">
          <div className="campaign-form-container">
            <h3 className="campaign-form-header">Campaign Form</h3>
          
            <form onSubmit={handleFormSubmit}>
              <div className="campaign-form-group">
                <div className="campaign-title-description-container">
                  <label>Campaign Title</label>
                  <input
                    type="text"
                    name="campaignTitle"
                    placeholder="Title"
                    defaultValue={campaign.campaignTitle}
                    onChange={handleTitleChange}
                    className="campaign-image-selector"
                  ></input>
          
                  <label>Campaign Description</label>
                  <textarea
                    type="text"
                    name="campaignDescription"
                    placeholder={campaign.campaignDescription}
                    value={campaignDescription}
                    className="campaign-image-selector"
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
          
              <p className="character-count">
                Character Count: {characterCount}/280
              </p>
          
              <div className="campaign-image-container">
                <h3 className="campaign-form-header">Select Campaign Image</h3>
                <select className="campaign-image-selector" value={campaign.campaignImage} onChange={handleImageChange}>
                  {campaignImages.map((imageName) => (
                    <option key={imageName} value={imageName}>
                      {imageName}
                    </option>
                  ))}
                </select>
                <div className="campaign-image-preview">
                  <img className="campaign-image" src={`/Campaign-Images/${selectedImage}`} alt="Selected Campaign Image" />
                </div>
              </div>
          
              <button className="campaign-add-button" type="submit">
                Edit Campaign
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CampaignUpdate;
