using RecipeRhapsody.Application.RecipeDtos;
using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Application.Mappings;

public interface IRecipeMapper
{
    Recipe MapToRecipe(RecipeDto recipeDto);
    RecipeDto MapToRecipeDto(Recipe recipes);
}
