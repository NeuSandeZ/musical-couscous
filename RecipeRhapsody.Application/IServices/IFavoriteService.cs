namespace RecipeRhapsody.Application;

public interface IFavoriteService
{
    Task DeleteFavorite(int id);
    Task<int> AddFavorite(int id);
}
