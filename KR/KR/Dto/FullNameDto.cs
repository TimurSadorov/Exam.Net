using System.ComponentModel.DataAnnotations;

namespace KR.Dto;

public class FullNameDto
{
    [Required, MaxLength(50)]
    public string FirstName { get; set; }
    [Required, MaxLength(50)]
    public string SecondName { get; set; }
    [MaxLength(50)]
    public string Patronymic { get; set; }
}