/* eslint-disable no-console */
const helpers = require('./helpers/file');
const getRatings = require('./helpers/ratings');

const { processFile, csvWriteStream } = helpers;

const reviewsFile = 'reviews.csv';
const seedFile = 'seedData.csv';

console.log('Generating and writing seed data to file...');
let entryCount = 0;

csvWriteStream.init(
  seedFile,
  [
    'name', 'date', 'comment', 'overall_rating',
    'accuracy_rating', 'location_rating',
    'check_in_rating', 'value_rating',
    'cleanliness_rating', 'communication_rating',
  ],
);


const appendData = (data) => {
  const name = data.reviewer_name;
  const { date } = data;
  const comment = `"${data.comments.trim()}"`;

  const {
    overall,
    accuracy,
    location,
    checkIn,
    value,
    cleanliness,
    communication,
  } = getRatings();


  entryCount += 1;

  csvWriteStream.writeRow(
    [
      name, date, comment, overall, accuracy, location,
      checkIn, value, cleanliness, communication,
    ],
  );
};


processFile(reviewsFile, appendData).then(() => {
  csvWriteStream.end();
  console.log(`Successfully generated ${entryCount} entries!`);
});
