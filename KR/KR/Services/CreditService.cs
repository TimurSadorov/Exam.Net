using KR.Dto;

namespace KR.Services;

public class CreditService
{
    private readonly CreditCalculatorService _creditCalculatorService;

    public CreditService(CreditCalculatorService creditCalculatorService)
    {
        _creditCalculatorService = creditCalculatorService;
    }

    public async Task<CreditCalculationResultDto> CalculateCreditAsync(QuestionnaireInfoDto creditInfo)
    {
        var scores = await _creditCalculatorService.CalculateCreditScoreAsync(creditInfo);
        return new CreditCalculationResultDto
        {
            Scores = scores,
            IsApproved = scores >= 80,
            InterestOnLoan = CalculatePercent(scores)
        };
    }

    private static double CalculatePercent(int scores)
    {
        return scores switch
        {
            < 80 => 0,
            < 84 => 30,
            < 88 => 26,
            < 92 => 22,
            < 96 => 19,
            < 100 => 15,
            100 => 12.5,
            _ => 0
        };
    }
}