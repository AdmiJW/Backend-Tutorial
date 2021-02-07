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
            <h3 class='display-4'>Pt 1: The Basics</h3>
            <p class='lead'>Made by AdmiJW</p>
        </div>

        <div class='card w-50 text-center' style='height: 30%'>
            <h4 class='lead text-center text-dark'><strong>Table of Contents</strong></h4>
            <div class='card m-2 bg-light overflow-auto'>
                <ul class='list-unstyled'>
                    <li><a href='#t1-intro' class='btn btn-link'>Topic 1 - Introduction</a></li>
                    <li><a href='#t2-hello_php' class='btn btn-link'>Topic 2 - Hello, PHP!</a></li>
                    <li><a href='#t3-var_and_datatypes' class='btn btn-link'>Topic 3 - Variables and Datatypes</a></li>
                    <li><a href='#t4-working_with_data' class='btn btn-link'>Topic 4 - Working with String and Numbers</a></li>
                    <li><a href='#t5-arrays_asso_arrays_uses' class='btn btn-link'>Topic 5 - Arrays, Associative Arrays and Uses</a></li>
                    <li><a href='#t6-user_input_by_form' class='btn btn-link'>Topic 6 - User Input using Forms</a></li>
                    <li><a href='#t7-control_struct' class='btn btn-link'>Topic 7 - More on Control Structures</a></li>
                    <li><a href='#t8-functions' class='btn btn-link'>Topic 8 - Functions</a></li>
                </ul>
            </div>
        </div>
        
    </div>

<div class='container'>
    
    <!---------------------------->
    <!-- Topic 1 - Introduction -->
    <!---------------------------->
    <div class='card topic py-3 px-2 my-5' id='t1-intro'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Introduction to PHP</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        <strong>PHP</strong>, stands for PHP: Hypertext Preprocessor, is a
                        popular general-purpose server-side scripting language. 
                    </li>
                    <li>
                        Essentially, it pre-processes the HTML document before sending it to the client,
                        therefore giving the ability to create dynamic and interactive websites.
                    </li>
                    <li>
                        Since it is a HTML pre-processor, the php source code file (.php) can be written like a normal
                        HTML document, except that it can include php code in it. 
                    </li>
                </ul>
            </p>
        </div>

    </div>


    <!---------------------------->
    <!-- Topic 2 - Hello, PHP! -->
    <!---------------------------->
    <div class='card topic py-3 px-2 my-5' id='t2-hello_php'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Hello, PHP!</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        Php language is used in source file with <code>.php</code> file
                        extension.
                    </li>
                    <li>
                        By default, we can't immediately start coding in php right away,
                        because remember that it is a HTML pre-processor. Anything typed
                        is still interpreted as HTML.
                    </li>
                    <li>
                        To start php code, we would enclose the code in <code>&lt;?php ... ?&gt;</code>.
                        Only then the php code will be executed.
                    </li>
                    <li>
                        <code>echo</code> is one of the functions used oftenly in PHP. Any string specified
                        with the <code>echo</code> will be added into the final HTML document.
                        <ul>
                            <li><code>echo "Hello, World"</code></li>
                            <li><code>echo 'Hello, World'</code></li>
                            <li><code>echo('Hello World')</code></li>
                        <ul>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            &lt;?php

            echo "Hello World" . "&lt;br&gt";
            echo 'Hello, World' . "&lt;br&gt";
            echo('Hello World') . "&lt;br&gt";

            ?&gt;
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
                    if (isset($_GET['run_1'] ) ) {
                        
                        echo "Hello World" . "<br>";
                        echo 'Hello, World' . "<br>";
                        echo('Hello World') . "<br>";

                        echo ("<script>
                            document.getElementById('run_1').scrollIntoView(true);
                        </script>");
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet1.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_1'>Run Code</button>
        </form>
    </div>



    <!---------------------------------------->
    <!-- Topic 3 - Variables and Data Types -->
    <!---------------------------------------->
    <div class='card topic py-3 px-2 my-5' id='t3-var_and_datatypes'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Variables and Data Types</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        In PHP, variables are prefixed with a dollar sign <code>$</code>, like <code>$age</code>
                    </li>
                    <li>
                        There are several 'primitive' datatypes that we can work with:
                        <ul>
                            <li>String</li>
                            <li>Integer</li>
                            <li>Floats</li>
                            <li>Boolean</li>
                            <li>null</li>
                        </ul>
                    </li>
                    <li>
                        To check whether a variable exists, use <code>isset( var )</code> function, which returns boolean
                    </li>
                    <li>
                        Use <code>empty( var )</code> to check if a variable had been initialized or not, or is null
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            $name = "John Doe";                
            $age = 13;
            $grade = 89.43;
            $isGraduated = false;
            $friend = null;

            echo "His name is $name &lt;br&gt;";
            echo "He is $age years old &lt;br&gt;";
            echo "He obtained $grade &lt;br&gt;";
            echo ($isGraduated)? "He graduated university": "He haven't graduate yet &lt;br&gt;";
            echo "His friend is " . ( ($friend != null)? $friend: "nobody :( &lt;br&gt;");

            echo (isset($name) )? "variable \$name exists &lt;br&gt;": "variable \$name doesn't exist &lt;br&gt;";
            echo (isset($birthday) )? "variable \$birthday exists &lt;br&gt;": "variable \$birthday doesn't exist &lt;br&gt;";

            $emptyOrNot = null;
            echo (empty($emptyOrNot) )? "variable \$emptyOrNot is empty &lt;br&gt;" : "variable \$emptyOrNot is not empty &lt;br&gt;";
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
                    if ( isset($_GET['run_3']) ) {
                        $name = "John Doe";
                        $age = 19;
                        $grade = 89.43;
                        $isGraduated = false;
                        $friend = null;

                        echo "His name is $name <br>";
                        echo "He is $age years old <br>";
                        echo "He obtained $grade <br>";
                        echo ($isGraduated)? "He graduated university": "He haven't graduate yet <br>";
                        echo "His friend is " . ( ($friend != null)? $friend: "nobody :( <br>");

                        echo (isset($name) )? "variable \$name exists <br>": "variable \$name doesn't exist <br>";
                        echo (isset($birthday) )? "variable \$birthday exists <br>": "variable \$birthday doesn't exist <br>";

                        $emptyOrNot = null;
                        echo (empty($emptyOrNot) )? "variable \$emptyOrNot is empty <br>" : "variable \$emptyOrNot is not empty <br>";

                        echo "<script>document.getElementById('run_3').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet1.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_3'>Run Code</button>
        </form>
    </div>



    <!------------------------------------------------>
    <!-- Topic 4 - Working with Strings and Numbers -->
    <!------------------------------------------------>
    <div class='card topic py-3 px-2 my-5' id='t4-working_with_data'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Working with Strings and Numbers</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        PHP came with quite a sum of functions to work with strings and numbers. Here we'll see some commonly used:
                    </li>
                    <li>
                        Strings:
                        <ul>
                            <li><code>.</code> operator - In PHP, Strings are not concatenated by +, but by dot <code>.</code>
                            <li><code>[]</code> operator - Similar to C, obtain the character at index i. We can also replace another character to it</li>
                            <li><code>strtoupper( str )</code> - Converts string to uppercase</li>
                            <li><code>strtolower( str )</code> - Converts string to lowercase</li>
                            <li><code>strlen( str )</code> - Obtain length of string</li>
                            <li><code>str_replace( search, replace, targetstr )</code> - Replace all occurrences of 'search' to 'replace' in targetstr</li>
                            <li><code>substr( str, start, len )</code> - Obtain substring from starting index, and of length given</li>
                            <li><code>number_format( num, decimal_place )</code> - Format the number based on decimal points specified</li>
                            <li><code>explode( delimiter, str )</code> - Similar to split() in Python. Splits string by delimiter given, returns array
                                Reverse is done via <code>implode( joiner, array )</code>                                            
                            </li>
                        </ul>
                    </li>
                    <li>
                        Math operations:
                        <ul>
                            <li><code>pow( base, exp )</code> - Raise base to power of exp</li>
                            <li><code>sqrt( n )</code> - Get square root of n</li>
                            <li><code>max( n1, n2 )</code> - Return maximum out of two number</li>
                            <li><code>min( n1, n2 )</code> - Return minimum out of two number</li>
                            <li><code>round( n )</code> - Round decimal to nearest integer</li>
                            <li><code>ceil( n )</code> - Round decimal UP to nearest integer</li>
                            <li><code>floor( n )</code> - Round decimal DOWN to nearest integer</li>
                        </ul>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            $str = "Hello World";

            echo "$str &lt;br&gt;";
            echo "First and 7th character: $str[0] $str[6] &lt;br&gt;";
            echo "Uppercase: " . strtoupper( $str ) . "&lt;br&gt;";
            echo "Lowercase: " . strtolower( $str ) . "&lt;br&gt;";
            echo "Length of string: " . strlen( $str ) . "&lt;br&gt;";
            echo "Replaced: " . str_replace( "Hello", "Bye", $str ) . "&lt;br&gt;";
            echo "Substring: " . substr( $str, 0, 4 ) . "&lt;br&gt;";
            echo "1.2345 to 2dp: " . number_format( 1.2345, 2 ) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            $num = 1.2345;

            echo "$num &lt;br&gt;";
            echo "Squared: " . pow( $num, 2 ) . "&lt;br&gt;";
            echo "Square Root: " . sqrt( $num ) . "&lt;br&gt;";
            echo "Max and Min with 0: " . max( $num, 0 ) . ", " . min( $num, 0) . "&lt;br&gt;";
            echo "Round, Ceil, Floor: " . round( $num ) . ", " . ceil( $num ) . ", " . floor( $num ) . "&lt;br&gt;";

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
                    if ( isset($_GET['run_4'] ) ) {
                        $str = "Hello World";

                        echo "$str <br>";
                        echo "First and 7th character: $str[0] $str[6] <br>";
                        echo "Uppercase: " . strtoupper( $str ) . "<br>";
                        echo "Lowercase: " . strtolower( $str ) . "<br>";
                        echo "Length of string: " . strlen( $str ) . "<br>";
                        echo "Replaced: " . str_replace( "Hello", "Bye", $str ) . "<br>";
                        echo "Substring: " . substr( $str, 0, 4 ) . "<br>";
                        echo "1.2345 to 2dp: " . number_format( 1.2345, 2 ) . "<br>";

                        echo "<br>";

                        $num = 1.2345;

                        echo "$num <br>";
                        echo "Squared: " . pow( $num, 2 ) . "<br>";
                        echo "Square Root: " . sqrt( $num ) . "<br>";
                        echo "Max and Min with 0: " . max( $num, 0 ) . ", " . min( $num, 0) . "<br>";
                        echo "Round, Ceil, Floor: " . round( $num ) . ", " . ceil( $num ) . ", " . floor( $num ) . "<br>";

                        echo "<script>document.getElementById('run_4').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet1.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_4'>Run Code</button>
        </form>
    </div>



    <!---------------------------------------------------->
    <!-- Topic 5 - Arrays, Associative Arrays and Uses -->
    <!---------------------------------------------------->
    <div class='card topic py-3 px-2 my-5' id='t5-arrays_asso_arrays_uses'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Arrays, Associative Arrays and Its uses</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        In PHP, an array is declared using a syntax similar to constructor: <code>array( e1, e2 ... )</code>
                    </li>
                    <li>
                        Some useful functions on array:
                        <ul>
                            <li><code>[]</code> operator - Used to access element at the index specified. Can also use to set elements
                            <li><code>print_r( arr )</code> - Print array in human readable form
                            <li><code>count( arr )</code> - Obtain number of elements in array
                            <li><code>in_array( val, range/array )</code> - Used to check if a value exists in an array or range</li>
                            <li><code>array_push( arr, e1... )</code> - Used to push elements into back of array</li>
                            <li><code>array_pop( arr )</code> - Used to pop elements from back of array</li>
                            <li><code>foreach( arr as alias )</code> - Iterate over elements of array, each element is referred as alias set</li>
                            <li><code>array_map( func_name, arr )</code> - Apply function specified by the STRING func_name to each element</li>
                            <li><code>array_reduce( arr, func_name, initial_val )</code> - Reduce entire array into one single value, by calling
                                callback function on each element. The function take in 2 arguments, and should return one single value to be used 
                                in function call of next element
                            </li>
                            <li><code>array_filter( arr, func_name )</code> - Filter out elements which when passed in callback function, returns false</li>
                            <li><code>sort( arr ), rsort( arr )</code> - Sort array. Second one is reversed</li>
                        </ul>
                    </li>
                    <hr class='w-75'>
                    <li>
                        In PHP, an Associative array is essentially Dictionary in Python, or Map in several other languages. It stores entries in
                        key-value pairs.
                    </li>
                    <li>
                        An associative array is created same syntax as array, but to define a key-value pair, use <code>array( key=>value ... )</code>
                    </li>
                    <li>
                        Some useful functions on associative array:
                        <ul>
                            <li><code>[]</code> operator - Obtain value of respective key</li>
                            <li><code>count</code> - Obtain number of elements in array</li>
                            <li><code>array_key_exists( key, array )</code> - Check if particular key exists in the given array</li>
                            <li><code>foreach( arr as keyalias=>valalias )</code> - Iterate over key-value pairs in array. Key is referred as 
                                <code>keyalias</code>, while value is referred as <code>valalias</code>
                            </li>
                            <li><code>asort( arr ), ksort( arr ), arsort( arr ), krsort( arr )</code> - Sort by key (ksort) or value (asort) and reversed counterparts </li>
                        </ul>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <h4 class='text-center text-success'>Arrays</h4>
        <code class='card shadow-sm topic__code my-3 p-2'>
            $arr = array(10, 20, 30, 40, 50, 60, 70, 80);

            echo print_r($arr) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            echo "Third element: " . $arr[2] . "&lt;br&gt;";
            echo "Number of elements: " . count($arr) . "&lt;br&gt;";
            echo "Is 40 in array?: " . in_array(40, $arr) . "&lt;br&gt;";
            echo "Push 90 and 100: " . array_push($arr, 90, 100) . "&lt;br&gt;";
            echo "Number of elements: " . count($arr) . "&lt;br&gt;";
            echo "Pop out 90 and 100 " . array_pop($arr) . array_pop($arr) . "&lt;br&gt;";
            echo "Number of elements: " . count($arr) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            foreach( $arr as $e ) {
                echo "Element: " . $e . "&lt;br&gt;";
            }

            echo "&lt;br&gt;";

            echo "Map each element to divide by 10" . "&lt;br&gt;";
            $arr = array_map( function($e) { return $e / 10; }, $arr);
            echo print_r($arr) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            echo "Reduced to their sum" . "&lt;br&gt;";
            echo array_reduce( $arr, function($a,$x) { return $a + $x;}, 0) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            echo "Filter out those greater than 4" . "&lt;br&gt;";
            $arr = array_filter( $arr, function($e) { return $e <= 4; });
            echo print_r($arr) . "&lt;br&gt;";
        </code>

        <h4 class='text-center text-success'>Associative Arrays</h4>
        <code class='card shadow-sm topic__code my-3 p-2'>
            $arr = array("Jim"=>10, "Ali"=>20, "Ben"=>30);
                        
            echo print_r($arr) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            echo "Get 'Ben': " . $arr['Ben'] . "&lt;br&gt;";
            echo "Number of elements: " . count($arr) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            echo "Is Ben a key in array?: " . array_key_exists('Ben', $arr) . "&lt;br&gt;";
            echo "Is Kelly a key in array?: " . array_key_exists('Kelly', $arr) . "&lt;br&gt;";

            echo "&lt;br&gt;";

            foreach ($arr as $k=>$v) {
                echo $k . " : " . $v . "&lt;br&gt;";
            }

            echo "&lt;br&gt;";

            echo "Sorted by value: &lt;br&gt;";
            asort($arr);
            echo print_r( $arr ) . "&lt;br&gt;";

            echo "Sorted by key: &lt;br&gt;";
            ksort($arr);
            echo print_r( $arr ) . "&lt;br&gt;";
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
                    if (isset($_GET['run_5_1'])) {
                        $arr = array(10, 20, 30, 40, 50, 60, 70, 80);

                        echo print_r($arr) . "<br>";

                        echo "<br>";
                        
                        echo "Third element: " . $arr[2] . "<br>";
                        echo "Number of elements: " . count($arr) . "<br>";
                        echo "Is 40 in array?: " . in_array(40, $arr) . "<br>";
                        echo "Push 90 and 100: " . array_push($arr, 90, 100) . "<br>";
                        echo "Number of elements: " . count($arr) . "<br>";
                        echo "Pop out 90 and 100 " . array_pop($arr) . array_pop($arr) . "<br>";
                        echo "Number of elements: " . count($arr) . "<br>";

                        echo "<br>";

                        foreach( $arr as $e ) {
                            echo "Element: " . $e . "<br>";
                        }

                        echo "<br>";

                        echo "Map each element to divide by 10" . "<br>";
                        $arr = array_map( function($e) { return $e / 10; }, $arr);
                        echo print_r($arr) . "<br>";

                        echo "<br>";

                        echo "Reduced to their sum" . "<br>";
                        echo array_reduce( $arr, function($a,$x) { return $a + $x;}, 0) . "<br>";

                        echo "<br>";

                        echo "Filter out those greater than 4" . "<br>";
                        $arr = array_filter( $arr, function($e) { return $e <= 4; });
                        echo print_r($arr) . "<br>";
                        
                        
                        echo "<script>document.getElementById('run_5').scrollIntoView(true);</script>";
                    } 
                    else if (isset($_GET['run_5_2'] ) ) {
                        $arr = array("Jim"=>10, "Ali"=>20, "Ben"=>30);
                        
                        echo print_r($arr) . "<br>";

                        echo "<br>";

                        echo "Get 'Ben': " . $arr['Ben'] . "<br>";
                        echo "Number of elements: " . count($arr) . "<br>";

                        echo "<br>";

                        echo "Is Ben a key in array?: " . array_key_exists('Ben', $arr) . "<br>";
                        echo "Is Kelly a key in array?: " . array_key_exists('Kelly', $arr) . "<br>";

                        echo "<br>";

                        foreach ($arr as $k=>$v) {
                            echo $k . " : " . $v . "<br>";
                        }

                        echo "<br>";

                        echo "Sorted by value: <br>";
                        asort($arr);
                        echo print_r( $arr ) . "<br>";

                        echo "Sorted by key: <br>";
                        ksort($arr);
                        echo print_r( $arr ) . "<br>";

                        echo "<script>document.getElementById('run_5').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet1.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_5_1'>Run Array Example</button>
            <button type='submit' class='btn btn-primary' name='run_5_2'>Run Associative Array Example</button>
        </form>
    </div>



    <!-------------------------------------->
    <!-- Topic 6 - User Input using Forms -->
    <!--------------------------------------->
    <div class='card topic py-3 px-2 my-5' id='t6-user_input_by_form'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>User Input Using Forms</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        PHP provides interactive shell to allow us to directly
                        execute PHP codes. This is done in command line interface
                        by typing <code>php -a</code> to enter interactive shell.
                    </li>
                    <li>
                        One common input function to be used in interactive shell is
                        <code>readline( prompt )</code>, which reads the next line input
                        by user.
                    </li>
                    <hr/>
                    <li>
                        However, most of the time when we are using PHP, we are pre-processing
                        PHP documents. Therefore user input is mostly obtained by <strong>HTML Forms.</strong>
                    </li>
                    <li>
                        The data in the forms can be sent by specifying the URL to process the
                        submission in <code>action</code> attribute of the form, and also the
                        <code>method</code> attribute to specify how to send the form: 
                        <ul>
                            <li>
                                <code>GET</code> - Form data is appended to the <code>action</code>
                                URL, seperated by <code>?</code>. Use only when the form has no
                                side effects (nothing is changed on server-side) and data is not credential.
                            </li>
                            <li>
                                <code>POST</code> - Form data is sent as the request body. More secure
                                than <code>GET</code> as the data is not shown in the URL directly.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Then in PHP code, remember that each form input has the <code>name</code> attribute
                        specified. That is the variable name that we will use in PHP. Say if my document has
                        an input text field where name is set to <code>example_input</code>, then in PHP it is
                        accessed via:
                        <ul>
                            <li><code>$_GET['example_input']</code></li>
                            <li><code>$_POST['example_input']</code></li>
                        </ul>
                        It depends on what method you used to send the form data.
                    </li>
                    <li>
                        Note that since <code>GET</code> method sends data in URL, the data is in plain sight
                        in browser's address bar. We can even change the parameters directly and send without having
                        to interact with the document itself.
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <h4 class='text-center text-success'>GET Example - Two operand Calculator</h4>
        <code class='card shadow-sm topic__code my-3 p-2'>

            //----------------------------------------------------------------
            // HTML Code - Only essential part is shown. Classes are removed
            //----------------------------------------------------------------

            &lt;form action='php_cheat_sheet1.php' method='GET'&gt;
            ...
            &lt;input type='number' name='run_6_num1' required/&gt;
            ...
            &lt;input type='radio' name='run_6_operator' value='+' id='operator+' checked/&gt;
            ...
            &lt;input type='radio' name='run_6_operator' value='-' id='operator-'/&gt;
            ...
            &lt;input type='radio' name='run_6_operator' value='*' id='operator*'/&gt;
            ...
            &lt;input type='radio' name='run_6_operator' value='/' id='operator/'/&gt;
            ...
            &lt;input type='radio' name='run_6_operator' value='%' id='operator%'/&gt;
            ...
            &lt;input type='number' step=0.000000000001 name='run_6_num2' required/&gt;
            ...
            &lt;button type='submit' name='run_6_1'&gt;Run Calculator&lt;/button&gt;
            ...
            &lt;/form&gt; 
            
            //---------
            // PHP Code 
            //---------
                        
            $num1 = $_GET['run_6_num1'];
            $num2 = $_GET['run_6_num2'];
            $opd = $_GET['run_6_operator'];

            if ( ($opd === '/' || $opd === '%') && $num2 === '0') {
                echo "Division by 0 is not allowed!";
            } else {
                $str = "echo $num1 $opd $num2;";
                eval($str);
            }

        </code>

        <!-- Code -->
        <h4 class='text-center text-success'>POST Example - Registration Form</h4>
        <code class='card shadow-sm topic__code my-3 p-2'>

            //----------------------------------------------------------------
            // HTML Code - Only essential part is shown. Classes are removed
            //----------------------------------------------------------------

            &lt;form action='php_cheat_sheet1.php' method='POST'&gt;
            ...
            &lt;input type='text'placeholder='Enter Username' id='username' name='run_6_name' required /&gt;
            ...
            &lt;input type='password' placeholder='Enter Password' id='password' name='run_6_pass' required/&gt;
            ...
            &lt;input type='date' id='birthday' name='run_6_bday' required/&gt;
            ...
            &lt;input type='checkbox' id='remember_pass' name='run_6_remember'/&gt;
            ...
            &lt;label for='remember_pass'&gt;Remember Password&lt;/label&gt;
            ...
            &lt;button type='submit' name='run_6_2'&gt;Register&lt;/button&gt;
            ...
            &lt;/form&gt;   

            //---------
            // PHP Code 
            //---------

            $username = $_POST['run_6_name'];
            $password = $_POST['run_6_pass'];
            $birthday = $_POST['run_6_bday'];
            $remember = isset($_POST['run_6_remember'])? true: false;

            echo "Successfully Registered. &lt;br&gt;";
            echo "Your username is: $username &lt;br&gt;";
            echo "Your password is: $password &lt;br&gt;";
            echo "Your birthday is: $birthday &lt;br&gt;";
            echo ($remember)? "We will remember you on next login &lt;br&gt;": "Remember password is turned off &lt;br&gt;";

        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_6'>
            <div class='card bg-warning text-center col-6'>Input</div>
            <div class='card bg-success text-center text-white col-6'>Output</div>
        </div>
        <div class='flex-row w-100 card shadow-sm bg-light row mb-2 mx-auto topic__io'>
            <!-- INPUT -->
            <div class='card bg-light topic__io__in col-6 d-flex flex-column justify-content-center'>
                
                <!-- GET form example - 2 Operand Calculator -->
                <form action='php_cheat_sheet1.php' method='GET' class='p-2 m-2 border text-center'>
                    <div class='form-group form-row'>
                        <label for='num_1' class='col-md-4 col-form-label text-left'>Number 1:</label>
                        <input type='number' step=0.000000000001 class='form-control col-md-8' name='run_6_num1' required/>
                    </div>
                    <div class='form-group form-row align-items-center'>
                        <legend class='col-md-4 col-form-label text-left'>Operator: </legend>
                        <div class='col-md-8 d-flex justify-content-around'>
                            <div class='form-check '>
                                <input type='radio' name='run_6_operator' value='+' id='operator+' class='form-check-input' checked/>
                                <label class='form-check-label' for='operator+'>+</label>
                            </div>
                            <div class='form-check  '>
                                <input type='radio' name='run_6_operator' value='-' id='operator-' class='form-check-input'/>
                                <label class='form-check-label' for='operator-'>-</label>
                            </div>
                            <div class='form-check  '>
                                <input type='radio' name='run_6_operator' value='*' id='operator*' class='form-check-input'/>
                                <label class='form-check-label' for='operator*'>*</label>
                            </div>
                            <div class='form-check  '>
                                <input type='radio' name='run_6_operator' value='/' id='operator/' class='form-check-input'/>
                                <label class='form-check-label' for='operator/'>/</label>
                            </div>
                            <div class='form-check  '>
                                <input type='radio' name='run_6_operator' value='%' id='operator%' class='form-check-input'/>
                                <label class='form-check-label' for='operator%'>%</label>
                            </div>
                        </div>
                    </div>
                    <div class='form-group form-row'>
                        <label for='num_2' class='col-md-4 col-form-label text-left'>Number 2:</label>
                        <input type='number' step=0.000000000001 class='form-control col-md-8' name='run_6_num2' required/>
                    </div>

                    <button type='submit' name='run_6_1' class='btn btn-primary'>Run Calculator</button>
                </form>
                
                <!-- POST form example - Register Form -->
                <form action='php_cheat_sheet1.php' method='POST' class='p-2 m-2 border text-center'>
                    <h4 class='lead'>Register</h4>
                    
                    <div class='form-group form-row'>
                        <label for='username' class='col-sm-4 col-form-label text-left'>Username: </label>
                        <input type='text' class='col-sm-8 form-control' placeholder='Enter Username' id='username' name='run_6_name' required />
                    </div>

                    <div class='form-group form-row'>
                        <label for='password' class='col-sm-4 col-form-label text-left'>Password: </label>
                        <input type='password' class='col-sm-8 form-control' placeholder='Enter Password' id='password' name='run_6_pass' required/>
                    </div>

                    <div class='form-group form-row'>
                        <label for='birthday' class='col-sm-4 col-form-label text-left'>Birthday: </label>
                        <input type='date' class='col-sm-8 form-control' id='birthday' name='run_6_bday' required/>
                    </div>

                    <div class='form-group form-row form-check'>
                        <input type='checkbox' id='remember_pass' name='run_6_remember' class='form-check-input'/>
                        <label for='remember_pass' class='form-check-label'>Remember Password</label>
                    </div>

                    <button type='submit' name='run_6_2' class='btn btn-primary'>Register</button>
                </form>
                            
            </div>

            <!-- OUTPUT -->
            <div class='card bg-light topic__io__out col-6'>
                <?php
                    if (isset( $_GET['run_6_1'] ) ) {
                        $num1 = $_GET['run_6_num1'];
                        $num2 = $_GET['run_6_num2'];
                        $opd = $_GET['run_6_operator'];

                        if ( ($opd === '/' || $opd === '%') && $num2 === '0') {
                            echo "Division by 0 is not allowed!";
                        } else {
                            $str = "echo $num1 $opd $num2;";
                            eval($str);
                        }
                        echo "<script>document.getElementById('run_6').scrollIntoView(true);</script>";
                    }
                    else if (isset( $_POST['run_6_2']) ) {
                        $username = $_POST['run_6_name'];
                        $password = $_POST['run_6_pass'];
                        $birthday = $_POST['run_6_bday'];
                        $remember = isset($_POST['run_6_remember'])? true: false;

                        echo "Successfully Registered. <br>";
                        echo "Your username is: $username <br>";
                        echo "Your password is: $password <br>";
                        echo "Your birthday is: $birthday <br>";
                        echo ($remember)? "We will remember you on next login <br>": "Remember password is turned off <br>";

                        echo "<script>document.getElementById('run_6').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

    </div>



    <!---------------------------------->
    <!-- Topic 7 - Control Structures -->
    <!----------------------------------->
    <div class='card topic py-3 px-2 my-5' id='t7-control_struct'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Control Structures - Conditionals and Loops</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        <code>if</code> statements are very much the same in php as in other languages. Use it like it is
                    </li>
                    <li>
                        <code>else</code> is also same. The only slight difference is to use <code>elseif</code> (Although <code>else if</code>
                        is also functional, it is said to be slower because equivalent to <code>else { if {} }</code> ).
                    </li>
                    <li>
                        <code>switch</code> is same syntax in Java or similar to C++. Requires <code>break</code> statement after every <code>case</code>.
                        However, <code>switch</code> can be used like <code>if... else</code> by this: <br>
                        <code class='ml-5'>switch( true ) { case($age < 5): ... }</code><br>
                        Since we are checking for <code>true</code> value, the first case that evaluates to <code>true</code> will be run.
                    </li>
                    <li>
                        In PHP 8, <code>match</code> is introduced which is shorter and stricter version of <code>switch</code> statements. It is used
                        as <br>
                        <code class='ml-5'>match ($var) { val1 => res1, val2 => res2, default => res3 }; </code>
                    </li>
                    <hr>
                    <li>
                        <code>while</code>, <code>do...while</code> and <code>for</code> works exactly the same as in other languages.
                    </li>
                    <li>
                        For each loop cannot be used with <code>for</code> like in Java or C++. Use <code>foreach()</code> instead as so: <br>
                        <code class='ml-5'>foreach( $arr as $elem ) { ... }</code>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <h4 class='text-center text-success'>Conditional Control Statement</h4>
        <code class='card shadow-sm topic__code my-3 p-2'>
            $arr = array("Ali"=>"A+", "Ben"=>"B", "Charles"=>"C", "Daniel"=>"D", "Ethan"=>"A-", "Farid"=>null, "Gaben"=>null);
                       
            $search_name = $_GET['run_7_name'];
            $odd_or_even = $_GET['run_7_oddeven'];
            $from = $_GET['run_7_from'];
            $to = $_GET['run_7_to'];

            if ( array_key_exists( $search_name, $arr ) && !empty($arr[$search_name] ) ) {
                switch( $arr[$search_name] ) {
                    case "A+":
                    case "A-": echo "Congratulations to $search_name for obtaining A!!!";
                        break;
                    case "B": echo "Great job $search_name, you get B";
                        break;
                    case "C": echo "You can do better $search_name, you get C";
                        break;
                    case "D": echo "Try harder $search_name as you get D";
                        break;
                    default: echo "Undefined Grade!";
                };

            } elseif ( array_key_exists( $search_name, $arr) ) {
                echo "Sorry but $search_name's grade haven't been key in yet";
            } 

            else {
                echo "Sorry but $search_name is not in our database";
            }
        </code>

        <!-- Code -->
        <h4 class='text-center text-success'>Repetition Control Statement</h4>
        <code class='card shadow-sm topic__code my-3 p-2'>
            switch(true) {
                case ($odd_or_even === 'odd'):

                    for ($i = $from % 2 == 0? $from + 1: $from; $i <= $to; $i += 2)
                        echo $i;
                    break;

                case ($odd_or_even === 'even'):

                    foreach( range($from % 2 === 0? $from: $from + 1, $to, 2) as $e )
                        echo $e;
                    break;

                default:
                    echo "Error in Odd Even number generator! Mode undefined";
            }
        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_7'>
            <div class='card bg-warning text-center col-6'>Input</div>
            <div class='card bg-success text-center text-white col-6'>Output</div>
        </div>
        <div class='flex-row w-100 card shadow-sm bg-light row mb-2 mx-auto topic__io'>
            <!-- INPUT -->
            <div class='card bg-light topic__io__in col-6'>

                <form action='php_cheat_sheet1.php' method='GET' class='p-2 m-2 border text-center'>
                    <div class='form-group form-row'>
                        <label for='stud_name' class='col-sm-4 col-form-label text-left'>Name: </label>
                        <input type='text' name='run_7_name' id='stud_name' class='col-sm-8 form-control' placeholder='Search student grade...' required />
                    </div>

                    <label for='num_gen' class='text-success'>Odd Even Number Generator</label>
                    <div class='form-row justify-content-around'>
                        <div class='form-check'>
                            <input type='radio' class='form-check-input' id='odd' name='run_7_oddeven' value='odd' checked/>
                            <label for='odd' class='form-check-label'>Odd</label>
                        </div>
                        <div class='form-check'>
                            <input type='radio' class='form-check-input' id='even' name='run_7_oddeven' value='even'/>
                            <label for='even' class='form-check-label'>Even</label>
                        </div>
                    </div>
                    
                    <div class='form-group form-row'>
                        <label for='range_from' class='col-sm-3 col-form-label text-center'>From</label>
                        <input type='number' name='run_7_from' id='range_from' class='col-sm-3 form-control' required/>
                        <label for='range_to' class='col-sm-3 col-form-label text-center'>To</label>
                        <input type='number' name='run_7_to' id='range_to' class='col-sm-3 form-control' required/>
                    </div>

                    <button type='submit' class='btn btn-primary' name='run_7'>Run Code</button>

                </form>

            </div>
            <!-- OUTPUT -->
            <div class='card bg-light topic__io__out col-6 overflow-auto' style='max-height: 300px'>
                <?php
                    if (isset($_GET['run_7'] ) ) {
                        $arr = array("Ali"=>"A+", "Ben"=>"B", "Charles"=>"C", "Daniel"=>"D", "Ethan"=>"A-", "Farid"=>null, "Gaben"=>null);
                       
                        $search_name = $_GET['run_7_name'];
                        $odd_or_even = $_GET['run_7_oddeven'];
                        $from = $_GET['run_7_from'];
                        $to = $_GET['run_7_to'];

                        if ( array_key_exists( $search_name, $arr ) && !empty($arr[$search_name] ) ) {
                            switch( $arr[$search_name] ) {
                                case "A+":
                                case "A-": echo "Congratulations to $search_name for obtaining A!!!";
                                    break;
                                case "B": echo "Great job $search_name, you get B";
                                    break;
                                case "C": echo "You can do better $search_name, you get C";
                                    break;
                                case "D": echo "Try harder $search_name as you get D";
                                    break;
                                default: echo "Undefined Grade!";
                            };
                            echo "<br>";

                        } elseif ( array_key_exists( $search_name, $arr) ) {
                            echo "Sorry but $search_name's grade haven't been key in yet <br>";
                        } else {
                            echo "Sorry but $search_name is not in our database <br>";
                        }

                        echo "<br>";
                        
                        switch(true) {
                            case ($odd_or_even === 'odd'):
                                for ($i = $from % 2 == 0? $from + 1: $from; $i <= $to; $i += 2)
                                    echo $i . "<br>";
                                break;
                            case ($odd_or_even === 'even'):
                                foreach( range($from % 2 === 0? $from: $from + 1, $to, 2) as $e )
                                    echo $e . "<br>";
                                break;
                            default:
                                echo "Error in Odd Even number generator! Mode undefined";
                        }

                        echo "<script>document.getElementById('run_7').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>
    </div>



     <!---------------------------->
    <!-- Topic 8 - Functions -->
    <!---------------------------->
    <div class='card topic py-3 px-2 my-5' id='t8-functions'>

        <!-- HEADER -->
        <h2 class='display-4 text-center'>Functions</h2>

        <!-- Description-->
        <div class='card shadow-sm topic__desc bg-light my-5'>
            <p>
                <ul>
                    <li>
                        Functions in PHP are similar to in JS: using <code>function</code> keyword. Within a value-returning function
                        <code>return</code> keyword will be used
                    </li>
                    <li>
                        <strong>Default parameters</strong> are supported. Similar to other languages, put an equal sign after the
                        parameter to have it become a default parameter like: <br>
                        <code class='ml-5'>function add( $n1 = 0, $n2 = 0 ) {...} </code>
                    </li>
                    <li>
                        <strong>Variable length arguments</strong> are supported. Like Java, put triple dot / ellipsis <code>...</code>
                        before the argument to be variable lengthed. Like: <br>
                        <code class='ml-5'>function add( ...$n ) {...} </code>
                    </li>
                    <li>
                        <strong>Pass by Reference</strong> is supported. Like C++, put ampersand sign <code>&</code> before the parameter
                        to be able to pass by reference and mutate the value passed in.
                    </li>
                    <li>
                        <strong>Lambda Functions</strong> is supported. Like JS, use <code>function</code> without specifying the identifier /
                        function name and you're good to go!
                    </li>
                    <li>
                        A trick to be mentioned is that we can easily destructure return values. This is done via <code>list( $var1, $var2 ...) = ...</code>
                        like so: <br>
                        <code class='ml-5'>list( $name, $age ) = get_information();</code>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Code -->
        <code class='card shadow-sm topic__code my-3 p-2'>
            //  Lambda function
            $get_sum = function($n1, $n2) {
                return $n1 + $n2;
            };
            echo "Using lambda function: " . $get_sum(1,2);


            //  Default parameters
            function getSumDefault($n1 = 0, $n2 = 0) {
                return $n1 + $n2;
            }
            echo "Using Default parameters: " . getSumDefault();


            //  Variable length arguments
            function getSumVarLen( ...$n ) {
                return array_reduce( $n, function($x, $y) { return $x + $y; }, 0 );
            }
            echo "Using Variable Length arguments: " . getSumVarLen(1,2,3,4,5,6,7);


            //  Pass by Reference - Map to square
            function mapToSquare( &$arr ) {
                for ($i = 0; $i < count($arr); $i ++ )
                    $arr[$i] = $arr[$i] * $arr[$i];
                echo "In the Reference function: ";
                print_r($arr);
            }
            $arr = array(1,2,3,4,5,6);
            echo "Before Reference function: ";
            print_r($arr);

            mapToSquare( $arr );

            echo "After Reference function: ";
            print_r($arr);


            //  Easy Destructuring
            $arr = array(10,20,30);
            list($n1, $n2, $n3) = $arr;
            echo "First: $n1, Second: $n2, Third: $n3";
        </code>

        <!-- Display & Output -->
        <div class='flex-row w-100 card shadow-sm bg-light row mt-5 mx-auto' id='run_8'>
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
                    if (isset($_GET['run_8'] ) ) {

                        //  Lambda function
                        $get_sum = function($n1, $n2) {
                            return $n1 + $n2;
                        };
                        echo "Using lambda function: " . $get_sum(1,2) . "<br>";


                        //  Default parameters
                        function getSumDefault($n1 = 0, $n2 = 0) {
                            return $n1 + $n2;
                        }
                        echo "Using Default parameters: " . getSumDefault() . "<br>";


                        //  Variable length arguments
                        function getSumVarLen( ...$n ) {
                            return array_reduce( $n, function($x, $y) { return $x + $y; }, 0 );
                        }
                        echo "Using Variable Length arguments: " . getSumVarLen(1,2,3,4,5,6,7) . "<br>";

                        echo "<br>";

                        //  Pass by Reference - Map to 2x
                        function mapToSquare( &$arr ) {
                            for ($i = 0; $i < count($arr); $i ++ )
                                $arr[$i] = $arr[$i] * $arr[$i];
                            echo "In the Reference function: " . "<br>";
                            print_r($arr);
                            echo "<br>";
                        }
                        $arr = array(1,2,3,4,5,6);
                        echo "Before Reference function: " . "<br>";
                        print_r($arr);
                        echo "<br>";
                        mapToSquare( $arr );
                        echo "After Reference function: " . "<br>";
                        print_r($arr);
                        echo "<br><br>";

                        //  Easy Destructuring
                        $arr = array(10,20,30);
                        list($n1, $n2, $n3) = $arr;
                        echo "First: $n1, Second: $n2, Third: $n3 <br>";


                        echo "<script>document.getElementById('run_8').scrollIntoView(true);</script>";
                    }
                ?>
            </div>
        </div>

        <!-- Run PHP code -->
        <form action='php_cheat_sheet1.php' method='GET' class='text-center my-2'>
            <button type='submit' class='btn btn-primary' name='run_8'>Run Code</button>
        </form>
    </div>

</div>

</body>

</html>