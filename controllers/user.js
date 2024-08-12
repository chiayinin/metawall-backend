const User = require('../models/user');

const user = {
  /**
   * GET users listing.
   * @async
   * @function getUsers
   * @param {Object} req - Express 請求物件
   * @param {Object} res - Express 回應物件
   * @returns {Promise<void>} - 無返回值
   */
  async getUsers(req, res) {
    res.send('respond with a resource');
  }
}

module.exports = user;
