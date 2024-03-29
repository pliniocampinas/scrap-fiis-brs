namespace ScrapFunds.Models
{
  class UniqueFundModel
  {
    public string Acronym { get; set; } = string.Empty;
    public string LongName { get; set; } = string.Empty;
    public string Admin { get; set; } = string.Empty;
    public int AssetsCount { get; set; }
    public int TotalSquareMeters { get; set; }
  }
}