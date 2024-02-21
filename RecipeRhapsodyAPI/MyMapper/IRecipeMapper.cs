namespace RecipeRhapsodyAPI;

public interface IRecipeMapper
{
    Recipe MapToRecipe(RecipeDto recipeDto);
    RecipeDto MapToRecipeDto(Recipe recipes);
}
