const TAG = '[Help Center]';
const mailer = require('nodemailer');
const logger = require('../core/logger');
const { response, INTERNAL_SERVER_ERROR } = require('../core/response');

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

 module.exports.sendMail = async (body) => {
  const ACTION = '[Send mail]';
  logger.log('info', `${TAG}${ACTION}`, { body });

  // Assuming your body parameter is in JSON format like {"body": {...}}
  const mailOptions = body;

  try {
    const mailOptions = body

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    console.log("ERROR: ", err)
  }
};