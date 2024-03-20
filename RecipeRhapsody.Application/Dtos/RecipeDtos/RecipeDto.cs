namespace RecipeRhapsody.Application.Dtos.RecipeDtos;

public readonly record struct RecipeDto
{
    public int? Id { get; init; }
    public string? CreatedBy { get; init; }
    public string? ImageUrl { get; init; }
    public DateTime? UpdatedOn { get; init; }
    public string Title { get; init; }
    public string Description { get; init; }
    public int Servings { get; init; }
    public string ServingsYield { get; init; }
    public IEnumerable<string> Ingredients { get; init; }
    public IEnumerable<string> Steps { get; init; }
    public IEnumerable<PrepTimeDto> PrepTimes { get; init; }
}
