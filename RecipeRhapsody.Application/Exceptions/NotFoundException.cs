namespace RecipeRhapsody.Application.Exceptions;

internal sealed class NotFoundException : Exception
{
    public NotFoundException(string message)
        : base(message) { }
}
