namespace KR.Dto;

public class CreditCalculationResultDto
{
    public bool IsApproved { get; set; }
    public int Scores { get; set; }
    public double InterestOnLoan { get; set; }
}