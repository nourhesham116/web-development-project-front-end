function expand(imgs) {
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "block";
    expandImg.style.width="170%";
    expandImg.style.height="710px";
  }