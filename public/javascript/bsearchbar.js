
function toggleSearchBar() {
  const searchBox = document.getElementById("search-box");
  searchBox.style.display = (searchBox.style.display === "none") ? "block" : "none";
}


function sendproduct(f) {
    const prodsearch = document.getElementById("prodsearch");
    let match3 = f.value.match(/^[a-zA-Z]*/);
    let match4 = f.value.match(/^\s*/);
    
    if (match4 && match4[0] == f.value) {
      prodsearch.innerHTML = '';
      return;
    }
    if (match3 && match3[0] == f.value) {
      fetch('/bsearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload: f.value })
      })
        .then(res => res.json())
        .then(data => {
          let payload1 = data.payload;
          prodsearch.innerHTML = '';
          if (payload1.length < 1) {
            prodsearch.innerHTML = '<p>Sorry. Nothing Found</p>';
            return;
          }
          payload1.forEach((product, index) => {
            if (index > 0) prodsearch.innerHTML += '<hr>';
          
            const productLink = document.createElement('a');
            productLink.href = `/Skinproducts/productdetail/${product._id}`;
            productLink.innerHTML = `<p>${product.name}</p>`;
            
            prodsearch.appendChild(productLink);
            prodsearch.innerHTML += `<p>${product.price}EGP</p>`;
          });
          
        });
      return;
    }
    prodsearch.innerHTML = '';
  }