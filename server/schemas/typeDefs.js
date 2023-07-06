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

  type Post {
    _id: ID
    content: String
    createdAt: String
    user: User
    game: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID): User
    usersByGame(gameTitle: String): [User]
    postsByGame(game: String): [Post]
  }

  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    addGameToProfile(userId: ID, game: GameInput): User
    addPost(content: String, userId: ID, game: String): Post
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