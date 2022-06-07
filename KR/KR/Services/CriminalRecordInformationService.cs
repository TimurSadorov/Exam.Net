using KR.Dto;
using KR.Interface;

namespace KR.Services;

public class CriminalRecordInformationService: ICriminalRecordInformationService
{
    private static readonly Random RandomGenerator = new(DateTime.Now.Millisecond);
    
    public async Task<bool> IsCriminal(FullNameDto fullName, PassportDetails passportDetails)
    {
        return RandomGenerator.NextDouble() < 0.7;
    }
}