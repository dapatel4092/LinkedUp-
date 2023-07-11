const { AuthenticationError } = require('apollo-server-express');
const { User, UserGame, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  // Query to find a logged in user
  Query: {
    me: async (parent, args, context) => {
      // checking for authentication and getting user by id
      if (context.user) {
          const userData = await User.findOne({ _id: context.user._id})
          //removing password field from query for security
          .select('-__v -password')
          //populating a user's games into the model
          .populate({
            path: 'games',
            populate: {
              path: 'game',
              model: 'Game'
            }
          });
          return userData
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    //query to get all users and populating their games
    users: async () => {
      return User.find()
        .populate({
          path: 'games',
          populate: {
            path: 'game',
            model: 'Game'
          }
        });
    },
    //query to get a single user by userId
    user: async (parent, { userId }) => {
      return User.findById(userId)
        .populate({
          path: 'games',
          populate: {
            path: 'game',
            model: 'Game'
          }
        });
    },
    // query that will search for all users who play a specified game
    usersByGame: async (parent, { gameId }) => {
      return User.find({ "games.game": gameId })
        .populate({
          path: 'games',
          populate: {
            path: 'game',
            model: 'Game'
          }
        });
    },
    // query that will get all posts made to a particular game
    postsByGame: async (parent, { gameId }) => {
      return Post.find({ game: gameId })
        .populate('user')
        .populate('game');
    },
  },

  Mutation: {
    //mutation to add a new user
    //takes in username, email, and password as required args
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new AuthenticationError('Something went wrong!');
      }
      //signing authenication token upon sucess
      const token = signToken(user);
      return { token, user };
    },
    // query to login a user
    // takes in email and password as args
    login: async (parent, { email, password }) => {
      //using findOne method to find matching email
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      //using bcrypt isCorrectPassword function to compare input password to hashed database password
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    // mutation to add profile dada to user 
    //requiring user to be authenticated before submitting
    updateProfile: async (parent, { userId, profileInput }, context) => {
      if (context.user) {
        // using mongoose findByIdandUpdate method to search by userId
        //takes in profileInput field as data to be updated and returns a new verion of the data
        const updatedUser = await User.findByIdAndUpdate(userId, profileInput, { new: true });
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // mutation to add a game to user profile
    addGameToProfile: async (parent, { userId, gameInput }, context) => {
      // Make sure the user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      // Check if the authenticated user matches the provided userId
      if (context.user._id !== userId) {
        throw new AuthenticationError('You can only modify your own profile!');
      }
      //taking in the gameInput arguments and updating it to the user's profile
      const userGame = await UserGame.create({ ...gameInput, game: gameInput.gameId, user: userId });
      const updatedUser = await User.findOneAndUpdate(
        // pushing the userGame into their games array
        { _id: userId },
        { $push: { games: userGame._id } },
        // returning an updated copy of the user
        { new: true }
      ).populate({
        path: 'games',
        populate: 'game'
      });
    
      return updatedUser;
    },
    //mutation to add a post to a game page
    addPost: async (parent, { content, game }, context) => {
    //ensure user is logged in before posting
      if (context.user) {
        // create a new post to the game
        const post = await Post.create({ content, user: context.user._id, game });
        return post;
      }
      throw new AuthenticationError('You need to be logged in!');

    },
    
  },
}

module.exports = resolvers;
