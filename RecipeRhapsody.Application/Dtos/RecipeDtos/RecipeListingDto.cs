namespace RecipeRhapsody.Application.Dtos.RecipeDtos;

public readonly record struct RecipeListingDto
{
    public int Id { get; init; }
    public string? ImageUrl { get; init; }
    public string Title { get; init; }
    public string Description { get; init; }
}
