using System.ComponentModel.DataAnnotations;

namespace KR.Dto;

public class QuestionnaireInfoDto
{
    public FullNameDto FullName { get; set; }
    public PassportDetails PassportDetails { get; set; }
    [Required, Range(21, 72)]
    public int Age { get; set; }
    public bool IsJudging { get; set; }
    [Required, Range(0, 10_000_000)]
    public int CreditAmount { get; set; }
    public GoalType Goal { get; set; }
    public EmploymentType EmploymentType { get; set; }
    public bool OtherCredits { get; set; }
    public InformationAboutPledge InformationAboutPledge { get; set; }
}