const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  bio: {
    type: String,
    maxlength: 350,
    trim: true
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'Game',
  }],
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;