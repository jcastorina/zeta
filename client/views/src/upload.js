const preview = document.getElementById('preview');

let fileList;

function init() {
    let inputElement = document.getElementById('inputfile');
    inputElement.addEventListener('change', handleFiles, false);
    return inputElement
}

init();

function upFile (event) {
    event.preventDefault(); //prevent form from posting without JS
    var xhttp = new XMLHttpRequest(); //create new AJAX request
    let el = init()
    let file = el.files[0]

    xhttp.open('POST','upload')
    var formData = new FormData();
    formData.append('imageFile', file)
    xhttp.send(formData)
    
    let previewClone = document.createElement('div')
    previewClone.setAttribute('id','preview')
    
    let inputClone = document.createElement('input')
    inputClone.setAttribute('id','inputfile')
    inputClone.setAttribute('type','file')
    
    inputClone.addEventListener('change', handleFiles, false);

    el.replaceWith( inputClone )
    preview.innerHTML = ''
    formData.delete('imageFile')

}

function handleFiles(files) {
    fileList = this.files;
   
    
    for (let i = 0; i < fileList.length; i++){
        
        const file = fileList[i]
        if(!file.type.startsWith('image/')){ continue }
        
        const img = document.createElement('img');
        img.classList.add('obj');
        img.setAttribute('id','imgUpload')
        img.file = file;
        preview.appendChild(img)

        const reader = new FileReader();
        reader.onload = (function(aImg){ return function(e) {aImg.src = e.target.result;};})(img)
        reader.readAsDataURL(file);
       
    }
}

document.getElementById('subbut').onclick = upFile
