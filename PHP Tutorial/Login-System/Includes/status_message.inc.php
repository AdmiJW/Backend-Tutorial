<?php
    //HTML for error message box
    $error_format = "
    <div class='error-msg bg-danger text-white m-4 p-4 lead rounded-pill' style='font-size: 2rem'>
    %s
    </div>";            
    //HTML for success message box
    $success_format =  "
    <div class='success-msg bg-success text-white m-4 p-4 lead rounded-pill' style='font-size: 2rem'>
    %s
    </div>";      

    //  Script to redirect to homepage after 2 seconds
    $redirect_script = function($url) {
        return "
        <script>
            setTimeout(()=> {
                window.location = '$url';
            }, 2000);
        </script>
        ";
    }
?>


<?php

    //  Registration Messages
    if ( isset($_GET['register-status'] ) ) {
        switch( $_GET['register-status'] ) {
            case 'empty-input':
                echo sprintf($error_format, "Some input field(s) are left blank!");
                break;
            case 'invalid-f-l-name':
                echo sprintf($error_format, "First name or Last name format is invalid!");
                break;  
            case 'invalid-username':
                echo sprintf($error_format, 'Username format is invalid! Only alphanumeric 
                    and space characters are allowed!');
                break;
            case 'invalid-email':
                echo sprintf($error_format, 'Email format is invalid!');
                break;
            case 'underaged':
                echo sprintf($error_format, 'Sorry but only individuals above age of 13 are allowed');
                break;
            case 'password-mismatch':
                echo sprintf($error_format, 'Your confirm password does not match');
                break;
            case 'existing-username':
                echo sprintf($error_format, "Username: " . $_GET['username'] . " is already taken");
                break;
            case 'existing-email':
                echo sprintf($error_format, "Email: " . $_GET['email'] . " is already registered!");
                break;
            case 'success':
                echo sprintf($success_format, "Register successful! Redirecting to login page...");
                echo $redirect_script('./login.php');
                break;
        }
    }


    //  Login Messages
    if ( isset($_GET['login-status'] ) ) {
        switch( $_GET['login-status'] ) {
            case 'empty-input':
                echo sprintf($error_format, "Some input field(s) are left blank!");
                break;
            case 'invalid-email-username':
                echo sprintf($error_format, 'Username or Email format is invalid!');
                break;
            case 'no-such-user':
                echo sprintf($error_format, "No account of <strong>{$_GET['user']}</strong> exists!");
                break;
            case 'success':
                echo sprintf($success_format, "Login successful! Redirecting to home page...");
                echo $redirect_script('./');
                break;
        }
    }

?>