const { AuthenticationError } = require('apollo-server-express');
const { User, Profile, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
          //finding user by id using mongoose findOne method
          const userData = await User.findOne({ _id: context.user._id})
          //removing password field for security reasons
          .select('-__v -password')
          //populating saved books to User profile
          .populate('profile');
          return userData
      }
      throw new AuthenticationError('You need to be logged in!');
  },
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
    // Mutation for adding a user to db
        // Takes in username, email, and password as args
      addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          if (!user) {
            throw new AuthenticationError('Something went wrong!');
          }
          // sign token and return if sucessful
          const token = signToken(user);
          return { token, user };
        },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
        //generalized error if no user is found
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
          }
          // using bcrypts password checking method
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
          
      //if sucessful login, sign token and return user and token
      const token = signToken(user);
      return { token, user };
        },

    // mutation to add user's profile data.
    addProfile: async (parent, { userId, profileInput}, context) => {
    // checking if user is logged in  
      if (context.user) {

        const profile = await Profile.create(profileInput);
        if (!profile) {
          throw new Error('Something went wrong!');
        }
        const user = await User.findById(userId);
        user.profile.push(profile);
        await user.save();
        return User.findById(userId).populate('profile');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addGameToProfile: async (parent, { userId, game }, context) => {
      //Will add user inputted game data to their profile
      const user = await User.findById(userId);
      user.profile.games.push(game);
      await user.save();
      return User.findById(userId).populate('profile');
    },
    addSocialMediaLinks: async (parent, { userId, socialMediaLinks }, context) => {
      if (context.user) {
        const user = await User.findById(userId);
        // Add social media links to their profile
        user.profile.socialMediaLinks.push(socialMediaLinks);
        // Save the user
        await user.save();
        // Return the updated user with their profile populated
        return User.findById(userId).populate('profile');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
      //Will create a post by specific user and for a specified game
    addPost: async (parent, { content, userId, game }) => {
      const post = await Post.create({ content, user: userId, game });
      return post;
    },
  },
}

module.exports = resolvers;