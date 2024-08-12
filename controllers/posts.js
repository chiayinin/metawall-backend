const Post = require('../models/Posts');
const User = require('../models/Users');

const posts = {
  /**
   * 取得所有動態
   * @async
   * @function getPosts
   * @param {Object} req - Express 請求物件
   * @param {Object} res - Express 回應物件
   * @returns {Promise<void>} - 無返回值
   */
  async getPosts(req, res) {
    // 關鍵字篩選，時間排序
    const { q = '', order = 'desc'} = req.query;
    const search = {};
    const sort = {
      createDate: order === 'asc' ? 1 : -1
    };

    if(q) search.content = new ReqExp(q, 'g');

    // populate 關聯 user 欄位，透過引用方式取得另一個 collection
    const post = await Post.find(search).sort(sort).populate({
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
  },
  /**
   * 新增貼文
   * @async
   * @function getPosts
   * @param {Object} req - Express 請求物件
   * @param {*} res - Express 回應物件
   * @returns {Promise<void>} - 無返回值
   */
  async createPosts(req, res) {
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
  }
};

module.exports = posts;
