namespace RecipeRhapsody.Application.Dtos.RecipeDtos;


public sealed record RecipeDto
{
    public int? Id { get; set; }
    public string? CreatedBy { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Servings { get; set; }
    public string ServingsYield { get; set; }
    public IEnumerable<string> Ingredients { get; set; } = [];
    public IEnumerable<string> Steps { get; set; } = [];
    public IEnumerable<PrepTimeDto> PrepTimes { get; set; } = [];
}