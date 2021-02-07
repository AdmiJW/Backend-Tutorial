
<?php session_start(); ?>
<?php include_once("./Includes/userRegistration.inc.php"); ?>


<?php include_once("./Includes/head.inc.php"); ?>

<body>
    <?php include_once("./Components/navbar.php"); ?>

    <div class='min-full-screenheight container d-flex flex-column justify-content-center align-items-center 
        form-container p-5'>

        <?php include_once("./Includes/status_message.inc.php"); ?>

        <form class='apply-form-style d-flex flex-column justify-content-around h-100 p-4' action='' method='POST'>

            <h1 class='display-4 text-center mb-5'>Register&#128075;</h1>

            <div class='form-row'>
                <div class='form-group col'>
                    <input type='text' class='form-control' id='register_fname' name='register_fname' required/>
                    <label for='register_fname' class='overlay'>First Name</label>
                </div>
                <div class='form-group col'>
                    <input type='text' class='form-control' id='register_lname' name='register_lname' required/>
                    <label for='register_lname' class='overlay'>Last Name</label>
                </div>
            </div>

            <div class='form-group form-row align-items-center justify-content-between my-4'>
                <label for='register_birthdate' class='col-4'>Birthdate:</label>
                <input type='date' class='form-control form-control-lg col-8' id='register_birthdate' name='register_birthdate' required/>
            </div>

            <div class='form-group'>
                <input type='text' class='form-control' id='register_username' name='register_username' required/>
                <label for='register_username' class='overlay'>Username</label>
            </div>

            <div class='form-group'>
                <input type='text' class='form-control' id='register_email' name='register_email' required/>
                <label for='register_email' class='overlay'>Email</label>
            </div>

            <div class='form-group'>
                <input type='password' class='form-control' id='register_password' name='register_password' required/>
                <label for='register_password' class='overlay'>Password</label>
            </div>

            <div class='form-group'>
                <input type='password' class='form-control' id='register_repeatpassword' name='register_repeatpassword' required/>
                <label for='register_repeatpassword' class='overlay'>Repeat Password</label>
            </div>

            <button type='submit' class='btn my-5 mx-auto rounded-pill' name='register_init'>Register</button>

        </form>
    </div>

    <?php include_once("./Components/footer.php"); ?>
</body>

</html>