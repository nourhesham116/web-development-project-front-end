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
    if(field1==''){
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
        document.getElementById('pcErr').innerHTML = "Password length must be atleast 8 characters";  
          valid= false;  
    }
 
    return valid;
}
// function ValidateEmail(field1, field2)
// {
// var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
// if(field1.value.match(mailformat))
// {
// document.getElementById('eErr').innerHTML'';
// return true;
// }
// else{
//     document.getElementById('eErr').innerHTML='invalid email';
// }
// if(field1!=field2 || field2==''){
//     document.getElementById('ecErr').innerHTML='You must Enter your email.';
//     valid=false;
// }
// else
// {
// document.getElementById('pErr').innerHTML='';
// return false;
// }
// }
function validate(form){
    let fail='';
    fail&=validateFName(form.Fname.value);
    fail&=validateLName(form.Lname.value);
    fail&=validatePassword(form.pass.value, form.passConfirm.value);
    //fail&=ValidateEmail(form.email.value, form.emailConfirm.value)
   
    if(fail)
        return true;
    else{
        return false;
    }
}