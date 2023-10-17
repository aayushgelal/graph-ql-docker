import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";

const app = express();
const typeDefs = `type User{
  username:String!
  password:String!
}
type Query{
  getusers:[User]
}

`;
const resolvers = {
  Query: {
    getusers: () => [{ username: "aayush", password: "hello" }],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(bodyParser.json());
app.use(cors());
server.start().then(() => {
  app.use("/graphql", expressMiddleware(server));
});

app.listen(3000, () => console.log("done"));
