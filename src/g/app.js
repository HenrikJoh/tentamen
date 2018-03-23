// JavaScript för att implementera kraven A-E.
const productList = $('#product-list');




function getProducts() {
    $.get("http://demo.edument.se/api/products", (data) => {
        for(let product of data){
            createProduct(product);
            
        }
    })

}

function createProduct(product) {
    const section = $("<div></div>");
    const productName = $("<h3></h3>");
    const pic = $("<img>");
    const button = $("<button></button>");
    let quantity = $("<p></p>");
    button.attr("id",product.Name + "Hejsan");

    let quantityText = Math.floor((Math.random() * 10)+1);
    button.text("Add to cart");

    productName.text(product.Name);
    quantity.text(`quantity: ${quantityText}`);
    pic.attr('src', product.Image);
    section.append(productName, pic, quantity, button);
    
    button.click(function() {
       quantity.text(`quantity: ${quantityText-=1}`);
        if(quantityText <= 0) {
            button.prop('disabled', true);
        }
/*         $.post( "http://localhost:3000/orders", function( data ) {
            let order = {

            }
          }); */
        console.log(quantityText);
    });
    productList.append(section);

}
getProducts();