$(document).ready(function(){
    $("#email").on('keyup', function(e){
        e.preventDefault();
        var data= $ ('#email').val();
        $.ajax({
            url:'/User/checkemail',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({email: data}),
            success:function(response){
                $('#result').html('email is '+response);
                if(response == 'taken'){
                    $('#result').css("color","red");
                }else{
                    $('#result').css("color","blue");
                }
            }
        });
    });
});