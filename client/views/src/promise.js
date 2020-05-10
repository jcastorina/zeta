fetch('ground.png')
.then(response => {console.log(response); return response.blob()})
.then(myBlob=>{
//let promise3 = promise2.then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
})