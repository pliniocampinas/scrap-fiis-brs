CREATE TABLE IF NOT EXISTS scrapped_assets (
  sequential SERIAL,
  fund_acronym VARCHAR(10) NOT NULL,
  title TEXT,
  address TEXT,
  neighborhood TEXT,
  city TEXT,
  state TEXT,
  square_meters INTEGER,
  created_on TIMESTAMP NOT NULL,
  PRIMARY KEY (sequential, fund_acronym)
);

ALTER TABLE scrapped_assets
ADD IF NOT EXISTS SOURCE varchar(100);

ALTER TABLE scrapped_assets
ADD IF NOT EXISTS city_id INTEGER;