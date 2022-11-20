using ScrapFunds.Models;
using ScrapFunds.Queries;
using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var connectionString = builder.Configuration.GetSection("DbConnectionString").Get<string>();

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

app.Run();
