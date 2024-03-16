using RecipeRhapsody.Application.Dtos.RecipeDtos;
using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Application.Mappings;

internal interface IRecipeMapper
{
    Recipe MapToRecipe(RecipeDto recipeDto);
    RecipeDto MapToRecipeDto(Recipe recipes);
}
