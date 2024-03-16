using Microsoft.AspNetCore.Authorization;

namespace RecipeRhapsody.Application.Authorization;


internal enum ResourceOperation
{
    Create,
    Read,
    Update,
    Delete,
}

internal sealed class ResourceOperationRequirement : IAuthorizationRequirement
{
    public ResourceOperation ResourceOperation { get; set; }

    public ResourceOperationRequirement(ResourceOperation resourceOperation)
    {
        ResourceOperation = resourceOperation;
    }
}
