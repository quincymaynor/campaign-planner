const { User, Campaign } = require('../models');
const { signToken } = require('../utils/auth');

// Import AuthenticationError from the correct location
const { AuthenticationError } = require('apollo-server-express'); // Use the correct import


const resolvers = {
  Query: {
    // Example resolver for fetching user data
    getUser: async (_parent, _args, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }

      // Fetch and return user data from the database
      const user = await User.findById(context.user._id);
      return user;
    },
    //this is to fetch a user by their USERNAME
    user: async (_parent, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('User not found.');
      }
      return user;
    },
    //all users for apollo or lists
    getUsers: async () => {
      const users = await User.find();
      return users;
    },

    getCampaigns: async (_parent, { username }) => {
      const params = username ? { username } : {};
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }
      return Campaign.find(params).sort({ createdAt: -1 });
    },

    getCampaign: async (_parent, { campaignId }) => {
      return Campaign.findOne({ _id: campaignId });
    },
    
    getMe: async (_parent, _args, context) => {
      if (context.user) {
        const foundUser = await User.findOne({ _id: context.user._id }).populate('gmCampaigns');
        console.log(foundUser);
        return foundUser;
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // Mutation resolver for user login
    login: async (_parent, { email, password }) => {
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
    addUser: async (_parent, args) => {
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
    
    // Mutation resolver for creating a campaign
    addCampaign: async (_parent, _args, context) => {
      if (context.user) {
        const campaign = await Campaign.create({
          campaignAuthor: context.user.username,
        });

        console.log(campaign);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { gmCampaigns: campaign } },
          {new: true}
        );

        return campaign;
      }
      throw AuthenticationError;
    },

    // Mutation resolver for creating a note
    addNote: async (_parent, { campaignId, noteText }, context) => {
      if (context.user) {
        return Campaign.findOneAndUpdate(
          { _id: campaignId },
          {
            $addToSet: {
              notes: { noteText, noteAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    // Mutation resolver for deleting a campaign
    removeCampaign: async (_parent, { campaignId }, context) => {
      if (context.user) {
        const campaign = await Campaign.findOneAndDelete({
          _id: campaignId,
          campaignAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { campaigns: campaign._id } }
        );

        return campaign;
      }
      throw AuthenticationError;
    },

    // Mutation resolver for deleting a note
    removeNote: async (_parent, { campaignId, noteId }, context) => {
      if (context.user) {
        return Campaign.findOneAndUpdate(
          { _id: campaignId },
          {
            $pull: {
              notes: {
                _id: noteId,
                noteAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;