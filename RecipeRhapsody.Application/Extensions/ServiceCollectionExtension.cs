using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RecipeRhapsody.Application.Authorization;
using RecipeRhapsody.Application.Exceptions;
using RecipeRhapsody.Application.IServices;
using RecipeRhapsody.Application.Mappings;
using RecipeRhapsody.Application.Persistance;
using RecipeRhapsody.Application.Repositories;
using RecipeRhapsody.Application.Services;
using RecipeRhapsody.Domain;
using RecipeRhapsody.Domain.Entities;
using RecipeRhapsody.Domain.Interfaces;

namespace RecipeRhapsody.Application.Extensions;

public static class ServiceCollectionExtension
{
    public static void AddApplication(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddDbContext<RecipeContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("RecipeRhapsody"))
        );

        services.AddScoped<IRecipeService, RecipeService>();
        services.AddScoped<IFavoriteService, FavoriteService>();
        services.AddScoped<IRecipeMapper, RecipeMapper>();
        services.AddScoped<IUserContextService, UserContextService>();
        services.AddScoped<IRecipeServiceRepository, RecipeServiceRepository>();
        services.AddScoped<IFavoriteRepository, FavoriteRepository>();

        services.AddScoped<IAuthorizationHandler, ResourceOperationRequirementHandler<Recipe>>();
        services.AddScoped<
            IAuthorizationHandler,
            ResourceOperationRequirementHandler<FavoriteRecipe>
        >();

        services.AddExceptionHandler<AppExceptionHandler>();
        services
            .AddIdentityApiEndpoints<ApplicationUser>()
            .AddEntityFrameworkStores<RecipeContext>();
        services.AddAuthorization();
    }
}
