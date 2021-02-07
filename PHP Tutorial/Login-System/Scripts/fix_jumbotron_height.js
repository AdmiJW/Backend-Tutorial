
//  The first class that are applied the class 'full-screenheight' will be applied full height
document.addEventListener('DOMContentLoaded', ()=>{
    set_height();

    window.addEventListener('resize', set_height );     //  When window is resized, resize the element as well
});



function set_height() {
    const fullScreenheight = document.querySelector('.full-screenheight');
    const minFullScreenHeight = document.querySelector('.min-full-screenheight');
    
    const navbar = document.querySelector('.navbar');

    const height = window.innerHeight;
    const navHeight = navbar.clientHeight;

    if (fullScreenheight)
        fullScreenheight.style.height = `${height - navHeight}px`;
    if (minFullScreenHeight )
        minFullScreenHeight.style.minHeight = `${height - navHeight}px`;
}