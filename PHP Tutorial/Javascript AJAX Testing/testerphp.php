<?php

    if (isset( $_GET['echo-name'] ) ) {
        echo "Hello from the PHP Server, " . $_GET['name'] . "<br>";
    }

    if (isset($_POST['post-name-password'] ) ) {
        echo "Your registration request is received by the PHP Server <br>";
        echo "Your name: " . $_POST['name'] . "<br>";
        echo "Your password: " . $_POST['password'] . "<br>";
    }

?>