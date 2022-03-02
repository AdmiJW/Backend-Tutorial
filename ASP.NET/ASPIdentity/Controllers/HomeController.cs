
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

using ASPIdentity.ViewModels;
using ASPIdentity.Models;

namespace ASPIdentity.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;


        // In order to correctly implement Identity, you must use dependency injection to retrieve the 
        // UserManager<IdentityUser> and SignInManager<IdentityUser>
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;


        // Constructor, use for Dependency Injection of UserManager and SignInManager
        public HomeController(
            ILogger<HomeController> logger, 
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager
        ) {
            _logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }


        // By adding a [Authorize] annotation, this route is restricted to those who had logged in only
        // Those who aren't, will be redirected to the loginPath, configured in Program.cs
        [Authorize]
        public async Task<IActionResult> Index()
        {
            var user = await userManager.GetUserAsync(User);
            
            return View(user);
        }


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



        public async Task<IActionResult> LogOut()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Login");
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}