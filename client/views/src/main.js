//text scroll

let div = document.getElementById('notify')
let h1 = document.getElementById('fader')
let screen = document.getElementById('blueScreenTextWrapper')

let num = 1;

const lineNum = {
    0: 'Your adventures take you to Zeta Corporation',
    1: 'A dark spell has taken hold of the office',
    2: 'The CEO promises you a stock award if you can assist',
    3: ' ',
    4: 'you ready?'
}

scroller();

function scroller (){
    let textLine = document.createElement('p')
    textLine.innerText = lineNum[num-1];
   
    textLine.setAttribute('id','p'+num);
    textLine.setAttribute('style','display:none')
    
    
    screen.appendChild(textLine);
    
    setTimeout(()=>{
        $(document).ready(()=>{
            $('#p'+(num-1)).fadeIn('slow');
        })
        num += 1;
        if(num<6){
            
            scroller();            
        }
    }, 2000)
}


//title
setTimeout(()=>{
    div.className = 'hide'
}, 2800)
setTimeout(()=>{
    h1.innerText = ' '
}, 5200)
