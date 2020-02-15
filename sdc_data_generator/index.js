/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const helpers = require('./helpers/file');
const getRatings = require('./helpers/ratings');

const { processFile, csvWriteStream } = helpers;

const REVIEWS_FILE = 'reviews.csv';
const SEED_FILE = 'seedData.csv';
const LISTING_COUNT = 10000000;
const MAX_LISTING_REVIEWS = 10;
let currentId = 1;
let currentListingNum = 0;
let currentReviewNum = 0;
const getRandomReviewCount = () => Math.floor(Math.random() * MAX_LISTING_REVIEWS) + 1;
let currentListingReviewCount = getRandomReviewCount();


console.log('Generating and writing seed data to file...\n');

csvWriteStream.init(
  SEED_FILE,
  [
    'id', 'listing_id', 'name', 'date', 'comment', 'overall_rating',
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

  const name = `"${data.reviewer_name.trim()}"`;
  const { date } = data;
  const comment = `"${data.comments.trim().replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;

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
    currentListingReviewCount = getRandomReviewCount();
    currentListingNum += 1;
    currentReviewNum = 0;
  } else {
    currentReviewNum += 1;
  }

  csvWriteStream.writeRow(
    [
      currentId, currentListingNum, name, date, comment, overall, accuracy,
      location, checkIn, value, cleanliness, communication,
    ],
  );

  currentId += 1;
};


const generate = async () => {
  while (currentListingNum < LISTING_COUNT - 1) {
    await processFile(REVIEWS_FILE, appendData);
  }

  console.log(`\nSuccess! \nGenerated ${currentListingNum} listings`);
  csvWriteStream.end();
};

generate();
