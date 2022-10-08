     
      SELECT acronym, url
      FROM scrapped_funds as sf
      WHERE sf.created_on = (
        SELECT created_on 
        FROM scrapped_funds as sf2 
        ORDER BY created_on DESC
        LIMIT 1
	  );
	  --drop table scrapped_funds
	  --drop table scrapped_assets
	  
	  ALTER TABLE scrapped_assets 
	  ALTER COLUMN square_meters TYPE integer USING square_meters::integer;
	  
	  ALTER TABLE scrapped_assets
		ADD SOURCE varchar(100);
	  
	  select * from scrapped_funds
	  
	  select count(*) from scrapped_funds group by created_on
	  
	  --delete from scrapped_funds
	  
	  select *, NULLIF(square_meters, '')::int as sqm from scrapped_assets
	  order by sqm desc
	  
	  -- delete from scrapped_assets 
	  -- select * from scrapped_assets
	  where created_on < '2022-08-30'
	  
	  select DISTINCT state from scrapped_assets
	  select DISTINCT city, state from scrapped_assets order by 1
	  
	  CREATE TABLE IF NOT EXISTS scrapped_assets (
		  sequential SERIAL,
		  fund_acronym VARCHAR(10) NOT NULL,
		  title TEXT,
		  address TEXT,
		  neighborhood TEXT,
		  city TEXT,
		  state TEXT,
		  square_meters TEXT,
		  created_on TIMESTAMP NOT NULL,
		  PRIMARY KEY (sequential, fund_acronym)
	);
	  

select count(distinct acronym), source from scrapped_funds
group by source

select distinct acronym from scrapped_funds
where source = 'funds-explorer'

-- funds only present in clubefii
select acronym from scrapped_funds
where acronym not in(select acronym from scrapped_funds where source = 'funds-explorer')
and source = 'clubefii'

-- funds that have physical assets in funds explorer
select distinct acronym from scrapped_funds
where acronym in(select fund_acronym from scrapped_assets where source = 'funds-explorer')
and source = 'funds-explorer'


select * from scrapped_funds where source = 'clubefii'

select count(*), source from scrapped_assets
group by source

select * from scrapped_assets where city = '' and source = 'funds-explorer'

-- Pernambucanas
select * from scrapped_assets 
where LOWER(title) like '%pernambucanas%'
and source = 'clubefii'

-- Atacadão
select * from scrapped_assets 
where LOWER(title) like '%atacadão%'
and source = 'clubefii'

-- Mineirão
select * from scrapped_assets 
where LOWER(title) like '%mineirão%'
and fund_acronym = 'HGRU11'
and source = 'clubefii'

COPY (select * from last_cities_gdp) 
TO 'C:\Users\plini\Downloads\pg-exports\last_cities_gdp.csv' 
DELIMITER ',' CSV HEADER;

select 
	gdp.year, 
	gdp.city_id, 
	gdp.city_name, 
	pop.estimate_population 
from cities_gdp gdp
left join cities_population pop on
	pop.city_id = gdp.city_id
and pop.year = gdp.year
where gdp.city_id = 1100015

-- Population growth
select 
	cp11.city_id, cp11.city_name, cp11.state_acronym,
	cp11.estimate_population population2011, 
	cp21.estimate_population population2021,
	cp21.estimate_population - cp11.estimate_population population_growth,
	ROUND (
		((cp21.estimate_population::float / cp11.estimate_population::float) - 1)::numeric 
	, 2) population_growth_percent
from cities_population cp11
left join cities_population cp21 on
	cp11.city_id = cp21.city_id
where 
	cp11.year = 2011
and cp21.year = 2021
order by population_growth_percent desc

