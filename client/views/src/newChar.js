var chars = document.getElementById('newChar')
for(var i in chars.children){
    chars.children[i].onmouseover = hoverBox;
    chars.children[i].onmouseleave = removeBox;
}

//console.log(chars);

function hoverBox(){
    this.setAttribute("class","border")
}

function removeBox(){
    this.setAttribute("class","")
}