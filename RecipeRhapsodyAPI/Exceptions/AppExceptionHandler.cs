﻿using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;

namespace RecipeRhapsodyAPI;

public class AppExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        (int statusCode, string errorMessage) = exception switch
        {
            ForbidException forbidException => (403, forbidException.Message),
            BadRequestException badRequestException => (400, badRequestException.Message),
            NotFoundException notFoundException => (404, notFoundException.Message),
            _ => (500, "Something went wrong!")
        };

        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsync(errorMessage);

        return true;
    }
}
