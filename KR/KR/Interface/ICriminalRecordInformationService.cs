using KR.Dto;

namespace KR.Interface;

public interface ICriminalRecordInformationService
{
    Task<bool> IsCriminal(FullNameDto fullName, PassportDetails passportDetails);
}