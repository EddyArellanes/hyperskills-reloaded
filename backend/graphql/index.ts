import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const typeDefs = `
  type Query {
    hello: String
  }
`
const resolvers = {
  Query: {
    hello: () => 'hello world'
  }
}

export const useGraphql = async (app) => {
  const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
    ApolloServerPluginLandingPageLocalDefault
   ]
});

  await server.start();
  server.applyMiddleware({app});
}

