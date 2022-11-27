using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetSemiAridCitiesQuery
  {
    private string _connectionString;

    public GetSemiAridCitiesQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<CityIsSemiAridModel>> Run(int? year = null)
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql = "SELECT city_id, year, city_name, state_acronym, is_semi_arid FROM cities_gdp WHERE year = 2019";
      
      var results = new List<CityIsSemiAridModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new CityIsSemiAridModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(CityIsSemiAridModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      model.CityId = reader.GetInt64(0);
      model.Year = reader.GetInt32(1);
      model.CityName = reader.GetString(2);
      model.StateAcronym = reader.GetString(3);
      model.IsSemiArid = reader.GetBoolean(4);
    }
  }
}