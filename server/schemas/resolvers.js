const { User } = require('../models');
const { signToken } = require('../utils/auth');

// Import AuthenticationError from the correct location
const { AuthenticationError } = require('apollo-server-express'); // Use the correct import


const resolvers = {
  Query: {
    // Example resolver for fetching user data
    getUser: async (_, __, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }

      // Fetch and return user data from the database
      const user = await User.findById(context.user._id);
      return user;
    },
    //this is to fetch a user by their USERNAME
    user: async (_, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('User not found.');
      }
      return user;
    },
    //all users for apollo or lists
    getUsers: async () => {
      // Implement logic to fetch and return a list of users from your database
      const users = await User.find();
      return users;
    },
  },

  Mutation: {
    // Mutation resolver for user login
    login: async (_, { email, password }) => {
      console.log(email, password)
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user || !(await user.isCorrectPassword(password))) {
          throw new AuthenticationError('Incorrect credentials.');
        }

        // Generate a JWT token for the authenticated user
        const token = signToken(user);

        // Return the user and token
        return { user, token };
      } catch (error) {
        // Handle login errors
        console.error(error);
        throw new AuthenticationError('Login failed.');
      }
    },

    // Mutation resolver for user registration
    addUser: async (_, args) => {
      try {
        // Create a new user using data from args
        const user = await User.create(args);

        // Generate a JWT token for the new user
        const token = signToken(user);

        // Return the user and token
        return { user, token };
      } catch (error) {
        // Handle registration errors
        console.error(error);
        throw new AuthenticationError('Registration failed.');
      }
    },
  },
};

module.exports = resolvers;