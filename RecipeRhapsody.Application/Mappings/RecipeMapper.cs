using RecipeRhapsody.Application.Dtos.RecipeDtos;
using RecipeRhapsody.Domain.Entities;

namespace RecipeRhapsody.Application.Mappings;

internal sealed class RecipeMapper : IRecipeMapper
{
    public Recipe MapToRecipe(RecipeDto recipeDto) =>
        new Recipe()
        {
            ImageUrl = recipeDto.ImageUrl,
            Title = recipeDto.Title,
            Description = recipeDto.Description,
            Servings = recipeDto.Servings,
            ServingsYield = recipeDto.ServingsYield,
            Ingredients = recipeDto
                .Ingredients.Select(ingredient => new Ingredient { Name = ingredient })
                .ToList(),
            Steps = recipeDto.Steps.Select(step => new Step { Description = step }).ToList(),
            PrepTimes = recipeDto
                .PrepTimes.Select(prepTime => new PrepTime
                {
                    Title = prepTime.Title,
                    Time = prepTime.Time,
                    Unit = prepTime.Unit
                })
                .ToList()
        };

    public RecipeDto MapToRecipeDto(Recipe recipe) =>
        new RecipeDto()
        {
            //Email or username instead of id!
            CreatedBy = recipe.ApplicationUserId,
            UpdatedOn = recipe.UpdatedOn,
            ImageUrl = recipe.ImageUrl,
            Title = recipe.Title,
            Description = recipe.Description,
            Servings = recipe.Servings,
            ServingsYield = recipe.ServingsYield,
            Ingredients = recipe.Ingredients.Select(ingredient => ingredient.Name).ToList(),
            Steps = recipe.Steps.Select(step => step.Description).ToList(),
            PrepTimes = recipe
                .PrepTimes.Select(prepTime => new PrepTimeDto
                {
                    Title = prepTime.Title,
                    Time = prepTime.Time,
                    Unit = prepTime.Unit
                })
                .ToList()
        };
}
