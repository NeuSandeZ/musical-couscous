namespace RecipeRhapsodyAPI;

public interface IRecipeService
{
    Task<object> AddRecipe(RecipeDto recipeDto);
    Task<object> AddImageToRecipe(IFormFile file);

    Task<List<RecipeListingDto>> GetRecipes();
    Task<RecipeDto> GetRecipe(int id);
}
