using Microsoft.AspNetCore.Identity;

namespace RecipeRhapsody.Domain.Entities;

public sealed class ApplicationUser : IdentityUser
{
    public IEnumerable<FavoriteRecipe> FavoriteRecipes { get; set; }
}
