using CureWellDataAccessLayer.Models;
using CureWellDataAccessLayer.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
       builder =>
       {
           builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
       });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<CureWellRepository>(new CureWellRepository(new CureWellDbContext()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.UseEndpoints(endpoints =>  endpoints.MapControllers());

app.Run();
