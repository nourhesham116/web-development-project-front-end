

var products = []; // Array to store products

document.getElementById("newproductdetails").addEventListener("submit", function(event) {
   // event.preventDefault(); // Prevent form submission
    
    // Get form values
    var name = document.getElementById("productName").value;
    var price = parseFloat(document.getElementById("productPrice").value);
    var description = document.getElementById("productDescription").value;
    
    // Create a product object
    var product = {
        name: 'name',
        price: 'price',
        description: 'description'
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
const arrSkin=["new","Face moisturizer","face cleanser","toner","mask and treatment","lip care","eye cream","suncream","body cleanser","scrub","body mists"];
const arrBeauty=["foundation","prime+set","concelar","powder","contour","blush","bronzing","highlighter","brushes","lipgloss","lipstick","lipcombos","lipbalm","eyeshadow","mascara"]
function dropdownSkin(){
    let drop=document.getElementById("custom-select");
    var option;
   var L = drop.options.length ;
   clearDropDown(L,drop);
   
    for(let i=0;i<arrSkin.length;i++){
     option = document.createElement("option");
      option.text = arrSkin[i];
       drop.add(option);
    }
    
    
}

function clearDropDown(l,drop){
    while(l>0){
        drop.remove(l);
        l=l-1;
    }
}
function dropdownBeauty(){
    let drop2=document.getElementById("custom-select");
    var option2;
    var L = drop2.options.length - 1;
    
   clearDropDown(L,drop2);
   
    for(let i=0;i<arrBeauty.length;i++){
     option2 = document.createElement("option");
      option2.text = arrBeauty[i];
       drop2.add(option2);
    }
}