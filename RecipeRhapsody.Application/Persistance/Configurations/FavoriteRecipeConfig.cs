using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipeRhapsody.Domain;

namespace RecipeRhapsody.Application;

public sealed class FavoriteRecipeConfig : IEntityTypeConfiguration<FavoriteRecipe>
{
    public void Configure(EntityTypeBuilder<FavoriteRecipe> builder)
    {
        builder
            .HasOne(fr => fr.Recipe)
            .WithMany()
            .HasForeignKey(fr => fr.RecipeId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(fr => fr.User)
            .WithMany(u => u.FavoriteRecipes)
            .HasForeignKey(fr => fr.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.NoAction);
    }
}
