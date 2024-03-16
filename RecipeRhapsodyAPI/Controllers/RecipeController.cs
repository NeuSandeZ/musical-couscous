using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipeRhapsody.Application.Dtos.RecipeDtos;
using RecipeRhapsody.Application.IServices;
using RecipeRhapsody.Application.SearchQueries;

namespace RecipeRhapsodyAPI;

[ApiController]
[Authorize]
[Route("recipe")]
public sealed class RecipeController : ControllerBase
{
    private readonly IRecipeService _recipeService;

    public RecipeController(IRecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpPost("add-recipe")]
    public async Task<IActionResult> AddRecipe([FromBody] RecipeDto recipeDto)
    {
        var id = await _recipeService.AddRecipe(recipeDto);
        return Created($"/recipe/{id}", null);
    }

    [HttpPost("image")]
    public async Task<IActionResult> AddImageToRecipe([FromForm] IFormFile imageFile)
    {
        var imageUrl = await _recipeService.AddImageToRecipe(imageFile);
        return Ok(new { imageUrl });
    }

    [AllowAnonymous]
    [HttpGet("fetchRecipes")]
    public async Task<ActionResult<IEnumerable<RecipeListingDto>>> GetRecipes(
        [FromQuery] RecipeQuery query
    )
    {
        var recipes = await _recipeService.GetRecipes(query);
        return Ok(recipes);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<RecipeDto>> GetRecipe([FromRoute] int id)
    {
        var recipe = await _recipeService.GetRecipe(id);
        return Ok(recipe);
    }

    [HttpPatch("patch")]
    public async Task<IActionResult> PatchRecipe([FromBody] RecipeDto recipeDto)
    {
        await _recipeService.PatchRecipe(recipeDto);
        return Ok();
    }

    [HttpDelete("{id}/delete")]
    public async Task<IActionResult> DeleteRecipe([FromRoute] int id)
    {
        await _recipeService.DeleteRecipe(id);
        return NoContent();
    }
}
