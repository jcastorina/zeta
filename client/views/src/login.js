document.addEventListener('keydown', submitForm, false);

let div = document.getElementById('error')
let h1 = document.getElementById('fader')
console.log(h1,'h1')
setTimeout(()=>{
    div.className = 'hide'
}, 800)

function submitForm(event){
    if(event.which === 13){//ENTER
        document.forms[0].submit();
        document.removeEventListener(keydown, submitForm, false)
    }
}