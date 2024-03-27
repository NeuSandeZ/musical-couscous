using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecipeRhapsody.Domain;
using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Application.Persistance;

public sealed class RecipeContext(DbContextOptions<RecipeContext> options)
    : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Step> Steps { get; set; }
    public DbSet<PrepTime> PrepTimes { get; set; }
    public DbSet<FavoriteRecipe> FavoritesRecipes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(FavoriteRecipeConfig).Assembly);

        base.OnModelCreating(builder);
    }
}
