using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetUniqueFundsQuery
  {
    private string _connectionString;

    public GetUniqueFundsQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<UniqueFundModel>> Run()
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql = "SELECT acronym, long_name, admin FROM scrapped_funds";
      
      var results = new List<UniqueFundModel>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new UniqueFundModel();
          MapValues(model, reader);
          results.Add(model);
        }
      }

      return results;
    }
    
    private void MapValues(UniqueFundModel model, NpgsqlDataReader? reader)
    {
      if(reader == null)
      {
        return;
      }
      
      model.Acronym = reader.GetString(0);
      model.LongName = reader.GetString(1);
      model.Admin = reader.GetString(2);
    }
  }
}