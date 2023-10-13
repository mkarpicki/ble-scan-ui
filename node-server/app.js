const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');

const app = express();

const getHeaders = function (req) {
  return {
    'Authorization': req.get('Authorization') || 'Basic ' + Buffer.from(`${jira.username}:${jira.password}`).toString('base64')
  }
};

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Set our api routes
app.use('/', api);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
