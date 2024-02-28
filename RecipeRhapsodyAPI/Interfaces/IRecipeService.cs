namespace RecipeRhapsodyAPI;

public interface IRecipeService
{
    Task<object> AddRecipe(RecipeDto recipeDto);
    Task<object> AddImageToRecipe(IFormFile file);
    Task<List<RecipeListingDto>> GetRecipes(bool? userRecipes = null);
    Task<RecipeDto> GetRecipe(int id);
    Task<object> PatchRecipe(RecipeDto recipeDto);
    Task DeleteRecipe(int id);
}
