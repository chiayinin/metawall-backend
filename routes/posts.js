const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');
const User = require('../models/Users');

router.get('/', async(req, res, next) => { // 取得所有動態
  // populate 關聯 user 欄位，透過引用方式取得另一個 collection
  const post = await Post.find().populate({
    path: 'user',
    select: 'userName photo'
  });

  res.status(200).json({
    status: 'success',
    results: post.length,
    data: {
      post
    }
  });
}).post('/', async(req, res, next) => { // 新增貼文
  try {
    const data = req.body;

    if(data.content !== undefined){
      const newPost = await Post.create({
        user: data.user,
        content: data.content.trim(), // 去空白
        image: data.image,
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
        message: "content 欄位空白"
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
