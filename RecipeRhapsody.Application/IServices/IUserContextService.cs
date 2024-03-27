using System.Security.Claims;

namespace RecipeRhapsody.Application;

internal interface IUserContextService
{
    ClaimsPrincipal User { get; }
    string? GetUserId { get; }
}
