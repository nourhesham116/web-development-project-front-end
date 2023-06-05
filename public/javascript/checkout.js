const submitBtn = document.getElementById('submit');
    const form = document.getElementById('myform');
    submitBtn.addEventListener('click', function() {
      if (!form.fname.value || !form.email.value || !form.address.value|| !form.lname.value|| !form.city.value) {
        alert('Please fill out all fields');
      }
    });