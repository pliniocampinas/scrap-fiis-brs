CREATE TABLE IF NOT EXISTS cities_coordinates (
  city_id INTEGER,
  state_acronym TEXT,
  city_name TEXT,
  latitude TEXT,
  longitude TEXT,
  PRIMARY KEY (city_id)
);

ALTER TABLE cities_coordinates
ADD IF NOT EXISTS distance_equator_km INTEGER;