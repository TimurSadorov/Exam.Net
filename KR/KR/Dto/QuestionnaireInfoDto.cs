namespace KR.Dto;

public class QuestionnaireInfoDto
{
    public FullNameDto FullName { get; set; }
    public PassportDetails PassportDetails { get; set; }
    public int Age { get; set; }
    public bool IsJudging { get; set; }
    public int CreditAmount { get; set; }
    public GoalType Goal { get; set; }
    public EmploymentType EmploymentType { get; set; }
    public bool OtherCredits { get; set; }
    public InformationAboutPledge InformationAboutPledge { get; set; }
}