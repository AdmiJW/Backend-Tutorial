
using System.ComponentModel.DataAnnotations;

namespace ASPIdentity.ViewModels;



public class RegisterViewModel
{
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Compare(nameof(Password), ErrorMessage = "Password and Confirm password does not match!")]
    [Display(Name = "Confirm Password")]
    public string ConfirmPassword { get; set; }
}
