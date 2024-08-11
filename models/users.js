const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, '請輸入您的名字']
  },
  email: {
    type: String,
    required: [true, '請輸入您的 Email'],
    unique: true, // 確保 email 欄位是唯一值，重複插入會拋錯
    lowercase: true, // 將欄位值轉為小寫
    select: false
  },
  photo: {
    type: String,
    default: ''
  },
  createDate: {
    type: Number
  },
  updateDate: {
    type: Number,
  }
});
const userOption = {
  versionKey: false, // 禁用 Mongoose 自動添加的 __v 版本
  timestamps: {
    createdAt: 'createDate',
    updatedAt: 'updateDate'
  }
}
const User = mongoose.model('users', userSchema);

module.exports = User;
