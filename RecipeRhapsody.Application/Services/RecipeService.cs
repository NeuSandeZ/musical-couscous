using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RecipeRhapsody.Application.Authorization;
using RecipeRhapsody.Application.Exceptions;
using RecipeRhapsody.Application.IServices;
using RecipeRhapsody.Application.Mappings;
using RecipeRhapsody.Application.RecipeDtos;
using RecipeRhapsody.Application.SearchQueries;
using RecipeRhapsody.Domain.Entities;
using RecipeRhapsody.Domain.Interfaces;

namespace RecipeRhapsody.Application.Services;

public sealed class RecipeService(
    IRecipeServiceRepository recipeServiceRepository,
    IWebHostEnvironment webHostEnvironment,
    IRecipeMapper recipeMapper,
    IHttpContextAccessor httpContextAccessor,
    IAuthorizationService authorizationService
) : IRecipeService
{
    private readonly IRecipeServiceRepository _recipeServiceRepository = recipeServiceRepository;
    private readonly IWebHostEnvironment _webHostEnvironment = webHostEnvironment;
    private readonly IRecipeMapper _recipeMapper = recipeMapper;
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
    private readonly IAuthorizationService _authorizationService = authorizationService;

    public async Task<object> AddRecipe(RecipeDto recipeDto)
    {
        var user = _httpContextAccessor?.HttpContext?.User;

        if (user is null || !user.Identity.IsAuthenticated)
        {
            throw new ForbidException("Forbidden action!");
        }

        var id = user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value;
        var recipe = _recipeMapper.MapToRecipe(recipeDto);
        recipe.ApplicationUserId = id;
        
        await _recipeServiceRepository.AddRecipe(recipe);

        return new { Created = true };
    }

    public async Task<object> AddImageToRecipe(IFormFile imageFile)
    {
        if (imageFile is null || imageFile.Length == 0)
        {
            throw new BadRequestException("Invalid file!");
        }

        var imagesDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "images");
        if (!Directory.Exists(imagesDirectory))
        {
            Directory.CreateDirectory(imagesDirectory);
        }

        string fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
        string filePath = Path.Combine(imagesDirectory, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(stream);
        }

        string imageUrl = Path.Combine("/images/", fileName);

        return new { imageUrl };
    }

    public async Task<List<RecipeListingDto>> GetRecipes(RecipeQuery query)
    {
        var baseQuery = _recipeServiceRepository.GetBaseQuery();

        if (query.UserRecipes is true)
        {
            var user = _httpContextAccessor?.HttpContext?.User;

            if (user is null || !user.Identity.IsAuthenticated)
            {
                throw new ForbidException("Forbidden action!");
            }

            var id = user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value;
            baseQuery = baseQuery.Where(a => a.ApplicationUserId == id);
        }

        return await baseQuery
            .Select(r => new RecipeListingDto
            {
                Id = r.Id,
                ImageUrl = r.ImageUrl,
                Title = r.Title,
                Description = r.Description
            })
            .ToListAsync();
    }

    public async Task<RecipeDto> GetRecipe(int id)
    {
        var recipe = await _recipeServiceRepository.GetRecipe(id)
            ?? throw new NotFoundException("Recipe not found!");

        return _recipeMapper.MapToRecipeDto(recipe);
    }

    public async Task<object> PatchRecipe(RecipeDto recipeDto)
    {
        var recipe = await _recipeServiceRepository.GetRecipeWithTracking(recipeDto.Id)
            ?? throw new NotFoundException("Recipe not found!");

        var authorizationResult = await _authorizationService.AuthorizeAsync(
            _httpContextAccessor.HttpContext.User,
            recipe,
            new ResourceOperationRequirement(ResourceOperation.Update)
        );
        
        if (!authorizationResult.Succeeded)
        {
            throw new ForbidException("Forbidden action!");
        }
        
        recipe.Title = recipeDto.Title;
        recipe.Description = recipeDto.Description;
        recipe.Servings = recipeDto.Servings;
        recipe.ServingsYield = recipeDto.ServingsYield;
        
        recipe.UpdatedOn = DateTime.UtcNow;
        
        recipe.Ingredients = recipeDto
            .Ingredients.Select(ingredient => new Ingredient { Name = ingredient })
            .ToList();
        recipe.Steps = recipeDto.Steps.Select(step => new Step { Description = step }).ToList();
        recipe.PrepTimes = recipeDto
            .PrepTimes.Select(prepTime => new PrepTime
            {
                Title = prepTime.Title,
                Time = prepTime.Time,
                Unit = prepTime.Unit
            })
            .ToList();

        await _recipeServiceRepository.Commit();

        return new { Updated = true };
    }

    public async Task DeleteRecipe(int id)
    {
        var recipe = await _recipeServiceRepository.GetRecipeWithoutIncludes(id)
            ?? throw new NotFoundException("Recipe not found!");
        
        var authorizationResult = await _authorizationService.AuthorizeAsync(
            _httpContextAccessor.HttpContext.User,
            recipe,
            new ResourceOperationRequirement(ResourceOperation.Delete)
        );
        
        if (!authorizationResult.Succeeded)
        {
            throw new ForbidException("Forbidden action!");
        }
        
        if (!string.IsNullOrEmpty(recipe.ImageUrl))
        {
            var photoPath = _webHostEnvironment.WebRootPath + recipe.ImageUrl.Replace("/", "\\");
        
            if (File.Exists(photoPath))
            {
                File.Delete(photoPath);
            }
        }

        await _recipeServiceRepository.Delete(recipe);
    }
}