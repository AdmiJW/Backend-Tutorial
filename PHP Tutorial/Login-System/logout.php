<?php 

    session_start();

    $_SESSION = array();
    session_destroy();

    header('location: ./');
    exit("Logged out. Redirecting to home page...");

?>