namespace RecipeRhapsody.Application.RecipeDtos;


public sealed record PrepTimeDto
{
    public string Title { get; set; }

    public int Time { get; set; }

    public string Unit { get; set; }
}