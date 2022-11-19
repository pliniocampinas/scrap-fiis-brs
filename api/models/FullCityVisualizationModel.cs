namespace ScrapFunds.Models
{
  class FullCityVisualizationModel
  {
    public long CityId { get; set; }
    public int Year { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string StateAcronym { get; set; } = string.Empty;
    public string GreaterRegionName { get; set; } = string.Empty;
    public int GreaterRegionCode { get; set; }
    public string MetropolitanRegion { get; set; } = string.Empty;
    public bool IsLegalAmazon { get; set; }
    public bool IsSemiArid { get; set; }
    public bool IsSaoPauloRegion { get; set; }
    public decimal TotalGdp1000Brl { get; set; }
    public decimal GdpPerCapitaBrl { get; set; }
    public decimal PublicExpendingValue1000Brl { get; set; }
    public decimal AgroValue1000Brl { get; set; }
    public decimal IndustryValue1000Brl { get; set; }
    public decimal ServicesValue1000Brl { get; set; }
    public decimal TaxesValue1000Brl { get; set; }
    public string MostValueableSector { get; set; } = string.Empty;
    public string SecondMostValueableSector { get; set; } = string.Empty;
    public decimal GdpPerCapitaBrlGrowth { get; set; }
    public decimal GdpPerCapitaBrlGrowthPercent { get; set; }
    public decimal TotalGdp1000BrlGrowth { get; set; }
    public decimal TotalGdp1000BrlGrowthPercent { get; set; }
    public decimal PopulationGrowth { get; set; }
    public decimal PopulationGrowthPercent { get; set; }
    public bool IsCapital { get; set; }
    public int DistanceEquatorKm { get; set; }
    public long Population2021 { get; set; }
    public bool IsMatopiba { get; set; }
    public bool IsNearCoast { get; set; }
    public bool IsSeaFront { get; set; }
      

  }
}