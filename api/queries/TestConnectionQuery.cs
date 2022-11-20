using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class TestConnectionQuery
  {
    private string _connectionString;

    public TestConnectionQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task Run()
    {
      await using var dataSource = NpgsqlDataSource.Create(_connectionString);
      await using (var cmd = dataSource.CreateCommand("SELECT 1"))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
        await reader.ReadAsync();
      }
    }
  }
}