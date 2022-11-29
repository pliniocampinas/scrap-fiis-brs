using Npgsql;
using ScrapFunds.Models;

namespace ScrapFunds.Helpers
{
  static class FeatureStatsHelper
  {
    public static FeatureStatsModel ExtractFeatureStats(List<FullCityVisualizationModel> results, string feature)
    {
      var nationalAverage = results.Select(city => city.GdpPerCapitaBrl).Average();
      var citiesWithSelecterFeature = results.Where(city => FeatureStatsHelper.FilterCityByFeature(city, feature));
      var featureGdpPerCapitaBrlAverage = citiesWithSelecterFeature.Select(city => city.GdpPerCapitaBrl).Average();
      var featureTotalGdp1000BrlGrowthPercentAverage = citiesWithSelecterFeature.Select(city => city.TotalGdp1000BrlGrowthPercent).Average() * 100;
      var featurePopulationGrowthPercentAverage = citiesWithSelecterFeature.Select(city => city.PopulationGrowthPercent).Average() * 100;

      return new FeatureStatsModel()
      {
        FeatureName = feature,
        NationalAverage = Decimal.Round(nationalAverage, 2),
        FeatureGdpPerCapitaBrlAverage = Decimal.Round(featureGdpPerCapitaBrlAverage, 2),
        FeatureTotalGdp1000BrlGrowthPercentAverage = Decimal.Round(featureTotalGdp1000BrlGrowthPercentAverage, 2),
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