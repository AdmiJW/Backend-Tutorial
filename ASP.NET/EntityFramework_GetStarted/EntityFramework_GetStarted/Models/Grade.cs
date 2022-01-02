
using System.ComponentModel.DataAnnotations;


namespace EntityFramework_GetStarted.Models;


public class Grade
{
    [Key]
    public int GradeId { get; set; }
    

    // Scalar Properties
    public string GradeName { get; set; }
    public string Section { get; set; }


    // Navigation Properties
    public ICollection<Student> Students { get; set; }




    public override string ToString()
    {
        return "  {\n" +
            $"    GradeName: {GradeName}\n" +
            $"    Section: {Section}\n  }}";
    }

}