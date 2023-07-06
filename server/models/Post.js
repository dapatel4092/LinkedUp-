const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: String,
    required: true,
  }
});

const Post = model('Post', postSchema);

module.exports = Post;