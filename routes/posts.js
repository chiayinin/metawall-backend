const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');

router.get('/', async(req, res, next) => {
  // populate 關聯 user 欄位，透過引用方式取得另一個 collection
  const post = await Post.find().populate('user');

  res.status(200).json({
    status: 'success',
    results: post.length,
    data: {
      post
    }
  });
  res.send("posts 頁面");
}).post('/', async(req, res, next) => {
  try {
    const data = req.body;

    if(data.content !== undefined){
      const newPost = await Post.create({
        user: data.user,
        content: data.content,
        tags: data.tags,
        type: data.type
      });

      res.status(200).json({
        status: 'success',
        data: newPost
      });
    } else {
      res.status(400).json({
        status: 'success',
        message: "欄位未填寫正確，或無此 todo ID"
      });
    }
  } catch {
    res.status(400).json({
      staus: 'false',
      message: "欄位未填寫正確，或無此 todo ID"
    });
  }
}).delete('/', async(req, res, next) => {

});

module.exports = router;
