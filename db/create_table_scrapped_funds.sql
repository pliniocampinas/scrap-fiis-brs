CREATE TABLE IF NOT EXISTS scrapped_funds (
  created_on TIMESTAMP NOT NULL,
  acronym VARCHAR(10) NOT NULL,
  url TEXT,
  long_name TEXT,
  admin TEXT,
  PRIMARY KEY (created_on, acronym)
);

ALTER TABLE scrapped_funds
ADD IF NOT EXISTS SOURCE varchar(100);