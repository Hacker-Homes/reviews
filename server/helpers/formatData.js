/* eslint-disable camelcase */
const formatData = (reviews) => {
  const ratingNames = [
    'overall_rating', 'accuracy_rating', 'location_rating', 'check_in_rating',
    'value_rating', 'cleanliness_rating', 'communication_rating',
  ];

  const ratingsTotal = {};
  const formattedReviews = [];

  reviews.forEach((review) => {
    ratingNames.forEach((ratingName) => {
      if (ratingsTotal[ratingName] === undefined) {
        ratingsTotal[ratingName] = parseFloat(review[ratingName]);
      } else {
        ratingsTotal[ratingName] += parseFloat(review[ratingName]);
      }
    });

    const {
      id, name, date, comment,
    } = review;

    formattedReviews.push({
      id, name, date, comment,
    });
  });

  const ratingAverages = {};
  const ratingCount = reviews.length;

  ratingNames.forEach((ratingName) => {
    ratingAverages[ratingName] = Math.round((ratingsTotal[ratingName] / ratingCount) * 2) / 2;
  });

  return { ratings: ratingAverages, reviews: formattedReviews };
};

module.exports = formatData;
