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

      var sql = " SELECT sf.acronym, sf.long_name, sf.admin, c.assets_count FROM scrapped_funds sf " 
      + " LEFT JOIN "
      + "   (SELECT COUNT(sa.sequential) AS assets_count, sa.fund_acronym  "
      + "   FROM scrapped_assets sa  "
      + "   WHERE sa.source = 'funds-explorer' "
      + "   GROUP BY sa.fund_acronym) AS c "
      + " ON sf.acronym = c.fund_acronym "
      + " WHERE sf.source = 'funds-explorer' "
      + " AND c.assets_count > 0 "
      + " ORDER BY c.assets_count DESC ";
      
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
      model.AssetsCount = reader.GetInt16(3);
    }
  }
}