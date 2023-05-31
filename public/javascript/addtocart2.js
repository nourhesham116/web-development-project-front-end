function appear() {
    let sq = document.getElementsByClassName("split");
    if (sq[0].style.opacity == 0) {
        sq[0].style.display="block";
        //sq[0].style.opacity = 1;
        //sq[0].style.visibility = "visible";
    }
    
}
function ex(){
    let s = document.getElementsByClassName("split");
    s[0].style.display="none";
   
    
}
function count(meen) {
    let minus = document.getElementById("minus");
    let val = document.getElementById("value");
    let add = document.getElementById("add");
    let countNum = parseInt(val.innerHTML);
    if (meen == 'minus') {
        if (countNum > 1) {
            let valuee = countNum - 1;
            val.innerHTML = valuee;
        }
    }
    if (meen == 'add') {
        let valuee = countNum + 1;
        val.innerHTML = valuee;
    }
}