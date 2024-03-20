namespace RecipeRhapsody.Application.Dtos.RecipeDtos;

public readonly record struct PrepTimeDto
{
    public string Title { get; init; }

    public int Time { get; init; }

    public string Unit { get; init; }
}
