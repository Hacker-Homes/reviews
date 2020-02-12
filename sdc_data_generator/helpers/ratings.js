const getRatings = () => {
  const randomRating = () => (Math.floor(Math.random() * 6) + 5) / 2;

  const accuracy = randomRating();
  const location = randomRating();
  const checkIn = randomRating();
  const value = randomRating();
  const cleanliness = randomRating();
  const communication = randomRating();
  const overall = Math.round(((
    accuracy
    + location
    + checkIn
    + value
    + cleanliness
    + communication) / 6
  ) * 2) / 2;

  return {
    overall,
    accuracy,
    location,
    checkIn,
    value,
    cleanliness,
    communication,
  };
};

module.exports = getRatings;
