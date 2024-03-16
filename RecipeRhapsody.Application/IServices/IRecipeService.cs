using Microsoft.AspNetCore.Http;
using RecipeRhapsody.Application.Dtos.RecipeDtos;
using RecipeRhapsody.Application.SearchQueries;

namespace RecipeRhapsody.Application.IServices;

public interface IRecipeService
{
    Task<int> AddRecipe(RecipeDto recipeDto);
    Task<string> AddImageToRecipe(IFormFile file);
    Task<IEnumerable<RecipeListingDto>> GetRecipes(RecipeQuery query);
    Task<RecipeDto> GetRecipe(int id);
    Task PatchRecipe(RecipeDto recipeDto);
    Task DeleteRecipe(int id);
}