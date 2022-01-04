
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BookListRazor.Models;
using Microsoft.EntityFrameworkCore;

namespace BookListRazor.Pages.BookList;


public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _db;
    public IEnumerable<Book> Books { get; set; }
    


    // Constructor. Retrieve DbContext from Dependency Injection (Services)
    public IndexModel(ApplicationDbContext db)
    {
        _db = db;
    }


    // When this page is GETed, it retrieves the list of books
    // from the database and make it accessible in Razor page
    public async Task OnGet()
    {
        Books = await _db.Book.ToListAsync();
    }



    public async Task<IActionResult> OnPostDelete(int id)
    {
        var book = await _db.Book.FindAsync(id);

        if (book == null) return NotFound();

        _db.Book.Remove(book);
        await _db.SaveChangesAsync();

        return RedirectToPage("Index");
    }
}
