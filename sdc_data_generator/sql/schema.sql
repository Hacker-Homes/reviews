CREATE TABLE reviews (
  id serial PRIMARY KEY NOT NULL,
  listing_id serial NOT NULL,
  name character varying(255) NOT NULL,
  date date NOT NULL,
  comment text NOT NULL,
  overall_rating real NOT NULL,
  accuracy_rating real NOT NULL,
  location_rating real NOT NULL,
  check_in_rating real NOT NULL,
  value_rating real NOT NULL,
  cleanliness_rating real NOT NULL,
  communication_rating real NOT NULL,
)