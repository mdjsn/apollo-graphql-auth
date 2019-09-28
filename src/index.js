const express = require('express');
const { ApolloServer } = require('apollo-server-express');

import resolvers from "./resolvers";
import schema from "./schema";

const server = new ApolloServer({ typeDefs: schema, resolvers });

const PORT = 4001;

const app = express();

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`Apollo Server ready at http://localhost:4001${server.graphqlPath}`)
);
