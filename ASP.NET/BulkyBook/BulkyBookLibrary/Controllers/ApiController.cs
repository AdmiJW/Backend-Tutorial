using Microsoft.AspNetCore.Mvc;
using BulkyBookLibrary.Data;
using BulkyBookLibrary.Models;

namespace BulkyBookLibrary.Controllers;



[ApiController]                     // Specify that this is an API Controller
[Route("[controller]")]             // The route for controller. [controller] will be replaced by controller name
public class ApiController : ControllerBase         // We don't inherit from Controller, because Controller includes view specific implementation
{
    private readonly ApplicationDbContext _db;


    public ApiController(ApplicationDbContext db)
    {
        _db = db;
    }


    [HttpGet("{id}")]
    public ActionResult<Category> GetSingle(int id)
    {
        Category? cat = _db.Categories.Find(id);

        if (cat == null) return NotFound();
        return cat;
    }

    [HttpGet]
    public IEnumerable<Category> Get()
    {
        return _db.Categories.ToList();
    }


    // This POST endpoint expects a Category object inside the body of HTTP request. Like JSON.
    // Eg: { "name": "BookC", "displayOrder": 1 }
    [HttpPost]
    public IActionResult Create(Category category)
    {
        _db.Categories.Add(category);
        _db.SaveChanges();
        return CreatedAtAction(nameof(Create), new { id = category.Id }, category);
    }



    // This PUT endpoint expects a Category object inside the body of HTTP request. Like JSON.
    // Eg: { "id": "1", "name": "BookC", "displayOrder": 1 }
    [HttpPut("{id}")]
    public IActionResult Update(int id, Category cat)
    {
        if (id != cat.Id) return BadRequest();

        Category? categoryInDb = _db.Categories.Find(id);
        if (categoryInDb is null) return NotFound();

        categoryInDb.Name = cat.Name;
        categoryInDb.DisplayOrder = cat.DisplayOrder;
        categoryInDb.CreatedDateTime = cat.CreatedDateTime;

        _db.SaveChanges();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        Category? cat = _db.Categories.Find(id);

        if (cat is null) return NotFound();

        _db.Categories.Remove(cat);
        _db.SaveChanges();
        return NoContent();
    }

}
