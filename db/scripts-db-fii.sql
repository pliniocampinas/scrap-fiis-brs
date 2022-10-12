     
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
-- CREATE VIEW cities_population_growth AS
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

-- drop view cities_population_growth
-- drop table cities_coordinates
delete from cities_coordinates
select * from cities_population_growth

SELECT * FROM cities_coordinates where is_capital = true
order by latitude 

select * from cities_population where city_name = 'Acrelândia'

-- Gdp Growth
-- CREATE VIEW cities_gdp_growth AS
select 
	cg10.city_id, cg10.city_name, cg10.state_acronym,
	cg10.gdp_per_capita_brl gdp_per_capita_brl_2010, 
	cg19.gdp_per_capita_brl gdp_per_capita_brl_2019,
	cg19.gdp_per_capita_brl - cg10.gdp_per_capita_brl gdp_per_capita_brl_growth,
	ROUND (
		((cg19.gdp_per_capita_brl::float / cg10.gdp_per_capita_brl::float) - 1)::numeric 
	, 2) gdp_per_capita_brl_growth_percent,
	cg10.total_gdp_1000_brl total_gdp_1000_brl_2010, 
	cg19.total_gdp_1000_brl total_gdp_1000_brl_2019,
	cg19.total_gdp_1000_brl - cg10.total_gdp_1000_brl total_gdp_1000_brl_growth,
	ROUND (
		((cg19.total_gdp_1000_brl::float / cg10.total_gdp_1000_brl::float) - 1)::numeric 
	, 2) total_gdp_1000_brl_growth_percent
from cities_gdp cg10
left join cities_gdp cg19 on
	cg10.city_id = cg19.city_id
where 
	cg10.year = 2010
and cg19.year = 2019
order by gdp_per_capita_brl_growth_percent desc

select metropolitan_region, count(metropolitan_region) counter from cities_gdp
where year = 2019
group by metropolitan_region
order by counter desc

-- Full cities analysis view
-- CREATE VIEW full_cities_analysis AS
select cg.city_id, cg.year, cg.city_name, cg.state_acronym, cg.greater_region_name,
	cg.greater_region_code, cg.metropolitan_region, cg.is_legal_amazon, cg.is_semi_arid,
	cg.is_sao_paulo_region, cg.total_gdp_1000_brl, cg.gdp_per_capita_brl,
	cg.public_expending_value_1000_brl, cg.agro_value_1000_brl, cg.industry_value_1000_brl,
	cg.services_value_1000_brl, cg.taxes_value_1000_brl,
	cg.most_valueable_sector, cg.second_most_valueable_sector,
	cgdp_growth.gdp_per_capita_brl_growth, cgdp_growth.gdp_per_capita_brl_growth_percent,
	cgdp_growth.total_gdp_1000_brl_growth, cgdp_growth.total_gdp_1000_brl_growth_percent,
	cp_growth.population_growth, cp_growth.population_growth_percent,
	cc.is_capital, cc.distance_equator_km
from cities_gdp cg
left join cities_gdp_growth cgdp_growth on
	cgdp_growth.city_id = cg.city_id
left join cities_population_growth cp_growth on
	cp_growth.city_id = cg.city_id
left join cities_coordinates cc on
	cc.city_id = cg.city_id
order by cc.distance_equator_km

COPY (select * from full_cities_analysis) 
TO 'C:\Users\plini\Downloads\pg-exports\full_cities_analysis.csv' 
DELIMITER ',' CSV HEADER;