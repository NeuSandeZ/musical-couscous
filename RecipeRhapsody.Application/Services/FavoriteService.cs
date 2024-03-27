using Microsoft.AspNetCore.Authorization;
using RecipeRhapsody.Application.Authorization;
using RecipeRhapsody.Application.Exceptions;
using RecipeRhapsody.Domain;

namespace RecipeRhapsody.Application;

internal sealed class FavoriteService(
    IFavoriteRepository favoriteRepository,
    IUserContextService userContextService,
    IAuthorizationService authorizationService
) : IFavoriteService
{
    private readonly IFavoriteRepository _favoriteRepository = favoriteRepository;
    private readonly IUserContextService _userContextService = userContextService;
    private readonly IAuthorizationService _authorizationService = authorizationService;

    public async Task<int> AddFavorite(int id)
    {
        var userId =
            _userContextService.GetUserId ?? throw new ForbidException("Forbbiden action!");

        var favoriteRecipe = await _favoriteRepository.GetFavorite(id, userId);
        //TODO CONSIDER: allow creators of recipes to add their own recipes to favorites or not?
        if (favoriteRecipe is not null)
        {
            throw new BadRequestException("This recipe is already in your favorite list!");
        }

        var newFavoriteRecipe = new FavoriteRecipe() { UserId = userId, RecipeId = id };

        await _favoriteRepository.AddFavorite(newFavoriteRecipe);
        return newFavoriteRecipe.Id;
    }

    public async Task DeleteFavorite(int id)
    {
        var favoriteRecipe =
            await _favoriteRepository.GetFavorite(id, _userContextService.GetUserId)
            ?? throw new NotFoundException("Favorite recipe not found!");

        var authorizationResult = await _authorizationService.AuthorizeAsync(
            _userContextService.User,
            favoriteRecipe,
            new ResourceOperationRequirement(ResourceOperation.Delete)
        );

        if (!authorizationResult.Succeeded)
        {
            throw new ForbidException("Forbidden action!");
        }

        await _favoriteRepository.DeleteFavorite(favoriteRecipe);
    }
}
