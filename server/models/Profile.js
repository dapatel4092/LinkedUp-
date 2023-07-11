const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    //what kind of gamer
    gamerType: {
      type: String,
      required: true,
      default: '',
    },
    avatar: {
      type: String,
      required: true,
      default: '',
    },

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
    
    //social media
    socialMediaLinks: [
      {
      facebook: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
      instagram: {
        type: String,
        default: '',
      },
      snapchat: {
        type: String,
        default: '',
      },
      }
    ]
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
