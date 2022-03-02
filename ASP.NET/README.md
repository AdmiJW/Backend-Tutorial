# ASP.NET MVC Notes 📝

[__Main Reference 👈__](https://asp.mvc-tutorial.com/)

This readme document serves as my note and reference for ASP.NET Core MVC architecture. The main reference is provided above, and you are encouraged to use it for a more comprehensive, detailed guide.

<br/>

---

# 0 - Table of Contents

[1 - Introduction](#1---introduction)

[2 - Quick Start](#2---quick-start)

[3 - Razor](#3---razor)

[4 - Controller](#4---controller)


<br/>

---

# 1 - Introduction

* __MVC__ stands for __Model__, __View__ and __Controller__, a software pattern mainly used in development of applications with graphical user interface (GUI). 

* According to this architecture (specifically to ASP.NET), the __Controller__ is responsible to receive and handle the communication (request) with the user, which may update (instantiate) the __Model__ that contains data and business logic, and passing it to the __View__ that is responsible for visual presentation. 

* At the very least, only the controller is __required__ *(to handle the request!)*, and both model and view can be __optional__. Without a view, you can do at most is API endpoints, and without model, the webpage would be presented without data.

<br>

---

# 2 - Quick Start

## 2.1 - Creating the project

This section walks you through a quick ASP.NET hello world MVC project from scratch.

1. From your __Visual Studio__, create a new project with template as __ASP.NET Core Empty__. During the time this documentation was written, it was using .NET 6. For the rest of this document, the name of project (and namespace) is assumed to be __`TestApplication`__.

1. From the project explorer, you could see `Project.cs`, which is the entry point of your application. Inside it, you may see this following line that the template provides:

    ```cs
    await context.Response.WriteAsync("Hello World!");
    ```

    Feel free to change the string, and press f5 to start the server and see the output.

<br>

## 2.2 - Creating a Controller

1. The project has to be configured to utilize MVC first. In the `Project.cs`, change it to:

    `Project.cs`
    ```cs
    var builder = WebApplication.CreateBuilder(args);

    // Register services before the application 
    builder.Services.AddMvc();


    var app = builder.Build();

    // Routing 
    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();    
    }



    app.UseRouting();
    app.UseEndpoints(endpoints => {
        endpoints.MapDefaultControllerRoute();
    });

    app.Run();
    ```


1. Now the project is ready. We will add a new folder `Controllers` and inside it, create a `HomeController.cs`. 

    `HomeController.cs`
    ```cs
    namespace TestApplication.Controllers
    {
        public class HomeController : Controller
        {
            public IActionResult Index()
            {
                // Since we do not have View yet, we return plain text to the browser
                return Content("Hello, MVC world!");
            }
        }
    }
    ```

    Now if you press f5 to run your web application, you will see the text `Hello, MVC world!` being displayed

<br>

## 2.3 - Creating a View

A `.cshtml` file is an ASP.NET View. With `Razor` as the view engine, we can use both markup language (`html`) and server side scripting (`C#`) using Razor syntax in the view.

1. Usually, the file structure is `/Views/[Controller]/[Action].cshtml`. Therefore, create a `Views` folder. Inside it, create a `Home` folder as well as `Index.cshtml` within.

    `Index.cshtml`
    ```cs
    @{
        Layout = null;
    }

    <!DOCTYPE html>

    <html>
    <head>
        <meta name="viewport" content="width=device-width" />
        <title>Index</title>
    </head>
    <body>

    </body>
    </html>
    ```

Go back to the `HomeController.cs` and modify the code to have it render the view:

`HomeController.cs`
```cs
public IActionResult Index()
{
    return View();
}
```

<br>

## 2.4 - Creating a Model

1. As with __Views__ and __Controllers__, a __Model__ also deserve its own directory.

    Create a `Models` directory, and `Movie.cs` within.

    `Movie.cs`
    ```cs
    namespace TestApplication.Models
    {
        public class Movie
        {
            public String Title { get; set; }
            public DateOnly ReleaseDate { get; set; }   
        }
    }
    ```

1. Controller is responsible for instantiating the model and passing it to the view. Therefore, go to `HomeController.cs` and modify:

    `HomeController.cs`
    ```cs
    using Microsoft.AspNetCore.Mvc;

    // Models
    using TestApplication.Models;

    namespace TestingApplication.Controllers
    {
        public class HomeController : Controller
        {
            public IActionResult Index()
            {
                Movie movie = new Movie()
                {
                    Title = "The Godfather",
                    ReleaseDate = new DateOnly(1972, 3, 24)
                };

                return View(movie);     // << pass the instantiated model into view
            }
        }
    }
    ```

1. Then, we have to receive that passed model and use it inside the view! Proceed to the `Index.cshtml` from before and modify:

    `Index.cshtml`
    ```cs
    @model TestApplication.Models.Movie
    @{
        Layout = null;
    }

    <!DOCTYPE html>

    <html>
    <head>
        <meta name="viewport" content="width=device-width" />
        <title>@Model.Title</title>
    </head>
    <body>

        The movie <b>@Model.Title</b> was released @Model.ReleaseDate.ToLongDateString()

    </body>
    </html>
    ```

<br>

---

# 3 - Razor

* __Razor__ is the view engine used in MVC framework. It is not long ago that Microsoft also developed __Razor Pages__, a new framework that is also gaining popularity alongside MVC framework. 

* With Razor, we can mix client-side markup (HTML) with server-side code (C# or VB.NET), without having to explicitly jump in and out of the two syntax types, like:

    ```html
    <p>Hello, world - my name is @name and the current date is: @DateTime.Now.ToString()</p>
    ```

    or

    ```html
    @if(Request.QueryString["test"] != null)
    {
        <p>Lots of markup here...</p>
        <p>Test value: <b>@Request.QueryString["test"]</b></p>
        <p>And even more here...</p>
    }
    ```

* Everything we write inside a `.cshtml` would be interpreted as html, until the __at-character (@)__ is encountered, marking the beginning of server-side code.

* Any output from the Razor expression would be automatically HTML encoded. If you want the browser to parse the output as a DOM, use `Html.Raw()` instead:

    ```html
    @{
        var helloWorld = "<b>Hello, world!</b>";
    }
    <p>@helloWorld</p>      <!-- Outputs the <b></b> in plain text -->
    <p>@Html.Raw(helloWorld)</p>  <!-- <b></b> Parsed as html -->
    ```

* Some common uses of the Razor syntax:


    * __Simple Expressions__

    ```html
    Hello, @("Bobb Kahn".Substring(0,4)). Your age is: <b>@(37 + 5).</b>
    ```

    * __Multi-statement Razor blocks__

    ```cs
    @{
        var sum = 32 + 10;
        var greeting = "Hello, world!";
        var text = "";
        for(int i = 0; i < 3; i++)
        { 
            text += greeting + " The result is: " + sum + "\n";
        }
    }
    ```

    * __Mix in HTML tags directly__

    ```html
    @{
        var helloWorld = "This is a code block...";
    
        <p>This is a tag with plain text and <b>markup</b> inside of it...</p>   
    }
    ```

    * __Razor Comments__

    ```
    @*
    Here's a Razor server-side comment
    It won't be rendered to the browser
    It can span multiple lines
    *@
    ```

    * __Variables__

    ```cs
    @{ 
        string helloWorldMsg = "Hello, world!";
    }

    <div>
        @helloWorldMsg
    </div>
    ```

    * __If-Else__

    ```cs
    @if(DateTime.Now.Year >= 2042)
    {
        <span>The year 2042 has finally arrived!</span>
    }
    else
    {
        <span>We're still waiting for the year of 2042...</span>
    }
    ```

    * __Loops (for, foreach, while, do-while)__

    ```cs
    <ul>
        @foreach (string name in names)
        {
            <li>@name</li>
        }
    </ul>
    ```

    * __Switch case__

    ```cs
    @switch(DateTime.Now.DayOfWeek)
    {
        case DayOfWeek.Monday:
            <span>Uh-oh...</span>
            break;
        case DayOfWeek.Friday:
            <span>Weekend coming up!</span>
            break;
        case DayOfWeek.Saturday:
        case DayOfWeek.Sunday:
            <span>Finally weekend!</span>
            break;
        default:
            <span>Nothing special about this day...</span>
            break;
    }
    ```

    * __Functions__

    ```cs
    @{ 
        int GetTheAnswerToLifeTheUniverseEverything(int x, int y)
        {
        return x * y;
        }
    }
    <div>
        The answer to life, the universe and everything: @GetTheAnswerToLifeTheUniverseEverything(7, 6)
    </div>
    ```

    * __Templated Delegates__

    ```cs
    Func<dynamic, object> movieTemplate = @<div>@item.Title [@item.ReleaseDate.ToShortDateString()]</div>;
    ```

<br>

---

# 4 - Controller

* A __controller__ acts as the middleman - combining your __Model__ with a __View__ and serve the result to the end-user.

* As mentioned before, neither a Model nor a View is required - the Controller can act on its own for the most basic operations - Eg: Redirecting, deliverying a simple text content.

* Properties of a proper controller:

    1. Usuallyt placed in a folder named __`Controllers`__ in the root of the project
   
    1. The class inherits `Microsoft.AspNetCore.Mvc.Controller`, or any of its descendants

    1. The name of the class will usually be suffixed with the word `Controller`. Eg: `HomeController` or `ProductsController`

* The __public methods__ of a Controller class is referred to as __actions__ - usually corresponds to an action in your application

* Action Verbs can be used to decorate actions - which tells the .NET framework how an action can be accessed.

    ```cs
    [HttpGet]
    public IActionResult Edit()
    {
        return Content("Edit");
    }
    ```

* When an __Action__ finishes its work, it will return a result which implements `IActionResult`, or `Task<IActionResult>` if the actions is asynchronous.

    | Example | Description |
    |-|-|
    | `Content()` | Returns the specified string as plain text to the client |
    | `View()` | Returns a View to the client |
    | `PartialView()` | Returns a Partial View to the client |
    | `File()` | Returns the content of a specified file to the client |
    | `Json()` | Returns a JSON response to the client |
    | `Redirect()` and `RedirectPermanent()` | Returns a redirect response to the browser, redirecting the user to another URL |
    | `StatusCode()` | Returns a custom status code to the client |
    | `NotFound()` | Returns a Not Found page to the client |


<br>

---

# 5 - WIP