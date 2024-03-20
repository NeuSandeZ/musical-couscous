namespace RecipeRhapsody.Application;

public record struct PagedResult<T>(IEnumerable<T> Collection, int TotalRecords);
