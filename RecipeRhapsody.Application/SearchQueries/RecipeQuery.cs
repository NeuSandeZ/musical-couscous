namespace RecipeRhapsody.Application.SearchQueries;

public sealed record RecipeQuery
{
    public bool UserRecipes { get; set; }
    public int? Page { get; set; }
    public int? PageSize { get; set; }
    public int SkipCount { get; set; }
}
