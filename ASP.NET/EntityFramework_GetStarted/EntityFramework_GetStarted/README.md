# Entity Framework - Getting Started

[__Recommended Reference__](https://www.entityframeworktutorial.net/)

[__Project Guide__](https://www.entityframeworktutorial.net/efcore/entity-framework-core-console-application.aspx)

<br>

---

## 1. Introduction 👀

When creating .NET applications (Like the backend for a web application using ASP.NET), we have to somehow interact with the database (It is common to use Microsoft SQL Server with .NET). Entity Framework (EF) is an open-source ORM from Microsoft that make things easier: We might not even have to write SQL statements ourselves: The EF API will handle the translation work for us. We just have to focus on our backend code on realizing our goal!

<br>

Cited from the reference website:

> Entity Framework is an open-source ORM (Object-Relational Mapper) framework for .NET applications supported by Microsoft. It enables developers to work with data using objects of domain specific classes without focusing on the underlying database tables and columns where this data is stored. With the Entity Framework, developers can work at a higher level of abstraction when they deal with data, and can create and maintain data-oriented applications with less code compared with traditional applications.

Official definition:

> Entity Framework is an object-relational mapper (O/RM) that enables .NET developers to work with a database using .NET objects. It eliminates the need for most of the data-access code that developers usually need to write.

---
<br>

## 2. A lil bit of Theory 🧠

[__Main Reference__](https://www.entityframeworktutorial.net/what-is-entityframework.aspx)

The main job of Entity Framework is to:
* Map domain (entity) classes to the database schema.
* Translate & execute LINQ queries to SQL
* Track changes occurred on entities during their lifetime, and save changes to the database.

<br>

### Entity Data Model

The first task of Entity Framework was to construct a Entity Data Model, which consists of 3 main elements:

| Element | Description |
|-|-|
| __Conceptual Model__ | The conceptual model contains the model classes and their relationships. This will be independent from your database table design. |
| __Storage Model__ | The storage model is the database design model which includes tables, views, stored procedures, and their relationships and keys. |
| __Mappings__ | Mapping consists of information about how the conceptual model is mapped to the storage model. |

The Entity Data Model, along with other EF APIs, ensure the working of the framework. For example, EF API is responsible for converting LINQ-to-Entities queries into pure SQL statements that is executed on the database.

<br>

### __Context Class__

To use Entity Framework, we must create a context class (That inherits `System.Data.Entity.DbContextDbContext`). It represents a session and acts as the middleman with the underlying database which you can perform CRUD (Create, Read, Update, Delete) operations.

<br>

### __Entity Class__

An __Entity__ in Entity Framework is a class that maps to a database table. For example, if I create an entity class `Student`, then there will be a `Student` table in the database as well.

Entities can have two types of properties (Attributes):
1. __Scalar Property__ : Primitive type properties. Each scalar property maps to a column in the database table which stores an actual data.

1. __Navigation property__: Property of another entity. Further breaks down to two types: A) __Reference Navigation Property__ (Multiplicity of 1), and B) __Collection Navigation Property__ (Multiplicity of N). 

<br>

EF API maintains the state of each entity during its lifetime. Each entity has a state based on the operation performed on it via the context class. The entity state represented by an enum `System.Data.Entity.EntityState` in EF 6 and `Microsoft.EntityFrameworkCore.EntityState` in EF Core with the following values:

1. `Added`
1. `Modified`
1. `Deleted`
1. `Unchanged`
1. `Detached`

---
<br>

## 2. Installing Dependencies.

Entity Framework requires the core package `EntityFramework.dll`, as well as the __EF Core DB Provider__ (For specific database systems) and __EF Core Tools__ (For migration process in CLI)

Open up the NuGet package manager and search for
__`Microsoft.EntityFrameworkCore`__
__`Microsoft.EntityFrameworkCore.SqlServer`__ (If you are using SQL Server, otherwise find the respective database system) and finally, __`Microsoft.EntityFrameworkCore.Tools`__ for executing EF Core commands in the Package Manager Console (PMC) in Visual Studio (for migration process).

---
<br>

## 3. Creating Models

Since we are taking __Code-first approach__ (which is also targetted by EF Core), we will create our model/entity classes first. Eg:

```cs
using System.ComponentModel.DataAnnotations;
namespace EntityFramework_GetStarted.Models;

// Represents a Student entity in our system / database
public class Student
{
    [Key]
    public int StudentId { get; set; }

    [Required]
    public string Name { get; set; }

    public int? Age { get; set; }
}
```

More detail on configurations and annotations can be found [__HERE__](https://www.entityframeworktutorial.net/efcore/configuration-in-entity-framework-core.aspx)

---
<br>

## 4. Creating a Context class

A context class represents our connection to the actual database. We'll use the context for CRUD operations.

The context class must inherit from `DbContext` inside `Microsoft.EntityFrameworkCore`. Then, it will have `DbSet<TEntity>` properties, each representing an entity like `Student` entity mentioned earlier.

For example:

```cs
using Microsoft.EntityFrameworkCore;
namespace EntityFramework_GetStarted.Models;


public class SchoolDbContext: DbContext
{
    // Entities that is going to become a table in our database
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }



    // Constructor
    public SchoolDbContext() {}

    // Allows us to select and configure the data source to be used with a context using DbContextOptionsBuilder
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=LAPTOP-R22GTED8;Database=SchoolDB;Trusted_Connection=True;");
    }

    // Allows us to configure the model using ModelBuilder Fluent API.
    protected override void OnModelCreating(ModelBuilder modelBuilder) {}
}
```

---
<br>

## 5. Migration

To "migrate" is to generate the scripts that will create the database, tables and columns corresponding to the model classes into our database. In this example ,migrating will:

1. Create a `SchoolDB` database in the SQL Server (As provided in connection string)
   
2. Create `Students` and `Courses` table in the `SchoolDB` database

3. Add corresponding columns within each table, like `StudentId`, `Name` and `Age` in the `Students` table. It will automatically apply constraints according to the data type and annotations (if any). Eg: `[Key]` ==> Primary key. `string?` ==> Nullable


Start by opening NuGet Package Manager Console and run

```
add-migration <MigrationName>
```

It will generate the scripts for the current migration checkpoint into a `Migration` folder. To apply the migration into the SQL Server, run

```
update-database [-verbose]
```

* If you make changes to the model classes and run another migration, it will determine the best SQL statements based on your past migrations. Eg: If you simply add a new property in `Student` model, the result migration will only involve `ALTER TABLE ADD COLUMN` like that.