using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetAssetsPerCityQuery
  {
    private string _connectionString;

    public GetAssetsPerCityQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<AssetsPerCityModel>> Run(string fundAcronym = "")
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql =  "SELECT city_id, count(*) as assets_count, sum(square_meters) as total_squere_meters from scrapped_assets "
      + "WHERE source = 'funds-explorer' AND city <> '' "
      + (fundAcronym.Length > 0? " AND fund_acronym = '"+fundAcronym+"'": "")
      + " GROUP by city_id "
      + " ORDER by 1 ";
      
      var results = new List<AssetsPerCityModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new AssetsPerCityModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(AssetsPerCityModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      model.CityId = reader.GetInt64(0);
      model.AssetsCount = reader.GetInt16(1);
      model.TotalSquareMeters = reader.GetInt32(2);
    }
  }
}