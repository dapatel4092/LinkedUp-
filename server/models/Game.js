const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
});

const Game = model('Game', gameSchema);

module.exports = Game;
