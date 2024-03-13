using Microsoft.EntityFrameworkCore;
using RecipeRhapsody.Application.Persistance;
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

    public IQueryable<Recipe> GetBaseQuery()
    => _recipeContext.Recipes.AsQueryable().AsNoTracking();
    

    public async Task<Recipe> GetRecipe(int? id)
    => await _recipeContext
            .Recipes.Include(i => i.Ingredients)
            .Include(s => s.Steps)
            .Include(p => p.PrepTimes)
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);
    
    public async Task<Recipe> GetRecipeWithTracking(int? id)
        => await _recipeContext
            .Recipes.Include(i => i.Ingredients)
            .Include(s => s.Steps)
            .Include(p => p.PrepTimes)
            .FirstOrDefaultAsync(a => a.Id == id);
    

    public async Task<Recipe> GetRecipeWithoutIncludes(int id)
    => await _recipeContext.Recipes.FirstOrDefaultAsync(a => a.Id == id);
    

    public async Task Commit()
    => await _recipeContext.SaveChangesAsync();
    

    public async Task Delete(Recipe recipe)
    {
        _recipeContext.Remove(recipe);
        await Commit();
    }
}