using Npgsql;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// DB_PORT: 5432
var connectionString = "Host=localhost;Username=app_user;Password=app_user123;Database=fundsdb";

app.MapGet("/", () => "Hello World!");

app.MapGet("/coords", async () => 
{
  await using var dataSource = NpgsqlDataSource.Create(connectionString);

  // // Insert some data
  // await using (var cmd = dataSource.CreateCommand("INSERT INTO data (some_field) VALUES ($1)"))
  // {
  //   cmd.Parameters.AddWithValue("Hello world");
  //   await cmd.ExecuteNonQueryAsync();
  // }

  // Retrieve all rows
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
