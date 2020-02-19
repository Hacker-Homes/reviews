COPY reviews(
  id,
  listing_id,
  name,
  date,
  comment,
  overall_rating,
  accuracy_rating,
  location_rating,
  check_in_rating,
  value_rating,
  cleanliness_rating,
  communication_rating
) FROM 'seedData.csv' WITH DELIMITER = ',' AND HEADER = TRUE;