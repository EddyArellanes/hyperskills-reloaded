import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const typeDefs = `
  type Query {
    hello: String,
    getPerson(name: String, age: Int): String
  }
`

//esolvers receives 4 params
const resolvers = {
  Query: {
    hello: () => 'hello world',
    getPerson: (_, args) => `Hello my name is ${args.name}`
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

