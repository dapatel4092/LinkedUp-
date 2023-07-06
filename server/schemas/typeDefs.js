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
    _id: ID
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
    user(userId: ID): User
    usersByGame(gameTitle: String): [User]
  }

  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    addGameToProfile(userId: ID, game: GameInput): User
  }

  input GameInput {
    title: String
    competitive: Boolean
    rank: String
    console: String
    gamingUsername: String
  }
`;

module.exports = typeDefs;