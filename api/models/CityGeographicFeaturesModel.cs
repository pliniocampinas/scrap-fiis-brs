namespace ScrapFunds.Models
{
  class CityGeographicFeaturesModel
  {
    public long CityId { get; set; }
    public int Year { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string StateAcronym { get; set; } = string.Empty;
    public bool IsLegalAmazon { get; set; }
    public bool IsMatopiba { get; set; }
    public bool IsSemiArid { get; set; }
    public bool IsSeaFront { get; set; }
  }
}