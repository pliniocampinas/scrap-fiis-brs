using ScrapFunds.Helpers;
using ScrapFunds.Models;

namespace ScrapFunds.Queries
{
  class GetFeatureStatsQuery
  {
    private string _connectionString;

    public GetFeatureStatsQuery(string connectionString)
    {
      _connectionString = connectionString;
    }

    public async Task<FeatureStatsModel> Run(string feature)
    {
      var query = new GetFullCitiesVisualizationQuery(_connectionString);
      var result = await query.Run(2019);
      var featureStats = FeatureStatsHelper.ExtractFeatureStats(result, feature);
      return featureStats;
    }
  }
}