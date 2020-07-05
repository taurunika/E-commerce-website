$(document).ready(function () {
    var productId = window.location.search.split('=')[1];
    var currentObj = null;

    function createProductImages(url, pos) {
        var image = document.createElement('img');
        image.src = url

        if (pos === 0) {
            image.classList.add("active-image");
        }

        image.onclick = function () {
            $('.prev-div img').removeClass("active-image")
            image.classList.add("active-image");
            $('.product').attr('src', url);
        }

        return image;
    }


    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId, function (data, status) {
        currentObj = data;
        $('.product').attr('src', data.preview)
        $('.main-page-heading').html(data.name);
        $('.main-page-heading-brand').html(data.brand);
        $('.main-page-heading-desc-para').html(data.description);
        $('.rate-span').html(data.price);

        for (var i = 0; i < data.photos.length; i++) {
            $('.prev-div').append(createProductImages(data.photos[i], i));
        }
    })

    $(".cart-btn").click(function () {
        $('.cart-btn').addClass('bigger');
        setTimeout(function () {
            $('.cart-btn').removeClass('bigger');
        }, 200)

        var productl = window.localStorage.getItem('product-list');
        productl = productl === null || productl === '' ? [] : productl;
        productl = productl.length > 0 ? JSON.parse(productl) : [];

        var flag = 0;
        for (var i = 0; i < productl.length; i++) {

            if (productl[i].id == currentObj.id) {
                flag = 1;
                break;
            }
            else if (productl[i].id != currentObj.id) {


            }
        }
        
        if (flag == 1) {
            productl[i].count += 1;
            
            window.localStorage.setItem('product-list', JSON.stringify(productl));
        } else {
            
            currentObj.count = 1;

            console.log(currentObj, "notfound");
            productl.push(currentObj);

            
            window.localStorage.setItem('product-list', JSON.stringify(productl));
        }

        var totalCount = 0;
        for (var i = 0; i < productl.length; i++) {
            totalCount = totalCount + productl[i].count;
        }

        $('#cart-count').text(totalCount);

        //localStorage.setItem('product-list', JSON.stringify(productl));
    })

    $('#cart-count').text(() => {
        var productl = JSON.parse(localStorage.getItem('product-list'))
        var totalCount = 0;
        for (var i = 0; i < productl.length; i++) {
            totalCount = totalCount + productl[i].count;
        }
        if (productl === null) {
            return 0
        }
        return totalCount;
    })

    $('#hamburger-icon-wrapper').click(function() {

        $('#div-hidden').css({display: "block"});
        $('#hamburger-icon-wrapper').css({display: "none"});
        $('#close-icon-wrapper').css({display: "flex"});
        $('.dropdown').css({position: "relative", top: "200px", right: "0px"});
    })
    $('#close-icon-wrapper').click(function() {

        $('#div-hidden').css({display: "none"});
        $('#close-icon-wrapper').css({display: "none"});
        $('#hamburger-icon-wrapper').css({display: "flex"});
        $('.dropdown').css({position: "relative", top: "0px", right: "0px"});

    })
    function myFunction(x) {
        if (x.matches) { // If media query matches        
          $('#hamburger-icon-wrapper').css({display: "none"});
        } 
        else {
          $('#hamburger-icon-wrapper').css({display: "flex"});
        }
      }

      var x = window.matchMedia("(min-width: 1110px)")
      myFunction(x) // Call listener function at run time
      x.addListener(myFunction) // Attach listener function on state changes
});