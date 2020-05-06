var chars = document.getElementById('newChar')
var available = ["mario","megaman","whitemage"]

//create form and event handlers
for(var i in available){
    var div = document.createElement("div")
    var lab = document.createElement("label");
    lab.setAttribute("for", ""+available[i]+"")
    var input = document.createElement("input");
    var img = document.createElement("img")
    img.setAttribute("src","img/"+available[i]+".png")
    img.setAttribute("class","baseborder")
    input.setAttribute("type","checkbox");
    input.setAttribute("name", available[i])
    input.setAttribute("id", available[i])
    input.setAttribute("style", "display: none; padding: 15px")
    img.onclick = stickBox;
    img.onmouseover = hoverBox;
    img.onmouseleave = removeBox;
    lab.appendChild(input);
    lab.appendChild(img);
    div.appendChild(lab);
    chars.appendChild(div);
}

function hoverBox(){
    if(!this.licked){
        this.setAttribute("class","border")
    }
}

function removeBox(){
    if(!this.licked){
        this.setAttribute("class","baseborder")
    }
}

function stickBox(){
    if(!this.licked){
        this.setAttribute("class","border")
        this.licked = true
    } else {
        this.setAttribute("class","baseborder")
        this.licked = false;
    }
}