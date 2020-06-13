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
  
    let el = init()
    let file = el.files[0]

    var formData = new FormData();
    formData.append('imageFile', file)
 
    postXHR('/upload',formData)
 
    let previewClone = document.createElement('div')
    previewClone.setAttribute('id','preview')
    
    let inputClone = document.createElement('input')
    inputClone.setAttribute('id','inputfile')
    inputClone.setAttribute('type','file')
    
    inputClone.addEventListener('change', handleFiles, false);

    el.replaceWith( inputClone )
    preview.style.color = '#00FF00'
    preview.innerHTML = 'SUCCESS'
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

window.addEventListener('click', reportMe, true)

document.getElementById('subbut').onclick = upFile

function reportMe() {
    console.log('someone clicked subbut')
}

function addListeners(xhr) {
    xhr.addEventListener('loadstart', handleEvent);
    xhr.addEventListener('load', handleEvent);
    xhr.addEventListener('loadend', handleEvent);
    xhr.addEventListener('progress', handleEvent);
    xhr.addEventListener('error', handleEvent);
    xhr.addEventListener('abort', handleEvent);
}

function runXHR(url) {
    log.textContent = '';

    const xhr = new XMLHttpRequest();
    addListeners(xhr);
    xhr.open("GET", url, true);
    xhr.send();
    return xhr;  
}

function postXHR(url,form) {
    

    const xhr = new XMLHttpRequest();
    addListeners(xhr);
    xhr.open("POST", url, true);
    xhr.send(form);
    return xhr;  
}