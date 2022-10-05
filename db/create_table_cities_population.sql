CREATE TABLE IF NOT EXISTS cities_population (
  year INTEGER,
  city_id INTEGER,
  city_name TEXT,
  state_acronym TEXT,
  estimate_population INTEGER,
  PRIMARY KEY (year, city_id)
);