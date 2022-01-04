using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BookListRazor.Models;


namespace BookListRazor.Pages.BookList;



public class UpsertModel : PageModel
{
    private ApplicationDbContext _db;

    [BindProperty]
    public Book? Book { get; set; }

    public UpsertModel(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<IActionResult> OnGet(int? id)
    {
        // Case 1 - Insert, without ID provided
        Book = new Book();
        if (id == null) return Page();

        // Case 2 - Update - ID provided
        Book = await _db.Book.FindAsync(id);
        if (Book == null) return NotFound();

        return Page();
    }



    public async Task<IActionResult> OnPost()
    {
        if (ModelState.IsValid)
        {
            // Case 1: Create new book
            if (Book.Id == 0)
                _db.Book.Add(Book);
            // Case 2: Update the book
            else
            {
                _db.Book.Update(Book);
            }
            await _db.SaveChangesAsync();
            return RedirectToPage("Index");
        }
        return RedirectToPage();
    }
}
