const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// User will be our sort of 'main' model that everything branches off of
const userSchema = new Schema({
  //login credentials
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //A short bio the user can add to their profile
  bio: {
    type: String,
  },
  //Links to navigate to a Users socials
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    snapchat: String,
  },
  //userGames will be a user's individual games that play
  userGames: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserGame'
    }
  ]
});
//password hashing for a users saved password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

//method to compare a stored hashed password with a user's input password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
