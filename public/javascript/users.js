// Sample array of users
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more users as needed
  ];
  
  // Function to render the user list
  function renderUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    
    // Iterate through the users and create list items
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `${user.name} - ${user.email}`;
      
      // Add a delete button to each user
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => deleteUser(user.id));
      
      li.appendChild(deleteButton);
      userList.appendChild(li);
    });
  }
  
  // Function to add a new user
  function addUser(name, email) {
    const newUser = {
      id: users.length + 1,
      name: name,
      email: email
    };
    
    users.push(newUser);
    renderUserList();
  }
  
  // Function to delete a user
  function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    renderUserList();
  }
  
  // Event listener for the add user form submission
  const addUserForm = document.getElementById('addUserForm');
  addUserForm.addEventListener('submit', event => {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    
    // Get the values from the input fields
    const name = nameInput.value;
    const email = emailInput.value;
    
    // Call the addUser function with the values
    addUser(name, email);
    
    // Clear the input fields
    nameInput.value = '';
    emailInput.value = '';
  });
  
  // Initial rendering of the user list
  renderUserList();
  