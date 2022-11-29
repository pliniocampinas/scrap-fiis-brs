using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetFullCitiesVisualizationQuery
  {
    private string _connectionString;

    public GetFullCitiesVisualizationQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<FullCityVisualizationModel>> Run(int? year = null)
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      string[] fields = 
      {
        "city_id", "year", "city_name", "state_acronym", "greater_region_name", "greater_region_code",
        "metropolitan_region", "is_legal_amazon", "is_semi_arid", "is_sao_paulo_region",
        "total_gdp_1000_brl", "gdp_per_capita_brl", "public_expending_value_1000_brl", 
        "agro_value_1000_brl", "industry_value_1000_brl", "services_value_1000_brl", "taxes_value_1000_brl",
        "most_valueable_sector", "second_most_valueable_sector", "gdp_per_capita_brl_growth", 
        "gdp_per_capita_brl_growth_percent", "total_gdp_1000_brl_growth", "total_gdp_1000_brl_growth_percent",
        "population_growth", "population_growth_percent", "is_capital", "distance_equator_km", 
        "population2021", "is_matopiba", "is_near_coast", "is_sea_front",
      };

      var sql = "SELECT " + String.Join(", ", fields) + " FROM full_cities_analysis ";

      if(year.HasValue && year > 0) 
      {
        sql+= "WHERE year = " + year.ToString();
      }

      var results = new List<FullCityVisualizationModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new FullCityVisualizationModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(FullCityVisualizationModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      model.CityId = reader.GetInt64(0);
      model.Year = reader.GetInt32(1);
      model.CityName = reader.GetString(2);
      model.StateAcronym = reader.GetString(3);
      model.GreaterRegionName = reader.GetString(4);
      model.GreaterRegionCode = reader.GetInt32(5);
      model.MetropolitanRegion = reader.GetString(6);
      model.IsLegalAmazon = reader.GetBoolean(7);
      model.IsSemiArid = reader.GetBoolean(8);
      model.IsSaoPauloRegion = reader.GetBoolean(9);
      model.TotalGdp1000Brl = reader.GetDecimal(10);
      model.GdpPerCapitaBrl = reader.GetDecimal(11);
      model.PublicExpendingValue1000Brl = reader.GetDecimal(12);
      model.AgroValue1000Brl = reader.GetDecimal(13);
      model.IndustryValue1000Brl = reader.GetDecimal(14);
      model.ServicesValue1000Brl = reader.GetDecimal(15);
      model.TaxesValue1000Brl = reader.GetDecimal(16);
      model.MostValueableSector = reader.GetString(17);
      model.SecondMostValueableSector = reader.GetString(18);
      model.GdpPerCapitaBrlGrowth = reader.IsDBNull(19)? 0: reader.GetDecimal(19);
      model.GdpPerCapitaBrlGrowthPercent = reader.IsDBNull(20)? 0: reader.GetDecimal(20);
      model.TotalGdp1000BrlGrowth = reader.IsDBNull(21)? 0: reader.GetDecimal(21);
      model.TotalGdp1000BrlGrowthPercent = reader.IsDBNull(22)? 0: reader.GetDecimal(22);
      model.PopulationGrowth = reader.IsDBNull(23)? 0: reader.GetInt64(23);
      model.PopulationGrowthPercent = reader.IsDBNull(24)? 0: reader.GetDecimal(24);
      model.IsCapital = reader.GetBoolean(25);
      model.DistanceEquatorKm = reader.GetInt32(26);
      model.Population2021 = reader.IsDBNull(27)? 0: reader.GetInt64(27);
      model.IsMatopiba = reader.GetBoolean(28);
      model.IsNearCoast = reader.GetBoolean(29);
      model.IsSeaFront = reader.GetBoolean(30);
    }
  }
}