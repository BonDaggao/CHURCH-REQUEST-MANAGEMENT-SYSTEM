const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./src/core/logger');
const db = require('./src/core/database');
const routes = require('./src/routes');
const { response, ENDPOINT_NOT_FOUND } = require('./src/core/response');

db.connect()
  .then(data => data)
  .catch(error => error);

  const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(helmet());

// for parsing application/json
app.use(express.json({ limit: '50mb' }));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// setup success/error handler
app.use(function(req, res, next) {
  res.success = function(response) {
    logger.log('info', `[${res.req.method}][${req.originalUrl}]`, response);
    res.status(response.status).json(response.body);
  };

  res.error = function(error) {
    console.log('Error', error);
    logger.log('error', `[${res.req.method}][${req.originalUrl}]`, error);
    res.status(error.status).json(error.body);
  };

  next();
});

// consolidated endpoints for version one
app.use('/', routes);

// Handle production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.get('.*', (req, res) => {
  res.error(response(ENDPOINT_NOT_FOUND));
});

module.exports = app;