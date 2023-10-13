const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    gmCampaigns: [Campaign]
    playerCampaigns: [Campaign]
  }

  type Campaign {
    _id: ID!
    campaignAuthor: String
    createdAt: String
    publicNotes: [Note]
    privateNotes: [Note]
  }

  type Note {
    _id: ID
    noteText: String!
    noteAuthor: String!
    createdAt: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    # query to get a user by ID
    getUser(userId: ID!): User
      # Query to get a user by username
    user(username: String!): User
    # Query to get a list of users
    getUsers: [User]
    # query to get a user's created campaigns
    getCampaigns(campaignAuthor: String!): [Campaign]
    # query to get a user's single campaign
    getCampaign(campaignId: ID!): Campaign
    # query to get all campaigns accessible to a user
    getMe: User
  }

  type Mutation {
    # log in
    login(email: String!, password: String!): Auth
    # create a new user
    addUser(username: String!, email: String!, password: String!): Auth
    # update a user's details
    updateUser(userId: ID!, username: String, email: String): User
    # delete a user
    removeUser(userId: ID!): User
    # add a campaign
    addCampaign(campaignAuthor: String!, createdAt: String!): Campaign
    # add a note
    addNote(noteText: String!, noteAuthor: String!): Note
    # delete a campaign
    removeCampaign(campaignId: ID!): Campaign
    # delete a note
    removeNote(noteId: ID!): Note
  }
`;

module.exports = typeDefs;
