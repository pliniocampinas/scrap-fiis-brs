namespace ScrapFunds.Models
{
  class CityGdpModel
  {
    public long CityId { get; set; }
    public int Year { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string StateAcronym { get; set; } = string.Empty;
    public decimal TotalGdp1000Brl { get; set; }
    public decimal GdpPerCapitaBrl { get; set; }
  }
}