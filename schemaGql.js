import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [Quote]
    quote(by: ID!): [Quote]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }

  type Quote {
    by: ID
    name: String
  }

  type Mutation {
    createUser(userNew: userInputs!): User
  }

  input userInputs {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;
