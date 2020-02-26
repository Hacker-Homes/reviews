/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const query = require('../db');
const formatReviews = require('./helpers/formatReviews');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static(`${__dirname}/../client/public`));

app.get('/api/reviews/:listingId', (req, res) => {
  const { listingId } = req.params;

  query(listingId)
    .then((result) => res.send(formatReviews(result)))
    .catch((err) => res.status(500).send(err));
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
