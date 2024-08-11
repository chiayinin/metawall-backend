const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users', // collections 關聯，綁定 mongoose.model() 指定的名稱
    required: [true, '使用者 ID 未填寫']
  },
  content: {
    type: String,
    required: [true, '貼文內容未填寫']
  },
  image: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: {
      values: ['group', 'person'],
      message: '貼文類別錯誤'
    },
    default: 'group',
  },
  tags: [
    {
      type: String,
      required: [true, '貼文標籤未填寫']
    }
  ],
  createDate: {
    type: Number
  },
  updateDate: {
    type: Number
  },
  comments: {
    type: Number,
    default: 0
  }
},
{
  versionKey: false,
  timestamps: {
    createdAt: 'createDate',
    updateAt: 'updateDate'
  }
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
