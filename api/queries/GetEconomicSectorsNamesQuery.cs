using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetEconomicSectorsNamesQuery
  {
    private string _connectionString;

    public GetEconomicSectorsNamesQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<List<string>> Run()
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);

      var sql = $"select distinct sector from ( {BuildDistinctSectorQuery("most_valueable_sector")}"
      + $"UNION {BuildDistinctSectorQuery("second_most_valueable_sector")} "
      + $"UNION {BuildDistinctSectorQuery("third_most_valueable_sector")} ) as sectors ";
      
      sql += " ORDER BY sector DESC";

      var results = new List<string>();
      
      await using (var cmd = dataSource.CreateCommand(sql))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        while (await reader.ReadAsync())
        {
          var model = new AssetModel();
          results.Add(reader.GetString(0));
        }
      }

      return results;
    }
    
    private string BuildDistinctSectorQuery(string sectorFieldName)
    {
      return $"(select distinct {sectorFieldName} sector from cities_gdp)";
    }
  }
}