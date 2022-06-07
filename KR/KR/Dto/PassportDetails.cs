using System.ComponentModel.DataAnnotations;

namespace KR.Dto;

public class PassportDetails
{
    [Required]
    public string Series { get; set; }
    [Required]
    public string Number { get; set; }
    [Required, MaxLength(200)]
    public string IssuedByWhom { get; set; }
    [Required]
    public DateTime DateOfIssue { get; set; }
    [Required, MaxLength(200)]
    public string RegistrationInformation { get; set; }
}