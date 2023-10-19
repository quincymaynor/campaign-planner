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
  mutation AddCampaign($campaignTitle: String!, $campaignAuthor: String!, $createdAt: String!, $campaignDescription: String, $campaignImage: String) {
    addCampaign(campaignTitle: $campaignTitle, campaignAuthor: $campaignAuthor, createdAt: $createdAt, campaignDescription: $campaignDescription, campaignImage: $campaignImage) {
      _id
      campaignTitle
      campaignDescription
      campaignImage
      campaignAuthor
    }
  }
`;

export const ADD_NOTE = gql`
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