const TAG = '[MAIL]';
const nodemailer = require('nodemailer');
const logger = require('../logger');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

function verify(transporter) {
  const ACTION = '[verify]';
  transporter.verify(function(error, success) {
    if (error) {
      logger.log('error', `${TAG}${ACTION}`, error);
    } else {
      logger.log('info', `${TAG}${ACTION}`, { msg: 'Mail transport was now created.' });
    }
  });
}

// function createTransport() {
//   const ACTION = '[createTransport]';
//   logger.log('info', `${TAG}${ACTION}`);
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.MAILER_USER,
//       pass: process.env.MAILER_PASS
//     }
//   });
//   verify(transporter);
// }

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err);
          reject(err);
        }
        resolve(token); 
      });
    });

    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};




module.exports = {
  createTransporter
};
