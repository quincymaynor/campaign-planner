const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require('@apollo/server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');

require('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Enable CORS middleware
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: false, // Important to set this to false
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});