
using Microsoft.EntityFrameworkCore;

namespace BookListMVC.Models;




public class ApplicationDbContext: DbContext
{
    public DbSet<Book> Books { get; set;}


    // Constructor required for ASP.NET dependency injection. We have to call the base constructor with options passed
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

}
