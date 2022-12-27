using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetAssetsPerStateQuery
  {
    private string _connectionString;

    public GetAssetsPerStateQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<AssetsPerStateModel>> Run(string fundAcronym = "")
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      // TODO: Funds explorer source groups 2 major assets PERNANBUCANAS and MINEIRAO together,
      // aggregate data with other source should give better results for such specific fund
      var sql =  "SELECT state, count(*) as assets_count, sum(square_meters) as total_squere_meters from scrapped_assets "
      + "WHERE source = 'funds-explorer' "
      + (fundAcronym.Length > 0? " AND fund_acronym = '"+fundAcronym+"'": "")
      + " GROUP by state "
      + " ORDER by 1 ";
      
      var results = new List<AssetsPerStateModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new AssetsPerStateModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(AssetsPerStateModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      model.StateAcronym = reader.GetString(0);
      model.AssetsCount = reader.GetInt16(1);
      model.TotalSquareMeters = reader.GetInt32(2);
    }
  }
}