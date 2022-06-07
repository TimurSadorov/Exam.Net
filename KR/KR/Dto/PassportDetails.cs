namespace KR.Dto;

public class PassportDetails
{
    public string Series { get; set; }
    public string Number { get; set; }
    public string IssuedByWhom { get; set; }
    public DateTime DateOfIssue { get; set; }
    public string RegistrationInformation { get; set; }
}