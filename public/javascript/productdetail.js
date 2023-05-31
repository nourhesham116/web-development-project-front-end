function expand(imgs) {
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "block";
    expandImg.style.width="175%";
    expandImg.style.height="800px";
  }