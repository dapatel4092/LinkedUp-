const { AuthenticationError } = require('apollo-server-express');
const { User, Profile, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({
        path: 'profile',
        populate: {
          path: 'games',
        },
      });
    },
    user: async (parent, { userId }) => {
      return User.findById(userId).populate({
        path: 'profile',
        populate: {
          path: 'games',
        },
      });
    },
    usersByGame: async (parent, { gameTitle }) => {
      // Find all profiles with the game in their games array
      const profiles = await Profile.find({ "games.title": gameTitle });
      // Get the IDs of those profiles
      const profileIds = profiles.map(profile => profile._id);
      // Find all users with those profiles
      const users = await User.find({ profile: { $in: profileIds } });
  
      return users;
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
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      
      const token = signToken(user);
      return { token, user };
    },

    addGameToProfile: async (parent, { userId, game }) => {
      const newGame = await Game.create(game);
      const user = await User.findById(userId);
      const profile = await Profile.findById(user.profile);
      
      profile.games.push(newGame);
      await profile.save();

      return User.findById(userId).populate({
        path: 'profile',
        populate: {
          path: 'games',
        },
      });
    },
  },
}

module.exports = resolvers;