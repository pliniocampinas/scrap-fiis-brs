CREATE VIEW cities_gdp_growth AS
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