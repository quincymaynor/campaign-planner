import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
query GetMe {
  getMe {
    _id
    email
    username
    gmCampaigns {
      _id
      campaignTitle
      campaignDescription
      campaignImage
      createdAt
      publicNotes {
        _id
        noteTitle
        noteText
        createdAt
      }
      privateNotes {
        _id
        noteTitle
        noteText
        createdAt
      }
    }
    playerCampaigns {
      _id
      campaignTitle
      campaignDescription
      campaignImage
      createdAt
      privateNotes {
        _id
        noteTitle
        noteText
        createdAt
      }
      publicNotes {
        _id
        noteTitle
        noteText
        createdAt
      }
    }
  }
}
`;

export const QUERY_CAMPAIGN = gql`
query GetCampaign($campaignId: ID!) {
  getCampaign(campaignId: $campaignId) {
    campaignTitle
    campaignDescription
    campaignImage
    createdAt
    privateNotes {
      noteTitle
      noteText
      createdAt
    }
    publicNotes {
      noteTitle
      noteText
      createdAt
    }
  }
}
`;
