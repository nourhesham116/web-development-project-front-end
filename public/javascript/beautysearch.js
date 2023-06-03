// const users = require("../models/product");


// function sendData(e) {
//     const searchResult = document.getElementById("searchResult");
//     let match3 = e.value.match(/^[a-zA-Z]*/);
//     let match4 = e.value.match(/^\s*/);


//     if (match4&&match4[0] == e.value) {
//         searchResult.innerHTML = '';
//         return;
//     }

//     if (match3&&match3[0] == e.value) {
//         fetch('/search', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ payload: e.value })
//         }).then(res => res.json())
//         .then(data => {
//             let payload = data.payload;
//             searchResult.innerHTML = '';
//             if (payload.length < 1) {
//                 searchResult.innerHTML = '<p>Sorry. Nothing Found</p>';
//                 return;
//             }
//             searchResult.innerHTML ='<p> Found</p>'
//             payload.forEach(async ( Product, index) => {
//                 if (index > 0) searchResult.innerHTML += '<hr>';
                
//                 searchResult.innerHTML += `<p>${Product.type}</p>`;
//                 searchResult.innerHTML += `<p>${Product.price}</p>`;

//             });

//         });
//         return;
//     }
//     searchResult.innerHTML = '';
// }

const users = require("../models/users");


function sendData(e) {
    const searchResult = document.getElementById("searchResult");
    let match = e.value.match(/^[a-zA-Z]*/);
    let match2 = e.value.match(/^\s*/);


    if (match2&&match2[0] == e.value) {
        searchResult.innerHTML = '';
        return;
    }

    if (match&&match[0] == e.value) {
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: e.value })
        }).then(res => res.json())
        .then(data => {
            let payload = data.payload;
            searchResult.innerHTML = '';
            if (payload.length < 1) {
                searchResult.innerHTML = '<p>Sorry. Nothing Found</p>';
                return;
            }
            payload.forEach(async (users, index) => {
                if (index > 0) searchResult.innerHTML += '<hr>';
                
                searchResult.innerHTML += `<p>${users.Firstname}</p>`;
                searchResult.innerHTML += `<p>${users.Email}</p>`;
                searchResult.innerHTML += `<p>${users.Type}</p>`;

            });

        });
        return;
    }
    searchResult.innerHTML = '';
}

