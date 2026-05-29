import { gql } from 'apollo-server-express';
import User from '../models/User.js';
import { GraphQLInputObjectType, GraphQLObjectType, GraphQLScalarType, GraphQLString, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue: (value) => {
    return new Date(value);
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
});


const typeDefs = gql`

  scalar Date

  type Client {
    id: ID!,
    name: String!,
    email: String!,
    projects: [Project],
    createdAt: Date,
    updatedAt: Date
  }

  type Project {
    id: ID!,
    name: String!,
    clientId: ID!,
    description: String!,
    createdAt: Date,
    updatedAt: Date
  }

  type UserPg {
    id: ID!,
    firstname: String,
    lastname: String,
    address: String,
    email: String
  }

  type User {
    id: ID!,
    fullName: String,
    email: String,
    password: String,
    bio: String,
    profilePic: String,
    nativeLanguage: String,
    learningLanguage: String,
    location: String,
    isOnboarded: Boolean,
    friends: [User],
    createdAt: Date,
    updatedAt: Date
  }

  type Query {
    users: [UserPg!]!
    userById(id: ID!): UserPg!
    userByEmail(email: String!): UserPg!
    clients: [Client!]!,
    projects: [Project!]!
  }

  type Mutation {
    createUser(firstname: String!, lastname: String!, address: String!, email: String!): UserPg!
    updateUser(id: ID!, address: String!): UserPg!
    deleteUser(id: ID!): UserPg!
    createZipUser(
      fullName: String!, 
      email: String!, 
      password: String!, 
      bio: String!
      profilePic: String!,
      nativeLanguage: String!,
      learningLanguage: String!,
      location: String!,
      isOnboarded: Boolean,
      friends: [ID]
    ): User!

    createClient(
      name: String!, 
      email: String!,
      projects: [ID]
    ): Client!

    createProject(
      name: String!, 
      clientId: ID!, 
      description: String!
    ): Project!
  }
`;

export default typeDefs;
