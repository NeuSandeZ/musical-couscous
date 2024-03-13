using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Application.Authorization;

public class ResourceOperationRequirementHandler
    : AuthorizationHandler<ResourceOperationRequirement, Recipe>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ResourceOperationRequirement requirement,
        Recipe recipe
    )
    {
        if (
            requirement.ResourceOperation == ResourceOperation.Delete
            || requirement.ResourceOperation == ResourceOperation.Update
        )
        {
            var userId = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (recipe.ApplicationUserId == userId)
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
