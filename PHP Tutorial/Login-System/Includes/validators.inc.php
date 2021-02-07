<?php

//  Pass in variable length argument of fields, check if any is empty
function isContainEmptyInput(...$inputs ) {
    foreach($inputs as $input) {
        if ( empty( trim($input) ) ) return true;
    }
    return false;
}


//  Check for invalid first and last name
function isInvalidFirstLastName( $fname, $lname ) {
    $reg_exp = "/^[a-zA-Z ]+$/";

    return !( preg_match($reg_exp, $fname) && preg_match($reg_exp, $lname) );
}


//  Check for invalid user ID, which consists of invalid characters
function isInvalidUserID( $username ) {
    $reg_exp = "/^[a-zA-Z0-9]{1,30}$/";

    return !preg_match( $reg_exp, $username );
}


//  Check for invalid email
function isInvalidEmail( $email ) {
    return !filter_var( $email, FILTER_VALIDATE_EMAIL );
}


//  Check if the registered birthday is at least 13 years old
function isOver13( $birthdate ) {
    $user_time = strtotime( $birthdate );
    $curr_time = time();

    $seconds_diff = $curr_time - $user_time;

    return ($seconds_diff / (365 * 24 * 60 * 60) >= 13);
}


//  Check for password matches
function isRepeatPasswordMatch( $password, $repeat_password) {
    return $password === $repeat_password;
}


//  Will connect to database and attempt to retrieve any user with matching username or email
function obtainUserByUsernameOrEmail( $connection, $username, $email ) {
    $query = '
        SELECT * FROM Users
        WHERE
            username = ?
        OR
            email = ?
    ';

    $init_statement = mysqli_stmt_init($connection);

    if ( !mysqli_stmt_prepare($init_statement, $query) ) {
        die("Connection to Database failed: " . mysqli_connect_error() );
    }

    mysqli_stmt_bind_param( $init_statement, 'ss', $username, $email );
    mysqli_stmt_execute( $init_statement );

    $resultData = mysqli_stmt_get_result( $init_statement );

    $row = mysqli_fetch_assoc($resultData);
    mysqli_stmt_close( $init_statement );
    return $row;
}

?>