<?php

    function connect() {
        define('SERVER_NAME', 'localhost');
        define('DB_USERNAME', 'Tutorial_login_system_user');
        define('DB_PASSWORD', '1234');
        define('DB_NAME', 'tutorial_login_system');
        
        $connection = mysqli_connect( SERVER_NAME, DB_USERNAME, DB_PASSWORD, DB_NAME );

        if (!$connection) {
            die("Connection failed: " . mysqli_connect_error() );
        }
        return $connection;
    }

?>