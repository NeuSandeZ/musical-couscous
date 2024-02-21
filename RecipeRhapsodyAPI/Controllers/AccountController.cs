using Microsoft.AspNetCore.Mvc;

namespace RecipeRhapsodyAPI;

[ApiController]
[Route("account")]
public sealed class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("logout")]
    public async Task Logout() => await _accountService.Logout();
}
