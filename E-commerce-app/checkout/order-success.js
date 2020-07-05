$(document).ready(function () {
    
    $('#hamburger-icon-wrapper').click(function () {

        $('#div-hidden').css({ display: "block" });
        $('#hamburger-icon-wrapper').css({ display: "none" });
        $('#close-icon-wrapper').css({ display: "flex" });
        $('.dropdown').css({ position: "relative", top: "200px", right: "0px" });
    })
    $('#close-icon-wrapper').click(function () {

        $('#div-hidden').css({ display: "none" });
        $('#close-icon-wrapper').css({ display: "none" });
        $('#hamburger-icon-wrapper').css({ display: "flex" });
        $('.dropdown').css({ position: "relative", top: "0px", right: "0px" });

    })
    function myFunction(x) {
        if (x.matches) { // If media query matches        
            $('#hamburger-icon-wrapper').css({ display: "none" });
        }
        else {
            $('#hamburger-icon-wrapper').css({ display: "flex" });
        }
    }

    var x = window.matchMedia("(min-width: 1110px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
});