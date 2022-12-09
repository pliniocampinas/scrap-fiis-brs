using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetMetropolitanRegionsDetailsQuery
  {
    private string _connectionString;

    public GetMetropolitanRegionsDetailsQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<MetropolitanRegionsDetailsModel> Run()
    {
      var query = new GetFullCitiesVisualizationQuery(_connectionString);
      var results = await query.Run(2019);
      // National averages
      var nationalGdpPerCapitaBrlAverage = results.Select(city => city.GdpPerCapitaBrl).Average();
      var nationalTotalGdpBrlGrowthPercentAverage = results.Select(city => city.TotalGdp1000BrlGrowthPercent).Average() * 100;
      var nationalPopulationGrowthPercentAverage = results.Select(city => city.PopulationGrowthPercent).Average() * 100;
      // Group by metropolitan cities
      var resultsGrouped = results.GroupBy(city => city.MetropolitanRegion);
      var metropolitanRegions = resultsGrouped.Select(city => new MetropolitanRegionDetails() { 
          MetropolitanRegionName = city.Key,
          // For metropolitan regions within more than one state, like the federal district, 
          // get the state acronym where lies the city with the biggest population 
          StateAcronym = city
            .OrderByDescending(c => c.Population2021)
            .Select(c => c.StateAcronym)
            .FirstOrDefault()?? "",
          Population = city.Sum(ct => ct.Population2021),
          TotalGdp1000Brl = city.Sum(ct => ct.TotalGdp1000Brl),
          GdpPerCapitaBrlAverage = city.Average(ct => ct.GdpPerCapitaBrl),
          PopulationGrowthPercentAverage = city.Average(ct => ct.PopulationGrowthPercent) * 100,
          TotalGdpBrlGrowthPercentAverage = city.Average(ct => ct.TotalGdp1000BrlGrowthPercent) * 100,
        });


      var result = new MetropolitanRegionsDetailsModel()
      {
        NationalGdpPerCapitaBrlAverage = nationalGdpPerCapitaBrlAverage,
        NationalTotalGdpBrlGrowthPercentAverage = nationalTotalGdpBrlGrowthPercentAverage,
        NationalPopulationGrowthPercentAverage = nationalPopulationGrowthPercentAverage,
        MetropolitanRegions = metropolitanRegions.ToList()
      };

      return result;
    }
  }
}