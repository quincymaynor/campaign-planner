import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CAMPAIGN = gql`
  mutation AddCampaign($campaignTitle: String!, $campaignAuthor: String!, $createdAt: String, $campaignDescription: String, $campaignImage: String) {
    addCampaign(campaignTitle: $campaignTitle, campaignAuthor: $campaignAuthor, createdAt: $createdAt, campaignDescription: $campaignDescription, campaignImage: $campaignImage) {
      _id
      campaignTitle
      campaignDescription
      campaignImage
      campaignAuthor
      createdAt
    }
  }
`;

export const UPDATE_CAMPAIGN = gql`
  mutation UpdateCampaign($campaignId: ID!, $campaignTitle: String, $campaignDescription: String, $campaignImage: String) {
    updateCampaign(campaignId: $campaignId, campaignTitle: $campaignTitle, campaignDescription: $campaignDescription, campaignImage: $campaignImage) {
      _id
      campaignTitle
      campaignDescription
      campaignImage
    }
  }
`;

export const REMOVE_CAMPAIGN = gql`
  mutation RemoveCampaign($campaignId: ID!) {
    removeCampaign(campaignId: $campaignId) {
      _id
      campaignTitle
      campaignDescription
      campaignImage
      createdAt
    }
  }
`;

export const ADD_NOTE = gql`
  # mutation AddNote($campaignId: ID!, $noteText: String!, $noteAuthor: String!, $noteTitle: String, $public: Boolean) {
  #   addNote(campaignId: $campaignId, noteText: $noteText, noteAuthor: $noteAuthor, noteTitle: $noteTitle, public: $public) {
  #     _id
  #     privateNotes {
  #       _id
  #       noteTitle
  #       noteText
  #       createdAt
  #       noteAuthor
  #       campaignId {
  #         _id
  #       }
  #       public
  #     }
  #     publicNotes {
  #       _id
  #       noteTitle
  #       noteText
  #       createdAt
  #       noteAuthor
  #       campaignId {
  #         _id
  #       }
  #       public
  #     }
  #   }
  # }
  mutation addNote($campaignId: ID!, $noteTitle: String!, $noteText: String!, $public: Boolean, $noteAuthor: String!) {
    addNote(campaignId: $campaignId, noteTitle: $noteTitle, noteText: $noteText, public: $public, noteAuthor: $noteAuthor) {
      _id
      campaignId
      noteTitle
      noteText
      public
      noteAuthor
    }
  }
`;