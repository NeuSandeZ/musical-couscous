﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<object> AddRecipe([FromBody] RecipeDto recipeDto)
    {
        return await _recipeService.AddRecipe(recipeDto);
    }

    [HttpPost("image")]
    public async Task<object> AddImageToRecipe([FromForm] IFormFile imageFile)
    {
        return await _recipeService.AddImageToRecipe(imageFile);
    }

    [AllowAnonymous]
    [HttpGet("fetchRecipes")]
    public async Task<List<RecipeListingDto>> GetRecipes()
    {
        return await _recipeService.GetRecipes();
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<RecipeDto> GetRecipe([FromRoute] int id)
    {
        return await _recipeService.GetRecipe(id);
    }
}