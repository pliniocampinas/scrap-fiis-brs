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