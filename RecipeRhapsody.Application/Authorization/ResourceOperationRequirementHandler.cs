using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using RecipeRhapsody.Domain;

namespace RecipeRhapsody.Application.Authorization;

internal sealed class ResourceOperationRequirementHandler<T>
    : AuthorizationHandler<ResourceOperationRequirement, T>
    where T : IUserBase
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ResourceOperationRequirement requirement,
        T entity
    )
    {
        if (
            requirement.ResourceOperation == ResourceOperation.Delete
            || requirement.ResourceOperation == ResourceOperation.Update
        )
        {
            var userId = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (entity.UserId == userId)
            {
                context.Succeed(requirement);
            }
        }
        else
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
