namespace ScrapFunds.Models
{
  class AssetModel
  {
    public string StateAcronym { get; set; } = string.Empty;
    public string FundAcronym { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public int SquareMeters { get; set; }
  }
}