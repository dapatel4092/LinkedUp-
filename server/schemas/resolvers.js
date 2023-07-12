const { AuthenticationError } = require('apollo-server-express');
const { User, UserGame, Post, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // query to retrieve a logged in user
    // This will be crucial for allowing us to view and manipulate logged in user data
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
    // So far used for debugging
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
    //Will be used to connect a to a users profile page
    user: async (parent, { userId }) => {
      return User.findById(userId).populate({
        path: 'userGames',
        populate: {
          path: 'game',
          model: 'Game',
        },
      });
    },
    //Query that will return all games from our game model
    // This will be used as our games are pre-seeded
    games: async () => {
      const games = await Game.find();
      return games;
  },
    //Query that will return all users that play a specific game
    //Still don't know if we have a need for this just yet
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
    //This will be used for each game's page to display posts.
    postsByGame: async (parent, { gameId }) => {
      return Post.find({ gameId: gameId })
      //Populating the users and the games that are associated with the post
        .populate({
          path: 'userId',
          model: 'User',
          select: '-__v -password',
        })
        .populate({
          path: 'gameId',
          model: 'Game',
        });
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
       // checks that the user is modifying their own profile
      if (context.user && context.user._id == userId) {
        const newUserGame = new UserGame({
          //All of the information our form will take in for a single user game
          user: context.user._id,
          game: userGame.gameId,
          competitive: userGame.competitive,
          rank: userGame.rank,
          console: userGame.console,
          gamingUsername: userGame.gamingUsername
        });
    
        await newUserGame.save();
    
        return await User.findByIdAndUpdate(
          //gathering the proper user to add the game to by id
          context.user._id,
          //using mongoose push method to add newUser game to userGames array
          { $push: { userGames: newUserGame._id } },
          //returning new copy of data
          { new: true }
        ).populate('userGames');
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // adding a post to a specific game's page
    addPost: async (parent, { content, userId, gameId }, context) => {
      if (context.user) {
        //Creating a new post using the post model and taking in a single user and game.
        const post = await Post.create({ content, userId: userId, gameId: gameId });
        //Gathering this new post to return
        const populatedPost = await Post.findById(post._id)
        //populating user and game data to relate a post to these.
          .populate({
            path: 'userId',
            model: 'User',
            select: '-__v -password',
          })
          .populate({
            path: 'gameId',
            model: 'Game',
          });
    
        return populatedPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
