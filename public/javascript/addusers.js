document.getElementById('userForm').addEventListener('submit', function (event) {
  event.preventDefault(); 
  addUser(); 
});

function addUser() {
  // Retrieve form input values
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;

  // Create a user object with the input values
  const newUser = { name, email };


  const User = require('./models/users'); // Import the User model
  User.create(newUser)
    .then((user) => {
      console.log('User added:', user);
    })
    .catch((error) => {
      console.error('Error adding user:', error);
    });
}

