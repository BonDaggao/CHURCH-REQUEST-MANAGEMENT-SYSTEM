const { response, SUCCESS, CREATED } = require('../core/response');
const MarriageCertificate = require('../models/marriage_certificate');

module.exports.create = (req, res) => {
  MarriageCertificate.create(req.body)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};


module.exports.getAllMarriageCertificates = (req, res) => {
    MarriageCertificate.getAll(req.params.id)
      .then(result => {
        return res.success(response(SUCCESS, '', result));
      })
      .catch(err => {
        res.error(err);
      });
  };

module.exports.updateMarriageCertificateByID = (req, res) => {
  Baptism.updateByID(req.params.id, req.body)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.deleteMarriageCertificateByID = (req, res) => {
  Baptism.deleteByID(req.params.id)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};