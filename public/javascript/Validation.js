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