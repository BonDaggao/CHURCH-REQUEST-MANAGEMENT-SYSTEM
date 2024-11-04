const { response, SUCCESS, CREATED } = require('../core/response');
const Marriage = require('../models/marriage');

module.exports.create = (req, res) => {
  Marriage.create(req.body)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};


module.exports.getAllMarriages = (req, res) => {
    Marriage.getAll(req.params.id)
      .then(result => {
        return res.success(response(SUCCESS, '', result));
      })
      .catch(err => {
        res.error(err);
      });
  };

module.exports.updateMarriageByID = (req, res) => {
  Marriage.updateByID(req.params.id, req.body)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.getById = (req, res) => {
  Marriage.getByID(req.params.id)
  .then(result => {
    console.log(result, 'this is result')
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.deleteMarriageByID = (req, res) => {
  Marriage.deleteByID(req.params.id)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.admingetAllMarriages = (req, res) => {
  Marriage.adminGetAll()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.getAllApprovedMarriages = (req, res) => {
  Marriage.adminGetAllApproved()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.getAllRejectedMarriages = (req, res) => {
  Marriage.adminGetAllRejected()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.approveMarriages = (req, res) => {
  Marriage.marriageApprove(req.params.id)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.getAllPendingMarriages = (req, res) => {
  Marriage.adminGetAllPending()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.rejectMarriages = (req, res) => {
  Marriage.marriageReject(req.params.id)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};