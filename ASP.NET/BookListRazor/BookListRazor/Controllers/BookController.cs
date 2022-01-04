using Microsoft.AspNetCore.Mvc;
using BookListRazor.Models;

namespace BookListRazor.Controllers;


// This is an example of implementing an API endpoint with Controllers in ASP.NET
// 
// We use annotations to specify the route and that this controller is an API controller.
// Like other pages, the DbContext will be provided through dependency injection managed by ASP.NET
//
// Each controller handles a route. A route (endpoint) can be accessed via multiple HTTP methods (GET,POST,DELETE....)
// Therefore, use annotations again to specify the actions that we are handling, like [HttpGet] and [HttpPost]




[Route("api/Book")]
[ApiController]
public class BookController : Controller
{
    private readonly ApplicationDbContext _db;

    public BookController(ApplicationDbContext db)
    {
        _db = db;
    }

    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Json(new {
            data = _db.Book.ToList()
        });
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var bookFromDb = _db.Book.FirstOrDefault(u => u.Id == id);

        if (bookFromDb == null)
            return Json(new {
                success = false, message = "Error while Deleting"
            });

        _db.Book.Remove(bookFromDb);

        await _db.SaveChangesAsync();
        return Json(new {
            success = true,
            message = "Delete Successful"
        });
    }
}
