<?php session_start(); ?>

<?php include_once('./Includes/head.inc.php'); ?>

<body>
    <?php include_once('./Components/navbar.php'); ?>

    <!-- Carousel Jumbotron -->
    <div class='carousel slide full-screenheight' data-ride='carousel' id='main_carousel'>

        <ol class='carousel-indicators'>
            <li class='active' data-target='#main_carousel' data-slide-to='0'></li>
            <li class='active' data-target='#main_carousel' data-slide-to='1'></li>
            <li class='active' data-target='#main_carousel' data-slide-to='2'></li>
        </ol>

        <div class='carousel-inner h-100'>
            <div class='carousel-inner__text d-flex flex-column'>
                <h1 class='display-3'>Take Action Now</h1>
                <p class='font-weight-light'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt explicabo similique nisi doloremque veritatis nam nostrum esse blanditiis voluptas.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus harum ea facilis pariatur nam ab nesciunt voluptatem vero. Perspiciatis, sed!
                </p>

                <?php
                    if (isset($_SESSION['username'] ) ) 
                        echo "<a class='btn btn-outline-light btn-lg' href='#'>Order Now</a>";
                    else
                        echo "<a class='btn btn-outline-light btn-lg' href='./register.php'>Register</a>";
                ?>
            </div>

            <div class='carousel-item active' id='carousel__slide1'>
                <div class='carousel-bg' id='carousel-bg-1'></div>
            </div>
            <div class='carousel-item' id='carousel__slide2'>
                <div class='carousel-bg' id='carousel-bg-2'></div>
            </div>
            <div class='carousel-item' id='carousel__slide3'>
                <div class='carousel-bg' id='carousel-bg-3'></div>
            </div>
        </div>

        <a class='carousel-control-prev' href='#main_carousel' role='button' data-slide='prev'>
            <span class='carousel-control-prev-icon'></span>
        </a>
        <a class='carousel-control-next' href='#main_carousel' role='button' data-slide='next'>
            <span class='carousel-control-next-icon'></span>
        </a>
    </div>


    <!-- Content -->
    <main class='content my-5 container'>
        <h2 class='display-4 text-center font-weight-light m-5'>What do we offer?</h2>

        <div class='content__showcase'>

            <img class='content__showcase__item' id='content_item1--pic' 
                src='https://image.freepik.com/free-photo/plant-growing-ground_1150-19317.jpg' alt='sapling on ground'/>
            <div class='content__showcase__item grid-align-left' id='content_item1--desc'>
                <h4 class='lead font-weight-bold'>Reliable</h4>
                <p class='font-weight-light'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consectetur est aliquid incidunt quisquam, excepturi ea ad ipsa distinctio nobis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam incidunt dolorum enim necessitatibus architecto? Molestias eum quis explicabo inventore ipsum!
                </p>
            </div>

            <div class='content__showcase__item grid-align-right' id='content_item2--desc'>
                <h4 class='lead font-weight-bold'>Trustworthy</h4>
                <p class='font-weight-light'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consectetur est aliquid incidunt quisquam, excepturi ea ad ipsa distinctio nobis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam incidunt dolorum enim necessitatibus architecto? Molestias eum quis explicabo inventore ipsum!
                </p>
            </div>
            <img class='content__showcase__item' id='content_item2--pic'
                src='https://image.freepik.com/free-photo/breathtaking-view-amazing-forest-with-lots-trees_181624-22474.jpg' alt='forest'/>
        
            <img class='content__showcase__item' id='content_item3--pic' 
                src='https://image.freepik.com/free-photo/beautiful-park_1417-1421.jpg' alt='field and forest'/>
            <div class='content__showcase__item grid-align-left' id='content_item3--desc'>
                <h4 class='lead font-weight-bold'>Responsible</h4>
                <p class='font-weight-light'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consectetur est aliquid incidunt quisquam, excepturi ea ad ipsa distinctio nobis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam incidunt dolorum enim necessitatibus architecto? Molestias eum quis explicabo inventore ipsum!
                </p>
            </div>
        
        </div>  
    </main>


    <?php include_once('./Components/footer.php'); ?>

</body>

</html>