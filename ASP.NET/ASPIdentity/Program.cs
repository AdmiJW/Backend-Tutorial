using ASPIdentity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();




// To add Identity, we must create a DbContext which extends IdentityDbContext, and register it like regular
// entity framework models. See /Models/AuthDbContext.cs
builder.Services.AddDbContext<AuthDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnectionString"));
});

// After the DbContext has been correctly added, we will also add Identity itself into Services.
// The identity itself must also know what are the store used to keep the user authentication data.
builder.Services.
    AddIdentity<IdentityUser, IdentityRole>().
    AddEntityFrameworkStores<AuthDbContext>();


// Configure this so that whenever an unauthorized user tries to access a route that requires authorization, it will
// redirect them to login page with returnUrl
builder.Services.ConfigureApplicationCookie(config => {
    config.LoginPath = "/Home/Login";
});


// After that, add UseAuthentication() as seen below.
// With that done, you are able to run "add-migration" and "update-database" now to create the database in whatever store you use.



var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Apart from useAuthorization(), we also need UseAuthentication()
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
