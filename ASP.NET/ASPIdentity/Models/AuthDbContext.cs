using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ASPIdentity.Models;


// This is the DB Context (Entity Framework) for the Identity package - Used for authentication and authorization.
//
// 1 -  Extends IdentityDbContext (Come from Microsoft.AspNetCore.Identity.EntityFrameworkCore
// 2 -  Provide constructor, which takes in a DbContextOptions (From Microsoft.EntityFrameworkCore).
//      Pass the DbContextOptions to the base class, which is IdentityDbContext
public class AuthDbContext: IdentityDbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> dbContextOptions): base(dbContextOptions)
    {   
    }
}