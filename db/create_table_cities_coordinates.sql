CREATE TABLE IF NOT EXISTS cities_coordinates (
  city_id INTEGER,
  city_name TEXT,
  latitude FLOAT,
  longitude FLOAT,
  is_capital BOOLEAN,
  PRIMARY KEY (city_id)
);

ALTER TABLE cities_coordinates
ADD IF NOT EXISTS distance_equator_km INTEGER;

ALTER TABLE cities_coordinates
ADD IF NOT EXISTS is_matopiba BOOLEAN;

ALTER TABLE cities_coordinates
ADD IF NOT EXISTS is_near_coast BOOLEAN;

ALTER TABLE cities_coordinates
ADD IF NOT EXISTS is_sea_front BOOLEAN;