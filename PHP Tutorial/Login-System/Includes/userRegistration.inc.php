<?php

    function createUser($connection, $first_name, $last_name, $birth_date, $username, $email, 
    $password) {

        $query = '
            INSERT INTO Users
            (first_name, last_name, birth_date, username, email, password_hashed)
            VALUES
            (?, ?, ?, ?, ?, ?);
        ';

        $prep_statement = mysqli_stmt_init($connection);
        
        if (!mysqli_stmt_prepare($prep_statement, $query) ) {
            header('location: ./register.php?register-status=connection-error');
            exit();
        }
        
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($prep_statement, 'ssssss', $first_name, $last_name, $birth_date,
            $username, $email, $hashed_password );

        mysqli_stmt_execute($prep_statement);
        mysqli_stmt_close($prep_statement);
    }

?>



<?php

    require_once('db_handler.inc.php'); 
    require_once('validators.inc.php');

    if ( isset($_POST['register_init'] ) ) {
        //  Obtain user submitted information.
        $first_name = trim( $_POST['register_fname'] );
        $last_name = trim( $_POST['register_lname'] );
        $birth_date = trim( $_POST['register_birthdate'] );
        $username = trim( $_POST['register_username'] );
        $email = trim( $_POST['register_email'] );
        $password = trim( $_POST['register_password'] );
        $repeat_password = trim( $_POST['register_repeatpassword'] );

        $connection = connect();

        if ( isContainEmptyInput($first_name, $last_name, $birth_date, $username, $email, $password, $repeat_password)) {
            header('location: ./register.php?register-status=empty-input');
            exit();
        }
        else if ( isInvalidFirstLastName($first_name, $last_name ) ) {
            header('location: ./register.php?register-status=invalid-f-l-name');
            exit();
        }
        else if ( isInvalidUserID($username) ) {
            header('location: ./register.php?register-status=invalid-username');
            exit();
        }
        else if ( isInvalidEmail($email) ) {
            header('location: ./register.php?register-status=invalid-email');
            exit();
        }
        else if ( !isOver13( $birth_date) ) {
            header('location: ./register.php?register-status=underaged');
            exit();
        }
        else if ( !isRepeatPasswordMatch($password, $repeat_password) ) {
            header('location: ./register.php?register-status=password-mismatch');
            exit();
        }
        else if ( $existingUser = obtainUserByUsernameOrEmail($connection, $username, $email) ) {
            echo $existingUser;
            if ($existingUser['username'] === $username)
                header('location: ./register.php?register-status=existing-username&username=' . $username);
            else
                header('location: ./register.php?register-status=existing-email&email=' . $email);
            exit();
        }
        else {
            createUser($connection, $first_name, $last_name, $birth_date, $username, $email, $password);
            header('location: ./register.php?register-status=success');
            exit();
        }
    }


?>