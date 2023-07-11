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
    socialMediaLinks: [SocialMedia]
  }

  type Game {
    title: String
    competitive: Boolean
    rank: String
    console: String
    gamingUsername: String
  }

  type SocialMedia {
    facebook: String
    twitter: String
    instagram: String
    snapchat: String
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
    me: User
    users: [User]
    user(userId: ID): User
    usersByGame(gameTitle: String): [User]
    postsByGame(game: String): [Post]
  }

  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    addProfile(userId: ID!, profileInput: ProfileInput!): User
    login(email: String, password: String): Auth
    addGameToProfile(userId: ID, game: GameInput): User
    addSocialMediaLinks(userId: ID!, socialMedia: SocialMediaInput!): User
    addPost(content: String, userId: ID, game: String): Post
  }

  input ProfileInput {
    gamerType: String
    avatar: String
    bio: String
    games: [GameInput]
    socialMediaLinks: [SocialMediaInput]
  }

  input GameInput {
    title: String
    competitive: Boolean
    rank: String
    console: String
    gamingUsername: String
  }

  input SocialMediaInput {
    facebook: String
    twitter: String
    instagram: String
    snapchat: String
  }
`;

module.exports = typeDefs;