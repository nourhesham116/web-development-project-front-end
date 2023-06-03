const users = require("../models/users");
const table=document.querySelectorAll('.email');

function sendData(e) {
    const searchResults = document.getElementById("searchResults");
    let match = e.value.match(/^[a-zA-Z]*/);
    let match2 = e.value.match(/^\s*/);


    if (match2&&match2[0] == e.value) {
        searchResults.innerHTML = '';
        return;
    }

    if (match&&match[0] == e.value) {
        fetch('/admindashboard/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: e.value })
        }).then(res => res.json())
        .then(data => {
            let payload = data.payload;
            searchResults.innerHTML = '';
            if (payload.length < 1) {
                searchResults.innerHTML = '<p>Sorry. Nothing Found</p>';
                return;
            }
            payload.forEach(async (users, index) => {
                if (index > 0) searchResults.innerHTML += '<hr>';
                
                searchResults.innerHTML += `<p>${users.Firstname}</p>`;
                searchResults.innerHTML += `<p>${users.Email}</p>`;
                searchResults.innerHTML += `<p>${users.Type}</p>`;

            });

        });
        return;
    }
    searchResults.innerHTML = '';
}

