const { Schema, model } = require('mongoose');

const Games = model('Games', thoughtSchema);

module.exports = Games;