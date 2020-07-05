$(document).ready(function () {
    var url = "https://5ef2165325da2f0016227b87.mockapi.io/homepage";

    var clothing = $('#clothing-item-wrapper');
    clothing.html("");

    var accessories = $('#accessories-item-wrapper');
    accessories.html("");

    // $('#cart-count').text(() => {
    //     var items = JSON.parse(localStorage.getItem('product-list'))
    //     if(items === null) {
    //         return 0
    //     }
    //     return items.length
    // })


    $(".slick-slider").slick({
        dots: true,
        arrows:false,
        autoplay:true,
        autoplaySpeed: 2000,
        fade:true,
        fadeSpeed:1000

    });


    $.get(url, function (response) {


        for (var i = 0; i < 5; i++) {
            clothing.append(createClothingSection(response[i]));
        }

        for (var i = 5; i <= 10; i++) {
            accessories.append(createClothingSection(response[i]));
        }

    }).fail(function () {
        alert("Call Failed!");
    })

    function createClothingSection(data) {

        // <div class="items">
        //     <div class="item-pic-wrapper">
        //         <a href="./product/product.html"><img class="item-pic"
        //             src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg"
        //             alt=""></a>
        //             </div>
        //         <div class="item-content">
        //             <h3 class="main-page-heading item-name">Men Navy Blue Solid Sweatshirt</h3>
        //             <h4 class="main-page-heading item-brand">United Colors of Benetton</h4>
        //             <h3 class="main-page-heading rate">Rs <span>2599</span></h3>
        //         </div>
        //     </div>

        var items = $('<div>').addClass('items');

        var itemPicWrapper = $('<div>').addClass('item-pic-wrapper');

        var itemlink = $('<a>');
        itemlink.attr('href', "./product/product.html?p=" + data.id);

        var itemPic = $('<img>').addClass('item-pic');
        itemPic.attr('src', data.preview);

        var itemContent = $('<div>').addClass('item-content');

        var itemName = $('<h3>').addClass('main-page-heading item-name').text(data.name);

        var itemBrand = $('<h4>').addClass('main-page-heading item-brand').text(data.brand);;

        var itemRate = $('<h3>').addClass('main-page-heading rate').text("Rs " + data.price);

        itemlink.append(itemPic);
        itemPicWrapper.append(itemlink);
        itemContent.append(itemName, itemBrand, itemRate);
        items.append(itemPicWrapper, itemContent);

        return items;
    }

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