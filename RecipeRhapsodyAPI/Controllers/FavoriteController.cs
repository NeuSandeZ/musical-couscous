using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipeRhapsody.Application;
using RecipeRhapsody.Application.IServices;

namespace RecipeRhapsodyAPI;

[Authorize]
[ApiController]
[Route("favorite")]
public sealed class FavoriteController(IFavoriteService favoriteService) : ControllerBase
{
    private readonly IFavoriteService _favoriteService = favoriteService;

    [HttpPost("{id}")]
    public async Task<IActionResult> AddFavorite([FromRoute] int id)
    {
        var favoriteRecipeId = await _favoriteService.AddFavorite(id);
        return Created($"/favorite/{favoriteRecipeId}", null);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFavorite([FromRoute] int id)
    {
        await _favoriteService.DeleteFavorite(id);
        return NoContent();
    }
}
