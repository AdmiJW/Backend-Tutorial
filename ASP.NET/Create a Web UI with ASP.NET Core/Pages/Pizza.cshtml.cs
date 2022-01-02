using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

using Create_a_Web_UI_with_ASP.Models;
using Create_a_Web_UI_with_ASP.Services;


namespace Create_a_Web_UI_with_ASP.NET_Core.Pages
{
    public class PizzaModel : PageModel
    {
        public List<Pizza> pizzas = new();

        [BindProperty]
        public Pizza NewPizza {get; set;} = new();


        public void OnGet()
        {
            pizzas = PizzaService.GetAll();
        }

        public IActionResult OnPost() {
            if (!ModelState.IsValid) return Page();
            PizzaService.Add(NewPizza);
            return RedirectToAction("Get");
        }

        
        public string GlutenFreeText(Pizza pizza) {
            return pizza.IsGlutenFree
                ? "Gluten Free"
                : "Not Gluten Free";
        }


        public IActionResult OnPostDelete(int id) {
            PizzaService.Delete(id);
            return RedirectToAction("Get");
        }
    }
}
