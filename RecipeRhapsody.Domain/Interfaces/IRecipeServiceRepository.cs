using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Domain.Interfaces;

public interface IRecipeServiceRepository
{
    Task AddRecipe(Recipe recipe);
    IQueryable<Recipe> GetBaseQuery();
    Task<Recipe> GetRecipe(int? id, bool withTracking = false);
    Task<Recipe> GetRecipeWithoutIncludes(int id);
    Task Delete(Recipe recipe);
    Task Update(Recipe recipe);
}
