<?php session_start(); ?>
<?php include_once('./Includes/userLogin.inc.php'); ?>


<?php include_once("./Includes/head.inc.php"); ?>

<body>
    <?php include_once("./Components/navbar.php"); ?>

    <div class='min-full-screenheight container d-flex flex-column justify-content-center align-items-center form-container p-5'>

        <?php include_once('./Includes/status_message.inc.php'); ?>

        <form class='apply-form-style d-flex flex-column justify-content-around h-100 p-4' action='' method='POST'>

            <h1 class='display-4 text-center mb-5'>Login&#x1F331;</h1>

            <div class='form-group'>
                <input type='text' class='form-control' id='login_username_email' name='login_username_email' required/>
                <label for='login_username_email' class='overlay'>Email / Username</label>
            </div>

            <div class='form-group'>
                <input type='password' class='form-control' id='login_password' name='login_password' required/>
                <label for='login_password' class='overlay'>Password</label>
            </div>

            <p class='lead my-4'>Haven't joined us? <a class='font-weight-bold' href='./register.php'>Join us now</a></p>

            <button type='submit' class='btn my-5 mx-auto rounded-pill' name='login_init'>Login</button>

        </form>
    </div>

    <?php include_once("./Components/footer.php"); ?>
</body>

</html>