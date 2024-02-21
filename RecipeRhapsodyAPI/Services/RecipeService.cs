using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace RecipeRhapsodyAPI;

public sealed class RecipeService : IRecipeService
{
    private readonly RecipeContext _dbContext;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IRecipeMapper _recipeMapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RecipeService(
        RecipeContext dbContext,
        IWebHostEnvironment webHostEnvironment,
        IRecipeMapper recipeMapper,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _dbContext = dbContext;
        _webHostEnvironment = webHostEnvironment;
        _recipeMapper = recipeMapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<object> AddRecipe(RecipeDto recipeDto)
    {
        var user = _httpContextAccessor?.HttpContext?.User;

        if (user == null || user.Identity.IsAuthenticated == false)
        {
            throw new ForbidException("Forbidden action!");
        }

        var id = user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value;
        var recipe = _recipeMapper.MapToRecipe(recipeDto);
        recipe.ApplicationUserId = id;

        await _dbContext.AddAsync(recipe);
        await _dbContext.SaveChangesAsync();

        return new { Created = true };
    }

    public async Task<object> AddImageToRecipe(IFormFile imageFile)
    {
        if (imageFile == null || imageFile.Length == 0)
        {
            throw new BadRequestException("Invalid file!");
        }

        string imagesDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "images");
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

        // Console.WriteLine("Filename: " + fileName);
        // Console.WriteLine("Image URL: " + imageUrl);

        return new { imageUrl };
    }

    public async Task<List<RecipeListingDto>> GetRecipes()
    {
        return await _dbContext
            .Recipes.Select(r => new RecipeListingDto
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
        var recipe =
            await _dbContext
                .Recipes.Include(u => u.ApplicationUser)
                .Include(i => i.Ingredients)
                .Include(s => s.Steps)
                .Include(p => p.PrepTimes)
                .FirstOrDefaultAsync(a => a.Id == id)
            ?? throw new NotFoundException("Recipe not found!");
        return _recipeMapper.MapToRecipeDto(recipe);

        // return _recipeMapper.MapToRecipeDto(
        //     await _dbContext.Recipes.FirstOrDefaultAsync(a => a.Id == id)
        //         ?? throw new NotFoundException("Recipe not found!")
        // );
    }
}
