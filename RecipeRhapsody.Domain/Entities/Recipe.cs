namespace RecipeRhapsody.Domain.Entities;

public class Recipe
{
    public int Id { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public string ApplicationUserId { get; set; }

    public DateTime? UpdatedOn { get; set; }
    public string? ImageUrl { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Servings { get; set; }
    public string? ServingsYield { get; set; }

    public List<Ingredient> Ingredients { get; set; }
    public List<Step> Steps { get; set; }
    public List<PrepTime> PrepTimes { get; set; }
}