require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const validateBearerToken = require('./validateBearerToken');
const bookmarksRouter = require('./bookmarksRouter');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';

//Middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);


//Routes
app.get('/', (request, response) => {
  response.send('Hello, world!');
});

app.use('/bookmarks', bookmarksRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;