namespace ScrapFunds.Models
{
  class FeatureStatsModel
  {
    public string FeatureName { get; set; } = string.Empty;
    public decimal NationalAverage { get; set; }
    public decimal FeatureGdpPerCapitaBrlAverage { get; set; }
    public decimal FeatureTotalGdp1000BrlGrowthPercentAverage { get; set; }
    public decimal FeaturePopulationGrowthPercentAverage { get; set; }
  }
}