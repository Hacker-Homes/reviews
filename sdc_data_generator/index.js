/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const helpers = require('./helpers/file');
const getRatings = require('./helpers/ratings');

const { processFile, csvWriteStream } = helpers;

const REVIEWS_FILE = 'reviews.csv';
const SEED_FILE = 'seedData.csv';
const LISTING_COUNT = 10000000;
let currentListingNum = 0;
let currentReviewNum = 0;
let currentListingReviewCount = Math.floor(Math.random() * 10) + 1;


console.log('Generating and writing seed data to file...\n');

csvWriteStream.init(
  SEED_FILE,
  [
    'listing_id', 'name', 'date', 'comment', 'overall_rating',
    'accuracy_rating', 'location_rating', 'check_in_rating',
    'value_rating', 'cleanliness_rating', 'communication_rating',
  ],
);


const appendData = (data) => {
  if (currentListingNum > LISTING_COUNT - 1) {
    return;
  }

  if (currentListingNum % 100000 === 0 && currentReviewNum === 0) {
    console.log(`Processing listing ${currentListingNum}`);
  }

  const name = data.reviewer_name.trim().replace(/,/g, '');
  const { date } = data;
  const comment = `"${data.comments.trim().replace(/"/g, '')}"`;

  const {
    overall,
    accuracy,
    location,
    checkIn,
    value,
    cleanliness,
    communication,
  } = getRatings();

  if (currentReviewNum >= currentListingReviewCount) {
    currentListingReviewCount = Math.floor(Math.random() * 10) + 1;
    currentListingNum += 1;
    currentReviewNum = 0;
  } else {
    currentReviewNum += 1;
  }

  csvWriteStream.writeRow(
    [
      currentListingNum, name, date, comment, overall, accuracy,
      location, checkIn, value, cleanliness, communication,
    ],
  );
};


const generate = async () => {
  while (currentListingNum < LISTING_COUNT - 1) {
    await processFile(REVIEWS_FILE, appendData);
  }

  console.log(`\nSuccess! \nGenerated ${currentListingNum} listings`);
  csvWriteStream.end();
};

generate();
