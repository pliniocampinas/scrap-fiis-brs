CREATE VIEW cities_population_growth AS
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