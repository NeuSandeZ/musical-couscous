using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace RecipeRhapsody.Application;

internal record UserContextService(IHttpContextAccessor httpContextAccessor) : IUserContextService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public ClaimsPrincipal User => _httpContextAccessor.HttpContext?.User;

    public Guid? GetUserId => User is null ? null : Guid.Parse(User.FindFirst(c=> c.Type == ClaimTypes.NameIdentifier).Value); 
}
