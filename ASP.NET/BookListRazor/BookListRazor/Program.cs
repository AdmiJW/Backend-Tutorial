using Microsoft.EntityFrameworkCore;
using BookListRazor.Models;


// Since .NET 6, There is no longer a StartUp.cs. Everything combined in Program.cs



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// RazorRuntimeCompilation to enable Hot-Reload-like behavior when running. This package has to be downloaded from NuGet
builder.Services.AddRazorPages()
    .AddRazorRuntimeCompilation();

// Configure Entity Framework into our pipeline.
builder.Services.AddDbContext<ApplicationDbContext>(option=> option.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")
));

// API ( Controller )
builder.Services.AddControllersWithViews();


var app = builder.Build();






// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

// API - We have to map endpoints
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();
