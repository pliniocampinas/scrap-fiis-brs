using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetCitiesGdpQuery
  {
    private string _connectionString;

    public GetCitiesGdpQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<CityGdpModel>> Run(int? year = null)
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql = "SELECT city_id, year, city_name, state_acronym, total_gdp_1000_brl, gdp_per_capita_brl FROM cities_gdp";
      
      if(year.HasValue && year > 0) {
        sql+= " WHERE year = " + year.ToString();
      }

      var results = new List<CityGdpModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new CityGdpModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(CityGdpModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      model.CityId = reader.GetInt64(0);
      model.Year = reader.GetInt32(1);
      model.CityName = reader.GetString(2);
      model.StateAcronym = reader.GetString(3);
      model.TotalGdp1000Brl = reader.GetDecimal(4);
      model.GdpPerCapitaBrl = reader.GetDecimal(5);
    }
  }
}