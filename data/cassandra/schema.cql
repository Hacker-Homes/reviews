USE homes;

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id int,
  listing_id int,
  name text,
  date timestamp,
  comment text,
  overall_rating decimal,
  accuracy_rating decimal,
  location_rating decimal,
  check_in_rating decimal,
  value_rating decimal,
  cleanliness_rating decimal,
  communication_rating decimal,

  PRIMARY KEY (listing_id, date, id)
);
