namespace ScrapFunds.Models
{
  class MetropolitanRegionVisualizationModel
  {
    public long CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string StateAcronym { get; set; } = string.Empty;
    public string MetropolitanRegionName { get; set; } = string.Empty;
    public bool IsMetropolitanRegion 
    { 
      get 
      {
        if(MetropolitanRegionName == null)
          return false;
        return MetropolitanRegionName.Length > 0? true: false;
      }
     }
  }
}