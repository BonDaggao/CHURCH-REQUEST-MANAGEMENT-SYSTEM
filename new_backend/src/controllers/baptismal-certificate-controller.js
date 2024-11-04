const { response, SUCCESS, CREATED } = require('../core/response');
const BaptismalCertificate = require('../models/baptism_certificate');

module.exports.create = (req, res) => {
  BaptismalCertificate.create(req.body)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};


module.exports.getAllBaptismalCertificates = (req, res) => {
    BaptismalCertificate.getAll(req.params.id)
      .then(result => {
        return res.success(response(SUCCESS, '', result));
      })
      .catch(err => {
        res.error(err);
      });
  };

module.exports.updateBaptismalCertificateByID = (req, res) => {
  Baptism.updateByID(req.params.id, req.body)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.deleteBaptismalCertificateByID = (req, res) => {
  Baptism.deleteByID(req.params.id)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};