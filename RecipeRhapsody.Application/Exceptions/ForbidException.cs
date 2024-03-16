namespace RecipeRhapsody.Application.Exceptions;

internal sealed class ForbidException : Exception
{
    public ForbidException(string message)
        : base(message) { }
}
