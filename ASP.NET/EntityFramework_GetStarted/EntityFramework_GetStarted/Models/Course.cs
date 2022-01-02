
using System.ComponentModel.DataAnnotations;

namespace EntityFramework_GetStarted.Models;


public class Course
{
    [Key]
    public int CourseId { get; set; }

    // Scalar Properties
    public string CourseName { get; set; }

    public string? CourseCode { get; set; }


    // Navigation Properties
    public ICollection<Student> Students { get; set; }



    public override string ToString()
    {
        return "{\n" +
            $"  CourseName: {CourseName}\n" +
            $"  CourseCode: {CourseCode}\n}}";
    }
}