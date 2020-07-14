import express from "express";
import { ApolloServer } from "apollo-server-express";
import db from "./db";
import { typeDefs, resolvers } from "./graphql";
const PORT = 8080;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res };
  },
});

server.applyMiddleware({ app });
db.sequelize
  .sync()
  .then(() => {
    console.log(`Database connected`);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error while connecting to database", error);
  });
