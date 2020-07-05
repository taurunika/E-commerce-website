$(document).ready(function () {


    function createCheckoutProductCard(data) {

        // <div class="item-card">
        //      <div id="item-img">
        //          <img class="checkout-product-img"
        //              src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg">
        //      </div>
        //      <div id="item-desc">
        //          <h3 class="checkout-heading-item-name">Men Navy Blue Solid Sweatshirt</h3>
        //          <p class="checkout-para">x 0</p>
        //          <p class="checkout-para">Amount: Rs <span>XXXX</span></p>
        //      </div>
        // </div>

        var card = document.createElement('div');
        card.classList.add('item-card');

        var firstInnerDiv = document.createElement('div');
        firstInnerDiv.classList.add('item-img');

        var productImg = document.createElement('img');
        productImg.classList.add('checkout-product-img');
        productImg.src = data.preview;
        firstInnerDiv.appendChild(productImg);

        var secondInnerDiv = document.createElement('div');
        secondInnerDiv.classList.add('item-desc');

        var productName = document.createElement('h3');
        productName.classList.add('checkout-heading-item-name');
        productName.innerHTML = data.name;

        var productCount = document.createElement('p');
        productCount.classList.add('checkout-para');
        productCount.innerHTML = 'x' + data.count;

        var amountLabel = document.createElement('p');
        amountLabel.classList.add('checkout-para');
        amountLabel.innerHTML = 'Amount: Rs ';

        var amountSpan = document.createElement('span');
        amountSpan.innerHTML = parseInt(data.count) * parseInt(data.price);
        var productAmount = document.createElement('p');
        productAmount.appendChild(amountLabel);
        amountLabel.appendChild(amountSpan);
        secondInnerDiv.appendChild(productName);
        secondInnerDiv.appendChild(productCount);
        secondInnerDiv.appendChild(productAmount);

        card.appendChild(firstInnerDiv);
        card.appendChild(secondInnerDiv);

        return card;
    }

    var productl = window.localStorage.getItem('product-list');
    productl = productl === null || productl === '' ? [] : productl;
    productl = productl.length > 0 ? JSON.parse(productl) : [];


    var grandTotal = 0;
    for (var i = 0; i < productl.length; i++) {
        $('#checkout-items').append(createCheckoutProductCard(productl[i]));

        var totalForCurrentProduct = parseFloat(productl[i].count) * parseFloat(productl[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;

    }

    $('#product-count').html(productl.length);
    $('#product-amt').html(grandTotal);

    $('#cart-btn').click(function () {

        var orderItemArr = [];
        for (var i = 0; i < productl.length; i++) {
            var prodObj = {
                "id": productl[i].id,
                "brand": productl[i].brand,
                "name": productl[i].name,
                "price": productl[i].price,
                "preview": productl[i].preview,
                "isAccessory": productl[i].isAccessory
            }

            orderItemArr.push(prodObj);
        }


        var responseData = {
            amount: grandTotal,
            products: orderItemArr
        }
        console.log(responseData);
        $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/order', responseData, function () {
            console.log('data posted');
            alert('Order Placed Successfully!!')
            localStorage.setItem('product-list', []);

            location.assign('./order-success.html');
        })
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