const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    # Query to get a user by ID
    getUser(userId: ID!): User
      # Query to get a user by username
    user(username: String!): User
    # Query to get a list of users
    getUsers: [User]
  }

  type Mutation {
    # log in
    login(email: String!, password: String!): Auth
    # create a new user
    addUser(username: String!, email: String!, password: String!): Auth
    # update a user's details
    updateUser(userId: ID!, username: String, email: String): User
    # delete a user
    deleteUser(userId: ID!): User
  }
`;

module.exports = typeDefs;
