const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'default_secret'; //Change secret to be... well.. a secret, or use default if not available
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
      return req
    }

    try {
      const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = authenticatedPerson;
    } catch (error) {
      console.error('Invalid token:', error.message);
    }

    return req;
  },
  
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
  },
};
