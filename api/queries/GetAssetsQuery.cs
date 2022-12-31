using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetAssetsQuery
  {
    private string _connectionString;

    public GetAssetsQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<AssetModel>> Run(GetAssetsQueryParams parameters)
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql = @"SELECT fund_acronym, title, city, state, square_meters FROM scrapped_assets 
        WHERE source = 'funds-explorer' ";
      
      if(string.IsNullOrEmpty(parameters.FundAcronym) == false) {
        sql+= $" AND fund_acronym = '{parameters.FundAcronym.ToUpper()}'";
      }

      if(string.IsNullOrEmpty(parameters.StateAcronym) == false) {
        sql+= $" AND state = '{parameters.StateAcronym.ToUpper()}'";
      }

      sql += "ORDER BY square_meters DESC";

      var results = new List<AssetModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new AssetModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(AssetModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }

      model.FundAcronym = reader.GetString(0);
      model.Title = reader.GetString(1);
      model.City = reader.GetString(2);
      model.StateAcronym = reader.GetString(3);
      model.SquareMeters = reader.GetInt32(4);
    }
  }
}