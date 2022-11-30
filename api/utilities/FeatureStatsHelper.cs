using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Helpers
{
  static class FeatureStatsHelper
  {
    public static FeatureStatsModel ExtractFeatureStats(List<FullCityVisualizationModel> results, string feature)
    {
      var nationalGdpPerCapitaBrlAverage = results.Select(city => city.GdpPerCapitaBrl).Average();
      var nationalTotalGdpBrlGrowthPercentAverage = results.Select(city => city.TotalGdp1000BrlGrowthPercent).Average() * 100;
      var nationalPopulationGrowthPercentAverage = results.Select(city => city.PopulationGrowthPercent).Average() * 100;
      var citiesWithSelectedFeature = results.Where(city => FeatureStatsHelper.FilterCityByFeature(city, feature));
      var featureGdpPerCapitaBrlAverage = citiesWithSelectedFeature.Select(city => city.GdpPerCapitaBrl).Average();
      var featureTotalGdp1000BrlGrowthPercentAverage = citiesWithSelectedFeature.Select(city => city.TotalGdp1000BrlGrowthPercent).Average() * 100;
      var featurePopulationGrowthPercentAverage = citiesWithSelectedFeature.Select(city => city.PopulationGrowthPercent).Average() * 100;

      return new FeatureStatsModel()
      {
        FeatureName = feature,
        NationalGdpPerCapitaBrlAverage = Decimal.Round(nationalGdpPerCapitaBrlAverage, 2),
        NationalTotalGdpBrlGrowthPercentAverage = Decimal.Round(nationalTotalGdpBrlGrowthPercentAverage, 2),
        NationalPopulationGrowthPercentAverage = Decimal.Round(nationalPopulationGrowthPercentAverage, 2),
        FeatureGdpPerCapitaBrlAverage = Decimal.Round(featureGdpPerCapitaBrlAverage, 2),
        FeatureTotalGdpBrlGrowthPercentAverage = Decimal.Round(featureTotalGdp1000BrlGrowthPercentAverage, 2),
        FeaturePopulationGrowthPercentAverage = Decimal.Round(featurePopulationGrowthPercentAverage, 2),
      };
    }

    private static bool FilterCityByFeature(FullCityVisualizationModel city, string feature)
    {
      if(feature == "matopiba")
        return city.IsMatopiba;

      if(feature == "legal-amazon")
        return city.IsLegalAmazon;

      if(feature == "semi-arid")
        return city.IsLegalAmazon;

      if(feature == "sea-front")
        return city.IsSeaFront;

      if(feature == "others")
        return (city.IsMatopiba
              || city.IsLegalAmazon
              || city.IsLegalAmazon
              || city.IsSeaFront) == false;
      
      return false;
    }
  }
}