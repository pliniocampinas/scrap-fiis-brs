namespace ScrapFunds.Models
{
  class FeatureStatsModel
  {
    public string FeatureName { get; set; } = string.Empty;
    public decimal NationalGdpPerCapitaBrlAverage { get; set; }
    public decimal FeatureGdpPerCapitaBrlAverage { get; set; }
    public decimal NationalTotalGdpBrlGrowthPercentAverage { get; set; }
    public decimal FeatureTotalGdpBrlGrowthPercentAverage { get; set; }
    public decimal NationalPopulationGrowthPercentAverage { get; set; }
    public decimal FeaturePopulationGrowthPercentAverage { get; set; }
  }
}