namespace RecipeRhapsody.Domain;

public interface IFavoriteRepository
{
    Task AddFavorite(FavoriteRecipe favoriteRecipe);
    Task DeleteFavorite(FavoriteRecipe favoriteRecipe);
    Task<FavoriteRecipe?> GetFavorite(int id, string userId);
}
