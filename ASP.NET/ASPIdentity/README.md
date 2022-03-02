# ASP.NET Core Identity Demonstration

[__Reference Video__](https://www.youtube.com/watch?v=B0_gM-wBlmE)

<br>

This is simply a web application used to demonstrate how to get started with using [Identity](https://docs.microsoft.com/en-us/aspnet/identity/overview/getting-started/introduction-to-aspnet-identity) in ASP.NET core projects.

- [ASP.NET Core Identity Demonstration](#aspnet-core-identity-demonstration)
  - [1 - Setting up](#1---setting-up)
  - [1.5 - Dependency Injection](#15---dependency-injection)
  - [2 - User Registration](#2---user-registration)
  - [3 - Logging in](#3---logging-in)
  - [4 - Logging out](#4---logging-out)
  - [5 - `[Authorize]` annotation](#5---authorize-annotation)

---
<br>


## 1 - Setting up

First and foremost, install the following NuGet packages:

* Microsoft.AspNetCore.Identity.EntityFrameworkCore
* Microsoft.EntityFrameworkCore.SqlServer
* Microsoft.EntityFrameworkCore.Tools 

In the `appsettings.json`, add a `ConnectionStrings` property to the object to your database:

```json
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  // Add your connection string, change the Server value and Database value to match your environment
  "ConnectionStrings": {
    "IdentityConnectionString": "Server=LAPTOP-R22GTED8;Database=AspNetIdentity;Trusted_Connection=True;MultipleActiveResultSets=True"
  }
```

Then, you'll need a `DbContext` for the `Identity` to work with `EntityFrameworkCore`. Create a `AuthDbContext.cs` (which I created under `/Models`):

```cs
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ASPIdentity.Models;


// This is the DB Context (Entity Framework) for the Identity package - Used for authentication and authorization.
//
// 1 -  Extends IdentityDbContext (Come from Microsoft.AspNetCore.Identity.EntityFrameworkCore
// 2 -  Provide constructor, which takes in a DbContextOptions (From Microsoft.EntityFrameworkCore).
//      Pass the DbContextOptions to the base class, which is IdentityDbContext
public class AuthDbContext: IdentityDbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> dbContextOptions): base(dbContextOptions)
    {   
    }
}
```

With that done, proceed to `Program.cs` and finally register the services:

```cs
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
```

Before the `app.UseAuthorization()`, add the `app.UseAuthentication()` as well.

```cs
// Apart from useAuthorization(), we also need UseAuthentication()
app.UseAuthentication();
app.UseAuthorization();
```

As with standard EntityFramework procedures, open up the Package manager console, and run

```
add-migration <migration-name>

update-database
```

---
<br>

## 1.5 - Dependency Injection

Most of the time, you will need 2 objects in your controllers to handle both retrieving user information and handle login sessions: `UserManager` and `SignInManager`:

In your controller, you will retrieve these objects through dependency injection:

```cs
public class HomeController : Controller
{
    // In order to correctly implement Identity, you must use dependency injection to retrieve the 
    // UserManager<IdentityUser> and SignInManager<IdentityUser>
    private readonly UserManager<IdentityUser> userManager;
    private readonly SignInManager<IdentityUser> signInManager;


    // Constructor, use for Dependency Injection of UserManager and SignInManager
    public HomeController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager
    ) {
        this.userManager = userManager;
        this.signInManager = signInManager;
    }
//...
}
```

If you want to access these objects from the view (Eg: `_Layout.cshtml`), then use:

```cs
@*{
You may use Dependency Injection (Once again) to obtain the signInManager, which can provide information on whether the user had signed in or not!
}*@

@using Microsoft.AspNetCore.Identity
@inject SignInManager<IdentityUser> signInManager


 @*{
Using this dependency injection, you can write code like:

    if (signInManager.isSignedIn(User)) ..<output HTML>

If you want to obtain the IdentityUser object, it's better to do it in the controller and pass it into the View as ViewModel, as in Index.cshtml
}*@
```

---
<br>

## 2 - User Registration

You'll need a ViewModel for the view to bind to, something like `RegisterViewModel.cs`:

```cs
using System.ComponentModel.DataAnnotations;

namespace ASPIdentity.ViewModels;


public class LoginViewModel
{

    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }
    
    [Display(Name = "Remember Me ")]
    public bool RememberMe { get; set; }
}
```

In your respective controller, implement an action for registration. The view will bind to the view model `LoginViewModel`, and you'll access the registration credentials through it. The controller's registration action will look something like so:

```cs
[HttpGet]
public IActionResult Register()
{
    return View( new RegisterViewModel() );
}



[HttpPost]
public async Task<IActionResult> Register(RegisterViewModel registerModel) 
{
    // Check model state - is there any value entered incorrectly?
    if (ModelState.IsValid)
    {

        // Create a new Identity user object
        var user = new IdentityUser()
        {
            UserName = registerModel.Email,
            Email = registerModel.Email,
        };
        // Use CreateAsync() to insert new user into the database.
        var result = await userManager.CreateAsync(user, registerModel.Password);

        // Success - Sign in the user and redirect to index.
        if (result.Succeeded)
        {
            await signInManager.SignInAsync(user, false);
            return RedirectToAction("Index");
        }

        // Otherwise, show errors.
        foreach (var err in result.Errors) ModelState.AddModelError("", err.Description);
    }

    return View();
}
```

---
<br>

## 3 - Logging in

Likewise, logging in requires a view model too, like `LoginViewModel.cs`:

```cs
using System.ComponentModel.DataAnnotations;

namespace ASPIdentity.ViewModels;


public class LoginViewModel
{
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }
    
    [Display(Name = "Remember Me ")]
    public bool RememberMe { get; set; }
}
```

The login actions will look something like:

```cs
[HttpGet]
public IActionResult Login()
{
    return View( new LoginViewModel() );
}


[HttpPost]
public async Task<IActionResult> Login(LoginViewModel loginModel, string? returnUrl = null)
{
    if (ModelState.IsValid)
    {
        var result = await signInManager.PasswordSignInAsync(
            loginModel.Email, loginModel.Password, loginModel.RememberMe, false
        );
        
        if (result.Succeeded)
        {
            if (returnUrl == null || returnUrl == "/") return RedirectToAction("Index");
            return RedirectToPage(returnUrl);
        }

        ModelState.AddModelError("", "Sign in failed. Email or password is incorrect");
    }
    return View();
}
```

---
<br>

## 4 - Logging out

Logging out is more direct - Simply expose an action which will do as follows:

```cs
public async Task<IActionResult> LogOut()
{
    await signInManager.SignOutAsync();
    return RedirectToAction("Login");
}
```

---
<br>

## 5 - `[Authorize]` annotation

When we annotate an action with `[Authorize]`, ASP.NET will automatically check whether the user is authenticated before providing access to the action. If the user is not authenticated, they will be redirected to the login route, which is configured in the `Program.cs`:

<br>

__(Nothing changed, simply shown again. Observe the parameter `returnUrl`)__
```cs
// Configure this so that whenever an unauthorized user tries to access a route that requires authorization, it will
// redirect them to login page with returnUrl
builder.Services.ConfigureApplicationCookie(config => {
    config.LoginPath = "/Home/Login";
});
```

When the user is redirected to the login page, the query parameter `returnUrl` will be provided so that the user is redirected back to the original page after successful authentication. You might want to address that in your login action:

```cs
[HttpPost]
public async Task<IActionResult> Login(LoginViewModel loginModel, string? returnUrl = null)
{
    if (ModelState.IsValid)
    {
        var result = await signInManager.PasswordSignInAsync(
            loginModel.Email, loginModel.Password, loginModel.RememberMe, false
        );
        
        if (result.Succeeded)
        {
            if (returnUrl == null || returnUrl == "/") return RedirectToAction("Index");
            return RedirectToPage(returnUrl);
        }

        ModelState.AddModelError("", "Sign in failed. Email or password is incorrect");
    }
    return View();
}
```