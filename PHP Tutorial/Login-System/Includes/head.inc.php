<!-- PAGE SPECIFIC INCLUDES -->
<?php
    $homepage = "
        <link rel='stylesheet' type='text/css' href='./Styles/header_footer.css'/>
        <link rel='stylesheet' type='text/css' href='./Styles/homepage.css'/>
        
        <script src='./Scripts/fix_jumbotron_height.js'></script>
    ";

    $register_login = "
        <link rel='stylesheet' type='text/css' href='./Styles/header_footer.css'/>
        <link rel='stylesheet' type='text/css' href='./Styles/form_styling.css'/>

        <script src='./Scripts/fix_jumbotron_height.js'></script>
    ";
?>


<!-- The Head of HTML -->
<?php     

echo "
<!DOCTYPE html>
<html>
<head>

<title>Sample Website</title>
<meta charset='UTF-8'/>
<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
<meta name='author' content='AdmiJW'/>
<meta name='description' content='PHP Example Login System'/>
<meta name='keywords' content='PHP HTML JS CSS'/>

<!-- BOOTSTRAP -->
<script src='https://code.jquery.com/jquery-3.5.1.min.js' integrity='sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=' crossorigin='anonymous'></script>
<link rel='stylesheet' type='text/css' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'/>
<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>
<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js'></script>
";


//  PAGE SPECIFIC METATAGS
/* ========================================================================================
    Finds only php file name, regardless of directory name
    Eg:    LocalHost/register.php           <<= We want the "register" part

    ^               Match the start of string
    \/?.*?\/        Matches the preceding and trailing backslash, /{pathname}/, with lazy algorithm
                    Note that the first backslash may be absent. In that case the filename immediately follows the
                    domain name, like localhost/register.php
    (.+?)           Matches the file name of php. What we wanted to capture
    \.php$          matches .php exactly, where it is the end of the SCRIPT_NAME
======================================================================================== */
$regexp = "/^\/?.*?\/(.+?)\.php$/";
$match = array();
preg_match($regexp, $_SERVER['SCRIPT_NAME'], $match );
$match = $match[1];


//  Add page specific meta tags according to scriptfile name extracted
if ($match === 'index')
    echo $homepage;
else if ($match === 'register' || $match === 'login')
    echo $register_login;


echo "</head>";
?>


