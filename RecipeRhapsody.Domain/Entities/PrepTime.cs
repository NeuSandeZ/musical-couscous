namespace RecipeRhapsody.Domain.Entities;

public class PrepTime
{
    public int Id { get; set; }
    public string Title { get; set; }

    public int Time { get; set; }

    public string Unit { get; set; }

    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; }
}