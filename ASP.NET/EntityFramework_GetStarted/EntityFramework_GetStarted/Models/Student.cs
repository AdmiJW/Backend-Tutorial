
using System.ComponentModel.DataAnnotations;

namespace EntityFramework_GetStarted.Models;

   
public class Student
{
    [Key]
    public int StudentId { get; set; }

    // Scalar Properties
    public string Name { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public byte[] Photo { get; set; }
    public decimal Height { get; set; }
    public float Weight { get; set; }


    // Navigation Properties
    public Grade Grade { get; set; }
    public ICollection<Course> Courses { get; set; } 




    public override string ToString()
    {
        return "Student {\n" +
            $"  Name: {Name}\n" +
            $"  Date of Birth: {DateOfBirth.ToString() ?? "None"}\n" +
            $"  Height: {Height}\n" +
            $"  Weight: {Weight}\n" +
            $"  Number of Courses: {Courses.Count}\n" +
            $"  Grade: {Grade}\n}}\n";
    }
}