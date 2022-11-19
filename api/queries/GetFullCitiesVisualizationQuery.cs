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

    private void MapValues(FullCityVisualizationModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      model.CityId = reader.GetInt64(0);
      model.Year = reader.GetInt32(1);
      model.CityName = reader.GetString(2);
    }

    public async Task<List<FullCityVisualizationModel>> Run()
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      string[] fields = {
        "city_id", "year", "city_name", "state_acronym", "greater_region_name", "greater_region_code",
        "metropolitan_region", "is_legal_amazon", "is_semi_arid", "is_sao_paulo_region",
        "total_gdp_1000_brl", "gdp_per_capita_brl", "public_expending_value_1000_brl", 
        "agro_value_1000_brl", "industry_value_1000_brl", "services_value_1000_brl", "taxes_value_1000_brl",
        "most_valueable_sector", "second_most_valueable_sector", "gdp_per_capita_brl_growth", 
        "gdp_per_capita_brl_growth_percent", "total_gdp_1000_brl_growth", "total_gdp_1000_brl_growth_percent",
        "population_growth", "population_growth_percent", "is_capital", "distance_equator_km", 
        "population2021", "is_matopiba", "is_near_coast", "is_sea_front",
      };

      var sql = "SELECT " + String.Join(", ", fields) + " FROM full_cities_analysis";
      var results = new List<FullCityVisualizationModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          Console.WriteLine("First city");
          var model = new FullCityVisualizationModel();
          MapValues(model, reader);
          results.Add(model);
          break;
        }
      }

      return results;
    }
  }
}