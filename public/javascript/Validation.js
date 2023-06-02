
/*function validateForm(form) {
    const firstname = form.Firstname.value.trim();
    const lastname = form.Lastname.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
  
    // Reset previous error messages
    const errorElements = document.getElementsByClassName('err');
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].textContent = '';
    }
  
    let isValid = true;
  
    if (firstname === '') {
      document.getElementById('FnameERR').textContent = 'First Name is required';
      isValid = false;
    }
  
    if (lastname === '') {
      document.getElementById('LnameERR').textContent = 'Last Name is required';
      isValid = false;
    }
  
    if (email === '') {
      document.getElementById('eErr').textContent = 'Email is required';
      isValid = false;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById('eErr').textContent = 'Invalid email format';
      isValid = false;
    }
  
    if (password === '') {
      document.getElementById('pErr').textContent = 'Password is required';
      isValid = false;
    }
  
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
    if (!passwordPattern.test(password)) {
      document.getElementById('pErr').textContent = 'Password should contain at least one letter, one number, and one special character';
      isValid = false;
    }
  
    return isValid;
  }*/


  function validateFName(field){
    if(field==''){
        document.getElementById('FnameERR').innerHTML='Required First Name.';
        return false;
    }
    else{
        document.getElementById('FnameERR').innerHTML='';
        return true;
    }
}
function validateLName(field){
    if(field==''){
        document.getElementById('LnameERR').innerHTML='Required First Name.';
        return false;
    }
    else{
        document.getElementById('LnameERR').innerHTML='';
        return true;
    }
}
function validatePassword(field1, field2){
    let valid=true;
    if(field1==''&& field2==''){
        document.getElementById('pErr').innerHTML='You Must Enter a Password.';
        valid=false;
    }
    else{
        document.getElementById('pErr').innerHTML='';
    }
    if(field1!=field2 || field2==''){
        document.getElementById('pcErr').innerHTML='You must Enter a matching Password.';
        valid=false;
    }
    if(field1.length<8)
    {
        document.getElementById('pcErr').innerHTML = "Password length must be at least 8 characters";  
          valid= false;  
    }
 
    return valid;
}
function validate(form){
    let fail='';
    fail&=validateFName(form.Fname.value);
    fail&=validateLName(form.Lname.value);
    fail&=validatePassword(form.pass.value, form.passConfirm.value);
   
    if(fail)
        return true;
    else{
        return false;
    }
}


function validateAdmin(form){
    let fail='';
    fail&=validatePassword(form.pass.value, form.passConfirm.value);
    if(fail)
        return true;
    else{
        return false;
    }
}
  