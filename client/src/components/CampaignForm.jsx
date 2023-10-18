import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CAMPAIGN } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const CampaignForm = () => {

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

  const [selectedImage, setSelectedImage] = useState(campaignImages[0]);
  const [campaignImage, setCampaignImage] = useState(selectedImage); // New state for campaignImage
  const handleImageChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedImage(selectedValue);
    setCampaignImage(selectedValue); // Update campaignImage state
  };

  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addCampaign, { error }] = useMutation
    (ADD_CAMPAIGN, {
      refetchQueries: [
        QUERY_ME,
        'me'
      ]
    });

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await addCampaign({
  //       variables: {
  //         campaignTitle,
  //         campaignDescription,
  //         campaignAuthor: Auth.getProfile().authenticatedPerson.username
  //       },
  //     });

  //     setCampaignTitle('');
  //     setCampaignDescription('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        campaignTitle,
        campaignDescription,
        campaignAuthor: Auth.getProfile().authenticatedPerson.username,
        campaignImage, // Include campaignImage in the data
      };
  
      console.log('Form Data:', formData); // Add this line to log the form data
  
      const { data } = await addCampaign({
        variables: formData,
      });
  
      setCampaignTitle('');
      setCampaignDescription('');
      setCampaignImage(selectedImage); // Reset the selected image
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'campaignDescription' && value.length <= 500) {
      setCampaignDescription(value);
      setCharacterCount(value.length);
    }
  };

  const handleTitleChange = (event) => {
    setCampaignTitle(event.target.value);
  };

  return (
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
            defaultValue="Title"
            onChange={handleTitleChange}
            className="campaign-image-selector"
          ></input>
  
          <label>Campaign Description</label>
          <textarea
            type="text"
            name="campaignDescription"
            placeholder="Description"
            value={campaignDescription}
            className="campaign-image-selector"
            style={{ lineHeight: '1.5', resize: 'vertical' }}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
  
      <p className="character-count">
        Character Count: {characterCount}/500
      </p>
  
      <div className="campaign-image-container">
      <h3 className="campaign-form-header">Select Campaign Image</h3>
  <select className="campaign-image-selector" value={selectedImage} onChange={handleImageChange}>
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
        Add Campaign
      </button>
    </form>
  </div>
  );
};

export default CampaignForm;
