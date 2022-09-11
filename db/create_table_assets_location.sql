CREATE TABLE IF NOT EXISTS assets_location (
  asset_sequential SERIAL,
  input_text TEXT,
  out_formatted_address TEXT,
  out_name TEXT,
  out_place_id TEXT,
  out_latitude TEXT,
  out_longitude TEXT,
  created_on TIMESTAMP NOT NULL,
  PRIMARY KEY (asset_sequential, input_text)
);