
using System.ComponentModel.DataAnnotations;

namespace BookListRazor.Models;



// A Model is basically a "model" of the data that we want to represent in our system.

public class Book
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
    public string ISBN { get; set; }
    public string? Author { get; set; }
}