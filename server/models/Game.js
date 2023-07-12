const { Schema, model } = require('mongoose');
// Game model will store our pre-seeded games
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
