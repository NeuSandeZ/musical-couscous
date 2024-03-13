namespace RecipeRhapsody.Application.RecipeDtos;

public sealed record RecipeListingDto
{
    public int Id { get; set; }
    public string? ImageUrl { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}