CREATE OR REPLACE VIEW full_cities_analysis AS
select cg.city_id, cg.year, cg.city_name, cg.state_acronym, cg.greater_region_name,
	cg.greater_region_code, cg.metropolitan_region, cg.is_legal_amazon, cg.is_semi_arid,
	cg.is_sao_paulo_region, cg.total_gdp_1000_brl, cg.gdp_per_capita_brl,
	cg.public_expending_value_1000_brl, cg.agro_value_1000_brl, cg.industry_value_1000_brl,
	cg.services_value_1000_brl, cg.taxes_value_1000_brl,
	cg.most_valueable_sector, cg.second_most_valueable_sector,
	cgdp_growth.gdp_per_capita_brl_growth, cgdp_growth.gdp_per_capita_brl_growth_percent,
	cgdp_growth.total_gdp_1000_brl_growth, cgdp_growth.total_gdp_1000_brl_growth_percent,
	cp_growth.population_growth, cp_growth.population_growth_percent,
	cc.is_capital, cc.distance_equator_km, cp_growth.population2021
from cities_gdp cg
left join cities_gdp_growth cgdp_growth on
	cgdp_growth.city_id = cg.city_id
left join cities_population_growth cp_growth on
	cp_growth.city_id = cg.city_id
left join cities_coordinates cc on
	cc.city_id = cg.city_id;