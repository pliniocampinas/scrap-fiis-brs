using Npgsql;
using ScrapFunds.Models;
using ScrapFunds.Queries;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// TODO: Set proper instrumentation for logging and middlewares

var connectionString = builder.Configuration.GetSection("DbConnectionString").Get<string>();

app.MapGet("/", () => "ScrapFunds Api Root");

// Use a middleware?
app.MapGet("/health", async () => {
  try {
    await using var dataSource = NpgsqlDataSource.Create(connectionString);
    await using (var cmd = dataSource.CreateCommand("SELECT 1"))
    await using (var reader = await cmd.ExecuteReaderAsync())
    {
      await reader.ReadAsync();
    }
    return new HealthModel()
      {
        IsHealthy = true,
      };
  } catch (Exception e) {
    Console.WriteLine("Health check exception [" + e.Message + "]");
    return new HealthModel()
      {
        IsHealthy = false,
      };
  }
});

app.MapGet("/cities/full-visualization", async () => 
{
  var query = new GetFullCitiesVisualizationQuery(connectionString);
  var result = await query.Run();
  return result;
});

app.Run();
