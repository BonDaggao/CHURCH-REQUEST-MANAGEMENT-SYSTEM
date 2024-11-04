const TAG = '[House Blessing]';
const db = require('../core/database');
const logger = require('../core/logger');
const { response, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../core/response');

module.exports.getAll = (id) => {
    const ACTION = '[getAll]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM confirmation where user_id = ?`, id)
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
      db.execute(`INSERT INTO confirmation SET ?`, payload)
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
      db.execute(`UPDATE confirmation SET ? WHERE id = ?`, [payload
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
      db.execute(`SELECT * FROM confirmation where id = ?`, id)
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
      db.execute(`SELECT * FROM confirmation`)
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
      db.execute(`SELECT * FROM confirmation where status = 'Approved'`)
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
      db.execute(`SELECT * FROM confirmation where status = 'Rejected'`)
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
      db.execute(`SELECT * FROM confirmation where status = 'Pending'`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.confirmationApprove = (id) => {
    const ACTION = '[updateByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE confirmation SET status = 'Approved' WHERE id = ?` 
    , id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.confirmationReject = (id) => {
    const ACTION = '[updateByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE confirmation SET status = 'Rejected' WHERE id = ?` 
    , id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };