const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: [true, '使用者 ID 未填寫']
  },
  content: {
    type: String,
    required: [true, 'Content 未填寫']
  },
  type: {
    type: String,
    enum: ['group', 'person'],
    required: [true, '貼文類型 type 未填寫']
  },
  tags: [
    {
      type: String,
      required: [true, '貼文標籤 tags 未填寫']
    }
  ]
});
const Post = mongoose.model('posts', postSchema);

module.exports = Post;
