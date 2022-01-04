
using BookListMVC.Models;
using Microsoft.EntityFrameworkCore;


// With ASP.NET MVC, we can observe several differences from Razor Pages:
//      In Program.cs, we do not have the AddRazorPages(). Instead, we use AddControllersWithViews(),
//      useRouting(), and MapControllerRoute() 
//
//
// The idea of MVC is:
//
//      HTTP request => Routing => Controller => View (With Model passed) => Response
//                                    ^
//                                  Model


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// RazorRuntimeCompilation to simulate Hot-Reload behavior when we modify the views
builder.Services.AddControllersWithViews()
    .AddRazorRuntimeCompilation();

// Entity Framework service
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseSqlServer( builder.Configuration.GetConnectionString("DefaultConnection") );
});


var app = builder.Build();







// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
