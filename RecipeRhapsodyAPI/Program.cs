using Microsoft.EntityFrameworkCore;
using RecipeRhapsodyAPI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IRecipeService, RecipeService>();
builder.Services.AddScoped<IRecipeMapper, RecipeMapper>();

builder.Services.AddDbContext<RecipeContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("RecipeRhapsody"));
});

builder.Services.AddExceptionHandler<AppExceptionHandler>();

builder.Services.AddAuthorization();

// builder.Services.AddAuthentication();


builder
    .Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<RecipeContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAngular",
        builder => builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader()
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(_ => { });
app.UseStaticFiles();
app.MapIdentityApi<ApplicationUser>();
app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
