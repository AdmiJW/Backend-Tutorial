using Microsoft.AspNetCore.Mvc;
using BulkyBookLibrary.Data;
using BulkyBookLibrary.Models;

namespace BulkyBookLibrary.Controllers;





public class CategoryController : Controller
{
    private readonly ApplicationDbContext _db;

    public CategoryController(ApplicationDbContext db)
    {
        _db = db;
    }



    public IActionResult Index()
    {
        // Retrieve the list of Category from database, and pass into our view.
        IEnumerable<Category> objCategoryList = _db.Categories.ToList();
        return View(objCategoryList);
    }

    public IActionResult Create()
    {
        return View();
    }


    public IActionResult Edit(int? id)
    {
        if (id == null || id == 0) return NotFound();

        Category? categoryFromDb = _db.Categories.Find(id);
        if (categoryFromDb == null) return NotFound();

        return View(categoryFromDb);
    }


    public IActionResult Delete(int? id)
    {
        if (id == null || id == 0) return NotFound();

        Category? categoryFromDb = _db.Categories.Find(id);
        if (categoryFromDb == null) return NotFound();

        return View(categoryFromDb);
    }



    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(Category obj)
    {
        // Custom Validation - Done via ModelState.AddModelError
        if (obj.Name == obj.DisplayOrder.ToString())
        {
            ModelState.AddModelError("CustomError", "The Display order cannot exactly match the Name.");
        }

        if (ModelState.IsValid)
        {
            _db.Categories.Add(obj);
            _db.SaveChanges();
            TempData["success"] = "Category created successfully";
            return RedirectToAction("Index");
        }
        return View(obj);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(Category obj)
    {
        if (obj.Name == obj.DisplayOrder.ToString())
        {
            ModelState.AddModelError("CustomError", "The Display Order cannot exactly match the Name.");
        }

        if (ModelState.IsValid)
        {
            _db.Categories.Update(obj);
            _db.SaveChanges();
            TempData["success"] = "Category updated successfully";
            return RedirectToAction("Index");
        }
        return View(obj);
    }



    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public IActionResult Delete_POST(int? id)
    {
        Category? category = _db.Categories.Find(id);
        if (category == null) return NotFound();

        _db.Categories.Remove(category);
        _db.SaveChanges();
        TempData["success"] = "Category deleted successfully";
        return RedirectToAction("Index");
    }

}
