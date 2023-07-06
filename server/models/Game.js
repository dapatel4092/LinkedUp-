const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  title: {
    type: String,
    required: 'You must choose at least one game!',
    trim: true,
  },
  competitive: {
    type: Boolean
  },
  rank: {
    type: String,
  }, 
  console: {
    type: String,
    required: true,
    trim: true
  },
  gamingUsername: {
    type: String,
    required: true,
    trim: true
  }
});

const Game = model('Game', gameSchema);

module.exports = Game;
