

<?php
    if ( isset($_POST['login_init'] ) ) {
        include_once('db_handler.inc.php');
        include_once('validators.inc.php');

        $emailOrUsername = $_POST['login_username_email'];
        $password = $_POST['login_password'];

        $connection = connect();

        if (isContainEmptyInput($emailOrUsername, $password) ) {
            header('location: ./login.php?login-status=empty-input');
            exit();
        }
        else if (isInvalidUserID($emailOrUsername) && isInvalidEmail($emailOrUsername) ) {
            header('location: ./login.php?login-status=invalid-email-username');
            exit();
        }
        else if ( !$rows = obtainUserByUsernameOrEmail($connection, $emailOrUsername, $emailOrUsername) ) {
            header('location: ./login.php?login-status=no-such-user&user=$emailOrUsername');
            exit();
        }

        if (!password_verify($password, $rows['password_hashed']) ) {
            header('location: ./login.php?login-status=incorrect-password');
            exit();
        };

        $_SESSION['user_id'] = $rows['user_id'];
        $_SESSION['username'] = $rows['username'];
        header('location: ./login.php?login-status=success');
        exit();
    }

?>