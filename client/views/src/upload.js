const inputElement = document.getElementById('inputfile');
const preview = document.getElementById('preview');

let fileList;

inputElement.addEventListener('change', handleFiles, false);

document.getElementById('subbut').onsubmit = (event) => {
    event.preventDefault(); //prevent form from posting without JS
    var xhttp = new XMLHttpRequest(); //create new AJAX request

    xhttp.onreadystatechange = () => {
        if (this.readystate === 4 && this.status === 200){//server success
            document.getElementById('status').innerHTML = 'sent '+this.responseText+xhttp.status;
        } else {
            document.getElementById('status').innerHTML = xhttp.status;
        }
    }

    xhttp.open('POST','upload')
    var formData = new FormData();
    formData.append('imageFile', document.getElementById('inputfile').files[0])
    xhttp.send(formData);
}



/*button.addEventListener('click', uploadFile, false);
function uploadFile(){
    let blobFile = fileList[0]
    let formData = new FormData();
    formData.append('fileToUpload', blobFile)

    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: (response)=>{
            console.log('success upload ')
        },
        error: (jqXHR, textStatus, errorMessage)=>{
            console.log(errorMessage, ' shocker')
        }
    })
}*/

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

