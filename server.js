import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useunifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Database");
});

mongoose.connection.on("error", (err) => {
  console.log("Errorf connecting to Database", err);
});

// Import models here
import "./models/Quotes.js";
import "./models/Users.js";


import resolvers from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`listening on ${url}`);
});
