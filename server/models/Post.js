const { Schema, model } = require('mongoose');
// Post model contains post data
// Model also creates associations between individual games and Users
// Will be used to add and render posts to our game page
const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model('Post', postSchema);

module.exports = Post;