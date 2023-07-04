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
        console: {
            type: String,
            required: true,
            trim: true
        },
        gamingUsername: {
            type: String,
            required: true,
            trim: true
    },}
    ],
})

//Bio, Games, Playstyle (Casual or Competitive), Rank, Console, Username 


const Profile = model('Profile', profileSchema);

module.exports = Profile;