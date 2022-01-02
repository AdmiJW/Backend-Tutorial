# Hello World with ASP.NET

A simple hello world webpage from the microsoft documentation - [__HERE__](https://dotnet.microsoft.com/en-us/learn/aspnet/hello-world-tutorial/intro)

---

## 1 - Checking Installation

In the terminal, run 

```
dotnet
```

You will see outputs. If it gives an error saying the command is not recognized, you need to install .NET.

```bash
dotnet --version            # 6.0.101 for me
dotnet --list-sdks          # I got ver 6 and ver 5
```

---

## 2 - Setup

In the terminal, run

```
dotnet new webapp -o MyWebApp --no-https
```

The `dotnet new webapp` indicates to create a new web application using .NET framework. `-o MyWebApp` is the output directory, which you can change the name from `MyWebApp` to anything you desire. `--no-https` means to not enable HTTPS.

---

## 3 - Ready

In the project directory (`MyWebApp`), run

```
dotnet watch run
```

.NET will start the server and your browser will show up with the default webpage you have. You may proceed to `Pages/Index.cshtml` to change some HTML, like

<br>

`Index.cshtml`:
```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-center">
    <h1 class="display-4">Hello World</h1>
    <p>The time on the server is @DateTime.Now</p>
</div>
```