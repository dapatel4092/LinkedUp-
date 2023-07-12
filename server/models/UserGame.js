const { Schema, model } = require('mongoose');
//UserGame is a schema that will store individual games to a user's profile
const userGameSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
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
    },
});

const UserGame = model('UserGame', userGameSchema);

module.exports = UserGame;
