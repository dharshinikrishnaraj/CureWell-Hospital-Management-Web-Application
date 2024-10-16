using CureWellDataAccessLayer.Models;
using CureWellDataAccessLayer.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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

app.UseCors(
  options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()
      );

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
