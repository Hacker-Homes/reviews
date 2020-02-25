/* eslint-disable no-console */
require('dotenv').config();
// require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const { Pool } = require('pg');
const formatReviews = require('./helpers/formatReviews');

const app = express();
const PORT = process.env.PORT || 80;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: 'homes',
  max: 13, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// app.use(morgan('tiny'));
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
