
using Microsoft.EntityFrameworkCore;

namespace EntityFramework_GetStarted.Models;


public class SchoolDbContext: DbContext
{
    // Entities
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Grade> Grades { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=LAPTOP-R22GTED8;Database=SchoolDB;Trusted_Connection=True;");
    }
}