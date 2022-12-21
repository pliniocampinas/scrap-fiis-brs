using ScrapFunds.Models;
using ScrapFunds.Queries;
using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(
    policy =>
    {
      policy.WithOrigins(
        "http://localhost:8080",
        "https://localhost:8080")
          .AllowAnyHeader()
          .AllowAnyMethod();
    });
});

var app = builder.Build();

var connectionString = builder.Configuration.GetSection("DbConnectionString").Get<string>();

app.UseCors();

app.UseExceptionHandler(exceptionHandlerApp =>
{
  exceptionHandlerApp.Run(async context =>
  {
    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
    context.Response.ContentType = Text.Plain;

    await context.Response.WriteAsync("An exception was thrown.");
  });
});

app.MapGet("/", () => "ScrapFunds Api Root");

app.MapGet("/health", async () => {
  try {
    var query = new TestConnectionQuery(connectionString);
    await query.Run();
    Console.WriteLine("Health check healthy");
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

app.MapGet("/cities/gdp", async (int? year) => 
{
  var query = new GetCitiesGdpQuery(connectionString);
  var result = await query.Run(year);
  return result;
});

app.MapGet("/cities/geo-features", async () => 
{
  var query = new CityGeographicFeaturesQuery(connectionString);
  var result = await query.Run();
  return result;
});

app.MapGet("/cities/features-stats/{feature}", async (string feature) => 
{
  var query = new GetFeatureStatsQuery(connectionString);
  var result = await query.Run(feature);
  return result;
});

app.MapGet("/cities/metropolitan-regions", async () => 
{
  var query = new GetMetropolitanRegionsVisualizationQuery(connectionString);
  var result = await query.Run();
  return result;
});

app.MapGet("/cities/metropolitan-regions-details", async () => 
{
  var query = new GetMetropolitanRegionsDetailsQuery(connectionString);
  var result = await query.Run();
  return result;
});

app.MapGet("/funds/list", async () => 
{
  var query = new GetUniqueFundsQuery(connectionString);
  var result = await query.Run();
  return result;
});

app.MapGet("/funds/assets-per-state", async () => 
{
  var query = new GetAssetsPerStateQuery(connectionString);
  var result = await query.Run();
  return result;
});

app.Run();
