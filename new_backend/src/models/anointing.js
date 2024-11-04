const TAG = '[House Blessing]';
const db = require('../core/database');
const logger = require('../core/logger');
const { response, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../core/response');

module.exports.getAll = (id) => {
    const ACTION = '[getAll]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`SELECT * FROM annointing_of_the_sick where user_id = ?`, id)
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
      db.execute(`INSERT INTO annointing_of_the_sick SET ?`, payload)
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
      db.execute(`UPDATE annointing_of_the_sick SET ? WHERE id = ?`, [payload
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
      db.execute(`SELECT * FROM annointing_of_the_sick where id = ?`, id)
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
      db.execute(`SELECT * FROM annointing_of_the_sick`)
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
      db.execute(`SELECT * FROM annointing_of_the_sick where status = 'Approved'`)
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
      db.execute(`SELECT * FROM annointing_of_the_sick where status = 'Rejected'`)
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
      db.execute(`SELECT * FROM annointing_of_the_sick where status = 'Pending'`)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.anointingApprove = (id) => {
    const ACTION = '[updateByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE annointing_of_the_sick SET status = 'Approved' WHERE id = ?` 
    , id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };

  module.exports.anointingReject = (id) => {
    const ACTION = '[updateByID]';
    logger.log('info', `${TAG}${ACTION}`, id);
    return new Promise((resolve, reject) => {
      db.execute(`UPDATE annointing_of_the_sick SET status = 'Rejected' WHERE id = ?` 
    , id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(response(INTERNAL_SERVER_ERROR));
        });
    });
  };