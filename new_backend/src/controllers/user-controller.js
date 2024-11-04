const { response, SUCCESS, CREATED } = require('../core/response');
const User = require('../models/user');

module.exports.create = (req, res) => {
  User.create(req.body)
    .then(result => {
      res.success(response(CREATED));
    })
    .catch(err => {
      res.error(err);
    });
};