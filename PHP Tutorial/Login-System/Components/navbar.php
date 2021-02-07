<?php
    $get_unlogged_in_HTML = function() {
        return "
        <li class='nav-item'>
            <a class='nav-link' href='./register.php'>Register</a>
        </li>
        <li class='nav-item'>
            <a class='nav-link' href='./login.php'>Login</a>
        </li>
        ";
    };

    $get_logged_in_HTML = function($username) {
        return "
        <li class='nav-item'>
            <a class='nav-link' href='#'>$username</a>
        </li>
        <li class='nav-item'>
            <a class='nav-link' href='./logout.php'>Log out</a>
        </li>   
        ";
    };
?>



<!-- HEADER NAV -->
<nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
    <!-- Wrap in container to prevent stretch across large screens -->
    <div class='container'>
        
    <a class='navbar-brand font-weight-bold' href='#'>Logo</a>

    <button type='button' class= 'navbar-toggler' data-toggle='collapse' data-target='#main_nav'>
        <span class='navbar-toggler-icon'></span>
    </button>

    <div class='collapse navbar-collapse justify-content-around' id='main_nav'>
        <ul class='navbar-nav'>
            <li class='nav-item'>
                <a class='nav-link' href='./'>Home</a>
            </li>
            <li class='nav-item'>
                <a class='nav-link' href='#'>Menu</a>
            </li>
            <li class='nav-item'>
                <a class='nav-link' href='#'>Promotion</a>
            </li>
            <li class='nav-item'>
                <a class='nav-link' href='#'>Specials</a>
            </li>
            <li class='nav-item'>
                <a class='nav-link' href='#'>About Us</a>
            </li>
        </ul>  

        <ul class='navbar-nav'>
            <?php 
                if ( isset($_SESSION['username'] ) )
                    echo $get_logged_in_HTML( $_SESSION['username'] );
                else
                    echo $get_unlogged_in_HTML();
            ?>
        </ul> 
    </div>

    </div>

</nav>