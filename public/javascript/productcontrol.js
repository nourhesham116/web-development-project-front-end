document.getElementById("add").addEventListener("click", function() {
    var form = document.getElementById("newproductdetails");
    
    // Toggle the display property
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
    } else {
        form.classList.add("hidden");
    }
});

var products = []; // Array to store products

document.getElementById("newproductdetails").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form values
    var name = document.getElementById("productName").value;
    var price = parseFloat(document.getElementById("productPrice").value);
    var description = document.getElementById("productDescription").value;
    
    // Create a product object
    var product = {
        name: name,
        price: price,
        description: description
    };
    
    // Add product to the array
    products.push(product);
    
    // Display success message
    var messageDiv = document.getElementById("message");
    messageDiv.textContent = "Product added successfully!";
    
    // Clear the form
    document.getElementById("newproductdetails").reset();

    //displaying products
    for(let i=0;i<product.length();i++){
        console.log(product);
    }

});