DROP TABLE IF EXISTS reviews;


CREATE TABLE reviews (
  id serial PRIMARY KEY NOT NULL,
  listing_id serial NOT NULL,
  name character varying(255) NOT NULL,
  date date NOT NULL,
  comment text NOT NULL,
  overall_rating numeric(2,1) NOT NULL,
  accuracy_rating numeric(2,1) NOT NULL,
  location_rating numeric(2,1) NOT NULL,
  check_in_rating numeric(2,1) NOT NULL,
  value_rating numeric(2,1) NOT NULL,
  cleanliness_rating numeric(2,1) NOT NULL,
  communication_rating numeric(2,1) NOT NULL
);


\COPY reviews(
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
) FROM '/home/daniel/Software/reviews/sdc_data_generator/seedData.csv' DELIMITER ',' CSV HEADER;


CREATE INDEX listing_idx ON reviews (listing_id);
