require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: 'homes',
  max: 65,
});

const query = (listingId) => new Promise((resolve, reject) => {
  pool.connect((err, client, release) => {
    if (err) {
      reject(err.stack);
    } else {
      client.query(
        'SELECT * FROM reviews WHERE listing_id = $1 ORDER BY date DESC;',
        [listingId], (queryErr, result) => {
          release();
          if (queryErr) {
            reject(queryErr.stack);
          } else {
            resolve(result.rows);
          }
        },
      );
    }
  });
});

module.exports = query;
