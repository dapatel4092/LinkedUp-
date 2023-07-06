const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    bio: {
        type: String,
        maxlength: 350,
        trim: true
    },
    games: [
        {
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
            consoles: [{
                type: String,
                required: true,
                trim: true
            }],
            gamingUsername: {
                type: String,
                required: true,
                trim: true
            },
        }
    ],
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;