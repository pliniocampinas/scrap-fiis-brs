using Npgsql;
using ScrapFunds.Models;

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
  await using var dataSource = NpgsqlDataSource.Create(connectionString);

  var text = "";
  await using (var cmd = dataSource.CreateCommand("SELECT city_id, latitude, longitude FROM cities_coordinates"))
  await using (var reader = await cmd.ExecuteReaderAsync())
  {
    while (await reader.ReadAsync())
    {
      Console.WriteLine("First city coordinate");
      text += "city_id: " + reader.GetInt64(0);
      text += "\n latitude: " + reader.GetDouble(1);
      text += "\n longitude: " + reader.GetDouble(2);
      Console.WriteLine(text);
      break;
    }
  }

  return text;
});

app.Run();
