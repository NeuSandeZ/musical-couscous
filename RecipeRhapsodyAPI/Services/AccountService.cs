
using Microsoft.AspNetCore.Identity;

namespace RecipeRhapsodyAPI;

public sealed class AccountService : IAccountService
{
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AccountService(SignInManager<ApplicationUser> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task Logout() => await _signInManager.SignOutAsync();
}
