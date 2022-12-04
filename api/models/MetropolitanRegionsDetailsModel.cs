namespace ScrapFunds.Models
{
  class MetropolitanRegionDetails
  {
    public string MetropolitanRegionName { get; set; } = string.Empty;
    public string StateAcronym { get; set; } = string.Empty;
    public decimal Population { get; set; }
    public decimal TotalGdp1000Brl { get; set; }
    public decimal GdpPerCapitaBrlAverage { get; set; }
    public decimal TotalGdpBrlGrowthPercentAverage { get; set; }
    public decimal PopulationGrowthPercentAverage { get; set; }
  }

  class MetropolitanRegionsDetailsModel
  {
    public List<MetropolitanRegionDetails> ?MetropolitanRegions { get; set; }
    public decimal NationalGdpPerCapitaBrlAverage { get; set; }
    public decimal NationalTotalGdpBrlGrowthPercentAverage { get; set; }
    public decimal NationalPopulationGrowthPercentAverage { get; set; }
  }
}