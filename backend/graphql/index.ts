import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
// != not null
const typeDefs = `
  type Query {
    hello: String!,
    getPerson(name: String, age: Int!): String
    getInt: Int
    getFloat: Float
    getString: String
    getBoolean: Boolean
    getID: ID
  }
`

//Resolvers receives 4 params
const resolvers = {
  Query: {
    hello: () => 'hello world',
    getPerson: (_, args) => `Hello my name is ${args.name}`,
    getInt: () => 1,
    getFloat: () => 1.5,
    getString: () => "Hello again",
    getBoolean: () => true,
    getID: () => '1010101'
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

