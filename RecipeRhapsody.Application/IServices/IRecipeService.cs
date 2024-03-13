using Microsoft.AspNetCore.Http;
using RecipeRhapsody.Application.RecipeDtos;
using RecipeRhapsody.Application.SearchQueries;

namespace RecipeRhapsody.Application.IServices;

public interface IRecipeService
{
    Task<object> AddRecipe(RecipeDto recipeDto);
    Task<object> AddImageToRecipe(IFormFile file);
    Task<List<RecipeListingDto>> GetRecipes(RecipeQuery query);
    Task<RecipeDto> GetRecipe(int id);
    Task<object> PatchRecipe(RecipeDto recipeDto);
    Task DeleteRecipe(int id);
}