using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace RecipeRhapsody.Application;

internal record class UserContextService(IHttpContextAccessor httpContextAccessor)
    : IUserContextService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public ClaimsPrincipal User => _httpContextAccessor.HttpContext?.User;

    public string? GetUserId =>
        User.Identity.IsAuthenticated is false
            ? null
            : User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
}
