using Microsoft.EntityFrameworkCore;


namespace BookListRazor.Models;


// To use Entity Framework, a context class that inherits from DbContext class must be created.
// The context class represents the session/connection we have with the actual database. We perform
// CRUD operations through this context class.
//
// Inside the context class, we would have several DbSet<TEntity> that represents entities that we want to
// include in our system. They will be mapped to an actual table inside the database
//
// In ASP.NET, we must have a constructor, because the base class constructor must be called for dependency
// injection purpose


public class ApplicationDbContext: DbContext
{

    // Constructor - Required for Dependency Injection
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) {}


    // Entities
    public DbSet<Book> Book { get; set; }
}
