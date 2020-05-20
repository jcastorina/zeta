const num = document.getElementById('num').value
const imagePad = document.getElementById('imagePad')
const imageString = document.getElementById('imageArray').value
const imageArray = imageString.split(',')

for(let i = 0; i < num; i++){
   
    let img = document.createElement('img')
    
    img.src = imageArray[i]
    img.onclick = resize;
  
    imagePad.appendChild(img)
}

function resize () {
    if(!this.licked){
        this.style.height = '300px'
        this.licked = true;
    } else {
        this.style.height = '50px'
        this.licked = false;
    }
}