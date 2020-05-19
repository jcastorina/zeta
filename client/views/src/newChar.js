var chars = document.getElementById('newChar')
var row1 = document.createElement('newCharRow1')
row1.setAttribute("style","padding-top: 20px;")
var row2 = document.createElement('newCharRow2')
row2.setAttribute("style","padding-top: 20px;")

chars.appendChild(row1);
chars.appendChild(row2);
//var row = ["mario","megaman","whitemage"]
const row = ["al","belding","phil","tim"]

const imgSrc = [
    'img/al.png',
    'img/belding.png',
    'img/phil.png',
    'img/tim.png'
]

function returnChar(i) {
    let divwrap = document.createElement("div");
    divwrap.setAttribute("class","charWrap")
    let div = document.createElement("div")
    var lab = document.createElement("label");
    lab.setAttribute("for", ""+row[i]+"")
    var input = document.createElement("input");
    var img = document.createElement("img")
    img.setAttribute("src","img/"+row[i]+".png")
    img.setAttribute("class","baseborder")
    img.setAttribute("id","char")
    input.setAttribute("type","checkbox");
    input.setAttribute("name", row[i])
    input.setAttribute("id", row[i])
    input.setAttribute("style", "display: none; padding: 15px")
    img.onclick = stickBox;
    img.onmouseover = hoverBox;
    img.onmouseleave = removeBox;

    lab.appendChild(input);
    lab.appendChild(img);
    div.appendChild(lab);
    divwrap.appendChild(div);
    return divwrap;
}

for(var i in row){
    if(i < 2){
        row1.appendChild(returnChar(i));
    } else {
        row2.appendChild(returnChar(i));
    }
}

document.addEventListener('keydown',cycleChar,false)

let row1_ = document.children[0].children[1].children[2].children[0].children[1].children[0].children[0]
let row2_ = document.children[0].children[1].children[2].children[0].children[1].children[0].children[1]

let char1 = row1_.children[0].children[0].children[0].children[1]
let char2 = row1_.children[1].children[0].children[0].children[1]
let char3 = row2_.children[0].children[0].children[0].children[1]
let char4 = row2_.children[1].children[0].children[0].children[1]
charArr = [ char1, char2, char3, char4]

let offset = 1;
function cycleChar(){
   
    

        if(charArr[0].licked){
            let off = offset%4;
            charArr[0].src = imgSrc[off]
    
        }
        if(charArr[1].licked){
            let off = (offset+1)%4;
            charArr[1].src = imgSrc[off]
    
        }
        if(charArr[2].licked){
            let off = (offset+2)%4;
            charArr[2].src = imgSrc[off]
    
        }
        if(charArr[3].licked){
            let off = (offset+3)%4;
            charArr[3].src = imgSrc[off]
    
        }
    offset += 1;
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
        this.setAttribute("style","background: #55F")
        this.licked = true
  
    } else {
     
        this.setAttribute("class","baseborder")
        this.setAttribute("style","")
        this.licked = false;
    }
}