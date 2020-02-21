/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const morgan = require('morgan');
const { Pool } = require('pg');
const formatReviews = require('./helpers/formatReviews');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: 'daniel',
  host: 'localhost',
  database: 'homes',
});

app.use(morgan('tiny'));
app.use(express.static(`${__dirname}/../client/public`));

app.get('/api/reviews/:listingId', (req, res) => {
  const { listingId } = req.params;

  pool.query(
    'SELECT * FROM reviews WHERE listing_id = $1 ORDER BY date DESC;',
    [listingId],
    (err, result) => {
      if (err) {
        res.status(500).send();
      } else {
        res.send(formatReviews(result.rows));
      }
    },
  );
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
