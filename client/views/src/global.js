window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
        

    var offsetx = (window.innerWidth - 777) /2;

    let field = document.getElementById("global")
    field.style.marginLeft = ''+offsetx+'px';


}

onWindowResize();