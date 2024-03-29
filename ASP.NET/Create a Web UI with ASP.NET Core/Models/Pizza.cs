using System.ComponentModel.DataAnnotations;


namespace Create_a_Web_UI_with_ASP.Models;


public enum PizzaSize { 
    Small,
    Medium,
    Large
}


public class Pizza {
    public int Id {get; set;}

    [Required]
    public string? Name {get; set;}
    public PizzaSize Size {get; set;}
    public bool IsGlutenFree {get; set;}

    [Range(0.01, 9999.99)]
    public decimal Price {get; set;}
}
