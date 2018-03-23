// JavaScript för att implementera kraven A-E.
const productList = $('#product-list');
const cartItem = $('#items');
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
    const cartProduct = $('<p></p>');
    const price = $('<p></p>');
    let cartQuantity = $("<p></p>");
    let totalPrice = $("<p></p>");
    button.attr("id",product.Name);

    let total = 0;
    let test = parseInt(product.Price);
    
    cartProduct.text(product.Name);
    price.text(product.Price);  
    
    let quantityText = Math.floor((Math.random() * 10)+1);
    button.text("Add to cart");
    let productIds = product.Id;
    
    productName.text(product.Name);
    
    quantity.text(`quantity: ${quantityText}`);
    pic.attr('src', product.Image);
    section.append(productName, pic, quantity, button);
    productList.append(section);
    
    button.click(function(product) {
       const productNameOrder = productName.html();
       order.push(productNameOrder);
       quantity.text(`quantity: ${quantityText-=1}`);
        if(quantityText <= 0) {
            button.prop('disabled', true);
        }
        const section = $('<div></div>');
        totalPrice.text(`Total: ${test++}`);
        cartQuantity.text(`quantity: ${total+=1}`);
        
        section.append(cartProduct, price, cartQuantity, totalPrice);
        cartItem.append(section);
    });
}
getProducts();

 $("#sendBtn").click(function () {
     alert("Order sent");
     cartItem.empty();
 })


/* button.click(function(product) {
        
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
     
 }); */