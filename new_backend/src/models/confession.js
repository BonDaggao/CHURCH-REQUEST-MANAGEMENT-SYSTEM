const TAG = '[Confession]';
const db = require('../core/database');
const logger = require('../core/logger');
const { response, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../core/response');

module.exports.getAll = (id) => {
    const ACTION = '[getAll]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM confession where user_id = ?`, id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.create = payload => {
    const ACTION = '[create]';
    logger.log('info', `${TAG}${ACTION}`, { payload });
    return new Promise((resolve, reject) => {
      db.execute(`INSERT INTO confession SET ?`, payload)
        .then(data => {
          if (data.affectedRows > 0) {
            resolve(data);
          } else {
            reject(response(INTERNAL_SERVER_ERROR));
          }
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.updateByID = (id, payload) => {
    const ACTION = '[updateByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE confession SET ? WHERE id = ?`, [payload
    , id])
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.getByID = (id) => {
    const ACTION = '[getByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM confession where id = ?`, id)
        .then(data => {
          resolve(data[0]);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.adminGetAll = () => {
    const ACTION = '[getAll]';
    logger.log('info', `${TAG}${ACTION}`);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM confession`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.adminGetAllApproved = () => {
    const ACTION = '[getAll]';
    logger.log('info', `${TAG}${ACTION}`);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM confession where status = 'Approved'`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.adminGetAllRejected = () => {
    const ACTION = '[getAll]';
    logger.log('info', `${TAG}${ACTION}`);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM confession where status = 'Rejected'`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.adminGetAllPending = () => {
    const ACTION = '[getAll]';
    logger.log('info', `${TAG}${ACTION}`);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM confession where status = 'Pending'`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.confessionApprove = (id) => {
    const ACTION = '[updateByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE confession SET status = 'Approved' WHERE id = ?` 
    , id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.confessionReject = (id) => {
    const ACTION = '[updateByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE confession SET status = 'Rejected' WHERE id = ?` 
    , id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };