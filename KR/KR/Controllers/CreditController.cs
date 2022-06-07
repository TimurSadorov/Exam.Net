using KR.Dto;
using KR.Services;
using Microsoft.AspNetCore.Mvc;

namespace KR.Controllers;

[ApiController]
[Route("credit")]
public class CreditController: ControllerBase
{
    private readonly CreditService _creditService;

    public CreditController(CreditService creditService)
    {
        _creditService = creditService;
    }

    [HttpPost("calculate")]
    public async Task<IActionResult> CalculateCredit([FromBody] QuestionnaireInfoDto questionnaireInfoDto)
    {
        var creditResult = await _creditService.CalculateCreditAsync(questionnaireInfoDto);
        return Ok(creditResult);
    }
    
    [HttpPost("text")]
    public IActionResult Text()
    {
        return Ok();
    }
}