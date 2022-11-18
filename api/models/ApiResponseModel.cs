namespace ScrapFunds.Models
{
  class ApiResponseModel<T>
  {
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Result { get; set; }
  }
}