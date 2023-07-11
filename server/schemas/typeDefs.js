const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bio: String
    socialMediaLinks: [SocialMedia]
    games: [UserGame]
  }

  type SocialMedia {
    facebook: String
    twitter: String
    instagram: String
    snapchat: String
  }

  type UserGame {
    game: Game
    console: String
    gamingUsername: String
    competitive: Boolean
    rank: String
  }

  type Game {
    _id: ID
    title: String
  }

  type Post {
    _id: ID
    content: String
    createdAt: String
    user: User
    game: Game
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(userId: ID): User
    usersByGame(gameId: ID): [User]
    postsByGame(gameId: ID): [Post]
  }

  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    updateProfile(userId: ID!, profileInput: ProfileInput!): User
    login(email: String, password: String): Auth
    addGameToProfile(userId: ID, userGame: UserGameInput): User
    addPost(content: String, userId: ID, gameId: ID): Post
  }

  input ProfileInput {
    bio: String
    socialMediaLinks: SocialMediaInput
  }

  input UserGameInput {
    gameId: ID
    console: String
    gamingUsername: String
    competitive: Boolean
    rank: String
  }

  input SocialMediaInput {
    facebook: String
    twitter: String
    instagram: String
    snapchat: String
  }
`;

module.exports = typeDefs;