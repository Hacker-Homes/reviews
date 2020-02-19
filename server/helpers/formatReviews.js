/* eslint-disable camelcase */
const formatReviews = (reviews) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const formattedReviews = [];
  reviews.forEach((review) => {
    const {
      id,
      name,
      date,
      comment,
      overall_rating,
      accuracy_rating,
      location_rating,
      check_in_rating,
      value_rating,
      cleanliness_rating,
      communication_rating,
      gender,
      profile_pic_num,
    } = review;

    const parsedDate = new Date(date);
    const month = monthNames[parsedDate.getMonth()];
    const year = parsedDate.getFullYear();

    formattedReviews.push({
      id,
      name,
      gender: parseInt(gender, 10),
      profilePicNum: parseInt(profile_pic_num, 10),
      date: `${month} ${year}`,
      sentence: comment,
      accuracy_rating: parseFloat(accuracy_rating),
      communication_rating: parseFloat(communication_rating),
      cleanliness_rating: parseFloat(cleanliness_rating),
      location_rating: parseFloat(location_rating),
      check_in_rating: parseFloat(check_in_rating),
      value_rating: parseFloat(value_rating),
      overall_rating: parseFloat(overall_rating),
    });
  });

  return [{ reviews: formattedReviews, room_id: reviews[0].listing_id }];
};

module.exports = formatReviews;
