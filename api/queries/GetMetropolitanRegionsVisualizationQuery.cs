using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetMetropolitanRegionsVisualizationQuery
  {
    private string _connectionString;

    public GetMetropolitanRegionsVisualizationQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<MetropolitanRegionVisualizationModel>> Run()
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql = "SELECT city_id, city_name, state_acronym, metropolitan_region  FROM cities_gdp "
      + "WHERE year = 2019";
      
      var results = new List<MetropolitanRegionVisualizationModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new MetropolitanRegionVisualizationModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(MetropolitanRegionVisualizationModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      model.CityId = reader.GetInt64(0);
      model.CityName = reader.GetString(1);
      model.StateAcronym = reader.GetString(2);
      model.MetropolitanRegionName = reader.GetString(3);
    }
  }
}