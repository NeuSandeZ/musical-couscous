using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Application.Persistance;

public class RecipeContext : IdentityDbContext<ApplicationUser>
{
    public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) { }

    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Step> Steps { get; set; }
    public DbSet<PrepTime> PrepTimes { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}