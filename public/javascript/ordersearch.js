function toggleSearchBar() {
    const searchBox = document.getElementById("search-box");
    searchBox.style.display = (searchBox.style.display === "none") ? "block" : "none";
}

function sendOrder(f) {
    const searchResult = document.getElementById("searchResult");
    let match = f.value.match(/^[a-zA-Z0-9]*/);
    let match2 = f.value.match(/^\s*/);

    if (match2 && match2[0] == f.value) {
        searchResult.innerHTML = '';
        return;
    }

    if (match && match[0] == f.value) {
        fetch('/osearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: f.value })
        })
        .then(res => res.json())
        .then(data => {
            let payload = data.payload;
            searchResult.innerHTML = '';
            if (payload.length < 1) {
                searchResult.innerHTML = '<p>Sorry. Nothing Found</p>';
                return;
            }
            payload.forEach((orders, index) => {
                if (index > 0) searchResult.innerHTML += '<hr>';
                
                searchResult.innerHTML += `<p>${orders.firstname}</p>`;
               
            });

        });
        return;
    }
    searchResult.innerHTML = '';
}
