using Microsoft.EntityFrameworkCore;
using RecipeRhapsody.Application.Persistance;
using RecipeRhapsody.Domain;

namespace RecipeRhapsody.Application;

internal class FavoriteRepository(RecipeContext recipeContext) : IFavoriteRepository
{
    private readonly RecipeContext _recipeContext = recipeContext;

    public async Task AddFavorite(FavoriteRecipe favoriteRecipe)
    {
        _recipeContext.FavoritesRecipes.Add(favoriteRecipe);
        await _recipeContext.SaveChangesAsync();
    }

    public async Task DeleteFavorite(FavoriteRecipe favoriteRecipe)
    {
        _recipeContext.FavoritesRecipes.Remove(favoriteRecipe);
        await _recipeContext.SaveChangesAsync();
    }

    public async Task<FavoriteRecipe?> GetFavorite(int id, string userId) =>
        await _recipeContext.FavoritesRecipes.FirstOrDefaultAsync(f =>
            f.RecipeId == id && f.UserId == userId
        );
}
