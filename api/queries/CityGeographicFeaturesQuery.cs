using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class CityGeographicFeaturesQuery
  {
    private string _connectionString;

    public CityGeographicFeaturesQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<CityGeographicFeaturesModel>> Run(int? year = null)
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql = "SELECT cg.city_id, cg.year, cg.city_name, cg.state_acronym, cg.is_semi_arid, "
      + "cc.is_matopiba, cg.is_legal_amazon, cc.is_sea_front FROM cities_gdp cg "
      + "LEFT JOIN cities_coordinates cc on cc.city_id = cg.city_id "
      + "WHERE year = 2019";
      
      var results = new List<CityGeographicFeaturesModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new CityGeographicFeaturesModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(CityGeographicFeaturesModel model, NpgsqlDataReader? reader)
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
      model.IsMatopiba = reader.GetBoolean(5);
      model.IsLegalAmazon = reader.GetBoolean(6);
      model.IsSeaFront = reader.GetBoolean(7);
    }
  }
}