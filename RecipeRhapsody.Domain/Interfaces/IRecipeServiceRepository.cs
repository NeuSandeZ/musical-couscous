using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Domain.Interfaces;

public interface IRecipeServiceRepository
{
    Task AddRecipe(Recipe recipe);
    IQueryable<Recipe> GetBaseQuery();
    Task<Recipe> GetRecipe(int? id);
    Task<Recipe> GetRecipeWithoutIncludes(int id);
    Task<Recipe> GetRecipeWithTracking(int? id);
    Task Commit();
    Task Delete(Recipe recipe);
}