using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Domain;

public sealed class FavoriteRecipe : IUserBase
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; }
}
