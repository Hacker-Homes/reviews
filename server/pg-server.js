/* eslint-disable no-console */
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3004;
const pool = new Pool({
  user: 'daniel',
  host: 'localhost',
  database: 'homes',
});

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/reviews/:listingId', (req, res) => {
  const { listingId } = req.params;
  pool.query('SELECT * FROM reviews WHERE listing_id = $1 ORDER BY date desc;', [listingId], (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send(result.rows);
    }
  });
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
