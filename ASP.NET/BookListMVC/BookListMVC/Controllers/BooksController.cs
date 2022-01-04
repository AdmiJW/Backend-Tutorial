using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookListMVC.Models;


// In ASP.NET MVC application, routing works as follows:
//
//      <DomainName>/<Controller>/<Action>/<...>
//
// Therefore, this controller is named Books, and we access the endpoints via:
//      /books/
//      /books/upsert
//      /books/index
//
// Use return View() to render the view of the respective page. If you need to pass a model inside, pass
// it through the parameter, like View(Book)




namespace BookListMVC.Controllers;


public class BooksController : Controller
{
    private readonly ApplicationDbContext _db;
    [BindProperty]
    public Book? Book { get; set; }



    public BooksController(ApplicationDbContext db)
    {
        _db = db;
    }



    public IActionResult Index()
    {
        return View();
    }



    public IActionResult Upsert(int? id)
    {
        Book = new Book();
        // Create
        if (id == null) return View(Book);

        // Update
        Book = _db.Books.FirstOrDefault<Book>(u => u.Id == id);
        if (Book == null) return NotFound();
        return View(Book);
    }


    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Upsert()
    {
        if (ModelState.IsValid)
        {
            if (Book.Id == 0)
                _db.Books.Add(Book);
            else
                _db.Books.Update(Book);
            _db.SaveChanges();

            return RedirectToAction("Index");
        }
        return View(Book);
    }



    // #region is simply a preprocessor directive that allows you to collapse the section
    #region API Calls

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Json(new {
           data = await _db.Books.ToListAsync<Book>()
        });
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var bookFromDb = await _db.Books.FirstOrDefaultAsync<Book>(u => u.Id == id);

        if (bookFromDb == null) return Json(new {
            success = false,
            message = "Error while Deleting"
        });

        _db.Books.Remove(bookFromDb);
        await _db.SaveChangesAsync();

        return Json(new {
            success = true,
            message = "Deletion Successful"
        });
    }

    # endregion
}
