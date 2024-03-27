using Microsoft.EntityFrameworkCore;
using RecipeRhapsody.Application.Persistance;
using RecipeRhapsody.Domain;
using RecipeRhapsody.Domain.Entities;
using RecipeRhapsody.Domain.Interfaces;

namespace RecipeRhapsody.Application.Repositories;

internal class RecipeServiceRepository(RecipeContext recipeContext) : IRecipeServiceRepository
{
    private readonly RecipeContext _recipeContext = recipeContext;

    public async Task AddRecipe(Recipe recipe)
    {
        _recipeContext.Add(recipe);
        await _recipeContext.SaveChangesAsync();
    }

    public IQueryable<Recipe> GetBaseQuery() => _recipeContext.Recipes.AsQueryable().AsNoTracking();

    public async Task<Recipe> GetRecipe(int? id, bool withTracking = false)
    {
        var recipeQuery = _recipeContext.Recipes;

        if (!withTracking)
        {
            recipeQuery.AsNoTracking();
        }

        return await recipeQuery
            .Include(i => i.Ingredients)
            .Include(s => s.Steps)
            .Include(p => p.PrepTimes)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Recipe> GetRecipeWithoutIncludes(int id) =>
        await _recipeContext.Recipes.FirstOrDefaultAsync(a => a.Id == id);

    public async Task Delete(Recipe recipe)
    {
        _recipeContext.Remove(recipe);
        await _recipeContext.SaveChangesAsync();
    }

    public async Task Update(Recipe recipe)
    {
        _recipeContext.Recipes.Update(recipe);
        await _recipeContext.SaveChangesAsync();
    }

    public IEnumerable<FavoriteRecipe> GetFavoriteRecipes(string userId) =>
        _recipeContext.FavoritesRecipes.Where(fr => fr.UserId == userId);
}
