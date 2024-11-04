const { response, SUCCESS, CREATED } = require('../core/response');
const HouseBlessing = require('../models/house_blessing');

module.exports.create = (req, res) => {
  HouseBlessing.create(req.body)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};


module.exports.getAllHouseBlessings = (req, res) => {
    HouseBlessing.getAll(req.params.id)
      .then(result => {
        return res.success(response(SUCCESS, '', result));
      })
      .catch(err => {
        res.error(err);
      });
  };

module.exports.updateHouseBlessingByID = (req, res) => {
  HouseBlessing.updateByID(req.params.id, req.body)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.getById = (req, res) => {
  HouseBlessing.getByID(req.params.id)
  .then(result => {
    console.log(result, 'this is result')
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.deleteHouseBlessingByID = (req, res) => {
  HouseBlessing.deleteByID(req.params.id)
  .then(result => {
    res.success(response(SUCCESS, '', result));
  })
  .catch(err => {
    res.error(err);
  });
};

module.exports.admingetAllHouseBlessings = (req, res) => {
  HouseBlessing.adminGetAll()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.getAllPendingHouseBlessings = (req, res) => {
  HouseBlessing.adminGetAllPending()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.getAllApprovedHouseBlessings = (req, res) => {
  HouseBlessing.adminGetAllApproved()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.getAllRejectedHouseBlessings = (req, res) => {
  HouseBlessing.adminGetAllRejected()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.approveHouseBlessings = (req, res) => {
  HouseBlessing.houseBlessingApprove(req.params.id)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};

module.exports.rejectHouseBlessings = (req, res) => {
  HouseBlessing.houseBlessingReject(req.params.id)
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
};