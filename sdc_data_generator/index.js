/* eslint-disable no-console */
/* eslint-disable camelcase */
const csv = require('csv-parser');
const fs = require('fs');

const seedFile = './seedData.csv';

console.log('Removing previously stored seed data...');

fs.writeFileSync(seedFile, '');

console.log('Generating and writing seed data to file...');

let entryCount = 0;
const seedWriteStream = fs.createWriteStream(seedFile);

seedWriteStream.write(
  'name,'
  + 'date,'
  + 'comment,'
  + 'string,'
  + 'overall_rating,'
  + 'accuracy_rating,'
  + 'location_rating,'
  + 'check_in_rating,'
  + 'value_rating,'
  + 'cleanliness_rating,'
  + 'communication_rating\n',
);


const randomRating = () => (Math.floor(Math.random() * 6) + 5) / 2;


const appendEntry = (data) => {
  const name = data.reviewer_name;
  const { date } = data;
  const comment = data.comments.trim();
  const accuracy_rating = randomRating();
  const location_rating = randomRating();
  const check_in_rating = randomRating();
  const value_rating = randomRating();
  const cleanliness_rating = randomRating();
  const communication_rating = randomRating();
  const overall_rating = Math.round(((
    accuracy_rating
    + location_rating
    + check_in_rating
    + value_rating
    + cleanliness_rating
    + communication_rating) / 6
  ) * 2) / 2;

  entryCount += 1;

  seedWriteStream.write(
    `${name},\
${date},\
"${comment}",\
${overall_rating},\
${accuracy_rating},\
${location_rating},\
${check_in_rating},\
${value_rating},\
${cleanliness_rating},\
${communication_rating}\
\n`,
  );
};


fs.createReadStream('reviews.csv')
  .pipe(csv({ separator: ',' }))
  .on('data', (data) => appendEntry(data))
  .on('end', () => {
    seedWriteStream.end();
    console.log(`Successfully generated ${entryCount} entries!`);
  });
