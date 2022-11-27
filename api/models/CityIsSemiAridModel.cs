namespace ScrapFunds.Models
{
  class CityIsSemiAridModel
  {
    public long CityId { get; set; }
    public int Year { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string StateAcronym { get; set; } = string.Empty;
    public bool IsSemiArid { get; set; }
  }
}