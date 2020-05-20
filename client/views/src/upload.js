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

    xhttp.open('POST','/upload', true)
    var formData = new FormData();
    formData.append('imageFile', file)
    xhttp.send(formData)
    runXHR('16bfd383-7819-4533-b663-0d674515e00c.png')
    
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
        console.log(img)

        reader.readAsDataURL(file);
       
    }
}

document.getElementById('subbut').onclick = upFile

//xhr section

const xhrButtonSuccess = document.querySelector('.xhr.success');
const xhrButtonError = document.querySelector('.xhr.error');
const xhrButtonAbort = document.querySelector('.xhr.abort');
const log = document.querySelector('.event-log');

function handleEvent(e) {
    log.textContent = log.textContent + `${e.type}: ${e.loaded} bytes transferred\n`;
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
    xhr.open("GET", url);
    xhr.send();
    return xhr;  
}

xhrButtonSuccess.addEventListener('click', () => {
    runXHR('16bfd383-7819-4533-b663-0d674515e00c.png');
});

xhrButtonError.addEventListener('click', () => {
    runXHR('1234fakestreet');
});

xhrButtonAbort.addEventListener('click', () => {
    runXHR('16bfd383-7819-4533-b663-0d674515e00c.png').abort();
});
