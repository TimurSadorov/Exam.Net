using KR.Dto;
using KR.Interface;

namespace KR.Services;

public class CreditCalculatorService
{
    private readonly ICriminalRecordInformationService _criminalRecordInformationService;

    public CreditCalculatorService(ICriminalRecordInformationService criminalRecordInformationService)
    {
        _criminalRecordInformationService = criminalRecordInformationService;
    }

    public async Task<int> CalculateCreditScoreAsync(QuestionnaireInfoDto creditInfo)
    {
        return GetScoreByAge(creditInfo.Age, creditInfo.CreditAmount, creditInfo.InformationAboutPledge) +
               await GetScoreByCriminalRecords(creditInfo.IsJudging, creditInfo.FullName, creditInfo.PassportDetails) +
               GetEmploymentScores(creditInfo.EmploymentType, creditInfo.Age) +
               GetScoreByCreditGoal(creditInfo.Goal) +
               GetScoreByPledge(creditInfo.InformationAboutPledge) +
               GetScoreByOtherCredits(creditInfo.OtherCredits, creditInfo.Goal) +
               GetScoreByCreditAmount(creditInfo.CreditAmount);
    }

    private int GetScoreByAge(int age, int creditAmount, InformationAboutPledge informationAboutPledge)
    {
        return age switch
        {
            >= 21 and <= 28 => creditAmount switch
            {
                < 1000000 => 12,
                >= 1000000 and < 3000000 => 9,
                > 3000000 => 0,
                _ => 0
            },
            >= 29 and <= 59 => 14,
            >= 60 and <= 72 => informationAboutPledge is InformationAboutPledge.None ? 0 : 8,
            _ => 0
        };
    }

    private async Task<int> GetScoreByCriminalRecords(
        bool isJudging,
        FullNameDto fullName,
        PassportDetails passportDetails)
    {
        if (isJudging) return 0;
        var isCriminal = await _criminalRecordInformationService.IsCriminal(fullName, passportDetails);
        return isCriminal ? 0 : 15;
    }

    private int GetEmploymentScores(EmploymentType employmentType, int age)
    {
        return employmentType switch
        {
            EmploymentType.Contract => 14,
            EmploymentType.IndividualEntrepreneur => 12,
            EmploymentType.Freelancer => 8,
            EmploymentType.RetiredPeople => age < 70 ? 5 : 0,
            EmploymentType.Unemployed => 0,
            _ => 0
        };
    }

    private int GetScoreByCreditGoal(GoalType goalType)
    {
        return goalType switch
        {
            GoalType.ConsumerCredit => 14,
            GoalType.Realty => 8,
            GoalType.Recrediting => 12,
            _ => 0
        };
    }

    private int GetScoreByPledge(InformationAboutPledge informationAboutPledge)
    {
        return informationAboutPledge switch
        {
            InformationAboutPledge.None => 0,
            InformationAboutPledge.CarAgeLessThanThree => 8,
            InformationAboutPledge.CarAgeMoreThanThree => 3,
            InformationAboutPledge.Guarantee => 12,
            InformationAboutPledge.Realty => 14,
            _ => 0
        };
    }

    private static int GetScoreByOtherCredits(bool hasOtherCredit, GoalType goalType)
    {
        if (hasOtherCredit)
            return 0;
        return goalType is GoalType.Recrediting ? 0 : 15;
    }

    private static int GetScoreByCreditAmount(int creditAmount)
    {
        return creditAmount switch
        {
            <= 1000000 => 12,
            > 1000000 and <= 5_000_000 => 14,
            > 5000000 and <= 10_000_000 => 8,
            _ => 0
        };
    }
}