const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    profile: Profile
  }

  type Profile {
    _id: ID
    bio: String
    games: [Game]
  }

  type Game {
    title: String
    competitive: Boolean
    rank: String
    console: String
    gamingUsername: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    profiles(userId: ID, name: String): [Profile]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProfile(userId: ID!, bio: String, games: [GameInput]): User
  }
  `;


module.exports = typeDefs