<script src='./Scripts/remove_anchor.js'></script>


<!DOCTYPE html>
<html lang='en'>
<head>
    <title>PHP Cheat Sheet 1</title>
    <meta charset='UTF-8'/>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
    <meta name='author' content='AdmiJW'/>
    <meta name='description' content='php cheat sheet part 1'/>
    <meta name='keywords' content='php'/>

    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

    <!-- Styles -->
    <link rel='stylesheet' type='text/css' href='./Styles/style.css'/> 

</head>

<body>
    
    <!-- JUMBOTRON -->
    <div class='jumbotron d-flex flex-column align-items-center justify-content-around' id='jumbotron'>
        <div class='jumbotron__textdiv text-center p-5'>
            <h1 class='display-2'>PHP Cheat Sheet</h1>
            <h3 class='display-4'>Pt 2: Object Oriented PHP</h3>
            <p class='lead'>Made by AdmiJW</p>
        </div>

        <div class='card w-50 text-center' style='height: 30%'>
            <h4 class='lead text-center text-dark'><strong>Table of Contents</strong></h4>
            <div class='card m-2 bg-light overflow-auto'>
                <ul class='list-unstyled'>
                    <li><a class='btn btn-link' href='#t1-oop'>Topic 1 - Object Oriented Programming</a></li>
                    <li><a class='btn btn-link' href='#t2-constructor_destructor'>Topic 2 - Constructor and Destructor </a></li>
                    <li><a class='btn btn-link' href='#t3-magic_get_set'>Topic 3 - Magical Setters, Getters and toString  </a></li>
                    <li><a class='btn btn-link' href='#t4-inheritance'>Topic 4 - Inheritance </a></li>
                    <li><a class='btn btn-link' href='#t5-polymorphism'>Topic 5 - Polymorphism </a></li>
                </ul>
            </div>
        </div>
        
    </div>

<div class='container'>
    
    <!------------------------------------------->
    <!-- Topic 1 - Object Oriented Programming -->
    <!-------------------------------------------->
    <div class='card topic py-3 px-2 my-5' id='t1-oop'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Object Oriented Programming in PHP</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        Object oriented programming in PHP is easily done by classes. Use the keyword <code>class</code>
                        to start right away, like so: <br>
                        <code class='ml-5'>class MyClass { ... }</code>
                    </li>
                    <li>
                        An object can be instantiated using <code>new</code> keyword, as such: <br>
                        <code class='ml-5'>$instance = new MyClass();</code>
                    </li>
                    <li>
                        To declare object attributes inside classes, we must use one of the following before the variable
                        name itself:
                        <ul>
                            <li><code>var</code> - Same as <code>public</code>, deprecated</li>
                            <li><code>public</code> - Class or instance property is accessible everywhere</li>
                            <li><code>protected</code> - Same as <code>private</code>, but is accessible in derived classes</li>
                            <li><code>private</code> - Only accessible inside of the class.</li>
                        </ul>
                    </li>
                    <li>
                        To access the properties of an object, we'll use the arrow operator <code>-></code> instead of commonly 
                        used dot operator <code>.</code>. Also, <strong>After the -> operator, the <code>$</code> is no longer needed</strong>
                    </li>
                    <li>
                        A class member can be declared <code>static</code> so it is fixed to the class itself and not the instances.
                        To access a static property, use the scope operator <code>::</code>, like so: <br>
                        <code class='ml-5'>MyClass::$myprop; </code><br>
                        Note that once declared <code>static</code>, it cannot be access through object instances.
                    </li>
                    <li>
                        Similarly, a class method can also be declared <code>static</code>. These kind of method should generally serve
                        as utility functions and does not involve accessing instance's attributes (Unless passed in otherwise)
                    </li>
                    <li>
                        A property can be declared <code>const</code> to make it a constant and value unchangable. For constants,
                        we don't need to put the <code>$</code> prefix as it is for variables. 
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            //  Basic Class definition
            class SampleClass {
                var $defaultVar = "This is default";
                public $publicVar = "This is public";
                protected $protectedVar = "This is protected";
                private $privateVar = "This is private";

                const PI = 3.1415;

                public static $instanceCount = 0;

                public static function sum(...$n) {
                    return array_reduce($n, function($x,$y) {return $x+$y;}, 0);
                }
            }


            //  Instantiating Objects
            $instance1 = new SampleClass();
            $instance2 = new SampleClass();


            //  Accessing Object Properties
            echo $instance1->defaultVar;
            echo $instance1->publicVar;
            try {
                echo $instance1->protectedVar;
            } catch (Error $e) {
                echo "Protected properties are not accessible";
            }
            try {
                echo $instance1->privateVar;
            } catch (Error $e) {
                echo "Private properties are not accessible";
            }


            //  Static Class Properties demonstration
            echo SampleClass::$instanceCount;


            //  Static Method Demonstration
            echo SampleClass::sum(1,2,3,4,5);


            //  Constant Demonstration
            echo $instance1::PI;
            echo SampleClass::PI;
        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_1'>
            <div class='card bg-warning text-center col-6'>Input</div>
            <div class='card bg-success text-center text-white col-6'>Output</div>
        </div>
        <div class='flex-row w-100 card shadow-sm bg-light row mb-2 mx-auto topic__io'>
            <!-- INPUT -->
            <div class='card bg-light topic__io__in col-6'>
            </div>
            <!-- OUTPUT -->
            <div class='card bg-light topic__io__out col-6'>
                <?php 

                    if( isset($_GET['run_1'] ) ) {
                        
                        //  Basic Class definition
                        class SampleClass {
                            var $defaultVar = "This is default <br>";
                            public $publicVar = "This is public <br>";
                            protected $protectedVar = "This is protected <br>";
                            private $privateVar = "This is private <br>";

                            const PI = 3.1415;

                            public static $instanceCount = 0;

                            public static function sum(...$n) {
                                return array_reduce($n, function($x,$y) {return $x+$y;}, 0);
                            }
                        }


                        //  Instantiating Objects
                        $instance1 = new SampleClass();
                        $instance2 = new SampleClass();


                        //  Accessing Object Properties
                        echo $instance1->defaultVar;
                        echo $instance1->publicVar;
                        try {
                            echo $instance1->protectedVar;
                        } catch (Error $e) {
                            echo "<strong>Protected properties are not accessible</strong>";
                        }
                        try {
                            echo $instance1->privateVar;
                        } catch (Error $e) {
                            echo "<strong>Private properties are not accessible</strong>";
                        }


                        //  Static Class Properties demonstration
                        echo SampleClass::$instanceCount . "<br>";


                        //  Static Method Demonstration
                        echo SampleClass::sum(1,2,3,4,5) . "<br>";


                        //  Constant Demonstration
                        echo $instance1::PI . "<br>";
                        echo SampleClass::PI . "<br>";

                        
                        echo "<script>document.getElementById('run_1').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet2.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_1'>Run Code</button>
        </form>
    </div>




    <!------------------------------------------>
    <!-- Topic 2 - Constructor and Destructor -->
    <!------------------------------------------>
    <div class='card topic py-3 px-2 my-5' id='t2-constructor_destructor'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Constructor and Destructor</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        When an instance of a class is created, the <strong>constructor</strong> of the class
                        will be called. 
                    </li>
                    <li>
                        The construtor is defined using the following syntax: <br>
                        <code class='ml-5'>function __construct($params...) { ... }</code>
                    </li>
                    <li>
                        To refer to the instance itself, use the keyword <code>$this->prop</code>. This is useful
                        when instantiating properties using constructor, or cleaning using destructor
                    </li>
                    <li>
                        Similarly, when the class instance should be destroyed (By using <code>unset( var )</code>,
                        hit the end of scope or script ends <strong>at the end of .php file</strong>), 
                        the <strong>destructor</strong> of the instance will be called. 
                    </li>
                    <li>
                        The destructor is defined using the following syntax <strong>(No Parameters!)</strong>: <br>
                        <code class='ml-5'>function __destruct() { ... } </code>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            class Student {
                public $name;
                public $grade;

                function __construct($name, $grade) {
                    $this->name = $name;
                    $this->grade = $grade;

                    echo "$name of grade $grade is born!";
                }

                function __destruct() {
                    echo "$this->name of grade $this->grade is gone forever";
                }

                public static function introduce(Student $stud) {
                    echo "Hi everyone, I am $stud->name of grade $stud->grade";
                }
            }



            $stud1 = new Student("Adam", 5);
            Student::introduce( $stud1 );
            unset( $stud1 );        //  Ecplicitly destructing a variable using unset()


            //  Enclosing scope. To show that student will be destructed upon hit the end of scope
            (function() {
                $stud2 = new Student("Bob", 1);
                Student::introduce($stud2);
            })();
        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_2'>
            <div class='card bg-warning text-center col-6'>Input</div>
            <div class='card bg-success text-center text-white col-6'>Output</div>
        </div>
        <div class='flex-row w-100 card shadow-sm bg-light row mb-2 mx-auto topic__io'>
            <!-- INPUT -->
            <div class='card bg-light topic__io__in col-6'>
            </div>
            <!-- OUTPUT -->
            <div class='card bg-light topic__io__out col-6'>
                <?php 
                    if (isset($_GET['run_2']) ) {
                        class Student {
                            public $name;
                            public $grade;
    
                            function __construct($name, $grade) {
                                $this->name = $name;
                                $this->grade = $grade;
    
                                echo "$name of grade $grade is born! <br>";
                            }
    
                            function __destruct() {
                                echo "$this->name of grade $this->grade is gone forever <br>";
                            }
    
                            public static function introduce(Student $stud) {
                                echo "Hi everyone, I am $stud->name of grade $stud->grade <br>";
                            }
                        }

                        $stud1 = new Student("Adam", 5);
                        Student::introduce( $stud1 );
                        unset( $stud1 );        //  Ecplicitly destructing a variable using unset()

                        echo "<br>";

                        //  Enclosing scope. To show that student will be destructed upon hit the end of scope
                        (function() {
                            $stud2 = new Student("Bob", 1);
                            Student::introduce($stud2);
                        })();

                        
                        echo "<script>document.getElementById('run_2').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet2.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_2'>Run Code</button>
        </form>
    </div>
     


    <!----------------------------------------->
    <!-- Topic 3 - Magic Getter And Setters -->
    <!----------------------------------------->
    <div class='card topic py-3 px-2 my-5' id='t3-magic_get_set'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Magic Getter & Setter, and toString</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        <strong>Getters</strong> and <strong>Setters</strong> is a concept of encapsulation
                        in OOP where attributes of an instance is obtained through methods, not directly from 
                        instance itself.
                    </li>
                    <li>
                        Imagine an instance having many <strong>private</strong> attributes. Do we have to write all
                        those getters and setters?
                    </li>
                    <li>
                        In PHP, we have what is called <strong>magic getter and setters</strong>. In a single function,
                        we can write out the getter or setter code (not both) all in one place. It is called automatically when
                        <strong>protected or private</strong> attributes are accessed directly from the instance itself.
                    </li>
                    <li>
                        The syntax for such function is: <br>
                        <code class='ml-5'>function __get( $var_name ) { ... return $this->$var_name; }</code><br>
                        <code class='ml-5'>function __set( $var_name, $new_value ) { ... $this->$var_name = $new_value; }</code>
                    </li>
                    <li>
                        There is also a useful magic function <code>__toString</code>. The <code>__toString</code> allow
                        us to return a useful, human readable string representation of the instance itself whenever
                        a string is required from the instance, like in <code>echo</code>.
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            class Account {
                private $username;
                private $balance;

                function __construct($username, $val) { 
                    $this->username = $username;
                    $this->balance = $val;
                }

                function __get($name) {
                    switch($name) {
                        case "username":
                            echo "Logged. Access: $name, value: $this->username";
                            return $this->username;
                        case "balance":
                            echo "Logged. Access: $name, value: $this->balance";
                            return $this->balance;
                    }
                }

                function __set($name, $val) {
                    switch($name) {
                        case "username":
                            echo "Logged. Modified: $name, value: $this->username, new: $val";
                            $this->username = $val;
                            break;
                        case "balance":
                            echo "Logged. Modified: $name, value: $this->balance, new: $val";
                            $this->balance = $val;
                            break;
                    }
                }

                function __toString() {
                    return "===============&lt;br&gt;ACCOUNT SUMMARY&lt;br&gt;================&lt;br&gt;"
                    . "Username: $this->username&lt;br&gt;"
                    . "Balance: $this->balance&lt;br&gt;";
                }
            }




            $account1 = new Account("John", 500);
            $account1->username;
            $account1->username = "Daniel";
            $account1->balance;
            $account1->balance = 400;

            echo $account1;
        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_3'>
            <div class='card bg-warning text-center col-6'>Input</div>
            <div class='card bg-success text-center text-white col-6'>Output</div>
        </div>
        <div class='flex-row w-100 card shadow-sm bg-light row mb-2 mx-auto topic__io'>
            <!-- INPUT -->
            <div class='card bg-light topic__io__in col-6'>
            </div>
            <!-- OUTPUT -->
            <div class='card bg-light topic__io__out col-6'>
                <?php 
                    if( isset($_GET['run_3'] ) ) {
                        class Account {
                            private $username;
                            private $balance;

                            function __construct($username, $val) { 
                                $this->username = $username;
                                $this->balance = $val;
                            }

                            function __get($name) {
                                switch($name) {
                                    case "username":
                                        echo "Logged. Access: $name, value: $this->username<br>";
                                        return $this->username;
                                    case "balance":
                                        echo "Logged. Access: $name, value: $this->balance<br>";
                                        return $this->balance;
                                }
                            }
                            function __set($name, $val) {
                                switch($name) {
                                    case "username":
                                        echo "Logged. Modified: $name, value: $this->username, new: $val<br>";
                                        $this->username = $val;
                                        break;
                                    case "balance":
                                        echo "Logged. Modified: $name, value: $this->balance, new: $val<br>";
                                        $this->balance = $val;
                                        break;
                                }
                            }

                            function __toString() {
                                return "===============<br>ACCOUNT SUMMARY<br>===============<br>"
                                . "Username:    $this->username<br>"
                                . "Balance:     $this->balance<br>";
                            }
                        }

                        $account1 = new Account("John", 500);
                        $account1->username;
                        $account1->username = "Daniel";
                        $account1->balance;
                        $account1->balance = 400;

                        echo $account1;

                        echo "<script>document.getElementById('run_3').scrollIntoView(true);</script>";
                    }
                ?>
                
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet2.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_3'>Run Code</button>
        </form>
    </div>



     <!---------------------------->
    <!-- Topic 4 - Inheritance -->
    <!---------------------------->
    <div class='card topic py-3 px-2 my-5' id='t4-inheritance'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Inheritance</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        <strong>Inheritance</strong> plays a huge role in OOP. It allows us to define a base
                        class and have derived classes that has everything the parent class has, in addition
                        to having its own specialities.
                    </li>
                    <li>
                        Similar to Java, it is done by the <code>extends</code> keyword. Note that <strong>
                        multiple inheritances</strong> are not allowed in PHP. See example:<br>
                        <code class='ml-5'>class Derived extends Base { ... }</code>
                    </li>
                    <li>
                        A class can be made to be unable to instantiate. These classes are called <strong>Abstract
                        Classes</strong>. This is done via <code>abstract</code> keyword. These classes purely exist
                        to be inherited only.
                    </li>
                    <li>
                        To make up for no multiple inheritances, <strong>Interfaces</strong> are
                        made available in PHP. Interfaces are kind of abstract classes where attributes and
                        methods are not defined, only declared.
                    </li>
                    <li>
                        <strong>All attributes and methods must be defined in the derived class</strong> that
                        <code>implements</code> the interface.
                    </li>
                    <li>
                        One such use of Interfaces and Base Classes is that it can be used as type declaration
                        for instances. This leads us to next topic: <strong>Polymorphism</strong>
                    </li>
                    <li>
                        Note that constructors are inherited <strong>unless the child class also has a constructor
                        defined</strong>. In that case to use the parent class' constructor it must be called explicitly: <br>
                        <code class='ml-5'>parent::__construct( param )</code>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            //  Interface
            interface Talkable {
                function talk();
            }


            //  Abstract class
            abstract class People {
                protected $name;
                protected $age;

                function __construct($name, $age) {
                    $this->name = $name;
                    $this->age = $age;
                }
            }


            //  Derived class
            class Student extends People implements Talkable {
                private $grade;

                function __construct($name, $age, $grade) {
                    parent::__construct($name, $age);
                    $this->grade = $grade;
                }

                function talk() {
                    echo "Hi, I am $this->name from grade $this->grade. I am currently age $this->age <br>";
                }
            }


            //  A function that takes in a Talkable instance
            function makeTalk( Talkable $talker ) {
                $talker->talk();
            }


            $student1 = new Student("Adam", 15, 5);
            makeTalk($student1);
        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_4'>
            <div class='card bg-warning text-center col-6'>Input</div>
            <div class='card bg-success text-center text-white col-6'>Output</div>
        </div>
        <div class='flex-row w-100 card shadow-sm bg-light row mb-2 mx-auto topic__io'>
            <!-- INPUT -->
            <div class='card bg-light topic__io__in col-6'>
            </div>
            <!-- OUTPUT -->
            <div class='card bg-light topic__io__out col-6'>
                <?php 
                    //  Interface
                    interface Talkable {
                        function talk();
                    }


                    //  Abstract class
                    abstract class People {
                        protected $name;
                        protected $age;

                        function __construct($name, $age) {
                            $this->name = $name;
                            $this->age = $age;
                        }
                    }


                    //  Derived class
                    class Student extends People implements Talkable {
                        private $grade;

                        function __construct($name, $age, $grade) {
                            parent::__construct($name, $age);
                            $this->grade = $grade;
                        }

                        function talk() {
                            echo "Hi, I am $this->name from grade $this->grade. I am currently age $this->age <br>";
                        }
                    }


                    //  A function that takes in a Talkable instance
                    function makeTalk( Talkable $talker ) {
                        $talker->talk();
                    }


                    $student1 = new Student("Adam", 15, 5);
                    makeTalk($student1);


                    echo "<script>document.getElementById('run_4').scrollIntoView(true);</script>";
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet2.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_4'>Run Code</button>
        </form>
    </div>




     <!---------------------------->
    <!-- Topic 5 - Polymorphism -->
    <!---------------------------->
    <div class='card topic py-3 px-2 my-5' id='t5-polymorphism'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Polymorphism</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        <strong>Polymorphism</strong> is the ability of an object to take on many forms. The most
                        common use case is when the parent class reference is used to refer to a child class object.
                    </li>
                    <li>
                        This allows for better readibility and shorter code. For example, by having an array of objects
                        that is derived from the same base class or interface, since we know that every instance must
                        have certain common properties, we can use a loop to execute the functions all at once without
                        having to categorize them
                    </li>
                    <li>
                        <strong>Overriding</strong> means to overwrite the function that is already defined in the base
                        class, so that instances of this class have <strong>different behavior for same function</strong>.
                    </li>
                    <li>
                        <strong>Overriding</strong> is done by defining again the same function header in derived class, but
                        apply different implementations for it.
                    </li>
                    <li>
                        To check whether an object is an instance of a class, simply use <code>instanceof</code> keyword
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            abstract class Enemy {
                protected $name; 
                protected $damage;

                function __construct($name, $damage) {
                    $this->name = $name;
                    $this->damage = $damage;
                }

                function attack() {
                    echo "$this->name dealt $this->damage damage!";
                }
            }


            class Goblin extends Enemy {
                function goblin_skill() {
                    echo "$this->name stole " . rand(10,100) . " golds from you!";
                }
            }


            class Slime extends Enemy {
                function slime_skill() {
                    echo "$this->name poisioned you!";
                }
            }


            //  A function which performs a turn of attack of Enemy object
            function attack_and_skill( Enemy $e) {
                $e->attack();

                if ($e instanceof Goblin ) $e->goblin_skill();
                elseif ($e instanceof Slime ) $e->slime_skill();
            }

            
            $enemies = array( new Goblin("Darwin", 100), new Slime("Rimuru", 666), new Goblin("Tamzid", 50) );
            echo "============&lt;br&gt;Attack Phase&lt;br&gt;============&lt;br&gt;";
            foreach( $enemies as $e ) {
                attack_and_skill($e);
            }
        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_5'>
            <div class='card bg-warning text-center col-6'>Input</div>
            <div class='card bg-success text-center text-white col-6'>Output</div>
        </div>
        <div class='flex-row w-100 card shadow-sm bg-light row mb-2 mx-auto topic__io'>
            <!-- INPUT -->
            <div class='card bg-light topic__io__in col-6'>
            </div>
            <!-- OUTPUT -->
            <div class='card bg-light topic__io__out col-6'>
                <?php
                    if (isset($_GET['run_5']) ) {
                        abstract class Enemy {
                            protected $name; 
                            protected $damage;

                            function __construct($name, $damage) {
                                $this->name = $name;
                                $this->damage = $damage;
                            }

                            function attack() {
                                echo "$this->name dealt $this->damage damage! <br>";
                            }
                        }

                        class Goblin extends Enemy {
                            function goblin_skill() {
                                echo "$this->name stole " . rand(10,100) . " golds from you! <br>";
                            }
                        }

                        class Slime extends Enemy {
                            function slime_skill() {
                                echo "$this->name poisioned you! <br>";
                            }
                        }


                        //  A function which performs a turn of attack of Enemy object
                        function attack_and_skill( Enemy $e) {
                            $e->attack();

                            if ($e instanceof Goblin ) $e->goblin_skill();
                            elseif ($e instanceof Slime ) $e->slime_skill();
                        }

                        
                        $enemies = array( new Goblin("Darwin", 100), new Slime("Rimuru", 666), new Goblin("Tamzid", 50) );
                        echo "============<br>Attack Phase<br>============<br>";
                        foreach( $enemies as $e ) {
                            attack_and_skill($e);
                        }
                        
                        echo "<script>document.getElementById('run_5').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet2.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_5'>Run Code</button>
        </form>
    </div>

</div>

</body>

</html>