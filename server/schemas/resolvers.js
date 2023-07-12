const { AuthenticationError } = require('apollo-server-express');
const { User, UserGame, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // query to retrieve a logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        // not including password for security
          .select('-__v -password')
          //populating users games into profile
          .populate({
            path: 'userGames',
            populate: {
              path: 'game',
              model: 'Game',
            },
          });
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    //Query to get all users back
    users: async () => {
      return User.find().populate({
        path: 'userGames',
        populate: {
          path: 'game',
          model: 'Game',
        },
      });
    },
    //Query to get a single user by id
    user: async (parent, { userId }) => {
      return User.findById(userId).populate({
        path: 'userGames',
        populate: {
          path: 'game',
          model: 'Game',
        },
      });
    },
    //Query that will return all users that play a specific
    usersByGame: async (parent, { gameId }) => {
      return User.find({ 'userGames.game': gameId }).populate({
        path: 'userGames',
        populate: {
          path: 'game',
          model: 'Game',
        },
      });
    },
    // Query to get all posts for a particular game
    postsByGame: async (parent, { gameId }) => {
      return Post.find({ gameId: gameId }).populate('userId').populate('gameId');
    }
  },

  Mutation: {
  //Mutation to add a new user
  //Takes in a username, email, password as args
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new AuthenticationError('Something went wrong!');
      }
      //Return the new user with token
      const token = signToken(user);
      return { token, user };
    },

  //Mutation to log in a user
  //only takes in email and password as args
    login: async (parent, { email, password }) => {
      //searching for user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      // using bcrypt isCorrectPassord method to compare input password to hashed password
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    // mutation to update a users profile information after creation
    updateProfile: async (parent, { userId, profileInput }, context) => {
      if (context.user) {
        // searching for user by id, and updating their profileInut info, then returning a new copy of user
        const updatedUser = await User.findByIdAndUpdate(userId, profileInput, { new: true });
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    //mutation to add a game to a user's profile
    //checking if user is logged in

    addGameToProfile: async (parent, { userId, userGame }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      if (context.user._id !== userId) {
        throw new AuthenticationError('You can only modify your own profile!');
      }
      //creating a new user game instance taking in one of our pre
      const newUserGame = { ...userGame, game: userGame.gameId, user: userId };
      const userGameObj = await UserGame.create(newUserGame);
      //updating user with this new game 
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { userGames: userGameObj._id } },
        { new: true }
      ).populate({
        path: 'userGames',
        populate: {
          path: 'game',
          model: 'Game',
        },
      });
    
      return updatedUser;
    },
    // adding a post to a specific game's page
    addPost: async (parent, { content, userId, gameId }, context) => {
      //
      if (context.user) {
        
        const post = await Post.create({ content, userId: userId, gameId: gameId });
        const populatedPost = await Post.findById(post._id).populate('userId');
        // 
        return {
          _id: populatedPost._id,
          content: populatedPost.content,
          createdAt: populatedPost.createdAt,
          user: populatedPost.userId, 
          game: populatedPost.gameId,
        };
      }
      throw new AuthenticationError('You need to be logged in!');
    }
    
    
    
  },
};

module.exports = resolvers;
