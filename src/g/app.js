// JavaScript för att implementera kraven A-E.
const productList = $('#product-list');
let order = [];


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
    button.attr("id",product.Name);

    let quantityText = Math.floor((Math.random() * 10)+1);
    button.text("Add to cart");
    let productIds = product.Id;
    
    productName.text(product.Name);
    quantity.text(`quantity: ${quantityText}`);
    pic.attr('src', product.Image);
    section.append(productName, pic, quantity, button);
    
    button.click(function(product) {
        console.log(productName.html());
        
       quantity.text(`quantity: ${quantityText-=1}`);
        if(quantityText <= 0) {
            button.prop('disabled', true);
        }
        const productNameOrder = productName.html();
        let prodIds = productIds;

    
        order.push(productNameOrder);
  
        for(let orderProducts of order) {
            if(orderProducts !== productNameOrder){
                order = [];
                order.push(productNameOrder);
            }
        }
       $.post( "http://localhost:3000/orders",  {
            productId: productIds,
            name: productNameOrder,
            quant: order.length    
          }); 
        
    });
    productList.append(section);
}
getProducts();