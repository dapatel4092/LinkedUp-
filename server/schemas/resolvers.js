const { AuthenticationError } = require('apollo-server-express');
const { User, Profile} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // queries for our data
    Query: {
    // will return all users with the 'profile' populated
        users: async () => {
            return User.find().populate('profile');
      },
    // will return a single user, searching by id
        user: async (parent, { userId }) => {
         return User.findById(userId).populate('profile');
      },
    },

    Mutation: {
        // Mutation for adding a new user
        // takes in the args of username, email, and password
        // uses our signToken method from our JWT auth file
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
        // Mutation to login to the application
        // takes in email and password as args
        login: async (parent, { email, password }) => {
        //function to find if a user email exists.
          const user = await User.findOne({ email });
        //error if no email found
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
          //using the isCorrectPassword method from our user model
          const correctPw = await user.isCorrectPassword(password);
          
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
          
          const token = signToken(user);
          return { token, user };
        },
    } 
}