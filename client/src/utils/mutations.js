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
  mutation addCampaign($campaignTitle: String!, $campaignDescription: String!, $campaignAuthor: String!) {
    addCampaign(campaignTitle: $campaignTitle, campaignDescription: $campaignDescription, campaignAuthor: $campaignAuthor) {
      _id
      campaignTitle
      campaignDescription
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