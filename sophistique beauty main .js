
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides fade");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.toggle("active");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


//product slider

var right = 0;
var maxMargin;
var jumpMargin = 150;

function setWidth(){
  var boxwidth = document.querySelector(".container").offsetWidth;
  var displaywidth = document.querySelector(".row").offsetWidth;
  var displayheight = document.querySelector(".row").offsetHeight;
  var children = document.querySelectorAll(".row-container > .container").length;
  var outerboxwidth = children * boxwidth + (children*10);
  document.querySelector(".row-container").style.width = outerboxwidth+"px";
  document.querySelectorAll("button")[0].style.height = displayheight+"px";
  document.querySelectorAll("button")[1].style.height = displayheight+"px";
  maxMargin = outerboxwidth - displaywidth;
}

function slideLeft(event){
  var rowcont = document.querySelector(".row-container");
  if(right <= -maxMargin){
    event.preventDefault();
  }
  else{
    right -= jumpMargin;
  }
   rowcont.style.marginLeft = right+"px";
}

function slideRight(event){
  var rowcont = document.querySelector(".row-container");
  if(right==0){
    event.preventDefault();
  }
  else if(right >= maxMargin){
    event.preventDefault();
  }
  else{
     right += jumpMargin;
  }
  rowcont.style.marginLeft = right+"px";
}

window.onload=setWidth;
