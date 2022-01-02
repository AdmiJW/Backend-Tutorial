
using EntityFramework_GetStarted.Models;
using Microsoft.EntityFrameworkCore;

namespace EntityFramework_GetStarted;



class Program
{
    public static void Main(string[] args)
    {
        using (SchoolDbContext context = new SchoolDbContext()) 
        {
            // Create
            InsertData(context);
            // Read
            SearchStudent(context, "AdmiJW");
        }
    }





    //==================================
    // Example of CRUD Operations
    //==================================

    // This function appends 2 rows in the 3 tables
    private static void InsertData(SchoolDbContext context)
    {
        Course course = new Course { CourseName = "Science", CourseCode = "SC001" };
        Course course2 = new Course { CourseName = "Math" };

        Grade grade = new Grade { GradeName = "Freshman", Section = "01" };
        Grade grade2 = new Grade { GradeName = "Sophomore", Section = "02" };

        Student stud1 = new Student
        {
            Name = "AdmiJW",
            Grade = grade,
            Height = 178,
            Weight = 65,
            DateOfBirth = new DateTime(2001, 4, 26),
            Courses = new List<Course>{ course, course2 },
            Photo = new byte[] { }
        };
        Student stud2 = new Student
        {
            Name = "Bill",
            Grade = grade2,
            Height = 165,
            Weight = 89,
            DateOfBirth = new DateTime(2000, 7, 12),
            Courses = new List<Course>{ course, course2 },
            Photo = new byte[] { }
        };

        context.Grades.Add(grade);
        context.Grades.Add(grade2);
        context.Courses.Add(course);
        context.Courses.Add(course2);
        context.Students.Add(stud1);
        context.Students.Add(stud2);

        context.SaveChanges();
    }



    // Searches a student provided by name
    private static void SearchStudent(SchoolDbContext context, String name)
    {
        Student? stud = context.Students
            .Where(s => s.Name == name)
            .Include(s => s.Grade)
            .Include(s => s.Courses)
            .FirstOrDefault();

        Console.WriteLine(stud?.ToString() ?? "No results found!");
    }
}