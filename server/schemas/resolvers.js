const { AuthenticationError } = require('apollo-server-express');
const { User, Profile, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    //Will gather all user data
    users: async () => {
      return User.find().populate('profile');
    },
    //Will gather specific user by userId parameter
    user: async (parent, { userId }) => {
      return User.findById(userId).populate('profile');
    },
    // Will render all users that have added a specific game
    usersByGame: async (parent, { gameTitle }) => {
      return User.find({ "profile.games.title": gameTitle }).populate('profile');
    },
    // Will populate all posts to a specific game
    postsByGame: async (parent, { game }) => {
      return Post.find({ game }).populate('user');
    },

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // Create a new Profile for the User
      const profile = await Profile.create({ bio: "", games: [] });
      // Attach the Profile to the User
      user.profile.push(profile);
      await user.save();
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      //Login function that searched for user by email
      const user = await User.findOne({ email });
      //Throw error if no email found
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      //Using isCorrectPassword method to compare inputted password to save password
      const correctPw = await user.isCorrectPassword(password);
      //Same error if incorrect password
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      //Return the signed token and user if sucessful
      const token = signToken(user);
      return { token, user };
    },

    
    addGameToProfile: async (parent, { userId, game }) => {
      //Will add user inputted game data to their profile
      const user = await User.findById(userId);
      user.profile.games.push(game);
      await user.save();
      return User.findById(userId).populate('profile');
    },
      //Will create a post by specific user and for a specified game
    addPost: async (parent, { content, userId, game }) => {
      const post = await Post.create({ content, user: userId, game });
      return post;
    },
  },
}

module.exports = resolvers;