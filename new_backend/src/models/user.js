const TAG = '[User]';
const db = require('../core/database');
const logger = require('../core/logger');
const { response, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../core/response');


module.exports.getAll = () => {
  const ACTION = '[getAll]';
  logger.log('info', `${TAG}${ACTION}`);
  return new Promise((resolve, reject) => {
    db.execute(`SELECT * FROM employee_info`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};

module.exports.login = (username, password) => {
  const ACTION = '[login]';
  logger.log('info', `${TAG}${ACTION}`);
  return new Promise((resolve, reject) => {
    db.execute(
      `
        SELECT *
        FROM users AS u 
        WHERE u.username = ? AND u.password = ?;
      `,
      [username, password]
    )
      .then(data => {
        if (data.length > 0) {
          resolve(data)
        } else {
          reject(response(INVALID_CREDENTIALS));
        }
      })
      .catch(() => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};

module.exports.create = user => {
  const ACTION = '[create]';
  logger.log('info', `${TAG}${ACTION}`, { user });
  return new Promise((resolve, reject) => {
    db.execute(`INSERT INTO users SET ?`, user)
      .then(data => {
        if (data.affectedRows > 0) {
          resolve();
        } else {
          reject(response(INTERNAL_SERVER_ERROR));
        }
      })
      .catch(err => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};