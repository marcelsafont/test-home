$(document).ready(function(){
    $('#menu-toggle').click(function(){
        $(this).toggleClass('active');
        $('#main-nav .col-second').toggleClass('show-menu');
    })
})