const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = process.env.JWT_SECRET || 'default_secret';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { authenticatedPerson, password } = jwt.verify(token, secret, { maxAge: expiration });

      if (password.length < 8) {
        throw new AuthenticationError('Password must be at least 8 characters long');
      }

      req.user = authenticatedPerson;
    } catch (error) {
      console.error('Invalid token:', error.message);
      throw new AuthenticationError('Invalid token'); // Use AuthenticationError
    }

    return req;
  },

  signToken: function ({ email, username, _id, password }) {
    if (password.length < 8) {
      throw new AuthenticationError('Password must be at least 8 characters long');
    }

    const payload = { email, username, _id, password };
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
  },
};
