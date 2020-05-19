const inputElement = document.getElementById('inputfile');
const preview = document.getElementById('preview');
const formBack = document.createElement('form');
formBack.setAttribute("action","/upload")
formBack.setAttribute("method","GET")
formBack.setAttribute("hidden","true")
document.body.append(formBack)

let fileList;

inputElement.addEventListener('change', handleFiles, false);

document.getElementById('subbut').onclick = (event) => {
  
    event.preventDefault(); //prevent form from posting without JS
    var xhttp = new XMLHttpRequest(); //create new AJAX request
  /*  xhttp.onload = ()=>{
        document.forms[2].submit();
    }*/


    xhttp.open('POST','upload')
    var formData = new FormData();
    formData.append('imageFile', document.getElementById('inputfile').files[0])
    xhttp.send(formData)

}


function handleFiles(files) {
    fileList = this.files;

    for (let i = 0; i < fileList.length; i++){
        
        const file = fileList[i]
        if(!file.type.startsWith('image/')){ continue }
        
        const img = document.createElement('img');
        img.classList.add('obj');
        img.file = file;
        preview.appendChild(img)

        const reader = new FileReader();
        reader.onload = (function(aImg){ return function(e) {aImg.src = e.target.result;};})(img)
        reader.readAsDataURL(file);
       
    }
}

